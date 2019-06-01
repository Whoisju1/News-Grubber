import { Router } from 'express';

import {
  saveArticle,
  getArticles,
  deleteArticle,
  getOneArticle,
} from '../handlers/articles';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(saveArticle)
  .get(getArticles)
  .delete(deleteArticle);

router.route('/one').get(getOneArticle);

export default router;
