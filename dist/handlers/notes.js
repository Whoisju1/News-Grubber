"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNote = addNote;
exports.deleteNote = deleteNote;
exports.editNote = editNote;

var models = _interopRequireWildcard(require("../models"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function addNote(_x, _x2, _x3) {
  return _addNote.apply(this, arguments);
}

function _addNote() {
  _addNote = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var id, note, foundArticle, newNote;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            id = req.body.id;
            note = req.body.note;
            _context.next = 5;
            return models.Article.findById(id);

          case 5:
            foundArticle = _context.sent;
            _context.next = 8;
            return foundArticle.notes.push({
              note: note
            });

          case 8:
            _context.next = 10;
            return foundArticle.save();

          case 10:
            newNote = _context.sent;
            return _context.abrupt("return", res.status(200).json(newNote));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));
  return _addNote.apply(this, arguments);
}

function deleteNote(_x4, _x5, _x6) {
  return _deleteNote.apply(this, arguments);
}

function _deleteNote() {
  _deleteNote = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var userID, _req$body, articleID, noteID, foundArticle, reducedArticle;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userID = req.params.id;
            _req$body = req.body, articleID = _req$body.articleID, noteID = _req$body.noteID;
            _context2.next = 5;
            return models.Article.findById(articleID).where({
              user: userID
            });

          case 5:
            foundArticle = _context2.sent;
            _context2.next = 8;
            return foundArticle.notes.id(noteID).remove();

          case 8:
            _context2.next = 10;
            return foundArticle.save();

          case 10:
            reducedArticle = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(reducedArticle));

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", next(_context2.t0));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return _deleteNote.apply(this, arguments);
}

function editNote(_x7, _x8, _x9) {
  return _editNote.apply(this, arguments);
}

