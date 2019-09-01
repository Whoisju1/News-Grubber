import { model, Types } from 'mongoose';
import * as models from '../models';

const Article = model('Article');

export async function addNote(req, res, next) {
  try {
    const { articleId } = req.params;
    const { note } = req.body;
    // give an id to the note
    note._id = Types.ObjectId();
    const foundArticle = await models.Article.findById(articleId);
    await foundArticle.notes.push(note);
    await foundArticle.save();
    const [{ notes }] = await Article.aggregate([
      { $unwind: '$notes' },
      {
        $match: {
          'notes._id': note._id,
        },
      },
    ]);

    return res.status(200).json(notes);
  } catch (e) {
    return next(e);
  }
}
export async function deleteNote(req, res, next) {
  try {
    const { id: noteId } = req.params;
    const { article_id: articleId } = req.query;
    const foundArticle = await models.Article.findById(articleId);
    const deletedNote = foundArticle.notes.find(
      ({ _id }) => _id.toString() === noteId.toString()
    );
    await foundArticle.notes.id(noteId).remove();
    await foundArticle.save();

    return res.status(200).json(deletedNote);
  } catch (e) {
    return next(e);
  }
}
export async function editNote(req, res, next) {
  try {
    const { id: noteId } = req.params;
    const { article_id: articleId } = req.query;
    const { note } = req.body;
    const foundArticle = await models.Article.findById(articleId);
    foundArticle.notes.id(noteId).set(note);

    await foundArticle.save();

    const articles = await Article.aggregate([{ $unwind: '$notes' }]);

    const { notes: editedNotes } = articles.find(
      article => article._id.toString() === articleId.toString()
    );

    return res.status(200).json(editedNotes);
  } catch (e) {
    return next(e);
  }
}
