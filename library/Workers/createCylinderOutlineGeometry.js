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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./IndexDatatype-153fdd7f","./arrayFill-11a46844","./CylinderGeometryLibrary-5646cdc3"],(function(e,t,i,r,a,o,n,s,u,f,d,b,l,p,m,c,y){"use strict";var h=new u.Cartesian2;function _(i){var r=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).length,a=i.topRadius,o=i.bottomRadius,n=e.defaultValue(i.slices,128),s=Math.max(e.defaultValue(i.numberOfVerticalLines,16),0);if(t.Check.typeOf.number("options.positions",r),t.Check.typeOf.number("options.topRadius",a),t.Check.typeOf.number("options.bottomRadius",o),t.Check.typeOf.number.greaterThanOrEquals("options.slices",n,3),e.defined(i.offsetAttribute)&&i.offsetAttribute===l.GeometryOffsetAttribute.TOP)throw new t.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._length=r,this._topRadius=a,this._bottomRadius=o,this._slices=n,this._numberOfVerticalLines=s,this._offsetAttribute=i.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}_.packedLength=6,_.pack=function(i,r,a){return t.Check.typeOf.object("value",i),t.Check.defined("array",r),a=e.defaultValue(a,0),r[a++]=i._length,r[a++]=i._topRadius,r[a++]=i._bottomRadius,r[a++]=i._slices,r[a++]=i._numberOfVerticalLines,r[a]=e.defaultValue(i._offsetAttribute,-1),r};var v={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return _.unpack=function(i,r,a){t.Check.defined("array",i),r=e.defaultValue(r,0);var o=i[r++],n=i[r++],s=i[r++],u=i[r++],f=i[r++],d=i[r];return e.defined(a)?(a._length=o,a._topRadius=n,a._bottomRadius=s,a._slices=u,a._numberOfVerticalLines=f,a._offsetAttribute=-1===d?void 0:d,a):(v.length=o,v.topRadius=n,v.bottomRadius=s,v.slices=u,v.numberOfVerticalLines=f,v.offsetAttribute=-1===d?void 0:d,new _(v))},_.createGeometry=function(t){var i=t._length,a=t._topRadius,n=t._bottomRadius,s=t._slices,f=t._numberOfVerticalLines;if(!(i<=0||a<0||n<0||0===a&&0===n)){var d,_=2*s,v=y.CylinderGeometryLibrary.computePositions(i,a,n,s,!1),A=2*s;if(f>0){var O=Math.min(f,s);d=Math.round(s/O),A+=O}var C,R=m.IndexDatatype.createTypedArray(_,2*A),G=0;for(C=0;C<s-1;C++)R[G++]=C,R[G++]=C+1,R[G++]=C+s,R[G++]=C+1+s;if(R[G++]=s-1,R[G++]=0,R[G++]=s+s-1,R[G++]=s,f>0)for(C=0;C<s;C+=d)R[G++]=C,R[G++]=C+s;var g=new p.GeometryAttributes;g.position=new l.GeometryAttribute({componentDatatype:b.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:v}),h.x=.5*i,h.y=Math.max(n,a);var V=new o.BoundingSphere(r.Cartesian3.ZERO,u.Cartesian2.magnitude(h));if(e.defined(t._offsetAttribute)){i=v.length;var k=new Uint8Array(i/3),L=t._offsetAttribute===l.GeometryOffsetAttribute.NONE?0:1;c.arrayFill(k,L),g.applyOffset=new l.GeometryAttribute({componentDatatype:b.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:k})}return new l.Geometry({attributes:g,indices:R,primitiveType:l.PrimitiveType.LINES,boundingSphere:V,offsetAttribute:t._offsetAttribute})}},function(t,i){return e.defined(i)&&(t=_.unpack(t,i)),_.createGeometry(t)}}));
