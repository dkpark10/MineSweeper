import { Router } from 'express';
import { isExistid, register } from './Register';
const router: Router = Router();

router.post('/register', isExistid, register);

export default router;