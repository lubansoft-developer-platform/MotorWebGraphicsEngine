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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Cartesian2-f49a1383","./GeometryAttribute-b8faa946"],(function(t,a,n,r,e,o,s,i,h){"use strict";var g=Math.cos,u=Math.sin,C=Math.sqrt,c={computePosition:function(t,n,r,e,o,s,i){var h=n.radiiSquared,c=t.nwCorner,l=t.boundingRectangle,d=c.latitude-t.granYCos*e+o*t.granXSin,S=g(d),w=u(d),M=h.z*w,m=c.longitude+e*t.granYSin+o*t.granXCos,p=S*g(m),X=S*u(m),Y=h.x*p,f=h.y*X,v=C(Y*p+f*X+M*w);if(s.x=Y/v,s.y=f/v,s.z=M/v,r){var O=t.stNwCorner;a.defined(O)?(d=O.latitude-t.stGranYCos*e+o*t.stGranXSin,m=O.longitude+e*t.stGranYSin+o*t.stGranXCos,i.x=(m-t.stWest)*t.lonScalar,i.y=(d-t.stSouth)*t.latScalar):(i.x=(m-l.west)*t.lonScalar,i.y=(d-l.south)*t.latScalar)}}},l=new h.Matrix2,d=new e.Cartesian3,S=new o.Cartographic,w=new e.Cartesian3,M=new s.GeographicProjection;function m(t,a,n,r,o,s,i){var g=Math.cos(a),u=r*g,C=n*g,c=Math.sin(a),S=r*c,m=n*c;d=M.project(t,d),d=e.Cartesian3.subtract(d,w,d);var p=h.Matrix2.fromRotation(a,l);d=h.Matrix2.multiplyByVector(p,d,d),d=e.Cartesian3.add(d,w,d),s-=1,i-=1;var X=(t=M.unproject(d,t)).latitude,Y=X+s*m,f=X-u*i,v=X-u*i+s*m,O=Math.max(X,Y,f,v),R=Math.min(X,Y,f,v),_=t.longitude,G=_+s*C,P=_+i*S,b=_+i*S+s*C;return{north:O,south:R,east:Math.max(_,G,P,b),west:Math.min(_,G,P,b),granYCos:u,granYSin:S,granXCos:C,granXSin:m,nwCorner:t}}c.computeOptions=function(t,a,e,o,s,h,g){var u,C,c,l,d,p=t.east,X=t.west,Y=t.north,f=t.south,v=!1,O=!1;Y===r.CesiumMath.PI_OVER_TWO&&(v=!0),f===-r.CesiumMath.PI_OVER_TWO&&(O=!0);var R=Y-f;c=(d=X>p?r.CesiumMath.TWO_PI-X+p:p-X)/((u=Math.ceil(d/a)+1)-1),l=R/((C=Math.ceil(R/a)+1)-1);var _=i.Rectangle.northwest(t,h),G=i.Rectangle.center(t,S);0===e&&0===o||(G.longitude<_.longitude&&(G.longitude+=r.CesiumMath.TWO_PI),w=M.project(G,w));var P=l,b=c,x=i.Rectangle.clone(t,s),W={granYCos:P,granYSin:0,granXCos:b,granXSin:0,nwCorner:_,boundingRectangle:x,width:u,height:C,northCap:v,southCap:O};if(0!==e){var y=m(_,e,c,l,0,u,C);if(Y=y.north,f=y.south,p=y.east,X=y.west,Y<-r.CesiumMath.PI_OVER_TWO||Y>r.CesiumMath.PI_OVER_TWO||f<-r.CesiumMath.PI_OVER_TWO||f>r.CesiumMath.PI_OVER_TWO)throw new n.DeveloperError("Rotated rectangle is invalid.  It crosses over either the north or south pole.");W.granYCos=y.granYCos,W.granYSin=y.granYSin,W.granXCos=y.granXCos,W.granXSin=y.granXSin,x.north=Y,x.south=f,x.east=p,x.west=X}if(0!==o){e-=o;var I=i.Rectangle.northwest(x,g),T=m(I,e,c,l,0,u,C);W.stGranYCos=T.granYCos,W.stGranXCos=T.granXCos,W.stGranYSin=T.granYSin,W.stGranXSin=T.granXSin,W.stNwCorner=I,W.stWest=T.west,W.stSouth=T.south}return W},t.RectangleGeometryLibrary=c}));
