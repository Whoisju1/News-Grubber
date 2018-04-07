const db = require('../models');

exports.addNote = async (req, res, next) => {
  try {
    const { id } = req.body;
    const { note } = req.body;
    const foundArticle = await db.Article.findById(id);
    await foundArticle.notes.push({ note });
    const newNote = await foundArticle.save();
    return res.status(200).json(newNote);
  } catch (e) {
    return next(e);
  }
};
exports.deleteNote = async (req, res, next) => {
  try {
    const { id: userID } = req.params;
    const { articleID, noteID } = req.body;
    const foundArticle = await db.Article.findById(articleID).where({ user: userID });
    await foundArticle.notes.id(noteID).remove();
    const reducedArticle = await foundArticle.save();
    return res.status(200).json(reducedArticle);
  } catch (e) {
    return next(e);
  }
};
exports.editNote = async (req, res, next) => {}; // eslint-disable-line no-unused-vars
