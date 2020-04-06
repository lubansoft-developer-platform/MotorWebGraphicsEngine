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
define(["./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Cartesian3-32451e63","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./RuntimeError-443472b0","./Cartesian2-f49a1383","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9","./ComponentDatatype-329b9462","./AttributeCompression-7809eba4","./IndexDatatype-153fdd7f","./IntersectionTests-15d018f5","./Plane-84b14a0a","./createTaskProcessorWorker","./EllipsoidTangentPlane-3967708f","./OrientedBoundingBox-51e874ad","./EllipsoidalOccluder-bf5748df","./TerrainEncoding-5ed40ec6"],(function(e,i,r,t,n,s,h,u,o,d,p,a,f,l,c,g,m,w,x,v,C){"use strict";var y={clipTriangleAtAxisAlignedThreshold:function(r,t,n,s,h,u){if(!e.defined(r))throw new i.DeveloperError("threshold is required.");if(!e.defined(t))throw new i.DeveloperError("keepAbove is required.");if(!e.defined(n))throw new i.DeveloperError("u0 is required.");if(!e.defined(s))throw new i.DeveloperError("u1 is required.");if(!e.defined(h))throw new i.DeveloperError("u2 is required.");var o,d,p;e.defined(u)?u.length=0:u=[],t?(o=n<r,d=s<r,p=h<r):(o=n>r,d=s>r,p=h>r);var a,f,l,c,g,m,w=o+d+p;return 1===w?o?(a=(r-n)/(s-n),f=(r-n)/(h-n),u.push(1),u.push(2),1!==f&&(u.push(-1),u.push(0),u.push(2),u.push(f)),1!==a&&(u.push(-1),u.push(0),u.push(1),u.push(a))):d?(l=(r-s)/(h-s),c=(r-s)/(n-s),u.push(2),u.push(0),1!==c&&(u.push(-1),u.push(1),u.push(0),u.push(c)),1!==l&&(u.push(-1),u.push(1),u.push(2),u.push(l))):p&&(g=(r-h)/(n-h),m=(r-h)/(s-h),u.push(0),u.push(1),1!==m&&(u.push(-1),u.push(2),u.push(1),u.push(m)),1!==g&&(u.push(-1),u.push(2),u.push(0),u.push(g))):2===w?o||n===r?d||s===r?p||h===r||(f=(r-n)/(h-n),l=(r-s)/(h-s),u.push(2),u.push(-1),u.push(0),u.push(2),u.push(f),u.push(-1),u.push(1),u.push(2),u.push(l)):(m=(r-h)/(s-h),a=(r-n)/(s-n),u.push(1),u.push(-1),u.push(2),u.push(1),u.push(m),u.push(-1),u.push(0),u.push(1),u.push(a)):(c=(r-s)/(n-s),g=(r-h)/(n-h),u.push(0),u.push(-1),u.push(1),u.push(0),u.push(c),u.push(-1),u.push(2),u.push(0),u.push(g)):3!==w&&(u.push(0),u.push(1),u.push(2)),u},computeBarycentricCoordinates:function(r,n,s,h,u,o,d,p,a){if(!e.defined(r))throw new i.DeveloperError("x is required.");if(!e.defined(n))throw new i.DeveloperError("y is required.");if(!e.defined(s))throw new i.DeveloperError("x1 is required.");if(!e.defined(h))throw new i.DeveloperError("y1 is required.");if(!e.defined(u))throw new i.DeveloperError("x2 is required.");if(!e.defined(o))throw new i.DeveloperError("y2 is required.");if(!e.defined(d))throw new i.DeveloperError("x3 is required.");if(!e.defined(p))throw new i.DeveloperError("y3 is required.");var f=s-d,l=d-u,c=o-p,g=h-p,m=1/(c*f+l*g),w=n-p,x=r-d,v=(c*x+l*w)*m,C=(-g*x+f*w)*m,y=1-v-C;return e.defined(a)?(a.x=v,a.y=C,a.z=y,a):new t.Cartesian3(v,C,y)},computeLineSegmentLineSegmentIntersection:function(r,t,n,s,h,u,d,p,a){i.Check.typeOf.number("x00",r),i.Check.typeOf.number("y00",t),i.Check.typeOf.number("x01",n),i.Check.typeOf.number("y01",s),i.Check.typeOf.number("x10",h),i.Check.typeOf.number("y10",u),i.Check.typeOf.number("x11",d),i.Check.typeOf.number("y11",p);var f=(p-u)*(n-r)-(d-h)*(s-t);if(0!==f){var l=((d-h)*(t-u)-(p-u)*(r-h))/f,c=((n-r)*(t-u)-(s-t)*(r-h))/f;return l>=0&&l<=1&&c>=0&&c<=1?(e.defined(a)||(a=new o.Cartesian2),a.x=r+l*(n-r),a.y=t+l*(s-t),a):void 0}}},b=[],B=[],I=[],A=new n.Cartographic,E=new t.Cartesian3,D=[],O=[],T=[],z=[],k=[],M=new t.Cartesian3,N=new s.BoundingSphere,V=new x.OrientedBoundingBox,q=new o.Cartesian2,H=new t.Cartesian3;function R(){this.vertexBuffer=void 0,this.index=void 0,this.first=void 0,this.second=void 0,this.ratio=void 0}R.prototype.clone=function(i){return e.defined(i)||(i=new R),i.uBuffer=this.uBuffer,i.vBuffer=this.vBuffer,i.heightBuffer=this.heightBuffer,i.normalBuffer=this.normalBuffer,i.index=this.index,i.first=this.first,i.second=this.second,i.ratio=this.ratio,i},R.prototype.initializeIndexed=function(e,i,r,t,n){this.uBuffer=e,this.vBuffer=i,this.heightBuffer=r,this.normalBuffer=t,this.index=n,this.first=void 0,this.second=void 0,this.ratio=void 0},R.prototype.initializeFromClipResult=function(e,i,r){var t=i+1;return-1!==e[i]?r[e[i]].clone(this):(this.vertexBuffer=void 0,this.index=void 0,this.first=r[e[t]],++t,this.second=r[e[t]],++t,this.ratio=e[t],++t),t},R.prototype.getKey=function(){return this.isIndexed()?this.index:JSON.stringify({first:this.first.getKey(),second:this.second.getKey(),ratio:this.ratio})},R.prototype.isIndexed=function(){return e.defined(this.index)},R.prototype.getH=function(){return e.defined(this.index)?this.heightBuffer[this.index]:r.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio)},R.prototype.getU=function(){return e.defined(this.index)?this.uBuffer[this.index]:r.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio)},R.prototype.getV=function(){return e.defined(this.index)?this.vBuffer[this.index]:r.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio)};var F=new o.Cartesian2,P=-1,S=[new t.Cartesian3,new t.Cartesian3],U=[new t.Cartesian3,new t.Cartesian3];function X(e,i){++P;var r=S[P],n=U[P];return r=f.AttributeCompression.octDecode(e.first.getNormalX(),e.first.getNormalY(),r),n=f.AttributeCompression.octDecode(e.second.getNormalX(),e.second.getNormalY(),n),E=t.Cartesian3.lerp(r,n,e.ratio,E),t.Cartesian3.normalize(E,E),f.AttributeCompression.octEncode(E,i),--P,i}R.prototype.getNormalX=function(){return e.defined(this.index)?this.normalBuffer[2*this.index]:(F=X(this,F)).x},R.prototype.getNormalY=function(){return e.defined(this.index)?this.normalBuffer[2*this.index+1]:(F=X(this,F)).y};var K=[];function L(i,r,t,n,s,h,u,o,d){if(0!==u.length){for(var p=0,a=0;a<u.length;)a=K[p++].initializeFromClipResult(u,a,o);for(var f=0;f<p;++f){var l=K[f];if(l.isIndexed())l.newIndex=h[l.index],l.uBuffer=i,l.vBuffer=r,l.heightBuffer=t,d&&(l.normalBuffer=n);else{var c=l.getKey();if(e.defined(h[c]))l.newIndex=h[c];else{var g=i.length;i.push(l.getU()),r.push(l.getV()),t.push(l.getH()),d&&(n.push(l.getNormalX()),n.push(l.getNormalY())),l.newIndex=g,h[c]=g}}}3===p?(s.push(K[0].newIndex),s.push(K[1].newIndex),s.push(K[2].newIndex)):4===p&&(s.push(K[0].newIndex),s.push(K[1].newIndex),s.push(K[2].newIndex),s.push(K[0].newIndex),s.push(K[2].newIndex),s.push(K[3].newIndex))}}return K.push(new R),K.push(new R),K.push(new R),K.push(new R),m((function(e,i){var h=e.isEastChild,u=e.isNorthChild,o=h?16383:0,d=h?32767:16383,p=u?16383:0,a=u?32767:16383,f=D,c=O,g=T,m=k;f.length=0,c.length=0,g.length=0,m.length=0;var w=z;w.length=0;var F={},P=e.vertices,S=e.indices;S=S.subarray(0,e.skirtIndex);var U,X,K,W,Y,_=C.TerrainEncoding.clone(e.encoding),G=_.hasVertexNormals,J=e.exaggeration,Z=0,j=e.vertexCountWithoutSkirts,Q=e.minimumHeight,$=e.maximumHeight,ee=new Array(j),ie=new Array(j),re=new Array(j),te=G?new Array(2*j):void 0;for(X=0,K=0;X<j;++X,K+=2){var ne=_.decodeTextureCoordinates(P,X,q);if(U=_.decodeHeight(P,X)/J,ee[X]=r.CesiumMath.clamp(32767*ne.x|0,0,32767),ie[X]=r.CesiumMath.clamp(32767*ne.y|0,0,32767),re[X]=r.CesiumMath.clamp((U-Q)/($-Q)*32767|0,0,32767),ee[X]<20&&(ee[X]=0),ie[X]<20&&(ie[X]=0),32767-ee[X]<20&&(ee[X]=32767),32767-ie[X]<20&&(ie[X]=32767),G){var se=_.getOctEncodedNormal(P,X,H);te[K]=se.x,te[K+1]=se.y}}for(X=0,K=0;X<j;++X,K+=2)W=ee[X],Y=ie[X],(h&&W>=16383||!h&&W<=16383)&&(u&&Y>=16383||!u&&Y<=16383)&&(F[X]=Z,f.push(W),c.push(Y),g.push(re[X]),G&&(m.push(te[K]),m.push(te[K+1])),++Z);var he=[];he.push(new R),he.push(new R),he.push(new R);var ue,oe=[];for(oe.push(new R),oe.push(new R),oe.push(new R),X=0;X<S.length;X+=3){var de=S[X],pe=S[X+1],ae=S[X+2],fe=ee[de],le=ee[pe],ce=ee[ae];he[0].initializeIndexed(ee,ie,re,te,de),he[1].initializeIndexed(ee,ie,re,te,pe),he[2].initializeIndexed(ee,ie,re,te,ae);var ge=y.clipTriangleAtAxisAlignedThreshold(16383,h,fe,le,ce,b);(ue=0)>=ge.length||((ue=oe[0].initializeFromClipResult(ge,ue,he))>=ge.length||(ue=oe[1].initializeFromClipResult(ge,ue,he))>=ge.length||(ue=oe[2].initializeFromClipResult(ge,ue,he),L(f,c,g,m,w,F,y.clipTriangleAtAxisAlignedThreshold(16383,u,oe[0].getV(),oe[1].getV(),oe[2].getV(),B),oe,G),ue<ge.length&&(oe[2].clone(oe[1]),oe[2].initializeFromClipResult(ge,ue,he),L(f,c,g,m,w,F,y.clipTriangleAtAxisAlignedThreshold(16383,u,oe[0].getV(),oe[1].getV(),oe[2].getV(),B),oe,G))))}var me=h?-32767:0,we=u?-32767:0,xe=[],ve=[],Ce=[],ye=[],be=Number.MAX_VALUE,Be=-be,Ie=I;Ie.length=0;var Ae=n.Ellipsoid.clone(e.ellipsoid),Ee=e.childRectangle,De=Ee.north,Oe=Ee.south,Te=Ee.east,ze=Ee.west;for(Te<ze&&(Te+=r.CesiumMath.TWO_PI),X=0;X<f.length;++X)(W=Math.round(f[X]))<=o?(xe.push(X),W=0):W>=d?(Ce.push(X),W=32767):W=2*W+me,f[X]=W,(Y=Math.round(c[X]))<=p?(ve.push(X),Y=0):Y>=a?(ye.push(X),Y=32767):Y=2*Y+we,c[X]=Y,(U=r.CesiumMath.lerp(Q,$,g[X]/32767))<be&&(be=U),U>Be&&(Be=U),g[X]=U,A.longitude=r.CesiumMath.lerp(ze,Te,W/32767),A.latitude=r.CesiumMath.lerp(Oe,De,Y/32767),A.height=U,Ae.cartographicToCartesian(A,E),Ie.push(E.x),Ie.push(E.y),Ie.push(E.z);var ke=s.BoundingSphere.fromVertices(Ie,t.Cartesian3.ZERO,3,N),Me=x.OrientedBoundingBox.fromRectangle(Ee,be,Be,Ae,V),Ne=new v.EllipsoidalOccluder(Ae).computeHorizonCullingPointFromVertices(ke.center,Ie,3,ke.center,M),Ve=Be-be,qe=new Uint16Array(f.length+c.length+g.length);for(X=0;X<f.length;++X)qe[X]=f[X];var He=f.length;for(X=0;X<c.length;++X)qe[He+X]=c[X];for(He+=c.length,X=0;X<g.length;++X)qe[He+X]=32767*(g[X]-be)/Ve;var Re,Fe=l.IndexDatatype.createTypedArray(f.length,w);if(G){var Pe=new Uint8Array(m);i.push(qe.buffer,Fe.buffer,Pe.buffer),Re=Pe.buffer}else i.push(qe.buffer,Fe.buffer);return{vertices:qe.buffer,encodedNormals:Re,indices:Fe.buffer,minimumHeight:be,maximumHeight:Be,westIndices:xe,southIndices:ve,eastIndices:Ce,northIndices:ye,boundingSphere:ke,orientedBoundingBox:Me,horizonOcclusionPoint:Ne}}))}));
