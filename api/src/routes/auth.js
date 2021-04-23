import { Router } from 'express';
import { signUp, signIn, unregister, getCurrentUser } from '../handlers/auth';
import { loginRequired, userMustExistMiddleware } from '../middleware/auth';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.delete('/', loginRequired, userMustExistMiddleware, unregister);
router.get('/user', getCurrentUser);

export default router;
