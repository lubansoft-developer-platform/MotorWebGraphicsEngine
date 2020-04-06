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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./arrayFill-11a46844"],(function(e,t,a,n,r,i,o,u,s,f,m,c,d,p,y){"use strict";var b=new n.Cartesian3;function C(a){var r=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).minimum,i=a.maximum;if(t.Check.typeOf.object("min",r),t.Check.typeOf.object("max",i),e.defined(a.offsetAttribute)&&a.offsetAttribute===d.GeometryOffsetAttribute.TOP)throw new t.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._min=n.Cartesian3.clone(r),this._max=n.Cartesian3.clone(i),this._offsetAttribute=a.offsetAttribute,this._workerName="createBoxOutlineGeometry"}C.fromDimensions=function(a){var r=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).dimensions;t.Check.typeOf.object("dimensions",r),t.Check.typeOf.number.greaterThanOrEquals("dimensions.x",r.x,0),t.Check.typeOf.number.greaterThanOrEquals("dimensions.y",r.y,0),t.Check.typeOf.number.greaterThanOrEquals("dimensions.z",r.z,0);var i=n.Cartesian3.multiplyByScalar(r,.5,new n.Cartesian3);return new C({minimum:n.Cartesian3.negate(i,new n.Cartesian3),maximum:i,offsetAttribute:a.offsetAttribute})},C.fromAxisAlignedBoundingBox=function(e){return t.Check.typeOf.object("boundindBox",e),new C({minimum:e.minimum,maximum:e.maximum})},C.packedLength=2*n.Cartesian3.packedLength+1,C.pack=function(a,r,i){return t.Check.typeOf.object("value",a),t.Check.defined("array",r),i=e.defaultValue(i,0),n.Cartesian3.pack(a._min,r,i),n.Cartesian3.pack(a._max,r,i+n.Cartesian3.packedLength),r[i+2*n.Cartesian3.packedLength]=e.defaultValue(a._offsetAttribute,-1),r};var l=new n.Cartesian3,h=new n.Cartesian3,A={minimum:l,maximum:h,offsetAttribute:void 0};return C.unpack=function(a,r,i){t.Check.defined("array",a),r=e.defaultValue(r,0);var o=n.Cartesian3.unpack(a,r,l),u=n.Cartesian3.unpack(a,r+n.Cartesian3.packedLength,h),s=a[r+2*n.Cartesian3.packedLength];return e.defined(i)?(i._min=n.Cartesian3.clone(o,i._min),i._max=n.Cartesian3.clone(u,i._max),i._offsetAttribute=-1===s?void 0:s,i):(A.offsetAttribute=-1===s?void 0:s,new C(A))},C.createGeometry=function(t){var a=t._min,r=t._max;if(!n.Cartesian3.equals(a,r)){var o=new p.GeometryAttributes,u=new Uint16Array(24),s=new Float64Array(24);s[0]=a.x,s[1]=a.y,s[2]=a.z,s[3]=r.x,s[4]=a.y,s[5]=a.z,s[6]=r.x,s[7]=r.y,s[8]=a.z,s[9]=a.x,s[10]=r.y,s[11]=a.z,s[12]=a.x,s[13]=a.y,s[14]=r.z,s[15]=r.x,s[16]=a.y,s[17]=r.z,s[18]=r.x,s[19]=r.y,s[20]=r.z,s[21]=a.x,s[22]=r.y,s[23]=r.z,o.position=new d.GeometryAttribute({componentDatatype:c.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s}),u[0]=4,u[1]=5,u[2]=5,u[3]=6,u[4]=6,u[5]=7,u[6]=7,u[7]=4,u[8]=0,u[9]=1,u[10]=1,u[11]=2,u[12]=2,u[13]=3,u[14]=3,u[15]=0,u[16]=0,u[17]=4,u[18]=1,u[19]=5,u[20]=2,u[21]=6,u[22]=3,u[23]=7;var f=n.Cartesian3.subtract(r,a,b),m=.5*n.Cartesian3.magnitude(f);if(e.defined(t._offsetAttribute)){var C=s.length,l=new Uint8Array(C/3),h=t._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1;y.arrayFill(l,h),o.applyOffset=new d.GeometryAttribute({componentDatatype:c.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:l})}return new d.Geometry({attributes:o,indices:u,primitiveType:d.PrimitiveType.LINES,boundingSphere:new i.BoundingSphere(n.Cartesian3.ZERO,m),offsetAttribute:t._offsetAttribute})}},function(t,a){return e.defined(a)&&(t=C.unpack(t,a)),C.createGeometry(t)}}));
