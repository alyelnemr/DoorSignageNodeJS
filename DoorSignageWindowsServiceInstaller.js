const Service = require('node-windows').Service


const svc = new Service({
    name: "alyDoorSignageAPIServer",
    description: "Door Signage Server",
    script: "C:\\Aly\\api_server\\WindowsService\\www"
});

svc.on('install', function(){
    svc.start();
})

svc.install();