"use strict";

require("@babel/polyfill");

var _express = _interopRequireWildcard(require("express"));

var _fs = require("fs");

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _cors = _interopRequireDefault(require("cors"));

var _error = _interopRequireDefault(require("../handlers/error"));

var _auth = _interopRequireDefault(require("../routes/auth"));

var _articles = _interopRequireDefault(require("../routes/articles"));

var _notes = _interopRequireDefault(require("../routes/notes"));

var _home = _interopRequireDefault(require("../routes/home"));

require("../models");

var _auth2 = require("../middleware/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable import/first */
// load environment variables
require('dotenv').config();
/* eslint no-console: 0 */

/* eslint consistent-return: 0 */


var app = (0, _express["default"])();
var port = process.env.PORT || 3000; // enable cors

app.use((0, _cors["default"])());
app.use(_express["default"]["static"]("".concat(__dirname, "/../../public"))); // set view engine

app.engine('handlebars', (0, _expressHandlebars["default"])({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(function (req, res, next) {
  var now = Date().toString();
  var log = "".concat(now, " | ").concat(req.method, " : ").concat(req.url);
  console.log(log);
  (0, _fs.appendFile)('server.log', "".concat(log, "\n"), function (err) {
    if (err) console.error('Logging Error: ', err);
  });
  next();
}); // parse application/json

app.use((0, _express.json)()); // import routes

app.use('/api/auth', _auth["default"]);
app.use('/api/users/:id/articles', _auth2.loginRequired, _auth2.ensureCorrectUser, _articles["default"]);
app.use('/api/users/:id/notes', _auth2.loginRequired, _auth2.ensureCorrectUser, _notes["default"]);
app.use(_home["default"]); // make middleware to handle routes without handlers

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(_error["default"]);
app.listen(port, function () {
  return console.log("Server ready on http://localhost:".concat(port));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2ZXIvaW5kZXguanMiXSwibmFtZXMiOlsicmVxdWlyZSIsImNvbmZpZyIsImFwcCIsInBvcnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsInVzZSIsImV4cHJlc3MiLCJfX2Rpcm5hbWUiLCJlbmdpbmUiLCJkZWZhdWx0TGF5b3V0Iiwic2V0IiwicmVxIiwicmVzIiwibmV4dCIsIm5vdyIsIkRhdGUiLCJ0b1N0cmluZyIsImxvZyIsIm1ldGhvZCIsInVybCIsImNvbnNvbGUiLCJlcnIiLCJlcnJvciIsImF1dGhSb3V0ZXMiLCJsb2dpblJlcXVpcmVkIiwiZW5zdXJlQ29ycmVjdFVzZXIiLCJhcnRpY2xlUm91dGVzIiwibm90ZVJvdXRlcyIsImhvbWUiLCJFcnJvciIsInN0YXR1cyIsImVycm9ySGFuZGxlciIsImxpc3RlbiJdLCJtYXBwaW5ncyI6Ijs7QUFPQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBcEJBO0FBQ0E7QUFDQUEsT0FBTyxDQUFDLFFBQUQsQ0FBUCxDQUFrQkMsTUFBbEI7QUFFQTs7QUFDQTs7O0FBaUJBLElBQU1DLEdBQUcsR0FBRywwQkFBWjtBQUNBLElBQU1DLElBQUksR0FBR0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQVosSUFBb0IsSUFBakMsQyxDQUVBOztBQUNBSixHQUFHLENBQUNLLEdBQUosQ0FBUSx1QkFBUjtBQUNBTCxHQUFHLENBQUNLLEdBQUosQ0FBUUMsd0NBQWtCQyxTQUFsQixtQkFBUixFLENBRUE7O0FBQ0FQLEdBQUcsQ0FBQ1EsTUFBSixDQUFXLFlBQVgsRUFBeUIsbUNBQU87QUFBRUMsRUFBQUEsYUFBYSxFQUFFO0FBQWpCLENBQVAsQ0FBekI7QUFDQVQsR0FBRyxDQUFDVSxHQUFKLENBQVEsYUFBUixFQUF1QixZQUF2QjtBQUVBVixHQUFHLENBQUNLLEdBQUosQ0FBUSxVQUFDTSxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFvQjtBQUMxQixNQUFNQyxHQUFHLEdBQUdDLElBQUksR0FBR0MsUUFBUCxFQUFaO0FBQ0EsTUFBTUMsR0FBRyxhQUFNSCxHQUFOLGdCQUFlSCxHQUFHLENBQUNPLE1BQW5CLGdCQUErQlAsR0FBRyxDQUFDUSxHQUFuQyxDQUFUO0FBQ0FDLEVBQUFBLE9BQU8sQ0FBQ0gsR0FBUixDQUFZQSxHQUFaO0FBQ0Esc0JBQVcsWUFBWCxZQUE0QkEsR0FBNUIsU0FBcUMsVUFBQUksR0FBRyxFQUFJO0FBQzFDLFFBQUlBLEdBQUosRUFBU0QsT0FBTyxDQUFDRSxLQUFSLENBQWMsaUJBQWQsRUFBaUNELEdBQWpDO0FBQ1YsR0FGRDtBQUdBUixFQUFBQSxJQUFJO0FBQ0wsQ0FSRCxFLENBVUE7O0FBQ0FiLEdBQUcsQ0FBQ0ssR0FBSixDQUFRLG9CQUFSLEUsQ0FFQTs7QUFDQUwsR0FBRyxDQUFDSyxHQUFKLENBQVEsV0FBUixFQUFxQmtCLGdCQUFyQjtBQUNBdkIsR0FBRyxDQUFDSyxHQUFKLENBQ0UseUJBREYsRUFFRW1CLG9CQUZGLEVBR0VDLHdCQUhGLEVBSUVDLG9CQUpGO0FBTUExQixHQUFHLENBQUNLLEdBQUosQ0FBUSxzQkFBUixFQUFnQ21CLG9CQUFoQyxFQUErQ0Msd0JBQS9DLEVBQWtFRSxpQkFBbEU7QUFDQTNCLEdBQUcsQ0FBQ0ssR0FBSixDQUFRdUIsZ0JBQVIsRSxDQUVBOztBQUNBNUIsR0FBRyxDQUFDSyxHQUFKLENBQVEsVUFBQ00sR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBb0I7QUFDMUIsTUFBTVEsR0FBRyxHQUFHLElBQUlRLEtBQUosQ0FBVSxXQUFWLENBQVo7QUFDQVIsRUFBQUEsR0FBRyxDQUFDUyxNQUFKLEdBQWEsR0FBYjtBQUNBakIsRUFBQUEsSUFBSSxDQUFDUSxHQUFELENBQUo7QUFDRCxDQUpEO0FBTUFyQixHQUFHLENBQUNLLEdBQUosQ0FBUTBCLGlCQUFSO0FBRUEvQixHQUFHLENBQUNnQyxNQUFKLENBQVcvQixJQUFYLEVBQWlCO0FBQUEsU0FBTW1CLE9BQU8sQ0FBQ0gsR0FBUiw0Q0FBZ0RoQixJQUFoRCxFQUFOO0FBQUEsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvZmlyc3QgKi9cclxuLy8gbG9hZCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XHJcblxyXG4vKiBlc2xpbnQgbm8tY29uc29sZTogMCAqL1xyXG4vKiBlc2xpbnQgY29uc2lzdGVudC1yZXR1cm46IDAgKi9cclxuXHJcbmltcG9ydCAnQGJhYmVsL3BvbHlmaWxsJztcclxuaW1wb3J0IGV4cHJlc3MsIHsganNvbiB9IGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgeyBhcHBlbmRGaWxlIH0gZnJvbSAnZnMnO1xyXG5pbXBvcnQgZXhwaGJzIGZyb20gJ2V4cHJlc3MtaGFuZGxlYmFycyc7XHJcbmltcG9ydCBjb3JzIGZyb20gJ2NvcnMnO1xyXG5cclxuLy8gaW1wb3J0IHJvdXRlc1xyXG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gJy4uL2hhbmRsZXJzL2Vycm9yJztcclxuaW1wb3J0IGF1dGhSb3V0ZXMgZnJvbSAnLi4vcm91dGVzL2F1dGgnO1xyXG5pbXBvcnQgYXJ0aWNsZVJvdXRlcyBmcm9tICcuLi9yb3V0ZXMvYXJ0aWNsZXMnO1xyXG5pbXBvcnQgbm90ZVJvdXRlcyBmcm9tICcuLi9yb3V0ZXMvbm90ZXMnO1xyXG5pbXBvcnQgaG9tZSBmcm9tICcuLi9yb3V0ZXMvaG9tZSc7XHJcbmltcG9ydCAnLi4vbW9kZWxzJztcclxuaW1wb3J0IHsgbG9naW5SZXF1aXJlZCwgZW5zdXJlQ29ycmVjdFVzZXIgfSBmcm9tICcuLi9taWRkbGV3YXJlL2F1dGgnO1xyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5jb25zdCBwb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwO1xyXG5cclxuLy8gZW5hYmxlIGNvcnNcclxuYXBwLnVzZShjb3JzKCkpO1xyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKGAke19fZGlybmFtZX0vLi4vLi4vcHVibGljYCkpO1xyXG5cclxuLy8gc2V0IHZpZXcgZW5naW5lXHJcbmFwcC5lbmdpbmUoJ2hhbmRsZWJhcnMnLCBleHBoYnMoeyBkZWZhdWx0TGF5b3V0OiAnbWFpbicgfSkpO1xyXG5hcHAuc2V0KCd2aWV3IGVuZ2luZScsICdoYW5kbGViYXJzJyk7XHJcblxyXG5hcHAudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xyXG4gIGNvbnN0IG5vdyA9IERhdGUoKS50b1N0cmluZygpO1xyXG4gIGNvbnN0IGxvZyA9IGAke25vd30gfCAke3JlcS5tZXRob2R9IDogJHtyZXEudXJsfWA7XHJcbiAgY29uc29sZS5sb2cobG9nKTtcclxuICBhcHBlbmRGaWxlKCdzZXJ2ZXIubG9nJywgYCR7bG9nfVxcbmAsIGVyciA9PiB7XHJcbiAgICBpZiAoZXJyKSBjb25zb2xlLmVycm9yKCdMb2dnaW5nIEVycm9yOiAnLCBlcnIpO1xyXG4gIH0pO1xyXG4gIG5leHQoKTtcclxufSk7XHJcblxyXG4vLyBwYXJzZSBhcHBsaWNhdGlvbi9qc29uXHJcbmFwcC51c2UoanNvbigpKTtcclxuXHJcbi8vIGltcG9ydCByb3V0ZXNcclxuYXBwLnVzZSgnL2FwaS9hdXRoJywgYXV0aFJvdXRlcyk7XHJcbmFwcC51c2UoXHJcbiAgJy9hcGkvdXNlcnMvOmlkL2FydGljbGVzJyxcclxuICBsb2dpblJlcXVpcmVkLFxyXG4gIGVuc3VyZUNvcnJlY3RVc2VyLFxyXG4gIGFydGljbGVSb3V0ZXNcclxuKTtcclxuYXBwLnVzZSgnL2FwaS91c2Vycy86aWQvbm90ZXMnLCBsb2dpblJlcXVpcmVkLCBlbnN1cmVDb3JyZWN0VXNlciwgbm90ZVJvdXRlcyk7XHJcbmFwcC51c2UoaG9tZSk7XHJcblxyXG4vLyBtYWtlIG1pZGRsZXdhcmUgdG8gaGFuZGxlIHJvdXRlcyB3aXRob3V0IGhhbmRsZXJzXHJcbmFwcC51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XHJcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdOb3QgRm91bmQnKTtcclxuICBlcnIuc3RhdHVzID0gNDA0O1xyXG4gIG5leHQoZXJyKTtcclxufSk7XHJcblxyXG5hcHAudXNlKGVycm9ySGFuZGxlcik7XHJcblxyXG5hcHAubGlzdGVuKHBvcnQsICgpID0+IGNvbnNvbGUubG9nKGBTZXJ2ZXIgcmVhZHkgb24gaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9YCkpO1xyXG4iXX0=