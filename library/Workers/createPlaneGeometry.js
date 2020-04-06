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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./VertexFormat-a4fe3a21"],(function(e,t,r,a,n,o,i,m,u,p,y,c,s,f,d){"use strict";function b(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);var r=e.defaultValue(t.vertexFormat,d.VertexFormat.DEFAULT);this._vertexFormat=r,this._workerName="createPlaneGeometry"}b.packedLength=d.VertexFormat.packedLength,b.pack=function(r,a,n){return t.Check.typeOf.object("value",r),t.Check.defined("array",a),n=e.defaultValue(n,0),d.VertexFormat.pack(r._vertexFormat,a,n),a};var l=new d.VertexFormat,A={vertexFormat:l};b.unpack=function(r,a,n){t.Check.defined("array",r),a=e.defaultValue(a,0);var o=d.VertexFormat.unpack(r,a,l);return e.defined(n)?(n._vertexFormat=d.VertexFormat.clone(o,n._vertexFormat),n):new b(A)};var F=new a.Cartesian3(-.5,-.5,0),v=new a.Cartesian3(.5,.5,0);return b.createGeometry=function(e){var t,r,n=e._vertexFormat,i=new f.GeometryAttributes;if(n.position){if((r=new Float64Array(12))[0]=F.x,r[1]=F.y,r[2]=0,r[3]=v.x,r[4]=F.y,r[5]=0,r[6]=v.x,r[7]=v.y,r[8]=0,r[9]=F.x,r[10]=v.y,r[11]=0,i.position=new s.GeometryAttribute({componentDatatype:c.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r}),n.normal){var m=new Float32Array(12);m[0]=0,m[1]=0,m[2]=1,m[3]=0,m[4]=0,m[5]=1,m[6]=0,m[7]=0,m[8]=1,m[9]=0,m[10]=0,m[11]=1,i.normal=new s.GeometryAttribute({componentDatatype:c.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:m})}if(n.st){var u=new Float32Array(8);u[0]=0,u[1]=0,u[2]=1,u[3]=0,u[4]=1,u[5]=1,u[6]=0,u[7]=1,i.st=new s.GeometryAttribute({componentDatatype:c.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:u})}if(n.tangent){var p=new Float32Array(12);p[0]=1,p[1]=0,p[2]=0,p[3]=1,p[4]=0,p[5]=0,p[6]=1,p[7]=0,p[8]=0,p[9]=1,p[10]=0,p[11]=0,i.tangent=new s.GeometryAttribute({componentDatatype:c.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:p})}if(n.bitangent){var y=new Float32Array(12);y[0]=0,y[1]=1,y[2]=0,y[3]=0,y[4]=1,y[5]=0,y[6]=0,y[7]=1,y[8]=0,y[9]=0,y[10]=1,y[11]=0,i.bitangent=new s.GeometryAttribute({componentDatatype:c.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:y})}(t=new Uint16Array(6))[0]=0,t[1]=1,t[2]=2,t[3]=0,t[4]=2,t[5]=3}return new s.Geometry({attributes:i,indices:t,primitiveType:s.PrimitiveType.TRIANGLES,boundingSphere:new o.BoundingSphere(a.Cartesian3.ZERO,Math.sqrt(2))})},function(t,r){return e.defined(r)&&(t=b.unpack(t,r)),b.createGeometry(t)}}));
