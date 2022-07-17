import { Router } from 'express';
import authRouter from './auth';
import gameRouter from './game/index';
import {
  login,
  isExistUser,
  registUser,
  slientLogin,
} from './user/user.controller';

import {
  getPostListperPage,
  getPost,
  dropTest
} from './posts/posts.controller';

import {
  testRun
} from './testapi/test.controller';

import userRegistVerify from "../../middlewares/userregist_verify";

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/game', gameRouter);

router.post('/login', login);
router.post('/slientlogin', slientLogin);

router.get('/user', isExistUser);
router.post('/user', userRegistVerify, registUser);

router.get('/posts', getPostListperPage);
router.get('/posts/:postid', getPost);

// router.get('/game/:level', getGameInfo, getUserGameSearch);

router.get('/droptest', dropTest);
router.get('/test/:testid', testRun);

export default router;