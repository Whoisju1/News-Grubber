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
exports.deleteNote = async (req, res, next) => {}; // eslint-disable-line no-unused-vars
exports.editNote = async (req, res, next) => {}; // eslint-disable-line no-unused-vars
