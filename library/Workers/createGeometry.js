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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./AttributeCompression-7809eba4","./GeometryPipeline-f9bdb2cf","./EncodedCartesian3-63b18b5e","./IndexDatatype-153fdd7f","./IntersectionTests-15d018f5","./Plane-84b14a0a","./PrimitivePipeline-48cda250","./WebMercatorProjection-72bc39e7","./createTaskProcessorWorker"],(function(e,r,t,n,a,i,o,s,f,d,b,c,u,m,l,p,y,P,C,k,v,G,W){"use strict";var h={};function A(r){var t=h[r];return e.defined(t)||("object"==typeof exports?h[t]=t=require("Workers/"+r):require(["Workers/"+r],(function(e){h[t=e]=e}))),t}return W((function(r,t){for(var n=r.subTasks,a=n.length,i=new Array(a),o=0;o<a;o++){var s=n[o],f=s.geometry,d=s.moduleName;if(e.defined(d)){var b=A(d);i[o]=b(f,s.offset)}else i[o]=f}return e.when.all(i,(function(e){return v.PrimitivePipeline.packCreateGeometryResults(e,t)}))}))}));
