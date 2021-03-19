<template>
<div style="width:100%;height:100%;">
    <div id="loading">
        <div class="loading-image" style="background-image:url(require('./assets/images/ezgif.com-crop.gif'));">
            <div style="text-align: center;vertical-align: middle;display: table-cell;color: white;height: 100px;padding-top: 80px;margin-top: 80px;">正在努力加载中...</div>
        </div>
    </div>
    <div id="container"></div>
</div>
</template>
<script>
export default {
    name:'App',
    mounted(){
        /*example start*/
const appid = "d0b3c61c6639434e84900b1fd8d391cb";
const secret = "459dc8b77a63a0c009aec27f818febf6";

const projectId = "a0f833a0-7bc5-43ec-a360-f696d4a11b8d";
let viewer = new Motor.Viewer({
    container: "container",
    viewerMode: Motor.ViewerMode.BIM,
    appid: appid,
    secret: secret
});
viewer.initialize().then(() => {
    let project = viewer.queryProject(projectId);
    project.open().then(() => {
        console.log('all loaded');
        document.getElementById("loading").setAttribute("style","display:none;");
    });
});
        /*example end*/
        this.viewer = viewer;
    },

    beforeDestroy(){
        this.viewer.destroy();
    }
}
</script>
<style scoped>
html, body, #container{
    margin:0;
    width:100%;
    height:100%;
    overflow: hidden;
}
#loading{
    position:absolute;
    top:0;
    z-index:1;
    width:100%;
    height:100%;
    background-color: #0000004d;
}
.loading-image{
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50px;
    display:table;
    width:100%;
}
</style>