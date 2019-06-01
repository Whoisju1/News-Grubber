"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _request = _interopRequireDefault(require("request"));

var _cheerio = require("cheerio");

var _scrapeHomepage = _interopRequireDefault(require("./scrapeHomepage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = new Promise(function (resolve, reject) {
  (0, _scrapeHomepage["default"])().then(function (data) {
    var finalList = []; // eslint-disable-next-line consistent-return

    var addNewData = function addNewData(list) {
      var _list = _toArray(list),
          first = _list[0],
          remaining = _list.slice(1);
      /*
          if all the data have been processed
          in which first will not be falsy since
          there is nothing left in the array to process
        */


      if (!first) return resolve(finalList); // get url from articleInfo

      var url = first.url; // scrape article page

      (0, _request["default"])(url, function (err, response, body) {
        if (err) reject(err);
        var $ = (0, _cheerio.load)(body);
        var profileInfo = $('[section="author"]'); // get author info

        var name = profileInfo.find('.author > span').text() || null;
        var authorInfo = profileInfo.find('.author').attr('href') || null; // get date & time of publication

        var date = profileInfo.find('.formattedDate').text() || null;
        var time = profileInfo.find('.formattedTime').text() || null;
        var author = {
          name: name,
          authorInfo: authorInfo
        };
        var publicationDate = {
          date: date,
          time: time
        }; // put author and time into one object

        var authorAndDate = {
          author: author,
          publicationDate: publicationDate
        }; // if there is still call the addData function with remaining data
        // eslint-disable-next-line no-console

        console.log(_objectSpread({}, first, authorAndDate));
        finalList.push(_objectSpread({}, first, authorAndDate));
        if (remaining) addNewData(remaining);
      });
    };

    addNewData(data);
  });
});

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZXRBcnRpY2xlSW5mby5qcyJdLCJuYW1lcyI6WyJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJkYXRhIiwiZmluYWxMaXN0IiwiYWRkTmV3RGF0YSIsImxpc3QiLCJmaXJzdCIsInJlbWFpbmluZyIsInVybCIsImVyciIsInJlc3BvbnNlIiwiYm9keSIsIiQiLCJwcm9maWxlSW5mbyIsIm5hbWUiLCJmaW5kIiwidGV4dCIsImF1dGhvckluZm8iLCJhdHRyIiwiZGF0ZSIsInRpbWUiLCJhdXRob3IiLCJwdWJsaWNhdGlvbkRhdGUiLCJhdXRob3JBbmREYXRlIiwiY29uc29sZSIsImxvZyIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztlQUVlLElBQUlBLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDOUMsb0NBQWlCQyxJQUFqQixDQUFzQixVQUFBQyxJQUFJLEVBQUk7QUFDNUIsUUFBTUMsU0FBUyxHQUFHLEVBQWxCLENBRDRCLENBRTVCOztBQUNBLFFBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUFDLElBQUksRUFBSTtBQUFBLDJCQUNLQSxJQURMO0FBQUEsVUFDbEJDLEtBRGtCO0FBQUEsVUFDUkMsU0FEUTtBQUV6Qjs7Ozs7OztBQUtBLFVBQUksQ0FBQ0QsS0FBTCxFQUFZLE9BQU9QLE9BQU8sQ0FBQ0ksU0FBRCxDQUFkLENBUGEsQ0FTekI7O0FBVHlCLFVBVWpCSyxHQVZpQixHQVVURixLQVZTLENBVWpCRSxHQVZpQixFQVl6Qjs7QUFDQSwrQkFBUUEsR0FBUixFQUFhLFVBQUNDLEdBQUQsRUFBTUMsUUFBTixFQUFnQkMsSUFBaEIsRUFBeUI7QUFDcEMsWUFBSUYsR0FBSixFQUFTVCxNQUFNLENBQUNTLEdBQUQsQ0FBTjtBQUNULFlBQU1HLENBQUMsR0FBRyxtQkFBS0QsSUFBTCxDQUFWO0FBQ0EsWUFBTUUsV0FBVyxHQUFHRCxDQUFDLENBQUMsb0JBQUQsQ0FBckIsQ0FIb0MsQ0FLcEM7O0FBQ0EsWUFBTUUsSUFBSSxHQUFHRCxXQUFXLENBQUNFLElBQVosQ0FBaUIsZ0JBQWpCLEVBQW1DQyxJQUFuQyxNQUE2QyxJQUExRDtBQUNBLFlBQU1DLFVBQVUsR0FBR0osV0FBVyxDQUFDRSxJQUFaLENBQWlCLFNBQWpCLEVBQTRCRyxJQUE1QixDQUFpQyxNQUFqQyxLQUE0QyxJQUEvRCxDQVBvQyxDQVNwQzs7QUFDQSxZQUFNQyxJQUFJLEdBQUdOLFdBQVcsQ0FBQ0UsSUFBWixDQUFpQixnQkFBakIsRUFBbUNDLElBQW5DLE1BQTZDLElBQTFEO0FBQ0EsWUFBTUksSUFBSSxHQUFHUCxXQUFXLENBQUNFLElBQVosQ0FBaUIsZ0JBQWpCLEVBQW1DQyxJQUFuQyxNQUE2QyxJQUExRDtBQUVBLFlBQU1LLE1BQU0sR0FBRztBQUFFUCxVQUFBQSxJQUFJLEVBQUpBLElBQUY7QUFBUUcsVUFBQUEsVUFBVSxFQUFWQTtBQUFSLFNBQWY7QUFDQSxZQUFNSyxlQUFlLEdBQUc7QUFBRUgsVUFBQUEsSUFBSSxFQUFKQSxJQUFGO0FBQVFDLFVBQUFBLElBQUksRUFBSkE7QUFBUixTQUF4QixDQWRvQyxDQWdCcEM7O0FBQ0EsWUFBTUcsYUFBYSxHQUFHO0FBQUVGLFVBQUFBLE1BQU0sRUFBTkEsTUFBRjtBQUFVQyxVQUFBQSxlQUFlLEVBQWZBO0FBQVYsU0FBdEIsQ0FqQm9DLENBbUJwQztBQUNBOztBQUNBRSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsbUJBQWlCbkIsS0FBakIsRUFBMkJpQixhQUEzQjtBQUNBcEIsUUFBQUEsU0FBUyxDQUFDdUIsSUFBVixtQkFBb0JwQixLQUFwQixFQUE4QmlCLGFBQTlCO0FBQ0EsWUFBSWhCLFNBQUosRUFBZUgsVUFBVSxDQUFDRyxTQUFELENBQVY7QUFDaEIsT0F4QkQ7QUF5QkQsS0F0Q0Q7O0FBd0NBSCxJQUFBQSxVQUFVLENBQUNGLElBQUQsQ0FBVjtBQUNELEdBNUNEO0FBNkNELENBOUNjLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcclxuaW1wb3J0IHsgbG9hZCB9IGZyb20gJ2NoZWVyaW8nO1xyXG5pbXBvcnQgbGF0ZXN0QXJ0aWNsZXMgZnJvbSAnLi9zY3JhcGVIb21lcGFnZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgbGF0ZXN0QXJ0aWNsZXMoKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgY29uc3QgZmluYWxMaXN0ID0gW107XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cclxuICAgIGNvbnN0IGFkZE5ld0RhdGEgPSBsaXN0ID0+IHtcclxuICAgICAgY29uc3QgW2ZpcnN0LCAuLi5yZW1haW5pbmddID0gbGlzdDtcclxuICAgICAgLypcclxuICAgICAgICAgIGlmIGFsbCB0aGUgZGF0YSBoYXZlIGJlZW4gcHJvY2Vzc2VkXHJcbiAgICAgICAgICBpbiB3aGljaCBmaXJzdCB3aWxsIG5vdCBiZSBmYWxzeSBzaW5jZVxyXG4gICAgICAgICAgdGhlcmUgaXMgbm90aGluZyBsZWZ0IGluIHRoZSBhcnJheSB0byBwcm9jZXNzXHJcbiAgICAgICAgKi9cclxuICAgICAgaWYgKCFmaXJzdCkgcmV0dXJuIHJlc29sdmUoZmluYWxMaXN0KTtcclxuXHJcbiAgICAgIC8vIGdldCB1cmwgZnJvbSBhcnRpY2xlSW5mb1xyXG4gICAgICBjb25zdCB7IHVybCB9ID0gZmlyc3Q7XHJcblxyXG4gICAgICAvLyBzY3JhcGUgYXJ0aWNsZSBwYWdlXHJcbiAgICAgIHJlcXVlc3QodXJsLCAoZXJyLCByZXNwb25zZSwgYm9keSkgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHJlamVjdChlcnIpO1xyXG4gICAgICAgIGNvbnN0ICQgPSBsb2FkKGJvZHkpO1xyXG4gICAgICAgIGNvbnN0IHByb2ZpbGVJbmZvID0gJCgnW3NlY3Rpb249XCJhdXRob3JcIl0nKTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGF1dGhvciBpbmZvXHJcbiAgICAgICAgY29uc3QgbmFtZSA9IHByb2ZpbGVJbmZvLmZpbmQoJy5hdXRob3IgPiBzcGFuJykudGV4dCgpIHx8IG51bGw7XHJcbiAgICAgICAgY29uc3QgYXV0aG9ySW5mbyA9IHByb2ZpbGVJbmZvLmZpbmQoJy5hdXRob3InKS5hdHRyKCdocmVmJykgfHwgbnVsbDtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGRhdGUgJiB0aW1lIG9mIHB1YmxpY2F0aW9uXHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IHByb2ZpbGVJbmZvLmZpbmQoJy5mb3JtYXR0ZWREYXRlJykudGV4dCgpIHx8IG51bGw7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHByb2ZpbGVJbmZvLmZpbmQoJy5mb3JtYXR0ZWRUaW1lJykudGV4dCgpIHx8IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGF1dGhvciA9IHsgbmFtZSwgYXV0aG9ySW5mbyB9O1xyXG4gICAgICAgIGNvbnN0IHB1YmxpY2F0aW9uRGF0ZSA9IHsgZGF0ZSwgdGltZSB9O1xyXG5cclxuICAgICAgICAvLyBwdXQgYXV0aG9yIGFuZCB0aW1lIGludG8gb25lIG9iamVjdFxyXG4gICAgICAgIGNvbnN0IGF1dGhvckFuZERhdGUgPSB7IGF1dGhvciwgcHVibGljYXRpb25EYXRlIH07XHJcblxyXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIHN0aWxsIGNhbGwgdGhlIGFkZERhdGEgZnVuY3Rpb24gd2l0aCByZW1haW5pbmcgZGF0YVxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXHJcbiAgICAgICAgY29uc29sZS5sb2coeyAuLi5maXJzdCwgLi4uYXV0aG9yQW5kRGF0ZSB9KTtcclxuICAgICAgICBmaW5hbExpc3QucHVzaCh7IC4uLmZpcnN0LCAuLi5hdXRob3JBbmREYXRlIH0pO1xyXG4gICAgICAgIGlmIChyZW1haW5pbmcpIGFkZE5ld0RhdGEocmVtYWluaW5nKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZE5ld0RhdGEoZGF0YSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXX0=