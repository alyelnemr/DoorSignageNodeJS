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
  var title = 'IPD Door Signage Setup';

  var result = sql.getAllIPDRooms().then((value) => {
    res.render('index', { title: title, arr_rooms: value, user:req });
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
      res.redirect('/RoomSetup/');
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
