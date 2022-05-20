import { Router, Request, Response, NextFunction } from 'express';
import { record } from '../game/game.controller';
import { insertPost, deletePost } from '../posts/posts.controller';
import userverification from '../../../middlewares/userverification';

const router: Router = Router();

// 로그인 토큰검증 미들웨어
router.use(async (request: Request, response: Response, next: NextFunction) => {

  try {

    if (request.signedCookies['accessToken'] === undefined){
      next();
    }

    // Authorization 헤더
    const tempAccessToken = request.headers.authorization?.split(' ')[1];
    userverification(request, response, tempAccessToken as string);
  }
  catch (e) {
    return response.status(202).send({ result: false, mseeage: e });
  }
  finally{
    next();
  }
});

router.post('/posts', insertPost);
router.delete('/posts', deletePost);

router.get('/test', async(req:Request, res:Response) => {
  res.status(200).send('....');
});

export default router;