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
define(["exports","./defineProperties-163ddb68","./Cartesian3-32451e63","./Transforms-7b04d7e0","./Matrix4-33464f2b"],(function(a,r,e,i,t){"use strict";var n={},s=new e.Cartesian3,o=new e.Cartesian3,l=new i.Quaternion,C=new t.Matrix3;function y(a,r,n,y,u,m,c,h,x,M){var f=a+r;e.Cartesian3.multiplyByScalar(y,Math.cos(f),s),e.Cartesian3.multiplyByScalar(n,Math.sin(f),o),e.Cartesian3.add(s,o,s);var d=Math.cos(a);d*=d;var z=Math.sin(a);z*=z;var _=m/Math.sqrt(c*d+u*z)/h;return i.Quaternion.fromAxisAngle(s,_,l),t.Matrix3.fromQuaternion(l,C),t.Matrix3.multiplyByVector(C,x,M),e.Cartesian3.normalize(M,M),e.Cartesian3.multiplyByScalar(M,h,M),M}var u=new e.Cartesian3,m=new e.Cartesian3,c=new e.Cartesian3,h=new e.Cartesian3;n.raisePositionsToHeight=function(a,r,i){for(var t=r.ellipsoid,n=r.height,s=r.extrudedHeight,o=i?a.length/3*2:a.length/3,l=new Float64Array(3*o),C=a.length,y=i?C:0,x=0;x<C;x+=3){var M=x+1,f=x+2,d=e.Cartesian3.fromArray(a,x,u);t.scaleToGeodeticSurface(d,d);var z=e.Cartesian3.clone(d,m),_=t.geodeticSurfaceNormal(d,h),v=e.Cartesian3.multiplyByScalar(_,n,c);e.Cartesian3.add(d,v,d),i&&(e.Cartesian3.multiplyByScalar(_,s,v),e.Cartesian3.add(z,v,z),l[x+y]=z.x,l[M+y]=z.y,l[f+y]=z.z),l[x]=d.x,l[M]=d.y,l[f]=d.z}return l};var x=new e.Cartesian3,M=new e.Cartesian3,f=new e.Cartesian3;n.computeEllipsePositions=function(a,i,t){var n=a.semiMinorAxis,s=a.semiMajorAxis,o=a.rotation,l=a.center,C=8*a.granularity,h=n*n,d=s*s,z=s*n,_=e.Cartesian3.magnitude(l),v=e.Cartesian3.normalize(l,x),O=e.Cartesian3.cross(e.Cartesian3.UNIT_Z,l,M);O=e.Cartesian3.normalize(O,O);var p=e.Cartesian3.cross(v,O,f),P=1+Math.ceil(r.CesiumMath.PI_OVER_TWO/C),w=r.CesiumMath.PI_OVER_TWO/(P-1),T=r.CesiumMath.PI_OVER_TWO-P*w;T<0&&(P-=Math.ceil(Math.abs(T)/w));var I,g,E,V,A,R=i?new Array(3*(P*(P+2)*2)):void 0,W=0,S=u,B=m,b=4*P*3,Q=b-1,G=0,H=t?new Array(b):void 0;for(S=y(T=r.CesiumMath.PI_OVER_TWO,o,p,O,h,z,d,_,v,S),i&&(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z),t&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x),T=r.CesiumMath.PI_OVER_TWO-w,I=1;I<P+1;++I){if(S=y(T,o,p,O,h,z,d,_,v,S),B=y(Math.PI-T,o,p,O,h,z,d,_,v,B),i){for(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z,E=2*I+2,g=1;g<E-1;++g)V=g/(E-1),A=e.Cartesian3.lerp(S,B,V,c),R[W++]=A.x,R[W++]=A.y,R[W++]=A.z;R[W++]=B.x,R[W++]=B.y,R[W++]=B.z}t&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x,H[G++]=B.x,H[G++]=B.y,H[G++]=B.z),T=r.CesiumMath.PI_OVER_TWO-(I+1)*w}for(I=P;I>1;--I){if(S=y(-(T=r.CesiumMath.PI_OVER_TWO-(I-1)*w),o,p,O,h,z,d,_,v,S),B=y(T+Math.PI,o,p,O,h,z,d,_,v,B),i){for(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z,E=2*(I-1)+2,g=1;g<E-1;++g)V=g/(E-1),A=e.Cartesian3.lerp(S,B,V,c),R[W++]=A.x,R[W++]=A.y,R[W++]=A.z;R[W++]=B.x,R[W++]=B.y,R[W++]=B.z}t&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x,H[G++]=B.x,H[G++]=B.y,H[G++]=B.z)}S=y(-(T=r.CesiumMath.PI_OVER_TWO),o,p,O,h,z,d,_,v,S);var N={};return i&&(R[W++]=S.x,R[W++]=S.y,R[W++]=S.z,N.positions=R,N.numPts=P),t&&(H[Q--]=S.z,H[Q--]=S.y,H[Q--]=S.x,N.outerPositions=H),N},a.EllipseGeometryLibrary=n}));
