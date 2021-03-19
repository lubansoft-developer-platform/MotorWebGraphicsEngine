<template>
<div style="width:100%;height:100%;">
    <div id="loading" v-show="projectLoading">
        <div class="loading-image" style="background-image:url(require('./assets/images/ezgif.com-crop.gif'));">
            <div style="text-align: center;vertical-align: middle;display: table-cell;color: white;height: 100px;padding-top: 80px;margin-top: 80px;">正在努力加载中...</div>
        </div>
    </div>
    <div style="position:absolute;top:1rem;left:1rem;z-index:1">
        <input type="button" value="添加工程" v-on:click="openProject"></input>
        <span>{{projectId}}</span>
    </div>
    <div id="container"></div>
</div>
</template>
<script>

let state ={
    // projectId:undefined,
    viewerLoaded:false,
    projectLoading:false
};
let viewer,project;
export default {
    name:'motor-viewer',
    props:{
        server:String,
        appId:String,
        secret:String,
        projectId:String
    },
    data(){
        return state
    },
    updated() {
    },
    beforeUpdate() {
    },
    mounted(){
        Motor.Config.serverUrl = this.server;
        viewer = new Motor.Viewer({
            container: "container",
            viewerMode: Motor.ViewerMode.BIM,
            appid: this.appId,
            secret: this.secret
        });
        viewer.initialize().then(() => {
            state.loaded=true;
        });
        this.viewer = viewer;
    },
    methods: {
        openProject:function(){
            // this.projectId = "a0f833a0-7bc5-43ec-a360-f696d4a11b8d";
            this.projectLoading=true;
            project = viewer.queryProject(this.projectId);
            project.open().then(() => {
                console.log('all loaded');
                this.projectLoading=false;
            });
        }
    },

    beforeDestroy(){
        viewer.destroy();
    }
}
</script>
<style scoped>
@import url('../css/normalize.css')
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