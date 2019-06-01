"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _home = _interopRequireDefault(require("../handlers/home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.route('/').get(_home["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvaG9tZS5qcyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJyb3V0ZSIsImdldCIsImhvbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BLE1BQU0sR0FBRyxzQkFBZjtBQUVBQSxNQUFNLENBQUNDLEtBQVAsQ0FBYSxHQUFiLEVBQWtCQyxHQUFsQixDQUFzQkMsZ0JBQXRCO2VBRWVILE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IGhvbWUgZnJvbSAnLi4vaGFuZGxlcnMvaG9tZSc7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBSb3V0ZXIoKTtcclxuXHJcbnJvdXRlci5yb3V0ZSgnLycpLmdldChob21lKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcclxuIl19