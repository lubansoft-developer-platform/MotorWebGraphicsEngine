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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./IndexDatatype-153fdd7f","./arrayFill-11a46844","./VertexFormat-a4fe3a21","./EllipsoidGeometry-5c0fd559"],(function(e,t,r,i,a,o,n,s,d,l,c,m,p,u,f,y,G,k){"use strict";function v(t){var r=e.defaultValue(t.radius,1),a={radii:new i.Cartesian3(r,r,r),stackPartitions:t.stackPartitions,slicePartitions:t.slicePartitions,vertexFormat:t.vertexFormat};this._ellipsoidGeometry=new k.EllipsoidGeometry(a),this._workerName="createSphereGeometry"}v.packedLength=k.EllipsoidGeometry.packedLength,v.pack=function(e,r,i){return t.Check.typeOf.object("value",e),k.EllipsoidGeometry.pack(e._ellipsoidGeometry,r,i)};var b=new k.EllipsoidGeometry,x={radius:void 0,radii:new i.Cartesian3,vertexFormat:new G.VertexFormat,stackPartitions:void 0,slicePartitions:void 0};return v.unpack=function(t,r,a){var o=k.EllipsoidGeometry.unpack(t,r,b);return x.vertexFormat=G.VertexFormat.clone(o._vertexFormat,x.vertexFormat),x.stackPartitions=o._stackPartitions,x.slicePartitions=o._slicePartitions,e.defined(a)?(i.Cartesian3.clone(o._radii,x.radii),a._ellipsoidGeometry=new k.EllipsoidGeometry(x),a):(x.radius=o._radii.x,new v(x))},v.createGeometry=function(e){return k.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)},function(t,r){return e.defined(r)&&(t=v.unpack(t,r)),v.createGeometry(t)}}));
