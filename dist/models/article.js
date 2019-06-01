"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _user = require("./user");

var _note = _interopRequireDefault(require("./note"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Schema = _mongoose["default"].Schema;
var articleSchema = new Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subTitle: {
    type: String,
    trim: true
  },
  image: String,
  author: {
    name: {
      type: String,
      trim: true
    },
    authorInfo: {
      type: String,
      trim: true
    }
  },
  publicationDate: {
    date: String,
    time: String
  },
  notes: [_note["default"]],
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}); // eslint-disable-next-line func-names

articleSchema.pre('remove',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(next) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _user.findById)(this.user);

          case 3:
            user = _context.sent;
            user.articles.remove(this.id);
            _context.next = 7;
            return user.save();

          case 7:
            return _context.abrupt("return", _context.sent);

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
var Article = (0, _mongoose.model)('Article', articleSchema);
var _default = Article;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYXJ0aWNsZS5qcyJdLCJuYW1lcyI6WyJTY2hlbWEiLCJtb25nb29zZSIsImFydGljbGVTY2hlbWEiLCJ1cmwiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ0cmltIiwidGl0bGUiLCJzdWJUaXRsZSIsImltYWdlIiwiYXV0aG9yIiwibmFtZSIsImF1dGhvckluZm8iLCJwdWJsaWNhdGlvbkRhdGUiLCJkYXRlIiwidGltZSIsIm5vdGVzIiwibm90ZVNjaGVtYSIsInVzZXIiLCJfU2NoZW1hIiwiVHlwZXMiLCJPYmplY3RJZCIsInJlZiIsInByZSIsIm5leHQiLCJhcnRpY2xlcyIsInJlbW92ZSIsImlkIiwic2F2ZSIsIkFydGljbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVRQSxNLEdBQVdDLG9CLENBQVhELE07QUFFUixJQUFNRSxhQUFhLEdBQUcsSUFBSUYsTUFBSixDQUFXO0FBQy9CRyxFQUFBQSxHQUFHLEVBQUU7QUFDSEMsSUFBQUEsSUFBSSxFQUFFQyxNQURIO0FBRUhDLElBQUFBLFFBQVEsRUFBRSxJQUZQO0FBR0hDLElBQUFBLElBQUksRUFBRTtBQUhILEdBRDBCO0FBTS9CQyxFQUFBQSxLQUFLLEVBQUU7QUFDTEosSUFBQUEsSUFBSSxFQUFFQyxNQUREO0FBRUxDLElBQUFBLFFBQVEsRUFBRSxJQUZMO0FBR0xDLElBQUFBLElBQUksRUFBRTtBQUhELEdBTndCO0FBVy9CRSxFQUFBQSxRQUFRLEVBQUU7QUFDUkwsSUFBQUEsSUFBSSxFQUFFQyxNQURFO0FBRVJFLElBQUFBLElBQUksRUFBRTtBQUZFLEdBWHFCO0FBZS9CRyxFQUFBQSxLQUFLLEVBQUVMLE1BZndCO0FBZ0IvQk0sRUFBQUEsTUFBTSxFQUFFO0FBQ05DLElBQUFBLElBQUksRUFBRTtBQUNKUixNQUFBQSxJQUFJLEVBQUVDLE1BREY7QUFFSkUsTUFBQUEsSUFBSSxFQUFFO0FBRkYsS0FEQTtBQUtOTSxJQUFBQSxVQUFVLEVBQUU7QUFDVlQsTUFBQUEsSUFBSSxFQUFFQyxNQURJO0FBRVZFLE1BQUFBLElBQUksRUFBRTtBQUZJO0FBTE4sR0FoQnVCO0FBMEIvQk8sRUFBQUEsZUFBZSxFQUFFO0FBQ2ZDLElBQUFBLElBQUksRUFBRVYsTUFEUztBQUVmVyxJQUFBQSxJQUFJLEVBQUVYO0FBRlMsR0ExQmM7QUE4Qi9CWSxFQUFBQSxLQUFLLEVBQUUsQ0FBQ0MsZ0JBQUQsQ0E5QndCO0FBK0IvQkMsRUFBQUEsSUFBSSxFQUFFO0FBQ0pmLElBQUFBLElBQUksRUFBRWdCLGlCQUFRQyxLQUFSLENBQWNDLFFBRGhCO0FBRUpDLElBQUFBLEdBQUcsRUFBRTtBQUZEO0FBL0J5QixDQUFYLENBQXRCLEMsQ0FxQ0E7O0FBQ0FyQixhQUFhLENBQUNzQixHQUFkLENBQWtCLFFBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQkFBNEIsaUJBQWVDLElBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdMLG9CQUFTLEtBQUtOLElBQWQsQ0FISzs7QUFBQTtBQUdsQkEsWUFBQUEsSUFIa0I7QUFJeEJBLFlBQUFBLElBQUksQ0FBQ08sUUFBTCxDQUFjQyxNQUFkLENBQXFCLEtBQUtDLEVBQTFCO0FBSndCO0FBQUEsbUJBS1hULElBQUksQ0FBQ1UsSUFBTCxFQUxXOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUEsNkNBT2pCSixJQUFJLGFBUGE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBNUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXQSxJQUFNSyxPQUFPLEdBQUcscUJBQU0sU0FBTixFQUFpQjVCLGFBQWpCLENBQWhCO2VBRWU0QixPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IFNjaGVtYSBhcyBfU2NoZW1hLCBtb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcclxuaW1wb3J0IHsgZmluZEJ5SWQgfSBmcm9tICcuL3VzZXInO1xyXG5pbXBvcnQgbm90ZVNjaGVtYSBmcm9tICcuL25vdGUnO1xyXG5cclxuY29uc3QgeyBTY2hlbWEgfSA9IG1vbmdvb3NlO1xyXG5cclxuY29uc3QgYXJ0aWNsZVNjaGVtYSA9IG5ldyBTY2hlbWEoe1xyXG4gIHVybDoge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB0cmltOiB0cnVlXHJcbiAgfSxcclxuICB0aXRsZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB0cmltOiB0cnVlXHJcbiAgfSxcclxuICBzdWJUaXRsZToge1xyXG4gICAgdHlwZTogU3RyaW5nLFxyXG4gICAgdHJpbTogdHJ1ZVxyXG4gIH0sXHJcbiAgaW1hZ2U6IFN0cmluZyxcclxuICBhdXRob3I6IHtcclxuICAgIG5hbWU6IHtcclxuICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICB0cmltOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgYXV0aG9ySW5mbzoge1xyXG4gICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgIHRyaW06IHRydWVcclxuICAgIH1cclxuICB9LFxyXG4gIHB1YmxpY2F0aW9uRGF0ZToge1xyXG4gICAgZGF0ZTogU3RyaW5nLFxyXG4gICAgdGltZTogU3RyaW5nXHJcbiAgfSxcclxuICBub3RlczogW25vdGVTY2hlbWFdLFxyXG4gIHVzZXI6IHtcclxuICAgIHR5cGU6IF9TY2hlbWEuVHlwZXMuT2JqZWN0SWQsXHJcbiAgICByZWY6ICdVc2VyJ1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xyXG5hcnRpY2xlU2NoZW1hLnByZSgncmVtb3ZlJywgYXN5bmMgZnVuY3Rpb24obmV4dCkge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cclxuICB0cnkge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IGZpbmRCeUlkKHRoaXMudXNlcik7XHJcbiAgICB1c2VyLmFydGljbGVzLnJlbW92ZSh0aGlzLmlkKTtcclxuICAgIHJldHVybiBhd2FpdCB1c2VyLnNhdmUoKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBuZXh0KGVycik7XHJcbiAgfVxyXG59KTtcclxuXHJcbmNvbnN0IEFydGljbGUgPSBtb2RlbCgnQXJ0aWNsZScsIGFydGljbGVTY2hlbWEpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJ0aWNsZTtcclxuIl19