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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68"],(function(e,i,n,r){"use strict";var t=r.CesiumMath.EPSILON10;e.arrayRemoveDuplicates=function(e,r,f){if(n.Check.defined("equalsEpsilon",r),i.defined(e)){f=i.defaultValue(f,!1);var s,u,a,l=e.length;if(l<2)return e;for(s=1;s<l&&!r(u=e[s-1],a=e[s],t);++s);if(s===l)return f&&r(e[0],e[e.length-1],t)?e.slice(1):e;for(var h=e.slice(0,s);s<l;++s)r(u,a=e[s],t)||(h.push(a),u=a);return f&&h.length>1&&r(h[0],h[h.length-1],t)&&h.shift(),h}}}));
