import Motor from '../../library/motor';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
const appid = "a56958db79c64abfa62b2a7c03c747a6";
const secret = "98d4c5db9942fb13fbb8e545cb464aa47d2015fe";
Motor.ServiceConfig.server = "http://192.168.2.57:8765";
const projectId = "bc21bb8c-15fa-44e9-b8b7-de9747c654d8";//总统套房


class MotorContainer extends Component{
    componentDidMount(){
        let viewer = new Motor.Viewer({
            container: this.container,
            viewerMode: Motor.ViewerMode.BIM,
            appid: appid,
            secret: secret
        });
        viewer.readyPromise.then(() => {
            let promise = viewer.loadSubProject({
                projectId: projectId,
                // drawEdge:true
            });
            promise.then(() => {
                console.log('all loaded')
            });
        });
    }
    render(){
        return <div ref={element => this.container = element}></div>
    }
}
ReactDOM.render(<MotorContainer/>, document.getElementById('container'));