var express = require('express');
var router = express.Router();
const sql = require("../dboperation");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//test connection
router.get('/testconnect', function(req, res, next) {
  sql.getdata();
  res.send('test');
});

module.exports = router;
