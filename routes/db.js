const { json } = require('express');
var express = require('express');
var router = express.Router();
const sql = require("../dboperation");
const fs = require("fs");

/* GET home page. */
router.get('/getDuration', function(req, res, next) {
  var result = sql.getDuration().then((value) =>{
    res.status(200).send(value);
  });
});

/* GET home page. */
router.get('/getConfiguration', function(req, res, next) {
  var result = sql.getConfiguration().then((value) =>{
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
  var all_add = req.socket.remoteAddress.split(':');
  var add = all_add[all_add.length - 1];
  console.log("Calling: getClinicByIPAddress from: " + add);
  var result = sql.getClinicByIPAddress(add).then((value) =>{
    // console.log("Calling: getClinicByIPAddress value: " + value);
    res.status(200).send(value);
  });
});


/* GET home page. */
router.get('/getClinicByForceIPAddress/:ipaddress', function(req, res, next) {
  const { ipaddress } = req.params;
  console.log("ipaddress force: " + ipaddress);
  var all_add = req.socket.remoteAddress.split(ipaddress);
  var add = all_add[all_add.length - 1];
  console.log("Calling: getClinicByForceIPAddress from: " + ipaddress);
  var result = sql.getClinicByIPAddress(ipaddress).then((value) =>{
    // console.log("Calling: getClinicByForceIPAddress value: " + value);
    res.status(200).send(value);
  });
});

/* GET home page. */
router.get('/getImageByID/:id', function(req, res, next) {
  const { id } = req.params;
  var result = sql.getImageByID(id).then((value) =>{
    imgPath = "\\\\hjh-queue-01\\door_signage_images\\" + value;
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

/* GET home page. */
router.get('/getImageEmptyByID/:id', function(req, res, next) {
  const { id } = req.params;
  var result = sql.getImageEmptyByID(id).then((value) =>{
    imgPath = "\\\\hjh-queue-01\\door_signage_images\\" + value;
    fs.access(imgPath, fs.constants.F_OK, err => {
      // console.log(`${imgPath} ${err ? "does not exist" : "exists"}`);
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


/* GET home page. */
router.get('/getUpdate', function(req, res, next) {
    imgPath = "\\\\hjh-queue-01\\door_signage_apk\\update.apk";
    fs.access(imgPath, fs.constants.F_OK, err => {
      console.log(`${imgPath} ${err ? "does not exist" : "exists"}`);
    });
    fs.readFile(imgPath, function(err, content) {
      if (err) {
        res.writeHead(404, { "Content-type" : "text/html" });
        res.end(imgPath + "<h1> No Update </h1>");
      } else {
        res.writeHead(200, {"Content-type" : "application/vnd.android.package-archive", 'aly-test': 'doct_name'});
        res.end(content);
      }
    });
});

module.exports = router;
