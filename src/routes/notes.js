import { Router } from 'express';

import { addNote, deleteNote, editNote } from '../handlers/notes';

const router = Router({ mergeParams: true });

router
  .post('/:articleId', addNote)
  .put('/:id', editNote)
  .delete('/:id', deleteNote);

export default router;
