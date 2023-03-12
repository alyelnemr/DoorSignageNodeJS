const { json } = require('express');
var express = require('express');
var router = express.Router();
const sql = require("../dboperation");
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  sql.getdata();
  res.render('db', { title: 'SQL Connection' });
});

/* GET home page. */
router.get('/testold', function(req, res, next) {
  sql.getdata();
  res.render('db', { title: 'SQL Connection test' });
});

/* GET home page. */
router.get('/getDuration', function(req, res, next) {
  var result = sql.getDuration().then((value) =>{
    res.status(200).send(value);
  });
});

/* GET home page. */
router.get('/test22/:id', function(req, res, next) {
  const { id } = req.params;
  sql.getdata2(id).then((value) => {
    // console.log(value);
    res.status(200).send(value);
  });
});

/* GET home page. */
router.get('/getAllClinics', function(req, res, next) {
  var result = sql.getAllClinics().then((value) =>{
    res.status(200).send(value);
  });
});

/* GET home page. */
router.get('/getClinicByID/:id', function(req, res, next) {
  const { id } = req.params;
  var result = sql.getClinicByID(id).then((value) =>{
    res.status(200).send(value);
  });
});

/* GET home page. */
router.get('/getClinicByIPAddress/:ipaddress', function(req, res, next) {
  const { ipaddress } = req.params;
  console.log(req.socket.remoteAddress);
  var all_add = req.socket.remoteAddress.split(':');
  var add = all_add[all_add.length - 1];
  console.log(add);
  var result = sql.getClinicByIPAddress(add).then((value) =>{
    res.status(200).send(value);
  });
});


/* GET home page. */
router.get('/getClinicByForceIPAddress/:ipaddress', function(req, res, next) {
  const { ipaddress } = req.params;
  console.log(req.socket.remoteAddress);
  var all_add = req.socket.remoteAddress.split(ipaddress);
  var add = all_add[all_add.length - 1];
  console.log(add);
  var result = sql.getClinicByIPAddress(add).then((value) =>{
    res.status(200).send(value);
  });
});

/* GET home page. */
router.get('/getImageByID/:id', function(req, res, next) {
  const { id } = req.params;
  var result = sql.getImageByID(id).then((value) =>{
    imgPath = "\\\\HJH-REPSRV-03" + value;
    fs.access(imgPath, fs.constants.F_OK, err => {
      console.log(`${imgPath} ${err ? "does not exist" : "exists"}`);
    });
    fs.readFile(imgPath, function(err, content) {
      if (err) {
        res.writeHead(404, { "Content-type" : "text/html" });
        res.end(imgPath + "<h1> No Image </h1>");
      } else {
        res.writeHead(200, {"Content-type" : "image/png", 'aly-test': 'doct_name'});
        res.end(content);
      }
    });
  });
});

module.exports = router;
