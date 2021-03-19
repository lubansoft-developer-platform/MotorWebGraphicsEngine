var config = {
    bimServer:"https://open.lubansoft.com/api",
    motorAppId:"d0b3c61c6639434e84900b1fd8d391cb",
    motorSecret:"459dc8b77a63a0c009aec27f818febf6",
    cimProjectId:"62453677-1903-4e24-a19e-776dc72ee21d",

    // motorAppId:"f8331edc58f742bba421e0d71eb9b52f",
    // motorSecret:"3bb76c2cdd20c7683d3d9a3f3ea6d2c9",
    // cimProjectId:"879b1749810248988e2f2b77e8f59bd1",

    library:"../../library/motor.js"
}

var bimServer,motorAppId,motorSecret,cimProjectId,library;
bimServer = config.bimServer;
motorAppId = config.motorAppId;
motorSecret = config.motorSecret;
cimProjectId = config.cimProjectId;
library = config.library;
document.write('<script src="'+library+'"><\/script>');
