var config = require("./dbconfig");
const sql = require("mssql");
const sql2 = require("msnodesqlv8");
 

async function getAllData() {
  try {
    var query = `SELECT       *
      FROM tblDoctorSchedule`;
    let pool = await sql.connect(config.config_queue);
    let res = await pool.request().query(query,);
    return res.recordsets[0];
  } catch (error) {
    console.log(" db-error :" + error);
  }
}


async function getIPDRoomByID(roomID=0) {
  try {
    var query = `select *
    from aly_vwGetIPDRoomByID
    where id = @RoomID`;
    let pool = await sql.connect(config.config_queue);
    let res = await pool.request().input('RoomID', sql.Int, roomID).query(query,);
    return res.recordsets[0];
  } catch (error) {
    console.log(" db-error :" + error);
  }
}


async function updateIPDRoomByID(roomID=0, userName='', Image1=0,Image2=0,Image3=0,Image4=0,Image5=0,Image6=0,Image7=0,Image8=0,) {
  try {
    
    let pool = await sql.connect(config.config_queue);
    let res = await pool.request()
                            .input('RoomID', sql.Int, roomID)
                            .input('Image1', sql.Int, Image1)
                            .input('Image2', sql.Int, Image2)
                            .input('Image3', sql.Int, Image3)
                            .input('Image4', sql.Int, Image4)
                            .input('Image5', sql.Int, Image5)
                            .input('Image6', sql.Int, Image6)
                            .input('Image7', sql.Int, Image7)
                            .input('Image8', sql.Int, Image8)
                            .input('Username', sql.VarChar, userName)
                            .execute("aly_update_ipd_room_properties");
    return res.recordsets[0];
  } catch (error) {
    console.log(" db-error :" + error);
  }
}


async function getAllIPDRooms() {
  try {
    var query = `select *
    from aly_vwGetIPDRoomAll`;
    let pool = await sql.connect(config.config_queue);
    let res = await pool.request().query(query,);
    console.log('all ipd rooms: ' + res.recordsets[0]);
    return res.recordsets[0];
  } catch (error) {
    console.log(" db-error :" + error);
  }
}

async function getDuration() {
    try {
      var query = `select *
      from [dbo].[alyGetConfigurationForDoorSignageByKey]('Duration')`;
console.log(" query :" + query);
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().query(query,);
      return res.recordsets[0][0]["ConfigValue"];
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }
 
async function getConfiguration() {
    try {
      var query = `select *
      from dbo.alyGetConfigurationForDoorSignage()`;
// console.log(" query :" + query);
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().query(query,);
      return res.recordsets[0][0];
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }
 
async function getDataByClinicID(cliniID=1) {
    try {
      var query = `select *
        from dbo.alyGetClinicDataByID(@RoomID)`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('RoomID', sql.Int, cliniID).query(query,);
      return res.recordsets[0][0];
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }
 
  async function getClinicByIPAddress(clinicIPAddress=1) {
      try {
        var query = `
        select *
        from dbo.alyGetClinicDataByIPAddress(@ClinicIPAddress)`;
        let pool = await sql.connect(config.config_queue);
        let res = await pool.request().input('clinicIPAddress', sql.VarChar, clinicIPAddress).query(query,);
        return res.recordsets[0][0];
      } catch (error) {
        console.log(" db-error :" + error);
      }
    }

async function getClinicEmptyByIPAddress(clinicIPAddress=1) {
    try {
      var query = `
      select *
      from dbo.alyGetClinicEmptyDataByIPAddress(@ClinicIPAddress)`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('clinicIPAddress', sql.VarChar, clinicIPAddress).query(query,);
      return res.recordsets[0][0];
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }

async function getImageByID(cliniID=1) {
    try {
      var query = `SELECT     Room.ImagePath
        FROM            Room
        WHERE ID = @RoomID`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('RoomID', sql.Int, cliniID).query(query,);
      imgPath = res.recordset[0].ImagePath;
      console.log(imgPath);
      return imgPath;
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }

async function getImageEmptyByID(cliniID=1) {
    try {
      var query = `SELECT     Room.ImagePathEmpty
        FROM            Room
        WHERE ID = @RoomID`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('RoomID', sql.Int, cliniID).query(query,);
      imgPath = res.recordset[0].ImagePathEmpty;
      // console.log(imgPath);
      return imgPath;
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }
  

module.exports = {
  getImageEmptyByID: getImageEmptyByID,
  getClinicByID: getDataByClinicID,
  getClinicEmptyByIPAddress: getClinicEmptyByIPAddress,
  getClinicByIPAddress: getClinicByIPAddress,
  getImageByID: getImageByID,
  getConfiguration: getConfiguration,
  getDuration: getDuration,
  getAllIPDRooms: getAllIPDRooms,
  getIPDRoomByID: getIPDRoomByID,
  updateIPDRoomByID: updateIPDRoomByID
};
