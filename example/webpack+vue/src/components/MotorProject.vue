<template>
<div style="width:100%;height:100%;">
    <div id="loading">
        <div class="loading-image" style="background-image:url(require('./assets/img/ezgif.com-crop.gif'));">
            <div style="text-align: center;vertical-align: middle;display: table-cell;color: white;height: 100px;padding-top: 80px;margin-top: 80px;">正在努力加载中...</div>
        </div>
    </div>
    <div id="container"></div>
</div>
</template>
<script>

let state ={
    projectId:undefined,
    loaded:false
};
export default {
    name:'MotorProject',
    data:state,
    mounted(){
        /*example start*/
const appid = "d0b3c61c6639434e84900b1fd8d391cb";
const secret = "459dc8b77a63a0c009aec27f818febf6";

let viewer = new Motor.Viewer({
    container: "container",
    viewerMode: Motor.ViewerMode.BIM,
    appid: appid,
    secret: secret
});
viewer.initialize().then(() => {
    state.loaded=true;
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