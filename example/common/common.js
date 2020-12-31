var config = {
    out:{
        bimServer:"https://open.lubansoft.com/api",
        motorAppId:"d0b3c61c6639434e84900b1fd8d391cb",
        motorSecret:"459dc8b77a63a0c009aec27f818febf6",
        bimProjectId:"bfdf508b-ae25-426a-ba6c-838f190eb4d6",
        cimProjectId:"62453677-1903-4e24-a19e-776dc72ee21d",
        library:"https://lbdp.lubansoft.com/reference/motor-web-library/motor.js"
    },
    inner:{
        bimServer:"http://192.168.2.57:8765",
        motorAppId:"7bf7b151697c4adba41707f808daa7c2",
        motorSecret:"ed349b4563f7dbffb881b24ebf07e6ee",
        bimProjectId:"49fb5920-2127-49c2-8025-674d6bbde749",
        cimProjectId:"c373a7e5-1c13-4fc1-91d1-f5158842478e",
        library:"http://192.168.2.57:7000/reference/motor-web-library/motor.js"
    },
    test:{
        bimServer:"http://cim.citylinker.com:16200",
        motorAppId:"b78fb3221404494e85d3ce87e67ebba3",
        motorSecret:"f81084d2c1a089b5c3dbb6c40116404d",
        bimProjectId:"916e5c6d-9a78-4ce1-b2bd-b474b595b827",
        cimProjectId:"14930a46-1635-4f40-96d4-0fba9b4886a2",
        library:"http://cim.citylinker.com:16270/reference/motor-web-library/motor.js"
    },
    customer: { 
        bimServer:"http://",
        motorAppId:"b78fb3221404494e85d3ce87e67ebba3",
        motorSecret:"f81084d2c1a089b5c3dbb6c40116404d",
        bimProjectId:"916e5c6d-9a78-4ce1-b2bd-b474b595b827",
        cimProjectId:"14930a46-1635-4f40-96d4-0fba9b4886a2",
        library:"http://"
     }
}

function getEnvironment(){
    var url = window.location.href;
    if(url.indexOf("https://")!==-1){
        if(url.slice(8,16)==="opentest"){
            return "test";
        }
        else if(url.slice(8,13)==="lbdp."){
            return "out";
        }
    }
    else if(url.indexOf("http://")!==-1){
        if(url.slice(7,14)==="192.168"){
            return "inner";
        }
        else if(url.slice(7,10)==="cim"){
            return "test";
        }
    }
    console.warn('commonjs配置错误')
    return "customer";
}

var index = getEnvironment();
var bimServer,motorAppId,motorSecret,bimProjectId,cimProjectId,library;
if(index){
    bimServer = config[index].bimServer;
    motorAppId = config[index].motorAppId;
    motorSecret = config[index].motorSecret;
    bimProjectId = config[index].bimProjectId;
    cimProjectId = config[index].cimProjectId;
    library = config[index].library;
    document.write('<script src="'+library+'"><\/script>');
}
