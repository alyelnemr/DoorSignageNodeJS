var config = require("./dbconfig");
const sql = require("mssql");
const sql2 = require("msnodesqlv8");
 
async function getdata() {
  try {
    let pool = await sql.connect(config.config_queue);
    console.log("sql server connected...");
  } catch (error) {
console.log(" db-error :" + error);
  }
}
 
 
async function getdata2(cliniID=1) {
    var connStr = "Driver={SQL Server};user=mirth;password=mirth;Server=hjh-repsrv-03;Database=dbDoorSignage;Trusted_Connection=Yes;";
    var query =
    `SELECT       *
    FROM            tblDoctorSchedule
        WHERE ClinicID = ?`;
    let x = await sql2.query(connStr, query, [cliniID], function(err, rows) {
              if(err) console.log(err);
              // console.log(rows);
              // return JSON.stringify(rows);
            });
            console.log("x: " + x);
    return x;
}
 

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
      var query = `SELECT RowID, ConfigName, ConfigValue, ConfigDescription
FROM            tlbConfiguration
WHERE        (ConfigName = 'Duration')`;
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
      FROM            tblDoctorSchedule
        WHERE ClinicID = @ClinicID`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('ClinicID', sql.Int, cliniID).query(query,);
      return res.recordsets[0][0];
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }
 
async function getClinicByIPAddress(clinicIPAddress=1) {
    try {
      var query = `
	  select d.ID, DoctorNameAR, DoctorNameEN, ClinicID, ClinicNameAR, ClinicNameEN, SpecialtyAR, SpecialtyEN, ClinicStartDate, ClinicEndDate, 
	  'http://10.102.111.30:1020/api/getImageByID/' +cast(d.id as varchar) as ImagePath, RefreshImage, DisplayTime
      FROM            tblDoctorSchedule d inner join
        tblClinic c on d.ClinicID = c.ID 
  where [ClinicIPAddress] = @ClinicIPAddress`;
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
	  select d.ID, DoctorNameAR, DoctorNameEN, ClinicID, ClinicNameAR, ClinicNameEN, SpecialtyAR, SpecialtyEN, ClinicStartDate, ClinicEndDate, 
	  'http://10.102.111.30:1020/api/getImageByID/' +cast(d.id as varchar) as ImagePath
      FROM            tblDoctorSchedule d inner join
        tblClinic c on d.ClinicID = c.ID 
  where [ClinicIPAddress] = @ClinicIPAddress`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('clinicIPAddress', sql.VarChar, clinicIPAddress).query(query,);
      return res.recordsets[0][0];
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }

async function getImageByID(cliniID=1) {
    try {
      var query = `SELECT     ImagePath
        FROM            tblDoctorSchedule
        WHERE ClinicID = @ClinicID`;
      let pool = await sql.connect(config.config_queue);
      let res = await pool.request().input('ClinicID', sql.Int, cliniID).query(query,);
      imgPath = res.recordset[0].ImagePath;
      console.log(imgPath);
      return imgPath;
    } catch (error) {
      console.log(" db-error :" + error);
    }
  }
  

module.exports = {
  getdata: getdata,
  getdata2: getdata2,
  getAllClinics: getAllData,
  getClinicByID: getDataByClinicID,
  getAllClinics: getAllData,
  getClinicByIPAddress: getClinicByIPAddress,
  getImageByID: getImageByID,
  getDuration: getDuration
};
