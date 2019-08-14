import { Router } from 'express';

import {
  saveArticle,
  getArticles,
  deleteArticle,
  getOneArticle,
} from '../handlers/articles';

const router = Router({ mergeParams: true });

router
  .post('/', saveArticle)
  .get('/', getArticles)
  .get('/:id', getOneArticle)
  .delete('/:id', deleteArticle);

export default router;
