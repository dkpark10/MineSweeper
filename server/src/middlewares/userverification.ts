import { Request, Response } from 'express';
import db from '../models/index';
import { signToken, verifyToken } from '../util/jwttHandler';

export default async function userVerification(request: Request, response: Response, tempAccessToken: string): Promise<boolean> {

  const id = request.signedCookies['accessToken'].id;
  const jwtKey = request.app.get('secret-key').jwtKey;
  const tempRefreshToken = await db.user.getRefreshToken(id) || '';

  const accessToken = await verifyToken(jwtKey, tempAccessToken);
  const refreshToken = await verifyToken(jwtKey, tempRefreshToken);

  // access token 만료
  if (accessToken === undefined) {
    // 둘다 유효하지 않다면 던짐
    if (refreshToken === undefined) {
      throw '두개 토큰 둘다 유효하지 않다.';
    }
    // refresh token만 유효하다면
    const userInfo = await db.user.getUserInfo({
      columns: ['ID', 'PWD', 'GRADE', 'AUTH'], id: id
    });

    const newAccessToken = await signToken(jwtKey, '1h', {
      id: userInfo.ID,
      grade: userInfo.GRADE,
      auth: userInfo.AUTH
    });

    // 새 access token 발급 후 쿠키저장
    response.cookie('accessToken', { id, newAccessToken }, {
      httpOnly: process.env.NODE_ENV === 'production',
      signed: true
    });
  }
  else if (refreshToken === undefined) {
    // 두개다 유요하지 않다면 던져
    if (accessToken === undefined) {
      throw '두개 토큰 둘다 유효하지 않다.';
    }
    const newRefreshToken = await signToken(jwtKey, '1h');
    db.user.setRefreshToken(id, newRefreshToken);
  }

  return true;
}

