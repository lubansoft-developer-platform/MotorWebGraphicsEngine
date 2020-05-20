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
define(["exports","./when-4ca4e419","./Check-430b3551","./Cartesian3-32451e63"],(function(e,n,i,r){"use strict";function a(){this.high=r.Cartesian3.clone(r.Cartesian3.ZERO),this.low=r.Cartesian3.clone(r.Cartesian3.ZERO)}a.encode=function(e,r){var a;return i.Check.typeOf.number("value",e),n.defined(r)||(r={high:0,low:0}),e>=0?(a=65536*Math.floor(e/65536),r.high=a,r.low=e-a):(a=65536*Math.floor(-e/65536),r.high=-a,r.low=e+a),r};var h={high:0,low:0};a.fromCartesian=function(e,r){i.Check.typeOf.object("cartesian",e),n.defined(r)||(r=new a);var t=r.high,o=r.low;return a.encode(e.x,h),t.x=h.high,o.x=h.low,a.encode(e.y,h),t.y=h.high,o.y=h.low,a.encode(e.z,h),t.z=h.high,o.z=h.low,r};var t=new a;a.writeElements=function(e,n,r){i.Check.defined("cartesianArray",n),i.Check.typeOf.number("index",r),i.Check.typeOf.number.greaterThanOrEquals("index",r,0),a.fromCartesian(e,t);var h=t.high,o=t.low;n[r]=h.x,n[r+1]=h.y,n[r+2]=h.z,n[r+3]=o.x,n[r+4]=o.y,n[r+5]=o.z},e.EncodedCartesian3=a}));
