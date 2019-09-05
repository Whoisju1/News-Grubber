import { Router } from 'express';
import { getScrappedArticles } from '../handlers/newArticles';

const router = Router();

router.get('/', getScrappedArticles);

export default router;
