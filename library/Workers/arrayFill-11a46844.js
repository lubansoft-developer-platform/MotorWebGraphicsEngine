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
define(["exports","./when-4ca4e419","./Check-430b3551"],(function(e,n,t){"use strict";e.arrayFill=function(e,a,f,i){if(t.Check.defined("array",e),t.Check.defined("value",a),n.defined(f)&&t.Check.typeOf.number("start",f),n.defined(i)&&t.Check.typeOf.number("end",i),"function"==typeof e.fill)return e.fill(a,f,i);for(var r=e.length>>>0,u=n.defaultValue(f,0),d=u<0?Math.max(r+u,0):Math.min(u,r),l=n.defaultValue(i,r),h=l<0?Math.max(r+l,0):Math.min(l,r);d<h;)e[d]=a,d++;return e}}));
