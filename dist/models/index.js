"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "Article", {
  enumerable: true,
  get: function get() {
    return _article["default"];
  }
});
Object.defineProperty(exports, "Note", {
  enumerable: true,
  get: function get() {
    return _note["default"];
  }
});

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("../config"));

var _user = _interopRequireDefault(require("./user"));

var _article = _interopRequireDefault(require("./article"));

var _note = _interopRequireDefault(require("./note"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].set('debug', true);

_mongoose["default"].Promise = Promise;
console.log("----------------- ".concat(_config["default"].mongoUri, " -------------------------"));

_mongoose["default"].connect(_config["default"].mongoUri, {
  keepAlive: true
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvaW5kZXguanMiXSwibmFtZXMiOlsibW9uZ29vc2UiLCJzZXQiLCJQcm9taXNlIiwiY29uc29sZSIsImxvZyIsImNvbmZpZyIsIm1vbmdvVXJpIiwiY29ubmVjdCIsImtlZXBBbGl2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBV0E7O0FBQ0E7O0FBQ0E7Ozs7QUFYQUEscUJBQVNDLEdBQVQsQ0FBYSxPQUFiLEVBQXNCLElBQXRCOztBQUNBRCxxQkFBU0UsT0FBVCxHQUFtQkEsT0FBbkI7QUFFQUMsT0FBTyxDQUFDQyxHQUFSLDZCQUFpQ0MsbUJBQU9DLFFBQXhDOztBQUVBTixxQkFBU08sT0FBVCxDQUFpQkYsbUJBQU9DLFFBQXhCLEVBQWtDO0FBQ2hDRSxFQUFBQSxTQUFTLEVBQUU7QUFEcUIsQ0FBbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZyc7XHJcblxyXG5tb25nb29zZS5zZXQoJ2RlYnVnJywgdHJ1ZSk7XHJcbm1vbmdvb3NlLlByb21pc2UgPSBQcm9taXNlO1xyXG5cclxuY29uc29sZS5sb2coYC0tLS0tLS0tLS0tLS0tLS0tICR7Y29uZmlnLm1vbmdvVXJpfSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tYCk7XHJcblxyXG5tb25nb29zZS5jb25uZWN0KGNvbmZpZy5tb25nb1VyaSwge1xyXG4gIGtlZXBBbGl2ZTogdHJ1ZVxyXG59KTtcclxuXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVXNlciB9IGZyb20gJy4vdXNlcic7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQXJ0aWNsZSB9IGZyb20gJy4vYXJ0aWNsZSc7XHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTm90ZSB9IGZyb20gJy4vbm90ZSc7XHJcbiJdfQ==