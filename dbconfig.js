	
const config_repsrv = {
    user: "mirth",
    password: "mirth",
    // server: "10.102.111.103",
    requestTimeout: 15000,
    server: "hjh-repsrv-03",
    database: "dbDoorSignage",
    driver: "msnodesqlv8",
    options: {
      database: 'dbDoorSignage',
      trustedconnection: true,
      trustServerCertificate: true,
      enableArithAbort: true,
      instancename: "",
    },
    // port: 14335
  };
   
		
const config_queue = {
    user: "qms",
    password: "qmsP@ssw0rd",
    requestTimeout: 15000,
    server: "hjh-queue-01",
    database: "QMS",
    driver: "msnodesqlv8",
    options: {
      database: 'QMS',
      trustedconnection: true,
      trustServerCertificate: true,
      enableArithAbort: true,
      instancename: "",
    },
    // port: 14335
  };
   

  module.exports = {
    config_repsrv: config_repsrv,
    config_queue: config_queue,
  };
  
  