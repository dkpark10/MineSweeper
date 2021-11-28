import { Router } from 'express';
import auth from './auth';
import { login } from './user/login';
import { logout } from './user/logout';
import { isExistUser, registUser, test } from './user/register';

const router: Router = Router();

router.use('/auth', auth);

router.post('/login', login);
router.post('/logout', logout);

router.get('/user', isExistUser);
router.post('/user', registUser);

export default router;