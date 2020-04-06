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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Cartesian2-f49a1383","./AttributeCompression-7809eba4","./createTaskProcessorWorker"],(function(a,e,r,t,n,i,s,o){"use strict";var c=new n.Cartographic,u=new t.Cartesian3,p=new i.Rectangle,l=new n.Ellipsoid,d={min:void 0,max:void 0};return o((function(a,e){var o=new Uint16Array(a.positions);!function(a){a=new Float64Array(a);var e=0;d.min=a[e++],d.max=a[e++],i.Rectangle.unpack(a,e,p),e+=i.Rectangle.packedLength,n.Ellipsoid.unpack(a,e,l)}(a.packedBuffer);var f=p,h=l,C=d.min,m=d.max,b=o.length/3,g=o.subarray(0,b),w=o.subarray(b,2*b),k=o.subarray(2*b,3*b);s.AttributeCompression.zigZagDeltaDecode(g,w,k);for(var v=new Float64Array(o.length),y=0;y<b;++y){var A=g[y],R=w[y],x=k[y],E=r.CesiumMath.lerp(f.west,f.east,A/32767),M=r.CesiumMath.lerp(f.south,f.north,R/32767),D=r.CesiumMath.lerp(C,m,x/32767),F=n.Cartographic.fromRadians(E,M,D,c),P=h.cartographicToCartesian(F,u);t.Cartesian3.pack(P,v,3*y)}return e.push(v.buffer),{positions:v.buffer}}))}));
