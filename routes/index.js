var express = require('express');
const sql = require("../dboperation");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/RoomSetup/', function(req, res, next) {
  var arr_rooms = [];
  res.redirect('/users/RoomSetup/');
});

module.exports = router;
