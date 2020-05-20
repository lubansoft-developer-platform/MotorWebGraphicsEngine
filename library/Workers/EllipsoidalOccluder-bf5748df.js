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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Transforms-7b04d7e0","./Cartesian2-f49a1383"],(function(e,i,t,a,n,r,o){"use strict";function s(e,a){t.Check.typeOf.object("ellipsoid",e),this._ellipsoid=e,this._cameraPosition=new n.Cartesian3,this._cameraPositionInScaledSpace=new n.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,i.defined(a)&&(this.cameraPosition=a)}a.defineProperties(s.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(e){var i=this._ellipsoid.transformPositionToScaledSpace(e,this._cameraPositionInScaledSpace),t=n.Cartesian3.magnitudeSquared(i)-1;n.Cartesian3.clone(e,this._cameraPosition),this._cameraPositionInScaledSpace=i,this._distanceToLimbInScaledSpaceSquared=t}}});var c=new n.Cartesian3;s.prototype.isPointVisible=function(e){var i=this._ellipsoid.transformPositionToScaledSpace(e,c);return this.isScaledSpacePointVisible(i)},s.prototype.isScaledSpacePointVisible=function(e){var i=this._cameraPositionInScaledSpace,t=this._distanceToLimbInScaledSpaceSquared,a=n.Cartesian3.subtract(e,i,c),r=-n.Cartesian3.dot(a,i);return!(t<0?r>0:r>t&&r*r/n.Cartesian3.magnitudeSquared(a)>t)},s.prototype.computeHorizonCullingPoint=function(e,a,r){t.Check.typeOf.object("directionToPoint",e),t.Check.defined("positions",a),i.defined(r)||(r=new n.Cartesian3);for(var o=this._ellipsoid,s=h(o,e),c=0,d=0,l=a.length;d<l;++d){var u=m(o,a[d],s);c=Math.max(c,u)}return C(s,c,r)};var d=new n.Cartesian3;s.prototype.computeHorizonCullingPointFromVertices=function(e,a,r,o,s){t.Check.typeOf.object("directionToPoint",e),t.Check.defined("vertices",a),t.Check.typeOf.number("stride",r),i.defined(s)||(s=new n.Cartesian3),o=i.defaultValue(o,n.Cartesian3.ZERO);for(var c=this._ellipsoid,l=h(c,e),u=0,p=0,f=a.length;p<f;p+=r){d.x=a[p]+o.x,d.y=a[p+1]+o.y,d.z=a[p+2]+o.z;var S=m(c,d,l);u=Math.max(u,S)}return C(l,u,s)};var l=[];s.prototype.computeHorizonCullingPointFromRectangle=function(e,i,a){t.Check.typeOf.object("rectangle",e);var s=o.Rectangle.subsample(e,i,0,l),c=r.BoundingSphere.fromPoints(s);if(!(n.Cartesian3.magnitude(c.center)<.1*i.minimumRadius))return this.computeHorizonCullingPoint(c.center,s,a)};var u=new n.Cartesian3,p=new n.Cartesian3;function m(e,i,t){var a=e.transformPositionToScaledSpace(i,u),r=n.Cartesian3.magnitudeSquared(a),o=Math.sqrt(r),s=n.Cartesian3.divideByScalar(a,o,p);r=Math.max(1,r);var c=1/(o=Math.max(1,o));return 1/(n.Cartesian3.dot(s,t)*c-n.Cartesian3.magnitude(n.Cartesian3.cross(s,t,s))*(Math.sqrt(r-1)*c))}function C(e,i,t){if(!(i<=0||i===1/0||i!=i))return n.Cartesian3.multiplyByScalar(e,i,t)}var f=new n.Cartesian3;function h(e,i){return n.Cartesian3.equals(i,n.Cartesian3.ZERO)?i:(e.transformPositionToScaledSpace(i,f),n.Cartesian3.normalize(f,f))}e.EllipsoidalOccluder=s}));
