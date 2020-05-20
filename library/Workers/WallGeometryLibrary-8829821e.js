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
define(["exports","./when-4ca4e419","./defineProperties-163ddb68","./Ellipsoid-d2aa3b12","./EllipsoidTangentPlane-3967708f","./PolygonPipeline-d25dad97","./PolylinePipeline-4ac94627"],(function(e,i,t,n,r,o,a){"use strict";var l={};function s(e,i){return t.CesiumMath.equalsEpsilon(e.latitude,i.latitude,t.CesiumMath.EPSILON14)&&t.CesiumMath.equalsEpsilon(e.longitude,i.longitude,t.CesiumMath.EPSILON14)}var h=new n.Cartographic,g=new n.Cartographic;var d=new Array(2),p=new Array(2),P={positions:void 0,height:void 0,granularity:void 0,ellipsoid:void 0};l.computePositions=function(e,l,u,c,v,f){var y=function(e,t,r,o){var a=t.length;if(!(a<2)){var l=i.defined(o),d=i.defined(r),p=!0,P=new Array(a),u=new Array(a),c=new Array(a),v=t[0];P[0]=v;var f=e.cartesianToCartographic(v,h);d&&(f.height=r[0]),p=p&&f.height<=0,u[0]=f.height,c[0]=l?o[0]:0;for(var y=1,m=1;m<a;++m){var A=t[m],C=e.cartesianToCartographic(A,g);d&&(C.height=r[m]),p=p&&C.height<=0,s(f,C)?f.height<C.height&&(u[y-1]=C.height):(P[y]=A,u[y]=C.height,c[y]=l?o[m]:0,n.Cartographic.clone(C,f),++y)}if(!(p||y<2))return P.length=y,u.length=y,c.length=y,{positions:P,topHeights:u,bottomHeights:c}}}(e,l,u,c);if(i.defined(y)){if(l=y.positions,u=y.topHeights,c=y.bottomHeights,l.length>=3){var m=r.EllipsoidTangentPlane.fromPoints(l,e).projectPointsOntoPlane(l);o.PolygonPipeline.computeWindingOrder2D(m)===o.WindingOrder.CLOCKWISE&&(l.reverse(),u.reverse(),c.reverse())}var A,C,w=l.length,E=w-2,b=t.CesiumMath.chordLength(v,e.maximumRadius),O=P;if(O.minDistance=b,O.ellipsoid=e,f){var L,M=0;for(L=0;L<w-1;L++)M+=a.PolylinePipeline.numberOfPoints(l[L],l[L+1],b)+1;A=new Float64Array(3*M),C=new Float64Array(3*M);var F=d,H=p;O.positions=F,O.height=H;var T=0;for(L=0;L<w-1;L++){F[0]=l[L],F[1]=l[L+1],H[0]=u[L],H[1]=u[L+1];var W=a.PolylinePipeline.generateArc(O);A.set(W,T),H[0]=c[L],H[1]=c[L+1],C.set(a.PolylinePipeline.generateArc(O),T),T+=W.length}}else O.positions=l,O.height=u,A=new Float64Array(a.PolylinePipeline.generateArc(O)),O.height=c,C=new Float64Array(a.PolylinePipeline.generateArc(O));return{bottomPositions:C,topPositions:A,numCorners:E}}},e.WallGeometryLibrary=l}));
