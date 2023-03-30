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
 
async function getDuration() {
    try {
      var query = `SELECT ConfigKey, ConfigValue
FROM            tblConfiguration
WHERE        (ConfigKey = 'Duration')`;
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
      var query = `select duration, doctorNameENTop, doctorNameENFontSize, doctorNameARTop, doctorNameARFontSize, specialtyENTop, specialtyENFontSize, specialtyARTop, specialtyARFontSize
      , clinicDateTop, clinicDateFontSize
      from
      (
        select ConfigValue, ConfigKey
        from tblConfiguration
      ) d
      pivot
      (
        max(ConfigValue)
        for ConfigKey in (duration, doctorNameENTop, doctorNameENFontSize, doctorNameARTop, doctorNameARFontSize, specialtyENTop, specialtyENFontSize, specialtyARTop, specialtyARFontSize
      , clinicDateTop, clinicDateFontSize)
      ) piv`;
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
      var query = `SELECT        
	  ID, DoctorNameAR, DoctorNameEN, ClinicID, SpecialtyAR, SpecialtyEN, ClinicStartDate, ClinicEndDate, 
	  'http://10.102.111.88:1020/api/getImageByID/' +cast(id as varchar) as ImagePath, ImageBinary
      FROM            Room
        WHERE ID = @RoomID`;
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
  getAllClinics: getAllData,
  getClinicByID: getDataByClinicID,
  getAllClinics: getAllData,
  getClinicEmptyByIPAddress: getClinicEmptyByIPAddress,
  getClinicByIPAddress: getClinicByIPAddress,
  getImageByID: getImageByID,
  getConfiguration: getConfiguration,
  getDuration: getDuration
};
