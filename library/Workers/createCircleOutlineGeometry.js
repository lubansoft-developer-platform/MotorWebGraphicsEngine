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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./IndexDatatype-153fdd7f","./arrayFill-11a46844","./EllipseGeometryLibrary-81b498b5","./EllipseOutlineGeometry-8cc84c63"],(function(e,i,t,r,l,n,a,s,o,d,u,c,m,p,y,f,G,_){"use strict";function h(t){var r=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).radius;i.Check.typeOf.number("radius",r);var l={center:t.center,semiMajorAxis:r,semiMinorAxis:r,ellipsoid:t.ellipsoid,height:t.height,extrudedHeight:t.extrudedHeight,granularity:t.granularity,numberOfVerticalLines:t.numberOfVerticalLines};this._ellipseGeometry=new _.EllipseOutlineGeometry(l),this._workerName="createCircleOutlineGeometry"}h.packedLength=_.EllipseOutlineGeometry.packedLength,h.pack=function(e,t,r){return i.Check.typeOf.object("value",e),_.EllipseOutlineGeometry.pack(e._ellipseGeometry,t,r)};var b=new _.EllipseOutlineGeometry({center:new r.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),E={center:new r.Cartesian3,radius:void 0,ellipsoid:l.Ellipsoid.clone(l.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,numberOfVerticalLines:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0};return h.unpack=function(i,t,n){var a=_.EllipseOutlineGeometry.unpack(i,t,b);return E.center=r.Cartesian3.clone(a._center,E.center),E.ellipsoid=l.Ellipsoid.clone(a._ellipsoid,E.ellipsoid),E.height=a._height,E.extrudedHeight=a._extrudedHeight,E.granularity=a._granularity,E.numberOfVerticalLines=a._numberOfVerticalLines,e.defined(n)?(E.semiMajorAxis=a._semiMajorAxis,E.semiMinorAxis=a._semiMinorAxis,n._ellipseGeometry=new _.EllipseOutlineGeometry(E),n):(E.radius=a._semiMajorAxis,new h(E))},h.createGeometry=function(e){return _.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)},function(i,t){return e.defined(t)&&(i=h.unpack(i,t)),i._ellipseGeometry._center=r.Cartesian3.clone(i._ellipseGeometry._center),i._ellipseGeometry._ellipsoid=l.Ellipsoid.clone(i._ellipseGeometry._ellipsoid),h.createGeometry(i)}}));
