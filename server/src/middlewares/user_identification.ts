import { Request, Response } from 'express';
import db from '../models/index';
import { signToken, verifyToken } from '../util/jwttHandler';

export default async function userIdentification(request: Request, response: Response, accessToken: string | undefined): Promise<boolean> {
  if (!accessToken) {
    return false;
  }

  const id = request.signedCookies['accessToken'].userid;
  const jwtKey = request.app.get('secret-key').jwtKey;
  const refreshToken = await db.user.getRedisValue(id) || '';

  const accessTokenPayload = await verifyToken(jwtKey, accessToken);
  const refreshTokenPayload = await verifyToken(jwtKey, refreshToken);

  if (accessTokenPayload === undefined) {
    if (refreshTokenPayload === undefined) {
      throw '두개 토큰 둘다 유효하지 않다.';
    }

    const userInfo = await db.user.getUserInfo({
      columns: ['ID', 'PWD', 'GRADE', 'AUTH'],
      id
    });

    const newAccessToken = await signToken(jwtKey, '1h', {
      id: userInfo.ID,
      grade: userInfo.GRADE,
      auth: userInfo.AUTH
    });

    response.cookie('accessToken', { id, accessToken: newAccessToken }, {
      httpOnly: process.env.NODE_ENV === 'production',
      signed: true
    });
  }
  else if (refreshTokenPayload === undefined) {
    if (accessTokenPayload === undefined) {
      throw '두개 토큰 둘다 유효하지 않습니다';
    }
    const newRefreshToken = await signToken(jwtKey, '1h');
    db.user.setRefreshToken(id, newRefreshToken);
  }
  return true;
}

