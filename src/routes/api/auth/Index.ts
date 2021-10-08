import { Router } from 'express';
import { isExistUser, register } from './Register';

const router: Router = Router();

router.get('/user', isExistUser);
router.post('/register', register);

export default router;