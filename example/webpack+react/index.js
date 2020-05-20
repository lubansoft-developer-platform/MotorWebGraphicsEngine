import Motor from '../../library/motor';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const bimServer = "https://open.lubansoft.com/api";
const appid = "d0b3c61c6639434e84900b1fd8d391cb";
const secret = "459dc8b77a63a0c009aec27f818febf6";
const projectId = "a0f833a0-7bc5-43ec-a360-f696d4a11b8d";

const loadingStyle = {
    position: "absolute",
    top: 0,
    zIndex: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "#0000004d"
}
const loadingImageStyle = {
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "50px",
    display: "table",
    width: "100%",
    backgroundImage:"url('./ezgif.com-crop.gif')"
}

class MotorContainer extends Component{
    constructor(prop){
        super(prop);
        this.state = {show:true};
    }
    componentDidMount(){
        Motor.Config.serverUrl = bimServer;
        let viewer = new Motor.Viewer({
            container: this.container,
            viewerMode: Motor.ViewerMode.BIM,
            appid: appid,
            secret: secret
        });
        viewer.initialize().then(() => {
            let project = viewer.queryProject(projectId);
            project.open().then(() => {
                console.log('all loaded',this)
                this.setState({show:false});
            });
        });
    }

    render(){
        return (
            <div>
                {
                    this.state.show &&
                    (
                    <div id="loading" style={loadingStyle}>
                        <div style={loadingImageStyle}>
                            <div style={{textAlign: "center",verticalAlign: "middle",display: "table-cell",color: "white",height: "100px",paddingTop: "80px",marginTop: "80px"}}>正在努力加载中...</div>
                        </div>
                    </div>)
                }
                
                <div ref={element => this.container = element}>
                </div>
            </div>
        )
    }
}
ReactDOM.render(<MotorContainer/>, document.getElementById('container'));