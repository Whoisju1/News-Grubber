"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveArticle = saveArticle;
exports.getArticles = getArticles;
exports.deleteArticle = deleteArticle;
exports.getOneArticle = getOneArticle;

var _models = require("../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// make methods for manipulating article data
// make method to save article
function saveArticle(_x, _x2, _x3) {
  return _saveArticle.apply(this, arguments);
}

function _saveArticle() {
  _saveArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var userID, _req$body, url, title, _req$body$subTitle, subTitle, _req$body$image, image, author, publicationDate, article, count, foundUser, foundArticle;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // get id from params
            userID = req.params.id; // get data from req.body

            _req$body = req.body, url = _req$body.url, title = _req$body.title, _req$body$subTitle = _req$body.subTitle, subTitle = _req$body$subTitle === void 0 ? null : _req$body$subTitle, _req$body$image = _req$body.image, image = _req$body$image === void 0 ? null : _req$body$image, author = _req$body.author, publicationDate = _req$body.publicationDate; // create message

            _context.next = 5;
            return _models.Article.create({
              url: url,
              title: title,
              subTitle: subTitle,
              image: image,
              author: author,
              publicationDate: publicationDate
            });

          case 5:
            article = _context.sent;
            _context.next = 8;
            return _models.Article.count({
              url: url
            }).where({
              user: userID
            });

          case 8:
            count = _context.sent;

            if (!count) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", next({
              status: 400,
              message: 'This article is already in your collection.'
            }));

          case 11:
            article.user = userID;
            article.save(); // find user and push push article id into it's reference

            _context.next = 15;
            return _models.User.findById(userID);

          case 15:
            foundUser = _context.sent;
            foundUser.articles.push(article._id);
            _context.next = 19;
            return foundUser.save();

          case 19:
            _context.next = 21;
            return _models.Article.findById(article._id).populate('user', {
              username: true
            });

          case 21:
            foundArticle = _context.sent;
            return _context.abrupt("return", res.status(200).json(foundArticle));

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](0);

            if (!(_context.t0.code === 11000)) {
              _context.next = 29;
              break;
            }

            return _context.abrupt("return", next({
              status: 400,
              message: 'This article is already in your collection.'
            }));

          case 29:
            return _context.abrupt("return", next(_context.t0));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 25]]);
  }));
  return _saveArticle.apply(this, arguments);
}

function getArticles(_x4, _x5, _x6) {
  return _getArticles.apply(this, arguments);
}

function _getArticles() {
  _getArticles = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var id, articles;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _models.Article.find({}).where({
              user: id
            });

          case 4:
            articles = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(articles));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", next(_context2.t0));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getArticles.apply(this, arguments);
}

function deleteArticle(_x7, _x8, _x9) {
  return _deleteArticle.apply(this, arguments);
}

function _deleteArticle() {
  _deleteArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    var id, foundArticle;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            // get article id from the request body
            id = req.body.id; // find the article and then remove it

            _context3.next = 4;
            return _models.Article.findById(id);

          case 4:
            foundArticle = _context3.sent;
            _context3.next = 7;
            return foundArticle.remove();

          case 7:
            return _context3.abrupt("return", res.status(200).json('Article deleted'));

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", next(_context3.t0));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _deleteArticle.apply(this, arguments);
}

function getOneArticle(_x10, _x11, _x12) {
  return _getOneArticle.apply(this, arguments);
}

