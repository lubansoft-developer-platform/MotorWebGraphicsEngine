/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Matrix4-33464f2b","./RuntimeError-443472b0","./createTaskProcessorWorker"],(function(n,a,e,r,t,i,s){"use strict";var o=new r.Cartesian3;return s((function(n,a){var e=n.instances,i=n.config,s=n.cameraPosition;for(var c of i)c.lastFrameInstances=c.instances,c.instances=new Array(e.length),c.dirty=!1,c.instanceCount=0;for(var f of e){var v=f.modelMatrix;t.Matrix4.getTranslation(v,o);var d=r.Cartesian3.distance(s,o);for(var c of i)if(d>=c.min_visible_distance&&d<c.max_visible_distance){var u=!1;for(var l of c.lastFrameInstances)if(t.Matrix4.equals(l.modelMatrix,v)){u=!0;break}u||(c.dirty=!0),c.instances[c.instanceCount]=f,++c.instanceCount}}for(var c of i)c.instances.length=c.instanceCount;return{config:i}}))}));
