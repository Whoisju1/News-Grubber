import { Router } from 'express';
import { getScrappedArticles } from '../handlers/scrappedArticles';

const router = Router();

router.get('/', getScrappedArticles);

export default router;
