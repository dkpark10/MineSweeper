import { Router } from 'express';
import { isExistUser, register, testcheck } from './Register';

const router: Router = Router();

router.get('/user', isExistUser);
router.get('/pwdchk', testcheck);
router.post('/register', register);

export default router;