var config = {
    bimServer:"https://open.lubansoft.com/api",
    motorAppId:"d0b3c61c6639434e84900b1fd8d391cb",
    motorSecret:"459dc8b77a63a0c009aec27f818febf6",
    bimProjectId:"bfdf508b-ae25-426a-ba6c-838f190eb4d6",
    cimProjectId:"62453677-1903-4e24-a19e-776dc72ee21d", //< 官网codebox工程
    library:"../../library/motor.js"
}

var bimServer,motorAppId,motorSecret,bimProjectId,cimProjectId,library;
bimServer = config.bimServer;
motorAppId = config.motorAppId;
motorSecret = config.motorSecret;
bimProjectId = config.bimProjectId;
cimProjectId = config.cimProjectId;
library = config.library;

document.write('<script src="'+library+'"><\/script>');