function _getOneArticle() {
  _getOneArticle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res, next) {
    var foundArticle;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _models.Article.findById(req.body.id).where({
              user: req.params.id
            });

          case 3:
            foundArticle = _context4.sent;
            return _context4.abrupt("return", res.status(200).json(foundArticle));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", next(_context4.t0));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _getOneArticle.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9hcnRpY2xlcy5qcyJdLCJuYW1lcyI6WyJzYXZlQXJ0aWNsZSIsInJlcSIsInJlcyIsIm5leHQiLCJ1c2VySUQiLCJwYXJhbXMiLCJpZCIsImJvZHkiLCJ1cmwiLCJ0aXRsZSIsInN1YlRpdGxlIiwiaW1hZ2UiLCJhdXRob3IiLCJwdWJsaWNhdGlvbkRhdGUiLCJBcnRpY2xlIiwiY3JlYXRlIiwiYXJ0aWNsZSIsImNvdW50Iiwid2hlcmUiLCJ1c2VyIiwic3RhdHVzIiwibWVzc2FnZSIsInNhdmUiLCJVc2VyIiwiZmluZEJ5SWQiLCJmb3VuZFVzZXIiLCJhcnRpY2xlcyIsInB1c2giLCJfaWQiLCJwb3B1bGF0ZSIsInVzZXJuYW1lIiwiZm91bmRBcnRpY2xlIiwianNvbiIsImNvZGUiLCJnZXRBcnRpY2xlcyIsImZpbmQiLCJkZWxldGVBcnRpY2xlIiwicmVtb3ZlIiwiZ2V0T25lQXJ0aWNsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBOzs7Ozs7QUFDQTtBQUVBO1NBQ3NCQSxXOzs7Ozs7OzBCQUFmLGlCQUEyQkMsR0FBM0IsRUFBZ0NDLEdBQWhDLEVBQXFDQyxJQUFyQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFSDtBQUNZQyxZQUFBQSxNQUhULEdBR29CSCxHQUFHLENBQUNJLE1BSHhCLENBR0tDLEVBSEwsRUFLSDs7QUFMRyx3QkFhQ0wsR0FBRyxDQUFDTSxJQWJMLEVBT0RDLEdBUEMsYUFPREEsR0FQQyxFQVFEQyxLQVJDLGFBUURBLEtBUkMsaUNBU0RDLFFBVEMsRUFTREEsUUFUQyxtQ0FTVSxJQVRWLG1EQVVEQyxLQVZDLEVBVURBLEtBVkMsZ0NBVU8sSUFWUCxvQkFXREMsTUFYQyxhQVdEQSxNQVhDLEVBWURDLGVBWkMsYUFZREEsZUFaQyxFQWVIOztBQWZHO0FBQUEsbUJBZ0JtQkMsZ0JBQVFDLE1BQVIsQ0FBZTtBQUNuQ1AsY0FBQUEsR0FBRyxFQUFIQSxHQURtQztBQUVuQ0MsY0FB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RUFBakIsQ0FMeEI7O0FBQUE7QUFLR3lCLFlBQUFBLFlBTEg7QUFBQTtBQUFBLG1CQU1HQSxZQUFZLENBQUNNLE1BQWIsRUFOSDs7QUFBQTtBQUFBLDhDQU9JbkMsR0FBRyxDQUFDa0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JZLElBQWhCLENBQXFCLGlCQUFyQixDQVBKOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQVNJN0IsSUFBSSxjQVRSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0FhZW1DLGE7Ozs7Ozs7MEJBQWYsa0JBQTZCckMsR0FBN0IsRUFBa0NDLEdBQWxDLEVBQXVDQyxJQUF2QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRXdCVyxnQkFBUVUsUUFBUixDQUFpQnZCLEdBQUcsQ0FBQ00sSUFBSixDQUFTRCxFQUExQixFQUE4QlksS0FBOUIsQ0FBb0M7QUFDN0RDLGNBQUFBLElBQUksRUFBRWxCLEdBQUcsQ0FBQ0ksTUFBSixDQUFXQztBQUQ0QyxhQUFwQyxDQUZ4Qjs7QUFBQTtBQUVHeUIsWUFBQUEsWUFGSDtBQUFBLDhDQUtJN0IsR0FBRyxDQUFDa0IsTUFBSixDQUFXLEdBQVgsRUFBZ0JZLElBQWhCLENBQXFCRCxZQUFyQixDQUxKOztBQUFBO0FBQUE7QUFBQTtBQUFBLDhDQU9JNUIsSUFBSSxjQVBSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQgbm8tdW5kZXJzY29yZS1kYW5nbGU6IDAgKi9cclxuaW1wb3J0IHsgQXJ0aWNsZSwgVXNlciB9IGZyb20gJy4uL21vZGVscyc7XHJcbi8vIG1ha2UgbWV0aG9kcyBmb3IgbWFuaXB1bGF0aW5nIGFydGljbGUgZGF0YVxyXG5cclxuLy8gbWFrZSBtZXRob2QgdG8gc2F2ZSBhcnRpY2xlXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQXJ0aWNsZShyZXEsIHJlcywgbmV4dCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBnZXQgaWQgZnJvbSBwYXJhbXNcclxuICAgIGNvbnN0IHsgaWQ6IHVzZXJJRCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICAvLyBnZXQgZGF0YSBmcm9tIHJlcS5ib2R5XHJcbiAgICBjb25zdCB7XHJcbiAgICAgIHVybCxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIHN1YlRpdGxlID0gbnVsbCxcclxuICAgICAgaW1hZ2UgPSBudWxsLFxyXG4gICAgICBhdXRob3IsXHJcbiAgICAgIHB1YmxpY2F0aW9uRGF0ZVxyXG4gICAgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIC8vIGNyZWF0ZSBtZXNzYWdlXHJcbiAgICBjb25zdCBhcnRpY2xlID0gYXdhaXQgQXJ0aWNsZS5jcmVhdGUoe1xyXG4gICAgICB1cmwsXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBzdWJUaXRsZSxcclxuICAgICAgaW1hZ2UsXHJcbiAgICAgIGF1dGhvcixcclxuICAgICAgcHVibGljYXRpb25EYXRlXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyByZXR1cm4gYW4gZXJyb3IgbWVzc2FnZSBpZiBhcnRpY2xlIGFscmVhZHkgZXhpc3RzXHJcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IEFydGljbGUuY291bnQoeyB1cmwgfSkud2hlcmUoeyB1c2VyOiB1c2VySUQgfSk7XHJcbiAgICBpZiAoY291bnQpXHJcbiAgICAgIHJldHVybiBuZXh0KHtcclxuICAgICAgICBzdGF0dXM6IDQwMCxcclxuICAgICAgICBtZXNzYWdlOiAnVGhpcyBhcnRpY2xlIGlzIGFscmVhZHkgaW4geW91ciBjb2xsZWN0aW9uLidcclxuICAgICAgfSk7XHJcblxyXG4gICAgYXJ0aWNsZS51c2VyID0gdXNlcklEO1xyXG4gICAgYXJ0aWNsZS5zYXZlKCk7XHJcblxyXG4gICAgLy8gZmluZCB1c2VyIGFuZCBwdXNoIHB1c2ggYXJ0aWNsZSBpZCBpbnRvIGl0J3MgcmVmZXJlbmNlXHJcbiAgICBjb25zdCBmb3VuZFVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHVzZXJJRCk7XHJcbiAgICBmb3VuZFVzZXIuYXJ0aWNsZXMucHVzaChhcnRpY2xlLl9pZCk7XHJcbiAgICBhd2FpdCBmb3VuZFVzZXIuc2F2ZSgpO1xyXG5cclxuICAgIC8vIGZpbmQgYXJ0aWNsZSBhbmQgcmVmZXJlbmNlZCB1c2VyIGFuZCBzZW5kIGl0IHRvIHRoZSBjbGllbnRcclxuICAgIGNvbnN0IGZvdW5kQXJ0aWNsZSA9IGF3YWl0IEFydGljbGUuZmluZEJ5SWQoYXJ0aWNsZS5faWQpLnBvcHVsYXRlKCd1c2VyJywge1xyXG4gICAgICB1c2VybmFtZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oZm91bmRBcnRpY2xlKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKGVycm9yLmNvZGUgPT09IDExMDAwKSB7XHJcbiAgICAgIHJldHVybiBuZXh0KHtcclxuICAgICAgICBzdGF0dXM6IDQwMCxcclxuICAgICAgICBtZXNzYWdlOiAnVGhpcyBhcnRpY2xlIGlzIGFscmVhZHkgaW4geW91ciBjb2xsZWN0aW9uLidcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV4dChlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXJ0aWNsZXMocmVxLCByZXMsIG5leHQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGNvbnN0IGFydGljbGVzID0gYXdhaXQgQXJ0aWNsZS5maW5kKHt9KS53aGVyZSh7IHVzZXI6IGlkIH0pO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKGFydGljbGVzKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gbmV4dChlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVBcnRpY2xlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgdHJ5IHtcclxuICAgIC8vIGdldCBhcnRpY2xlIGlkIGZyb20gdGhlIHJlcXVlc3QgYm9keVxyXG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLmJvZHk7XHJcbiAgICAvLyBmaW5kIHRoZSBhcnRpY2xlIGFuZCB0aGVuIHJlbW92ZSBpdFxyXG4gICAgY29uc3QgZm91bmRBcnRpY2xlID0gYXdhaXQgQXJ0aWNsZS5maW5kQnlJZChpZCk7XHJcbiAgICBhd2FpdCBmb3VuZEFydGljbGUucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oJ0FydGljbGUgZGVsZXRlZCcpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBuZXh0KGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE9uZUFydGljbGUocmVxLCByZXMsIG5leHQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgZm91bmRBcnRpY2xlID0gYXdhaXQgQXJ0aWNsZS5maW5kQnlJZChyZXEuYm9keS5pZCkud2hlcmUoe1xyXG4gICAgICB1c2VyOiByZXEucGFyYW1zLmlkXHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihmb3VuZEFydGljbGUpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBuZXh0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=