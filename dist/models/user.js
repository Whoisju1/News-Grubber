"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint func-names: 0 */
var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  profileImageURL: {
    type: String
  },
  articles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }]
});
userSchema.pre('save',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(next) {
    var hashedPassword;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (this.isModified('password')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next());

          case 3:
            _context.next = 5;
            return bcrypt.hash(this.password, 10);

          case 5:
            hashedPassword = _context.sent;
            this.password = hashedPassword;
            return _context.abrupt("return", next());

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", next(_context.t0));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

userSchema.methods.comparePassword =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(candidatePassword, next) {
    var isMatch;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return bcrypt.compare(candidatePassword, this.password);

          case 3:
            isMatch = _context2.sent;
            return _context2.abrupt("return", isMatch);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", next(_context2.t0));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 7]]);
  }));

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvdXNlci5qcyJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJiY3J5cHQiLCJTY2hlbWEiLCJ1c2VyU2NoZW1hIiwidXNlcm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ0cmltIiwibG93ZXJjYXNlIiwidW5pcXVlIiwicGFzc3dvcmQiLCJwcm9maWxlSW1hZ2VVUkwiLCJhcnRpY2xlcyIsIlR5cGVzIiwiT2JqZWN0SWQiLCJyZWYiLCJwcmUiLCJuZXh0IiwiaXNNb2RpZmllZCIsImhhc2giLCJoYXNoZWRQYXNzd29yZCIsIm1ldGhvZHMiLCJjb21wYXJlUGFzc3dvcmQiLCJjYW5kaWRhdGVQYXNzd29yZCIsImNvbXBhcmUiLCJpc01hdGNoIiwiVXNlciIsIm1vZGVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQSxJQUFNQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXhCOztBQUNBLElBQU1DLE1BQU0sR0FBR0QsT0FBTyxDQUFDLFFBQUQsQ0FBdEI7O0lBRVFFLE0sR0FBV0gsUSxDQUFYRyxNO0FBRVIsSUFBTUMsVUFBVSxHQUFHLElBQUlELE1BQUosQ0FBVztBQUM1QkUsRUFBQUEsUUFBUSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRUMsTUFERTtBQUVSQyxJQUFBQSxRQUFRLEVBQUUsSUFGRjtBQUdSQyxJQUFBQSxJQUFJLEVBQUUsSUFIRTtBQUlSQyxJQUFBQSxTQUFTLEVBQUUsSUFKSDtBQUtSQyxJQUFBQSxNQUFNLEVBQUU7QUFMQSxHQURrQjtBQVE1QkMsRUFBQUEsUUFBUSxFQUFFO0FBQ1JOLElBQUFBLElBQUksRUFBRUMsTUFERTtBQUVSQyxJQUFBQSxRQUFRLEVBQUUsSUFGRjtBQUdSQyxJQUFBQSxJQUFJLEVBQUU7QUFIRSxHQVJrQjtBQWE1QkksRUFBQUEsZUFBZSxFQUFFO0FBQ2ZQLElBQUFBLElBQUksRUFBRUM7QUFEUyxHQWJXO0FBZ0I1Qk8sRUFBQUEsUUFBUSxFQUFFLENBQ1I7QUFDRVIsSUFBQUEsSUFBSSxFQUFFTixRQUFRLENBQUNHLE1BQVQsQ0FBZ0JZLEtBQWhCLENBQXNCQyxRQUQ5QjtBQUVFQyxJQUFBQSxHQUFHLEVBQUU7QUFGUCxHQURRO0FBaEJrQixDQUFYLENBQW5CO0FBd0JBYixVQUFVLENBQUNjLEdBQVgsQ0FBZSxNQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBdUIsaUJBQWVDLElBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBRWQsS0FBS0MsVUFBTCxDQUFnQixVQUFoQixDQUZjO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQUdWRCxJQUFJLEVBSE07O0FBQUE7QUFBQTtBQUFBLG1CQUtVakIsTUFBTSxDQUFDbUIsSUFBUCxDQUFZLEtBQUtULFFBQWpCLEVBQTJCLEVBQTNCLENBTFY7O0FBQUE7QUFLYlUsWUFBQUEsY0FMYTtBQU1uQixpQkFBS1YsUUFBTCxHQUFnQlUsY0FBaEI7QUFObUIsNkNBT1pILElBQUksRUFQUTs7QUFBQTtBQUFBO0FBQUE7QUFBQSw2Q0FTWkEsSUFBSSxhQVRROztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXZCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWFBZixVQUFVLENBQUNtQixPQUFYLENBQW1CQyxlQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBQXFDLGtCQUFlQyxpQkFBZixFQUFrQ04sSUFBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVYakIsTUFBTSxDQUFDd0IsT0FBUCxDQUFlRCxpQkFBZixFQUFrQyxLQUFLYixRQUF2QyxDQUZXOztBQUFBO0FBRTNCZSxZQUFBQSxPQUYyQjtBQUFBLDhDQUcxQkEsT0FIMEI7O0FBQUE7QUFBQTtBQUFBO0FBQUEsOENBSzFCUixJQUFJLGNBTHNCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQXJDOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVNBLElBQU1TLElBQUksR0FBRzVCLFFBQVEsQ0FBQzZCLEtBQVQsQ0FBZSxNQUFmLEVBQXVCekIsVUFBdkIsQ0FBYjtBQUVBMEIsTUFBTSxDQUFDQyxPQUFQLEdBQWlCSCxJQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludCBmdW5jLW5hbWVzOiAwICovXHJcbmNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcclxuY29uc3QgYmNyeXB0ID0gcmVxdWlyZSgnYmNyeXB0Jyk7XHJcblxyXG5jb25zdCB7IFNjaGVtYSB9ID0gbW9uZ29vc2U7XHJcblxyXG5jb25zdCB1c2VyU2NoZW1hID0gbmV3IFNjaGVtYSh7XHJcbiAgdXNlcm5hbWU6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdHJpbTogdHJ1ZSxcclxuICAgIGxvd2VyY2FzZTogdHJ1ZSxcclxuICAgIHVuaXF1ZTogdHJ1ZVxyXG4gIH0sXHJcbiAgcGFzc3dvcmQ6IHtcclxuICAgIHR5cGU6IFN0cmluZyxcclxuICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgdHJpbTogdHJ1ZVxyXG4gIH0sXHJcbiAgcHJvZmlsZUltYWdlVVJMOiB7XHJcbiAgICB0eXBlOiBTdHJpbmdcclxuICB9LFxyXG4gIGFydGljbGVzOiBbXHJcbiAgICB7XHJcbiAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcclxuICAgICAgcmVmOiAnQXJ0aWNsZSdcclxuICAgIH1cclxuICBdXHJcbn0pO1xyXG5cclxudXNlclNjaGVtYS5wcmUoJ3NhdmUnLCBhc3luYyBmdW5jdGlvbihuZXh0KSB7XHJcbiAgdHJ5IHtcclxuICAgIGlmICghdGhpcy5pc01vZGlmaWVkKCdwYXNzd29yZCcpKSB7XHJcbiAgICAgIHJldHVybiBuZXh0KCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHRoaXMucGFzc3dvcmQsIDEwKTtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBoYXNoZWRQYXNzd29yZDtcclxuICAgIHJldHVybiBuZXh0KCk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gbmV4dChlcnIpO1xyXG4gIH1cclxufSk7XHJcblxyXG51c2VyU2NoZW1hLm1ldGhvZHMuY29tcGFyZVBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24oY2FuZGlkYXRlUGFzc3dvcmQsIG5leHQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgaXNNYXRjaCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNhbmRpZGF0ZVBhc3N3b3JkLCB0aGlzLnBhc3N3b3JkKTtcclxuICAgIHJldHVybiBpc01hdGNoO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIG5leHQoZXJyKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBVc2VyID0gbW9uZ29vc2UubW9kZWwoJ1VzZXInLCB1c2VyU2NoZW1hKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuIl19