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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Matrix4-33464f2b","./Cartesian2-f49a1383","./IntersectionTests-15d018f5","./OrientedBoundingBox-51e874ad"],(function(e,n,t,i,r,a,o,s,u){"use strict";var d={},C=new r.Cartesian3,c=new r.Cartesian3,f=new r.Cartesian3,l=new r.Cartesian3,m=new u.OrientedBoundingBox;function g(e,n,t,i,a){var s=r.Cartesian3.subtract(e,n,C),u=r.Cartesian3.dot(t,s),d=r.Cartesian3.dot(i,s);return o.Cartesian2.fromElements(u,d,a)}d.validOutline=function(e){t.Check.defined("positions",e);var n=u.OrientedBoundingBox.fromPoints(e,m).halfAxes,i=a.Matrix3.getColumn(n,0,c),o=a.Matrix3.getColumn(n,1,f),s=a.Matrix3.getColumn(n,2,l),d=r.Cartesian3.magnitude(i),C=r.Cartesian3.magnitude(o),g=r.Cartesian3.magnitude(s);return!(0===d&&(0===C||0===g)||0===C&&0===g)},d.computeProjectTo2DArguments=function(e,n,i,o){t.Check.defined("positions",e),t.Check.defined("centerResult",n),t.Check.defined("planeAxis1Result",i),t.Check.defined("planeAxis2Result",o);var s,d,C=u.OrientedBoundingBox.fromPoints(e,m),g=C.halfAxes,x=a.Matrix3.getColumn(g,0,c),h=a.Matrix3.getColumn(g,1,f),P=a.Matrix3.getColumn(g,2,l),p=r.Cartesian3.magnitude(x),B=r.Cartesian3.magnitude(h),M=r.Cartesian3.magnitude(P),w=Math.min(p,B,M);return(0!==p||0!==B&&0!==M)&&(0!==B||0!==M)&&(w!==B&&w!==M||(s=x),w===p?s=h:w===M&&(d=h),w!==p&&w!==B||(d=P),r.Cartesian3.normalize(s,i),r.Cartesian3.normalize(d,o),r.Cartesian3.clone(C.center,n),!0)},d.createProjectPointsTo2DFunction=function(e,n,t){return function(i){for(var r=new Array(i.length),a=0;a<i.length;a++)r[a]=g(i[a],e,n,t);return r}},d.createProjectPointTo2DFunction=function(e,n,t){return function(i,r){return g(i,e,n,t,r)}},e.CoplanarPolygonGeometryLibrary=d}));