function _editNote() {
  _editNote = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    var userID, _req$body2, articleID, noteID, noteBody, foundArticle, updatedArticle;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userID = req.params.id;
            _req$body2 = req.body, articleID = _req$body2.articleID, noteID = _req$body2.noteID, noteBody = _req$body2.noteBody;
            _context3.next = 5;
            return models.Article.findById(articleID).where({
              user: userID
            });

          case 5:
            foundArticle = _context3.sent;
            foundArticle.notes.id(noteID).set({
              note: noteBody
            });
            _context3.next = 9;
            return foundArticle.save();

          case 9:
            updatedArticle = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(updatedArticle));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", next(_context3.t0));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 13]]);
  }));
  return _editNote.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9ub3Rlcy5qcyJdLCJuYW1lcyI6WyJhZGROb3RlIiwicmVxIiwicmVzIiwibmV4dCIsImlkIiwiYm9keSIsIm5vdGUiLCJtb2RlbHMiLCJBcnRpY2xlIiwiZmluZEJ5SWQiLCJmb3VuZEFydGljbGUiLCJub3RlcyIsInB1c2giLCJzYXZlIiwibmV3Tm90ZSIsInN0YXR1cyIsImpzb24iLCJkZWxldGVOb3RlIiwidXNlcklEIiwicGFyYW1zIiwiYXJ0aWNsZUlEIiwibm90ZUlEIiwid2hlcmUiLCJ1c2VyIiwicmVtb3ZlIiwicmVkdWNlZEFydGljbGUiLCJlZGl0Tm90ZSIsIm5vdGVCb2R5Iiwic2V0IiwidXBkYXRlZEFydGljbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7OztTQUVzQkEsTzs7Ozs7OzswQkFBZixpQkFBdUJDLEdBQXZCLEVBQTRCQyxHQUE1QixFQUFpQ0MsSUFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFS0MsWUFBQUEsRUFGTCxHQUVZSCxHQUFHLENBQUNJLElBRmhCLENBRUtELEVBRkw7QUFHS0UsWUFBQUEsSUFITCxHQUdjTCxHQUFHLENBQUNJLElBSGxCLENBR0tDLElBSEw7QUFBQTtBQUFBLG1CQUl3QkMsTUFBTSxDQUFDQyxPQUFQLENBQWVDLFFBQWYsQ0FBd0JMLEVBQXhCLENBSnhCOztBQUFBO0FBSUdNLFlBQUFBLFlBSkg7QUFBQTtBQUFBLG1CQUtHQSxZQUFZLENBQUNDLEtBQWIsQ0FBbUJDLElBQW5CLENBQXdCO0FBQUVOLGNBQUFBLElBQUksRUFBSkE7QUFBRixhQUF4QixDQUxIOztBQUFBO0FBQUE7QUFBQSxtQkFNbUJJLFlBQVksQ0FBQ0csSUFBYixFQU5uQjs7QUFBQTtBQU1HQyxZQUFBQSxPQU5IO0FBQUEsNkNBT0laLEdBQUcsQ0FBQ2EsTUFBSixDQUFXLEdBQVgsRUFBZ0JDLElBQWhCLENBQXFCRixPQUFyQixDQVBKOztBQUFBO0FBQUE7QUFBQTtBQUFBLDZDQVNJWCxJQUFJLGFBVFI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQVllYyxVOzs7Ozs7OzBCQUFmLGtCQUEwQmhCLEdBQTFCLEVBQStCQyxHQUEvQixFQUFvQ0MsSUFBcEM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRVNlLFlBQUFBLE1BRlQsR0FFb0JqQixHQUFHLENBQUNrQixNQUZ4QixDQUVLZixFQUZMO0FBQUEsd0JBRzJCSCxHQUFHLENBQUNJLElBSC9CLEVBR0tlLFNBSEwsYUFHS0EsU0FITCxFQUdnQkMsTUFIaEIsYUFHZ0JBLE1BSGhCO0FBQUE7QUFBQSxtQkFJd0JkLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxRQUFmLENBQXdCVyxTQUF4QixFQUFtQ0UsS0FBbkMsQ0FBeUM7QUFDbEVDLGNBQUFBLElBQUksRUFBRUw7QUFENEQsYUFBekMsQ0FKeEI7O0FBQUE7QUFJR1IsWUFBQUEsWUFKSDtBQUFBO0FBQUEsbUJBT0dBLFlBQVksQ0FBQ0MsS0FBYixDQUFtQlAsRUFBbkIsQ0FBc0JpQixNQUF0QixFQUE4QkcsTUFBOUIsRUFQSDs7QUFBQTtBQUFBO0FBQUEsbUJBUTBCZCxZQUFZLENBQUNHLElBQWIsRUFSMUI7O0FBQUE7QUFRR1ksWUFBQUEsY0FSSDtBQUFBLDhDQVNJdkIsR0FBRyxDQUFDYSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUJTLGNBQXJCLENBVEo7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBV0l0QixJQUFJLGNBWFI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7OztTQWNldUIsUTs7Ozs7OzswQkFBZixrQkFBd0J6QixHQUF4QixFQUE2QkMsR0FBN0IsRUFBa0NDLElBQWxDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVTZSxZQUFBQSxNQUZULEdBRW9CakIsR0FBRyxDQUFDa0IsTUFGeEIsQ0FFS2YsRUFGTDtBQUFBLHlCQUdxQ0gsR0FBRyxDQUFDSSxJQUh6QyxFQUdLZSxTQUhMLGNBR0tBLFNBSEwsRUFHZ0JDLE1BSGhCLGNBR2dCQSxNQUhoQixFQUd3Qk0sUUFIeEIsY0FHd0JBLFFBSHhCO0FBQUE7QUFBQSxtQkFJd0JwQixNQUFNLENBQUNDLE9BQVAsQ0FBZUMsUUFBZixDQUF3QlcsU0FBeEIsRUFBbUNFLEtBQW5DLENBQXlDO0FBQ2xFQyxjQUFBQSxJQUFJLEVBQUVMO0FBRDRELGFBQXpDLENBSnhCOztBQUFBO0FBSUdSLFlBQUFBLFlBSkg7QUFPSEEsWUFBQUEsWUFBWSxDQUFDQyxLQUFiLENBQW1CUCxFQUFuQixDQUFzQmlCLE1BQXRCLEVBQThCTyxHQUE5QixDQUFrQztBQUFFdEIsY0FBQUEsSUFBSSxFQUFFcUI7QUFBUixhQUFsQztBQVBHO0FBQUEsbUJBUzBCakIsWUFBWSxDQUFDRyxJQUFiLEVBVDFCOztBQUFBO0FBU0dnQixZQUFBQSxjQVRIO0FBQUEsOENBWUkzQixHQUFHLENBQUNhLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQmEsY0FBckIsQ0FaSjs7QUFBQTtBQUFBO0FBQUE7QUFBQSw4Q0FjSTFCLElBQUksY0FkUjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgbW9kZWxzIGZyb20gJy4uL21vZGVscyc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkTm90ZShyZXEsIHJlcywgbmV4dCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSByZXEuYm9keTtcclxuICAgIGNvbnN0IHsgbm90ZSB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCBmb3VuZEFydGljbGUgPSBhd2FpdCBtb2RlbHMuQXJ0aWNsZS5maW5kQnlJZChpZCk7XHJcbiAgICBhd2FpdCBmb3VuZEFydGljbGUubm90ZXMucHVzaCh7IG5vdGUgfSk7XHJcbiAgICBjb25zdCBuZXdOb3RlID0gYXdhaXQgZm91bmRBcnRpY2xlLnNhdmUoKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihuZXdOb3RlKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gbmV4dChlKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZU5vdGUocmVxLCByZXMsIG5leHQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBpZDogdXNlcklEIH0gPSByZXEucGFyYW1zO1xyXG4gICAgY29uc3QgeyBhcnRpY2xlSUQsIG5vdGVJRCB9ID0gcmVxLmJvZHk7XHJcbiAgICBjb25zdCBmb3VuZEFydGljbGUgPSBhd2FpdCBtb2RlbHMuQXJ0aWNsZS5maW5kQnlJZChhcnRpY2xlSUQpLndoZXJlKHtcclxuICAgICAgdXNlcjogdXNlcklEXHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGZvdW5kQXJ0aWNsZS5ub3Rlcy5pZChub3RlSUQpLnJlbW92ZSgpO1xyXG4gICAgY29uc3QgcmVkdWNlZEFydGljbGUgPSBhd2FpdCBmb3VuZEFydGljbGUuc2F2ZSgpO1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlZHVjZWRBcnRpY2xlKTtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gbmV4dChlKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGVkaXROb3RlKHJlcSwgcmVzLCBuZXh0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgaWQ6IHVzZXJJRCB9ID0gcmVxLnBhcmFtcztcclxuICAgIGNvbnN0IHsgYXJ0aWNsZUlELCBub3RlSUQsIG5vdGVCb2R5IH0gPSByZXEuYm9keTtcclxuICAgIGNvbnN0IGZvdW5kQXJ0aWNsZSA9IGF3YWl0IG1vZGVscy5BcnRpY2xlLmZpbmRCeUlkKGFydGljbGVJRCkud2hlcmUoe1xyXG4gICAgICB1c2VyOiB1c2VySURcclxuICAgIH0pO1xyXG4gICAgZm91bmRBcnRpY2xlLm5vdGVzLmlkKG5vdGVJRCkuc2V0KHsgbm90ZTogbm90ZUJvZHkgfSk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlZEFydGljbGUgPSBhd2FpdCBmb3VuZEFydGljbGUuc2F2ZSgpO1xyXG5cclxuICAgIC8vIGZvdW5kQXJ0aWNsZS5ub3Rlcy5pZChub3RlSUQpID1cclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih1cGRhdGVkQXJ0aWNsZSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIG5leHQoZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==