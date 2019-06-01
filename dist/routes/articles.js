"use strict";

var express = require('express');

var router = express.Router({
  mergeParams: true
});

var _require = require('../handlers/articles'),
    saveArticle = _require.saveArticle,
    getArticles = _require.getArticles,
    deleteArticle = _require.deleteArticle,
    getOneArticle = _require.getOneArticle;

router.route('/').post(saveArticle).get(getArticles)["delete"](deleteArticle);
router.route('/one').get(getOneArticle);
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXJ0aWNsZXMuanMiXSwibmFtZXMiOlsiZXhwcmVzcyIsInJlcXVpcmUiLCJyb3V0ZXIiLCJSb3V0ZXIiLCJtZXJnZVBhcmFtcyIsInNhdmVBcnRpY2xlIiwiZ2V0QXJ0aWNsZXMiLCJkZWxldGVBcnRpY2xlIiwiZ2V0T25lQXJ0aWNsZSIsInJvdXRlIiwicG9zdCIsImdldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUF2Qjs7QUFFQSxJQUFNQyxNQUFNLEdBQUdGLE9BQU8sQ0FBQ0csTUFBUixDQUFlO0FBQUVDLEVBQUFBLFdBQVcsRUFBRTtBQUFmLENBQWYsQ0FBZjs7ZUFPSUgsT0FBTyxDQUFDLHNCQUFELEM7SUFKVEksVyxZQUFBQSxXO0lBQ0FDLFcsWUFBQUEsVztJQUNBQyxhLFlBQUFBLGE7SUFDQUMsYSxZQUFBQSxhOztBQUdGTixNQUFNLENBQ0hPLEtBREgsQ0FDUyxHQURULEVBRUdDLElBRkgsQ0FFUUwsV0FGUixFQUdHTSxHQUhILENBR09MLFdBSFAsWUFJVUMsYUFKVjtBQU1BTCxNQUFNLENBQUNPLEtBQVAsQ0FBYSxNQUFiLEVBQXFCRSxHQUFyQixDQUF5QkgsYUFBekI7QUFFQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCWCxNQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XHJcblxyXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcih7IG1lcmdlUGFyYW1zOiB0cnVlIH0pO1xyXG5cclxuY29uc3Qge1xyXG4gIHNhdmVBcnRpY2xlLFxyXG4gIGdldEFydGljbGVzLFxyXG4gIGRlbGV0ZUFydGljbGUsXHJcbiAgZ2V0T25lQXJ0aWNsZVxyXG59ID0gcmVxdWlyZSgnLi4vaGFuZGxlcnMvYXJ0aWNsZXMnKTtcclxuXHJcbnJvdXRlclxyXG4gIC5yb3V0ZSgnLycpXHJcbiAgLnBvc3Qoc2F2ZUFydGljbGUpXHJcbiAgLmdldChnZXRBcnRpY2xlcylcclxuICAuZGVsZXRlKGRlbGV0ZUFydGljbGUpO1xyXG5cclxucm91dGVyLnJvdXRlKCcvb25lJykuZ2V0KGdldE9uZUFydGljbGUpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXI7XHJcbiJdfQ==