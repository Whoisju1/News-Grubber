import { Router } from 'express';
import { signUp, SignIn, unregister } from '../handlers/auth';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', SignIn);
router.delete('/id/:id/unregister', unregister);

export default router;
