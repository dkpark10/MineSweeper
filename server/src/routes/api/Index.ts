import { Router } from 'express';
import auth from './auth';
import {
  login,
  isExistUser,
  registUser,
  slientLogin,
} from './user/user.controller';

import {
  getGameInfo,
  getUserGame,
  getUserGameSearch
} from './game/game.controller';

import {
  getPostListperPage,
  getPost,
  updatePostView,
  dropTest
} from './posts/posts.controller';

import {
  testRun
} from './testapi/test.controller';

const router: Router = Router();

router.use('/auth', auth);

router.post('/login', login);
router.post('/slientlogin', slientLogin);

router.get('/user', isExistUser);
router.post('/user', registUser);

router.get('/posts', getPostListperPage);
router.get('/posts/:postid', getPost);
router.patch('/posts/:postid', updatePostView);

router.get('/game', getUserGame);
router.get('/game/:level', getGameInfo, getUserGameSearch);

router.get('/droptest', dropTest);
router.get('/test/:testid', testRun);

export default router;