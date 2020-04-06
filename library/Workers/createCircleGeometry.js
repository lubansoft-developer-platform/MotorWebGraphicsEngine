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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./AttributeCompression-7809eba4","./GeometryPipeline-f9bdb2cf","./EncodedCartesian3-63b18b5e","./IndexDatatype-153fdd7f","./IntersectionTests-15d018f5","./Plane-84b14a0a","./arrayFill-11a46844","./VertexFormat-a4fe3a21","./EllipseGeometryLibrary-81b498b5","./GeometryInstance-d03f2889","./EllipseGeometry-34509ec0"],(function(e,t,i,r,o,a,n,l,s,d,m,u,p,c,y,_,h,f,x,G,g,b,v,E,w){"use strict";function C(i){var r=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).radius;t.Check.typeOf.number("radius",r);var o={center:i.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:i.ellipsoid,height:i.height,extrudedHeight:i.extrudedHeight,granularity:i.granularity,vertexFormat:i.vertexFormat,stRotation:i.stRotation,shadowVolume:i.shadowVolume};this._ellipseGeometry=new w.EllipseGeometry(o),this._workerName="createCircleGeometry"}C.packedLength=w.EllipseGeometry.packedLength,C.pack=function(e,i,r){return t.Check.typeOf.object("value",e),w.EllipseGeometry.pack(e._ellipseGeometry,i,r)};var A=new w.EllipseGeometry({center:new r.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),M={center:new r.Cartesian3,radius:void 0,ellipsoid:o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new b.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return C.unpack=function(t,i,a){var n=w.EllipseGeometry.unpack(t,i,A);return M.center=r.Cartesian3.clone(n._center,M.center),M.ellipsoid=o.Ellipsoid.clone(n._ellipsoid,M.ellipsoid),M.height=n._height,M.extrudedHeight=n._extrudedHeight,M.granularity=n._granularity,M.vertexFormat=b.VertexFormat.clone(n._vertexFormat,M.vertexFormat),M.stRotation=n._stRotation,M.shadowVolume=n._shadowVolume,e.defined(a)?(M.semiMajorAxis=n._semiMajorAxis,M.semiMinorAxis=n._semiMinorAxis,a._ellipseGeometry=new w.EllipseGeometry(M),a):(M.radius=n._semiMajorAxis,new C(M))},C.createGeometry=function(e){return w.EllipseGeometry.createGeometry(e._ellipseGeometry)},C.createShadowVolume=function(e,t,i){var r=e._ellipseGeometry._granularity,o=e._ellipseGeometry._ellipsoid,a=t(r,o),n=i(r,o);return new C({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:o,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:a,height:n,vertexFormat:b.VertexFormat.POSITION_ONLY,shadowVolume:!0})},i.defineProperties(C.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(t,i){return e.defined(i)&&(t=C.unpack(t,i)),t._ellipseGeometry._center=r.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=o.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),C.createGeometry(t)}}));
