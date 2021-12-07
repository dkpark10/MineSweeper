import { Router } from 'express';
import auth from './auth';
import { login } from './user/login';
import { logout } from './user/logout';
import { isExistUser, registUser } from './user/register';
import { getGameSize, getGame } from './game/get';

const router: Router = Router();

router.use('/auth', auth);

router.post('/login', login);
router.post('/logout', logout);

router.get('/user', isExistUser);
router.post('/user', registUser);

router.use('/game/:level', getGameSize, getGame);

export default router;