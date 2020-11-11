import { Router } from 'express';
import home from '../handlers/home';

const router = Router();

router.route('/').get(home);

export default router;
