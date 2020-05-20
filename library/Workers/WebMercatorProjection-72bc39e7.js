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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12"],(function(e,t,i,o,r,a){"use strict";function n(e){this._ellipsoid=t.defaultValue(e,a.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}o.defineProperties(n.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),n.mercatorAngleToGeodeticLatitude=function(e){return o.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-e))},n.geodeticLatitudeToMercatorAngle=function(e){e>n.MaximumLatitude?e=n.MaximumLatitude:e<-n.MaximumLatitude&&(e=-n.MaximumLatitude);var t=Math.sin(e);return.5*Math.log((1+t)/(1-t))},n.MaximumLatitude=n.mercatorAngleToGeodeticLatitude(Math.PI),n.prototype.project=function(e,i){var o=this._semimajorAxis,a=e.longitude*o,d=n.geodeticLatitudeToMercatorAngle(e.latitude)*o,u=e.height;return t.defined(i)?(i.x=a,i.y=d,i.z=u,i):new r.Cartesian3(a,d,u)},n.prototype.unproject=function(e,o){if(!t.defined(e))throw new i.DeveloperError("cartesian is required");var r=this._oneOverSemimajorAxis,d=e.x*r,u=n.mercatorAngleToGeodeticLatitude(e.y*r),s=e.z;return t.defined(o)?(o.longitude=d,o.latitude=u,o.height=s,o):new a.Cartographic(d,u,s)},e.WebMercatorProjection=n}));
