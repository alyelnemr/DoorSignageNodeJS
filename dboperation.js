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
 
async function getDataByClinicID(cliniID=1) {
    try {
      var query = `SELECT        
	  ID, DoctorNameAR, DoctorNameEN, ClinicID, SpecialtyAR, SpecialtyEN, ClinicStartDate, ClinicEndDate, 
	  'http://10.102.111.30:1020/api/getImageByID/' +cast(id as varchar) as ImagePath, ImageBinary
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
      SELECT    Clinic.ID,    Clinic.ClinicName as ClinicNameEN, Clinic.ClinicName as ClinicNameAR, 
      Physician.Name AS DoctorNameAR, Physician.NameEn AS DoctorNameEN, 
      Clinic.Speciality, Clinic.DateTimeFrom, Clinic.DateTimeTo, Room.Name AS RoomName, 
      Clinic.SpecialityEn as SpecialtyAR, Clinic.SpecialityEn as SpecialtyEN, 
      Area.AreaName, Room.AreaID, Room.ComputerIPNumber, 'http://10.102.111.30:1020/api/getImageByID/' +cast(Room.ID as varchar) as ImagePath, 
      'http://10.102.111.30:1020/api/getImageEmptyByID/' +cast(Room.ID as varchar) as ImagePathEmpty
      FROM            Room INNER JOIN
      Clinic ON Room.ID = Clinic.PlannedRoomID INNER JOIN
      Physician ON Clinic.PhysicianID = Physician.ID AND Clinic.Active = 1 AND Clinic.StatusID = 2 INNER JOIN
      Area ON Room.AreaID = Area.AreaID
WHERE        (Room.AreaID = 2) AND (Room.ComputerIPNumber = @ClinicIPAddress)`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('clinicIPAddress', sql.VarChar, clinicIPAddress).query(query,);
      return res.recordsets[0][0];
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }

async function getClinicByForceIPAddress(clinicIPAddress=1) {
    try {
      var query = `
      SELECT    Clinic.ID,    Clinic.ClinicName as ClinicNameEN, Clinic.ClinicName as ClinicNameAR, 
      Physician.Name AS DoctorNameAR, Physician.NameEn AS DoctorNameEN, 
      Clinic.Speciality, Clinic.DateTimeFrom, Clinic.DateTimeTo, Room.Name AS RoomName, 
      Clinic.SpecialityEn as SpecialtyAR, Clinic.SpecialityEn as SpecialtyEN, 
      Area.AreaName, Room.AreaID, Room.ComputerIPNumber, 'http://10.102.111.30:1020/api/getImageByID/' +cast(Room.ID as varchar) as ImagePath, 
      'http://10.102.111.30:1020/api/getImageEmptyByID/' +cast(Room.ID as varchar) as ImagePathEmpty
      FROM            Room INNER JOIN
      Clinic ON Room.ID = Clinic.PlannedRoomID INNER JOIN
      Physician ON Clinic.PhysicianID = Physician.ID AND Clinic.Active = 1 AND Clinic.StatusID = 2 INNER JOIN
      Area ON Room.AreaID = Area.AreaID
WHERE        (Room.AreaID = 2) AND (Room.ComputerIPNumber = @ClinicIPAddress)`;
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
      console.log(imgPath);
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
  getClinicByIPAddress: getClinicByIPAddress,
  getClinicByForceIPAddress: getClinicByForceIPAddress,
  getImageByID: getImageByID,
  getDuration: getDuration
};
