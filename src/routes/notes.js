import { Router } from 'express';

import { addNote, deleteNote, editNote } from '../handlers/notes';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(addNote)
  .put(editNote)
  .delete(deleteNote);

export default router;
