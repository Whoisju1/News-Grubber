"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getArticleInfo = _interopRequireDefault(require("../utils/getArticleInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var article;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            console.log('---- home route ----');
            _context.next = 4;
            return _getArticleInfo["default"];

          case 4:
            article = _context.sent;
            console.log(JSON.stringify('articles: ', 2, article, null));
            return _context.abrupt("return", res.render('index', {
              article: article
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function home(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = home;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9ob21lLmpzIl0sIm5hbWVzIjpbImhvbWUiLCJyZXEiLCJyZXMiLCJuZXh0IiwiY29uc29sZSIsImxvZyIsInNjcmFwZWREYXRhIiwiYXJ0aWNsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZW5kZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBRyxpQkFBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxJQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVUQyxZQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUZTO0FBQUEsbUJBR2FDLDBCQUhiOztBQUFBO0FBR0hDLFlBQUFBLE9BSEc7QUFJVEgsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlHLElBQUksQ0FBQ0MsU0FBTCxDQUFlLFlBQWYsRUFBNkIsQ0FBN0IsRUFBZ0NGLE9BQWhDLEVBQXlDLElBQXpDLENBQVo7QUFKUyw2Q0FLRkwsR0FBRyxDQUFDUSxNQUFKLENBQVcsT0FBWCxFQUFvQjtBQUFFSCxjQUFBQSxPQUFPLEVBQVBBO0FBQUYsYUFBcEIsQ0FMRTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FPRkosSUFBSSxhQVBGOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQUpILElBQUk7QUFBQTtBQUFBO0FBQUEsR0FBVjs7ZUFXZUEsSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzY3JhcGVkRGF0YSBmcm9tICcuLi91dGlscy9nZXRBcnRpY2xlSW5mbyc7XHJcblxyXG5jb25zdCBob21lID0gYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnNvbGUubG9nKCctLS0tIGhvbWUgcm91dGUgLS0tLScpO1xyXG4gICAgY29uc3QgYXJ0aWNsZSA9IGF3YWl0IHNjcmFwZWREYXRhO1xyXG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoJ2FydGljbGVzOiAnLCAyLCBhcnRpY2xlLCBudWxsKSk7XHJcbiAgICByZXR1cm4gcmVzLnJlbmRlcignaW5kZXgnLCB7IGFydGljbGUgfSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIG5leHQoZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaG9tZTtcclxuIl19