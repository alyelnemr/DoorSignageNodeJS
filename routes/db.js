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
router.get('/RoomSetup/', function(req, res, next) {
  var arr_rooms = [];
  var title = 'IPD Door Signage Setup';

  var result = sql.getAllIPDRooms().then((value) => {
    res.render('index', { title: title, arr_rooms: value });
    // res.status(200).send(value);
  });
});

/* GET home page. */
router.post('/SaveRoomSetup/', function(req, res, next) {
  var arr_rooms = [];
  var title = 'IPD Door Signage Setup';
  var result = sql.updateIPDRoomByID(roomID= req.body.rooms, Image1=req.body.IsIPDImage1, 
    Image2=req.body.IsIPDImage2, Image3=req.body.IsIPDImage3, Image4=req.body.IsIPDImage4, 
    Image5=req.body.IsIPDImage5, Image6=req.body.IsIPDImage6, Image7=req.body.IsIPDImage7, 
    Image8=req.body.IsIPDImage8).then(()=>{
      res.redirect('/api/RoomSetup/');
    });
});

/* GET home page. */
router.get('/GetRoomSetup/:id?', function(req, res, next) {
  const { id } = req.params;
  var arr_rooms = [];
  var title = 'IPD Door Signage Setup';
  var roomID = 0;

  if(!id && id != '' && id != 0) {
  }else {
    roomID = id;
  }
  if(!id && id != '' && id != 0) {
  }else {
    roomID = id;
  }

  var result = sql.getIPDRoomByID(roomID).then((value) => {
    res.status(200).send(value[0]);
  });
});

/* GET home page. */
router.get('/getIP', function(req, res, next) {
  const { ipaddress } = req.params;
  var all_add = req.socket.remoteAddress.split(':');
  var add = all_add[all_add.length - 1];
  res.status(200).send(add);
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
  // console.log("Calling from: " + ipaddress);
  var all_add = req.socket.remoteAddress.split(':');
  var add = all_add[all_add.length - 1];
  // console.log("Calling: getClinicByIPAddress from: " + add);
  var result = sql.getClinicByIPAddress(add).then((value) =>{
    if(value == undefined) {
      var result = sql.getClinicEmptyByIPAddress(add).then((value1) =>{
        // console.log("UNDEFINED: getClinicEmptyByIPAddress value1: " + value1);
        res.status(200).send(value1);
      });  
    }else {
      res.status(200).send(value);
    }
  });
});


/* GET home page. */
router.get('/getClinicByForceIPAddress/:ipaddress', function(req, res, next) {
  const { ipaddress } = req.params;
  // console.log("ipaddress force: " + ipaddress);
  var all_add = req.socket.remoteAddress.split(ipaddress);
  var add = all_add[all_add.length - 1];
  // console.log("Calling: getClinicByForceIPAddress from: " + ipaddress);
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


/* GET home page. */
router.get('/getEmptyImage', function(req, res, next) {
    imgPath = "\\\\hjh-queue-01\\door_signage_images\\empty.jpg";
    fs.access(imgPath, fs.constants.F_OK, err => {
      console.log(`${imgPath} ${err ? "does not exist" : "exists"}`);
    });
    fs.readFile(imgPath, function(err, content) {
      if (err) {
        res.writeHead(404, { "Content-type" : "text/html" });
        res.end(imgPath + "<h1> No Update </h1>");
      } else {
        res.writeHead(200, {"Content-type" : "image/png"});
        res.end(content);
      }
    });
});


/* GET home page. */
router.get('/getIPDImageByID/:id', function(req, res, next) {
    const { id } = req.params;
    imgPath = "\\\\hjh-queue-01\\door_signage_images\\ipd" + id + ".png";
    fs.access(imgPath, fs.constants.F_OK, err => {
      console.log(`${imgPath} ${err ? "does not exist" : "exists"}`);
    });
    fs.readFile(imgPath, function(err, content) {
      if (err) {
        res.writeHead(404, { "Content-type" : "text/html" });
        res.end(imgPath + "<h1> No Update </h1>");
      } else {
        res.writeHead(200, {"Content-type" : "image/png"});
        res.end(content);
      }
    });
});


/* GET home page. */
router.get('/getEmptyImageIPD', function(req, res, next) {
    imgPath = "\\\\hjh-queue-01\\door_signage_images\\empty_ipd.jpg";
    fs.access(imgPath, fs.constants.F_OK, err => {
      console.log(`${imgPath} ${err ? "does not exist" : "exists"}`);
    });
    fs.readFile(imgPath, function(err, content) {
      if (err) {
        res.writeHead(404, { "Content-type" : "text/html" });
        res.end(imgPath + "<h1> No Update </h1>");
      } else {
        res.writeHead(200, {"Content-type" : "image/png"});
        res.end(content);
      }
    });
});

module.exports = router;
