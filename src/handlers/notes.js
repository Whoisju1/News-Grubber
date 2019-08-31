import { model, Types } from 'mongoose';
import * as models from '../models';
import { getUserFromToken } from '../utils/getUserFromToken';

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
    const token = req.headers.authorization.split(' ')[1];
    const { id } = getUserFromToken(token);
    const { articleID, noteID } = req.body;
    const foundArticle = await models.Article.findById(articleID).where({
      user: id,
    });
    await foundArticle.notes.id(noteID).remove();
    const reducedArticle = await foundArticle.save();
    return res.status(200).json(reducedArticle);
  } catch (e) {
    return next(e);
  }
}
export async function editNote(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { id } = getUserFromToken(token);
    const { articleID, noteID, noteBody } = req.body;
    const foundArticle = await models.Article.findById(articleID).where({
      user: id,
    });
    foundArticle.notes.id(noteID).set({ note: noteBody });

    const updatedArticle = await foundArticle.save();

    // foundArticle.notes.id(noteID) =
    return res.status(200).json(updatedArticle);
  } catch (e) {
    return next(e);
  }
}
