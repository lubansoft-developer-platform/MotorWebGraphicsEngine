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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./Plane-84b14a0a","./VertexFormat-a4fe3a21","./FrustumGeometry-0537c948"],(function(e,t,r,n,a,i,u,o,c,s,p,m,f,h,d,k,g){"use strict";function y(r){t.Check.typeOf.object("options",r),t.Check.typeOf.object("options.frustum",r.frustum),t.Check.typeOf.object("options.origin",r.origin),t.Check.typeOf.object("options.orientation",r.orientation);var a,u,o=r.frustum,c=r.orientation,s=r.origin,p=e.defaultValue(r._drawNearPlane,!0);o instanceof g.PerspectiveFrustum?(a=0,u=g.PerspectiveFrustum.packedLength):o instanceof g.OrthographicFrustum&&(a=1,u=g.OrthographicFrustum.packedLength),this._frustumType=a,this._frustum=o.clone(),this._origin=n.Cartesian3.clone(s),this._orientation=i.Quaternion.clone(c),this._drawNearPlane=p,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+u+n.Cartesian3.packedLength+i.Quaternion.packedLength}y.pack=function(r,a,u){t.Check.typeOf.object("value",r),t.Check.defined("array",a),u=e.defaultValue(u,0);var o=r._frustumType,c=r._frustum;return a[u++]=o,0===o?(g.PerspectiveFrustum.pack(c,a,u),u+=g.PerspectiveFrustum.packedLength):(g.OrthographicFrustum.pack(c,a,u),u+=g.OrthographicFrustum.packedLength),n.Cartesian3.pack(r._origin,a,u),u+=n.Cartesian3.packedLength,i.Quaternion.pack(r._orientation,a,u),a[u+=i.Quaternion.packedLength]=r._drawNearPlane?1:0,a};var _=new g.PerspectiveFrustum,l=new g.OrthographicFrustum,b=new i.Quaternion,v=new n.Cartesian3;return y.unpack=function(r,a,u){t.Check.defined("array",r),a=e.defaultValue(a,0);var o,c=r[a++];0===c?(o=g.PerspectiveFrustum.unpack(r,a,_),a+=g.PerspectiveFrustum.packedLength):(o=g.OrthographicFrustum.unpack(r,a,l),a+=g.OrthographicFrustum.packedLength);var s=n.Cartesian3.unpack(r,a,v);a+=n.Cartesian3.packedLength;var p=i.Quaternion.unpack(r,a,b),m=1===r[a+=i.Quaternion.packedLength];if(!e.defined(u))return new y({frustum:o,origin:s,orientation:p,_drawNearPlane:m});var f=c===u._frustumType?u._frustum:void 0;return u._frustum=o.clone(f),u._frustumType=c,u._origin=n.Cartesian3.clone(s,u._origin),u._orientation=i.Quaternion.clone(p,u._orientation),u._drawNearPlane=m,u},y.createGeometry=function(e){var t=e._frustumType,r=e._frustum,n=e._origin,a=e._orientation,u=e._drawNearPlane,o=new Float64Array(24);g.FrustumGeometry._computeNearFarPlanes(n,a,t,r,o);for(var c,s,p=new h.GeometryAttributes({position:new f.GeometryAttribute({componentDatatype:m.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:o})}),d=u?2:1,k=new Uint16Array(8*(d+1)),y=u?0:1;y<2;++y)s=4*y,k[c=u?8*y:0]=s,k[c+1]=s+1,k[c+2]=s+1,k[c+3]=s+2,k[c+4]=s+2,k[c+5]=s+3,k[c+6]=s+3,k[c+7]=s;for(y=0;y<2;++y)s=4*y,k[c=8*(d+y)]=s,k[c+1]=s+4,k[c+2]=s+1,k[c+3]=s+5,k[c+4]=s+2,k[c+5]=s+6,k[c+6]=s+3,k[c+7]=s+7;return new f.Geometry({attributes:p,indices:k,primitiveType:f.PrimitiveType.LINES,boundingSphere:i.BoundingSphere.fromVertices(o)})},function(t,r){return e.defined(r)&&(t=y.unpack(t,r)),y.createGeometry(t)}}));
