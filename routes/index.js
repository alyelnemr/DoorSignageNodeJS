var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/RoomSetup', function(req, res, next) {
  res.render('index', { title: 'Express', books: ["A", "B", "C"] });
});

module.exports = router;
