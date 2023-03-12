const Service = require('node-windows').Service


const svc = new Service({
    name: "nodeDoorSignageServer",
    description: "Door Signage Server",
    script: "E:\\Aly\\api_server\\bin\\www"
});

svc.on('install', function(){
    svc.start();
})

svc.install();