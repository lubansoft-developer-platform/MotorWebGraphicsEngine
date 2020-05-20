var config = {
    bimServer:"https://open.lubansoft.com/api",
    motorAppId:"d0b3c61c6639434e84900b1fd8d391cb",
    motorSecret:"459dc8b77a63a0c009aec27f818febf6",
    bimProjectId:"bfdf508b-ae25-426a-ba6c-838f190eb4d6",
    cimProjectId:"ad938619-858f-4a90-8451-0e5e8daa0a6f", //< 某某数据谷
    library:"https://lbdp.lubansoft.com/reference/motor-web-library/motor.js"
}

var bimServer,motorAppId,motorSecret,bimProjectId,cimProjectId,library;

bimServer = config.bimServer;
motorAppId = config.motorAppId;
motorSecret = config.motorSecret;
bimProjectId = config.bimProjectId;
cimProjectId = config.cimProjectId;
library = config.library;

document.write('<script src="'+library+'"><\/script>');
