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


router.use(function (req, res, next) {
  var nodeSSPI = require('node-sspi');
  var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true,
  });
  nodeSSPIObj.authenticate(req, res, function (err) {
    res.finished || next();
  });
});

/* GET home page. */
router.get('/getUser', function(req, res, next) {
  var user = req.socket.user;
  res.status(200).send(req.connection.user);
});


/* GET home page. */
router.post('/SaveRoomSetup/', function(req, res, next) {
  var arr_rooms = [];
  var title = 'IPD Door Signage Setup';
  var result = sql.updateIPDRoomByID(roomID=req.body.rooms, userName=req.connection.user, Image1=req.body.IsIPDImage1, 
    Image2=req.body.IsIPDImage2, Image3=req.body.IsIPDImage3, Image4=req.body.IsIPDImage4, 
    Image5=req.body.IsIPDImage5, Image6=req.body.IsIPDImage6, Image7=req.body.IsIPDImage7, 
    Image8=req.body.IsIPDImage8).then(()=>{
      res.redirect('RoomSetup/');
    });
});
/* GET home page. */
router.get('/RoomSetup/', function(req, res, next) {
  var arr_rooms = [];
  var title = 'IPD Door Signage Setup';

  var result = sql.getAllIPDRooms().then((value) => {
    res.render('index', { title: title, arr_rooms: value, user:req.connection.user });
    // res.status(200).send(value);
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



module.exports = router;
