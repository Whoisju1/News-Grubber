import { Router } from 'express';

import {
  saveArticle,
  getArticles,
  deleteArticle,
  getOneArticle,
  getAllNotes,
} from '../handlers/articles';

const router = Router({ mergeParams: true });

router
  .post('/', saveArticle)
  .get('/:id/notes', getAllNotes)
  .get('/', getArticles)
  .get('/:id', getOneArticle)
  .delete('/:id', deleteArticle);

export default router;
