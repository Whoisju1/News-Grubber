import { Router } from 'express';

import { addNote, deleteNote, editNote, getOneNote } from '../handlers/notes';

const router = Router({ mergeParams: true });

router
  .get('/:id', getOneNote)
  .post('/', addNote)
  .put('/:id', editNote)
  .delete('/:id', deleteNote);

export default router;
