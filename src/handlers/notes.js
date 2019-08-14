import * as models from '../models';
import { getUserFromToken } from '../utils/getUserFromToken';

export async function addNote(req, res, next) {
  try {
    const { id } = req.body;
    const { note } = req.body;
    const foundArticle = await models.Article.findById(id);
    await foundArticle.notes.push({ note });
    const newNote = await foundArticle.save();
    return res.status(200).json(newNote);
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
