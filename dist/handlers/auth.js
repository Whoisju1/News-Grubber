"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignIn = SignIn;
exports.signUp = signUp;
exports.unregister = unregister;

var _jsonwebtoken = require("jsonwebtoken");

var _models = require("../models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function SignIn(_x, _x2, _x3) {
  return _SignIn.apply(this, arguments);
}

function _SignIn() {
  _SignIn = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var user, _user$id, id, _user$username, username, _user$profileImageURL, profileImageURL, isMatched, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.User.findOne({
              username: req.body.username
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", next({
              status: 401,
              message: 'User not found'
            }));

          case 6:
            _user$id = user.id, id = _user$id === void 0 ? null : _user$id, _user$username = user.username, username = _user$username === void 0 ? null : _user$username, _user$profileImageURL = user.profileImageURL, profileImageURL = _user$profileImageURL === void 0 ? null : _user$profileImageURL; // if user exits check to see if the password sent to the server matches

            _context.next = 9;
            return user.comparePassword(req.body.password);

          case 9:
            isMatched = _context.sent;

            if (!isMatched) {
              _context.next = 13;
              break;
            }

            token = (0, _jsonwebtoken.sign)({
              id: id,
              username: username,
              profileImageURL: profileImageURL
            }, process.env.SECRETE_KEY);
            return _context.abrupt("return", res.status(200).json({
              id: id,
              username: username,
              profileImageURL: profileImageURL,
              token: token
            }));

          case 13:
            return _context.abrupt("return", next({
              status: 400,
              message: 'Invalid password.'
            }));

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next({
              status: 400,
              message: 'Oops! Something went wrong.'
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return _SignIn.apply(this, arguments);
}

function signUp(_x4, _x5, _x6) {
  return _signUp.apply(this, arguments);
}

function _signUp() {
  _signUp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var user, id, username, profileImageURL, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _models.User.create(req.body);

          case 3:
            user = _context2.sent;
            id = user.id, username = user.username, profileImageURL = user.profileImageURL;
            token = (0, _jsonwebtoken.sign)({
              id: id,
              username: username,
              profileImageURL: profileImageURL
            }, process.env.SECRETE_KEY);
            return _context2.abrupt("return", res.status(200).json({
              id: id,
              username: username,
              profileImageURL: profileImageURL,
              token: token
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);

            if (_context2.t0.code === 11000) {
              _context2.t0.message = 'Sorry, that username is taken';
            }

            return _context2.abrupt("return", next({
              status: 400,
              message: _context2.t0.message
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return _signUp.apply(this, arguments);
}

function unregister(_x7, _x8, _x9) {
  return _unregister.apply(this, arguments);
}

function _unregister() {
  _unregister = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    var user, _ref, _ref$_id, id;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _models.User.findById(req.params.id);

          case 3:
            user = _context3.sent;
            _context3.next = 6;
            return user.remove();

          case 6:
            _ref = _context3.sent;
            _ref$_id = _ref._id;
            id = _ref$_id === void 0 ? null : _ref$_id;
            return _context3.abrupt("return", res.status(200).json({
              id: id,
              message: "You've been successfully unregistered"
            }));

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", next(_context3.t0));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return _unregister.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oYW5kbGVycy9hdXRoLmpzIl0sIm5hbWVzIjpbIlNpZ25JbiIsInJlcSIsInJlcyIsIm5leHQiLCJVc2VyIiwiZmluZE9uZSIsInVzZXJuYW1lIiwiYm9keSIsInVzZXIiLCJzdGF0dXMiLCJtZXNzYWdlIiwiaWQiLCJwcm9maWxlSW1hZ2VVUkwiLCJjb21wYXJlUGFzc3dvcmQiLCJwYXNzd29yZCIsImlzTWF0Y2hlZCIsInRva2VuIiwicHJvY2VzcyIsImVudiIsIlNFQ1JFVEVfS0VZIiwianNvbiIsInNpZ25VcCIsImNyZWF0ZSIsImNvZGUiLCJ1bnJlZ2lzdGVyIiwiZmluZEJ5SWQiLCJwYXJhbXMiLCJyZW1vdmUiLCJfaWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7U0FFc0JBLE07Ozs7Ozs7MEJBQWYsaUJBQXNCQyxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0NDLElBQWhDO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR2dCQyxhQUFLQyxPQUFMLENBQWE7QUFDOUJDLGNBQUFBLFFBQVEsRUFBRUwsR0FBRyxDQUFDTSxJQUFKLENBQVNEO0FBRFcsYUFBYixDQUhoQjs7QUFBQTtBQUdHRSxZQUFBQSxJQUhIOztBQUFBLGdCQU9FQSxJQVBGO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQU9lTCxJQUFJLENBQUM7QUFBRU0sY0FBQUEsTUFBTSxFQUFFLEdBQVY7QUFBZUMsY0FBQUEsT0FBTyxFQUFFO0FBQXhCLGFBQUQsQ0FQbkI7O0FBQUE7QUFBQSx1QkFRNERGLElBUjVELENBUUtHLEVBUkwsRUFRS0EsRUFSTCx5QkFRVSxJQVJWLDhCQVE0REgsSUFSNUQsQ0FRZ0JGLFFBUmhCLEVBUWdCQSxRQVJoQiwrQkFRMkIsSUFSM0IsMkNBUTRERSxJQVI1RCxDQVFpQ0ksZUFSakMsRUFRaUNBLGVBUmpDLHNDQVFtRCxJQVJuRCwwQkFTSDs7QUFURztBQUFBLG1CQVVxQkosSUFBSSxDQUFDSyxlQUFMLENBQXFCWixHQUFHLENBQUNNLElBQUosQ0FBU08sUUFBOUIsQ0FWckI7O0FBQUE7QUFVR0MsWUFBQUEsU0FWSDs7QUFBQSxpQkFZQ0EsU0FaRDtBQUFBO0FBQUE7QUFBQTs7QUFhS0MsWUFBQUEsS0FiTCxHQWFhLHdCQUNaO0FBQ0VMLGNBQUFBLEVBQUUsRUFBRkEsRUFERjtBQUVFTCxjQUFBQSxRQUFRLEVBQVJBLFFBRkY7QUFHRU0sY0FBQUEsZUFBZSxFQUFmQTtBQUhGLGFBRFksRUFNWkssT0FBTyxDQUFDQyxHQUFSLENBQVlDLFdBTkEsQ0FiYjtBQUFBLDZDQXFCTWpCLEdBQUcsQ0FBQ08sTUFBSixDQUFXLEdBQVgsRUFBZ0JXLElBQWhCLENBQXFCO0FBQzFCVCxjQUFBQSxFQUFFLEVBQUZBLEVBRDBCO0FBRTFCTCxjQUFBQSxRQUFRLEVBQVJBLFFBRjBCO0FBRzFCTSxjQUFBQSxlQUFlLEVBQWZBLGVBSDBCO0FBSTFCSSxjQUFBQSxLQUFLLEVBQUxBO0FBSjBCLGFBQXJCLENBckJOOztBQUFBO0FBQUEsNkNBNkJJYixJQUFJLENBQUM7QUFDVk0sY0FBQUEsTUFBTSxFQUFFLEdBREU7QUFFVkMsY0FBQUEsT0FBTyxFQUFFO0FBRkMsYUFBRCxDQTdCUjs7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FrQ0lQLElBQUksQ0FBQztBQUNWTSxjQUFBQSxNQUFNLEVBQUUsR0FERTtBQUVWQyxjQUFBQSxPQUFPLEVBQUU7QUFGQyxhQUFELENBbENSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7U0F5Q2VXLE07Ozs7Ozs7MEJBQWYsa0JBQXNCcEIsR0FBdEIsRUFBMkJDLEdBQTNCLEVBQWdDQyxJQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRWdCQyxhQUFLa0IsTUFBTCxDQUFZckIsR0FBRyxDQUFDTSxJQUFoQixDQUZoQjs7QUFBQTtBQUVHQyxZQUFBQSxJQUZIO0FBR0tHLFlBQUFBLEVBSEwsR0FHdUNILElBSHZDLENBR0tHLEVBSEwsRUFHU0wsUUFIVCxHQUd1Q0UsSUFIdkMsQ0FHU0YsUUFIVCxFQUdtQk0sZUFIbkIsR0FHdUNKLElBSHZDLENBR21CSSxlQUhuQjtBQUlHSSxZQUFBQSxLQUpILEdBSVcsd0JBQ1o7QUFDRUwsY0FBQUEsRUFBRSxFQUFGQSxFQURGO0FBRUVMLGNBQUFBLFFBQVEsRUFBUkEsUUFGRjtBQUdFTSxjQUFBQSxlQUFlLEVBQWZBO0FBSEYsYUFEWSxFQU1aSyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsV0FOQSxDQUpYO0FBQUEsOENBYUlqQixHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCVyxJQUFoQixDQUFxQjtBQUMxQlQsY0FBQUEsRUFBRSxFQUFGQSxFQUQwQjtBQUUxQkwsY0FBQUEsUUFBUSxFQUFSQSxRQUYwQjtBQUcxQk0sY0FBQUEsZUFBZSxFQUFmQSxlQUgwQjtBQUkxQkksY0FBQUEsS0FBSyxFQUFMQTtBQUowQixhQUFyQixDQWJKOztBQUFBO0FBQUE7QUFBQTs7QUFvQkgsZ0JBQUksYUFBSU8sSUFBSixLQUFhLEtBQWpCLEVBQXdCO0FBQ3RCLDJCQUFJYixPQUFKLEdBQWMsK0JBQWQ7QUFDRDs7QUF0QkUsOENBdUJJUCxJQUFJLENBQUM7QUFDVk0sY0FBQUEsTUFBTSxFQUFFLEdBREU7QUFFVkMsY0FBQUEsT0FBTyxFQUFFLGFBQUlBO0FBRkgsYUFBRCxDQXZCUjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHOzs7O1NBOEJlYyxVOzs7Ozs7OzBCQUFmLGtCQUEwQnZCLEdBQTFCLEVBQStCQyxHQUEvQixFQUFvQ0MsSUFBcEM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHZ0JDLGFBQUtxQixRQUFMLENBQWN4QixHQUFHLENBQUN5QixNQUFKLENBQVdmLEVBQXpCLENBSGhCOztBQUFBO0FBR0dILFlBQUFBLElBSEg7QUFBQTtBQUFBLG1CQUs4QkEsSUFBSSxDQUFDbUIsTUFBTCxFQUw5Qjs7QUFBQTtBQUFBO0FBQUEsNEJBS0tDLEdBTEw7QUFLVWpCLFlBQUFBLEVBTFYseUJBS2UsSUFMZjtBQUFBLDhDQU1JVCxHQUFHLENBQUNPLE1BQUosQ0FBVyxHQUFYLEVBQWdCVyxJQUFoQixDQUFxQjtBQUMxQlQsY0FBQUEsRUFBRSxFQUFGQSxFQUQwQjtBQUUxQkQsY0FBQUEsT0FBTyxFQUFFO0FBRmlCLGFBQXJCLENBTko7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBV0lQLElBQUksY0FYUjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2lnbiB9IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFNpZ25JbihyZXEsIHJlcywgbmV4dCkge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBmaW5kIHVzZXJcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoe1xyXG4gICAgICB1c2VybmFtZTogcmVxLmJvZHkudXNlcm5hbWVcclxuICAgIH0pO1xyXG4gICAgLy8gaWYgbm8gdXNlciBleGlzdHMgc2VuZCBiYWNrIGFuIGVycm9yIG1lc3NhZ2Ugb2YgXCJVc2VyIG5vdCBmb3VuZFwiXHJcbiAgICBpZiAoIXVzZXIpIHJldHVybiBuZXh0KHsgc3RhdHVzOiA0MDEsIG1lc3NhZ2U6ICdVc2VyIG5vdCBmb3VuZCcgfSk7XHJcbiAgICBjb25zdCB7IGlkID0gbnVsbCwgdXNlcm5hbWUgPSBudWxsLCBwcm9maWxlSW1hZ2VVUkwgPSBudWxsIH0gPSB1c2VyO1xyXG4gICAgLy8gaWYgdXNlciBleGl0cyBjaGVjayB0byBzZWUgaWYgdGhlIHBhc3N3b3JkIHNlbnQgdG8gdGhlIHNlcnZlciBtYXRjaGVzXHJcbiAgICBjb25zdCBpc01hdGNoZWQgPSBhd2FpdCB1c2VyLmNvbXBhcmVQYXNzd29yZChyZXEuYm9keS5wYXNzd29yZCk7XHJcbiAgICAvLyBpZiBwYXNzd29yZCBtYXRjaGVzIHNlbmQgYmFjayB1c2VyIGluZm9ybWF0aW9uIHdpdGggYSB0b2tlblxyXG4gICAgaWYgKGlzTWF0Y2hlZCkge1xyXG4gICAgICBjb25zdCB0b2tlbiA9IHNpZ24oXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQsXHJcbiAgICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICAgIHByb2ZpbGVJbWFnZVVSTFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJvY2Vzcy5lbnYuU0VDUkVURV9LRVlcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgICBpZCxcclxuICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICBwcm9maWxlSW1hZ2VVUkwsXHJcbiAgICAgICAgdG9rZW5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBzb21ldGhpbmcgZG9lc24ndCBtYXRjaCBzZW5kIGFuIGVycm9yXHJcbiAgICByZXR1cm4gbmV4dCh7XHJcbiAgICAgIHN0YXR1czogNDAwLFxyXG4gICAgICBtZXNzYWdlOiAnSW52YWxpZCBwYXNzd29yZC4nXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBuZXh0KHtcclxuICAgICAgc3RhdHVzOiA0MDAsXHJcbiAgICAgIG1lc3NhZ2U6ICdPb3BzISBTb21ldGhpbmcgd2VudCB3cm9uZy4nXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaWduVXAocmVxLCByZXMsIG5leHQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHJlcS5ib2R5KTtcclxuICAgIGNvbnN0IHsgaWQsIHVzZXJuYW1lLCBwcm9maWxlSW1hZ2VVUkwgfSA9IHVzZXI7XHJcbiAgICBjb25zdCB0b2tlbiA9IHNpZ24oXHJcbiAgICAgIHtcclxuICAgICAgICBpZCxcclxuICAgICAgICB1c2VybmFtZSxcclxuICAgICAgICBwcm9maWxlSW1hZ2VVUkxcclxuICAgICAgfSxcclxuICAgICAgcHJvY2Vzcy5lbnYuU0VDUkVURV9LRVlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcclxuICAgICAgaWQsXHJcbiAgICAgIHVzZXJuYW1lLFxyXG4gICAgICBwcm9maWxlSW1hZ2VVUkwsXHJcbiAgICAgIHRva2VuXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIGlmIChlcnIuY29kZSA9PT0gMTEwMDApIHtcclxuICAgICAgZXJyLm1lc3NhZ2UgPSAnU29ycnksIHRoYXQgdXNlcm5hbWUgaXMgdGFrZW4nO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5leHQoe1xyXG4gICAgICBzdGF0dXM6IDQwMCxcclxuICAgICAgbWVzc2FnZTogZXJyLm1lc3NhZ2VcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVucmVnaXN0ZXIocmVxLCByZXMsIG5leHQpIHtcclxuICB0cnkge1xyXG4gICAgLy8gZmluZCB1c2VyIGJ5IHNwZWNpZmllZCBpZFxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQocmVxLnBhcmFtcy5pZCk7XHJcbiAgICAvLyB0aGVuIGRlbGV0ZSB1c2VyIGZyb20gZGF0YWJhc2VcclxuICAgIGNvbnN0IHsgX2lkOiBpZCA9IG51bGwgfSA9IGF3YWl0IHVzZXIucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xyXG4gICAgICBpZCxcclxuICAgICAgbWVzc2FnZTogXCJZb3UndmUgYmVlbiBzdWNjZXNzZnVsbHkgdW5yZWdpc3RlcmVkXCJcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHJldHVybiBuZXh0KGUpO1xyXG4gIH1cclxufVxyXG4iXX0=