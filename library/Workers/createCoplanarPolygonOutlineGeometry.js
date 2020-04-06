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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./AttributeCompression-7809eba4","./GeometryPipeline-f9bdb2cf","./EncodedCartesian3-63b18b5e","./IndexDatatype-153fdd7f","./IntersectionTests-15d018f5","./Plane-84b14a0a","./GeometryInstance-d03f2889","./arrayRemoveDuplicates-c3fd0b84","./EllipsoidTangentPlane-3967708f","./OrientedBoundingBox-51e874ad","./CoplanarPolygonGeometryLibrary-e1775e93","./ArcType-51c149e1","./EllipsoidRhumbLine-c004db91","./PolygonPipeline-d25dad97","./PolygonGeometryLibrary-ea4e2ec7"],(function(e,t,r,n,o,i,a,y,l,p,c,s,d,u,f,m,b,g,h,P,v,G,C,k,L,E,T,H,w){"use strict";function A(e){for(var t=e.length,r=new Float64Array(3*t),n=g.IndexDatatype.createTypedArray(t,2*t),o=0,i=0,a=0;a<t;a++){var y=e[a];r[o++]=y.x,r[o++]=y.y,r[o++]=y.z,n[i++]=a,n[i++]=(a+1)%t}var l=new u.GeometryAttributes({position:new d.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r})});return new d.Geometry({attributes:l,indices:n,primitiveType:d.PrimitiveType.LINES})}function D(r){var n=(r=e.defaultValue(r,e.defaultValue.EMPTY_OBJECT)).polygonHierarchy;t.Check.defined("options.polygonHierarchy",n),this._polygonHierarchy=n,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=w.PolygonGeometryLibrary.computeHierarchyPackedLength(n)+1}D.fromPositions=function(r){return r=e.defaultValue(r,e.defaultValue.EMPTY_OBJECT),t.Check.defined("options.positions",r.positions),new D({polygonHierarchy:{positions:r.positions}})},D.pack=function(r,n,o){return t.Check.typeOf.object("value",r),t.Check.defined("array",n),o=e.defaultValue(o,0),n[o=w.PolygonGeometryLibrary.packPolygonHierarchy(r._polygonHierarchy,n,o)]=r.packedLength,n};var I={polygonHierarchy:{}};return D.unpack=function(r,n,o){t.Check.defined("array",r),n=e.defaultValue(n,0);var i=w.PolygonGeometryLibrary.unpackPolygonHierarchy(r,n);n=i.startingIndex,delete i.startingIndex;var a=r[n];return e.defined(o)||(o=new D(I)),o._polygonHierarchy=i,o.packedLength=a,o},D.createGeometry=function(e){var t=e._polygonHierarchy,r=t.positions;if(!((r=G.arrayRemoveDuplicates(r,n.Cartesian3.equalsEpsilon,!0)).length<3)&&L.CoplanarPolygonGeometryLibrary.validOutline(r)){var o=w.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t,!1);if(0!==o.length){for(var a=[],y=0;y<o.length;y++){var l=new v.GeometryInstance({geometry:A(o[y])});a.push(l)}var p=m.GeometryPipeline.combineInstances(a)[0],c=i.BoundingSphere.fromPoints(t.positions);return new d.Geometry({attributes:p.attributes,indices:p.indices,primitiveType:p.primitiveType,boundingSphere:c})}}},function(t,r){return e.defined(r)&&(t=D.unpack(t,r)),t._ellipsoid=o.Ellipsoid.clone(t._ellipsoid),D.createGeometry(t)}}));
