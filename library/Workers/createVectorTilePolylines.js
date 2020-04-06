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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Cartesian2-f49a1383","./WebGLConstants-2ddfa2f9","./AttributeCompression-7809eba4","./IndexDatatype-153fdd7f","./createTaskProcessorWorker"],(function(a,e,r,n,t,i,s,u,o,c){"use strict";var f=new t.Cartographic,p=new n.Cartesian3;var C=new i.Rectangle,d=new t.Ellipsoid,b=new n.Cartesian3,l={min:void 0,max:void 0};var w=new n.Cartesian3,h=new n.Cartesian3,y=new n.Cartesian3,k=new n.Cartesian3,v=new n.Cartesian3;return c((function(a,e){var s=new Uint16Array(a.positions),c=new Uint16Array(a.widths),A=new Uint32Array(a.counts),g=new Uint16Array(a.batchIds);!function(a){a=new Float64Array(a);var e=0;l.min=a[e++],l.max=a[e++],i.Rectangle.unpack(a,e,C),e+=i.Rectangle.packedLength,t.Ellipsoid.unpack(a,e,d),e+=t.Ellipsoid.packedLength,n.Cartesian3.unpack(a,e,b)}(a.packedBuffer);var m,E=d,x=b,D=function(a,e,i,s,o){var c=a.length/3,C=a.subarray(0,c),d=a.subarray(c,2*c),b=a.subarray(2*c,3*c);u.AttributeCompression.zigZagDeltaDecode(C,d,b);for(var l=new Float32Array(a.length),w=0;w<c;++w){var h=C[w],y=d[w],k=b[w],v=r.CesiumMath.lerp(e.west,e.east,h/32767),A=r.CesiumMath.lerp(e.south,e.north,y/32767),g=r.CesiumMath.lerp(i,s,k/32767),m=t.Cartographic.fromRadians(v,A,g,f),E=o.cartographicToCartesian(m,p);n.Cartesian3.pack(E,l,3*w)}return l}(s,C,l.min,l.max,E),I=D.length/3,T=4*I-4,U=new Float32Array(3*T),F=new Float32Array(3*T),N=new Float32Array(3*T),P=new Float32Array(2*T),R=new Uint16Array(T),L=0,M=0,S=0,_=0,G=A.length;for(m=0;m<G;++m){for(var W=A[m],B=c[m],z=g[m],H=0;H<W;++H){var O;if(0===H){var Y=n.Cartesian3.unpack(D,3*_,w),Z=n.Cartesian3.unpack(D,3*(_+1),h);O=n.Cartesian3.subtract(Y,Z,y),n.Cartesian3.add(Y,O,O)}else O=n.Cartesian3.unpack(D,3*(_+H-1),y);var j,q=n.Cartesian3.unpack(D,3*(_+H),k);if(H===W-1){var J=n.Cartesian3.unpack(D,3*(_+W-1),w),K=n.Cartesian3.unpack(D,3*(_+W-2),h);j=n.Cartesian3.subtract(J,K,v),n.Cartesian3.add(J,j,j)}else j=n.Cartesian3.unpack(D,3*(_+H+1),v);n.Cartesian3.subtract(O,x,O),n.Cartesian3.subtract(q,x,q),n.Cartesian3.subtract(j,x,j);for(var Q=H===W-1?2:4,V=0===H?2:0;V<Q;++V){n.Cartesian3.pack(q,U,L),n.Cartesian3.pack(O,F,L),n.Cartesian3.pack(j,N,L),L+=3;var X=V-2<0?-1:1;P[M++]=V%2*2-1,P[M++]=X*B,R[S++]=z}}_+=W}var $=o.IndexDatatype.createTypedArray(T,6*I-6),aa=0,ea=0;for(G=I-1,m=0;m<G;++m)$[ea++]=aa,$[ea++]=aa+2,$[ea++]=aa+1,$[ea++]=aa+1,$[ea++]=aa+2,$[ea++]=aa+3,aa+=4;return e.push(U.buffer,F.buffer,N.buffer),e.push(P.buffer,R.buffer,$.buffer),{indexDatatype:2===$.BYTES_PER_ELEMENT?o.IndexDatatype.UNSIGNED_SHORT:o.IndexDatatype.UNSIGNED_INT,currentPositions:U.buffer,previousPositions:F.buffer,nextPositions:N.buffer,expandAndWidth:P.buffer,batchIds:R.buffer,indices:$.buffer}}))}));
