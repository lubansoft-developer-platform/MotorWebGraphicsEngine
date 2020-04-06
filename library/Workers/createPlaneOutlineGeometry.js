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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8"],(function(e,t,n,r,a,i,o,u,c,d,s,f,y,p){"use strict";function m(){this._workerName="createPlaneOutlineGeometry"}m.packedLength=0,m.pack=function(e,n){return t.Check.defined("value",e),t.Check.defined("array",n),n},m.unpack=function(n,r,a){return t.Check.defined("array",n),e.defined(a)?a:new m};var b=new r.Cartesian3(-.5,-.5,0),C=new r.Cartesian3(.5,.5,0);return m.createGeometry=function(){var e=new p.GeometryAttributes,t=new Uint16Array(8),n=new Float64Array(12);return n[0]=b.x,n[1]=b.y,n[2]=b.z,n[3]=C.x,n[4]=b.y,n[5]=b.z,n[6]=C.x,n[7]=C.y,n[8]=b.z,n[9]=b.x,n[10]=C.y,n[11]=b.z,e.position=new y.GeometryAttribute({componentDatatype:f.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n}),t[0]=0,t[1]=1,t[2]=1,t[3]=2,t[4]=2,t[5]=3,t[6]=3,t[7]=0,new y.Geometry({attributes:e,indices:t,primitiveType:y.PrimitiveType.LINES,boundingSphere:new i.BoundingSphere(r.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=m.unpack(t,n)),m.createGeometry(t)}}));
