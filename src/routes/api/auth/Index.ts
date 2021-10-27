import { Router, Request, Response, NextFunction } from 'express';
import { isExistUser, userRegist, test } from './register';
import { login } from './login';

const router: Router = Router();

router.get('/user', isExistUser);
router.post('/register', userRegist);
router.post('/login', login);
router.get('/test', test);


export default router;