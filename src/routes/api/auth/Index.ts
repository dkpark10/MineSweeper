import { Router, Request, Response, NextFunction } from 'express';
import { game, getTest, insertTest } from './game';
import db from '../../../models/db';
import { signToken, verifyToken } from '../../../util/jwttHandler';

const router: Router = Router();

// 로그인 토큰검증 미들웨어
router.use(async (request: Request, response: Response, next: NextFunction) => {

  try {

    if (request.signedCookies['accessToken'] === undefined){
      next();
    }

    const id = request.signedCookies['accessToken'].id;
    const jwtKey = request.app.get('secret-key').jwtKey;
    const tempAccessToken = request.headers.authorization?.split(' ')[1] as string;
    const tempRefreshToken = await db.getRefreshToken(id) || '';

    const accessToken = await verifyToken(jwtKey, tempAccessToken);
    const refreshToken = await verifyToken(jwtKey, tempRefreshToken);

    // access token 만료
    if (accessToken === undefined) {
      // 둘다 유효하지 않다면 던짐
      if (refreshToken === undefined) {
        throw '두개 토큰 둘다 유효하지 않다.';
      }
      // refresh token만 유효하다면
      const userInfo = await db.getUserInfo({
        columns: ['ID', 'PWD', 'GRADE', 'AUTH'], id: id
      });

      const newAccessToken = await signToken(jwtKey, '1h', {
        id: userInfo[0].ID,
        grade: userInfo[0].GRADE,
        auth: userInfo[0].AUTH
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
      db.setRefreshToken(id, newRefreshToken);
    }
  }
  catch (e) {
    return response.status(202).send({ result: false, mseeage: e });
  }
  finally{
    next();
  }
});

router.post('/game', game);
router.post('/game/test', insertTest);
router.get('/game/test', getTest);

export default router;