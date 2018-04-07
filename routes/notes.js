const express = require('express');

const router = express.Router({ mergeParams: true });

const { addNote, deleteNote, editNote } = require('../handlers/notes');

router.route('/')
  .post(addNote)
  .put(editNote)
  .delete(deleteNote);

module.exports = router;
