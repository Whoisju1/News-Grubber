import { Router } from 'express';
import { signUp, signIn, unregister, getCurrentUser } from '../handlers/auth';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.delete('/unregister', unregister);
router.get('/user', getCurrentUser);

export default router;
