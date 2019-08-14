import { Router } from 'express';
import { signUp, signIn, unregister } from '../handlers/auth';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.delete('/unregister', unregister);

export default router;
