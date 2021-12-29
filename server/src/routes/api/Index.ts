import { Router } from 'express';
import auth from './auth';
import {
  login,
  logout,
  isExistUser,
  registUser
} from './user/user.controller';

import {
  getGameSize,
  getGame,
  getUserGame
} from './game/game.controller';

import {
  getPostListperPage,
  getPost,
  updatePostView,
  dropTest
} from './posts/posts.controller';

const router: Router = Router();

router.use('/auth', auth);

router.post('/login', login);
router.post('/logout', logout);

router.get('/user', isExistUser);
router.post('/user', registUser);

router.get('/posts', getPostListperPage);
router.get('/posts/:postid', getPost);
router.patch('/posts/:postid', updatePostView);

router.get('/game', getUserGame);
router.get('/game/:level', getGameSize, getGame);

router.get('/droptest', dropTest);

export default router;