define(["exports","./when-7ef6387a","./Check-ed6a1804","./Cartesian3-cb3509e0","./Transforms-fe3a4031","./Matrix4-a5b26d08","./ComponentDatatype-3593b1c2","./GeometryAttribute-e8505198","./PrimitiveType-4c1d698a","./GeometryAttributes-cb18da36","./Plane-49ba40bc","./VertexFormat-c6d7c90a"],(function(t,e,a,i,r,n,o,s,f,u,l,h){"use strict";function p(t){this.planes=e.defaultValue(t,[])}var d=[new i.Cartesian3,new i.Cartesian3,new i.Cartesian3];i.Cartesian3.clone(i.Cartesian3.UNIT_X,d[0]),i.Cartesian3.clone(i.Cartesian3.UNIT_Y,d[1]),i.Cartesian3.clone(i.Cartesian3.UNIT_Z,d[2]);var c=new i.Cartesian3,m=new i.Cartesian3,C=new l.Plane(new i.Cartesian3(1,0,0),0);function _(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT),this.left=t.left,this._left=void 0,this.right=t.right,this._right=void 0,this.top=t.top,this._top=void 0,this.bottom=t.bottom,this._bottom=void 0,this.near=e.defaultValue(t.near,1),this._near=this.near,this.far=e.defaultValue(t.far,5e8),this._far=this.far,this._cullingVolume=new p,this._orthographicMatrix=new n.Matrix4}function y(t){t.top===t._top&&t.bottom===t._bottom&&t.left===t._left&&t.right===t._right&&t.near===t._near&&t.far===t._far||(t._left=t.left,t._right=t.right,t._top=t.top,t._bottom=t.bottom,t._near=t.near,t._far=t.far,t._orthographicMatrix=n.Matrix4.computeOrthographicOffCenter(t.left,t.right,t.bottom,t.top,t.near,t.far,t._orthographicMatrix))}p.fromBoundingSphere=function(t,a){e.defined(a)||(a=new p);var r=d.length,o=a.planes;o.length=2*r;for(var s=t.center,f=t.radius,u=0,l=0;l<r;++l){var h=d[l],C=o[u],_=o[u+1];e.defined(C)||(C=o[u]=new n.Cartesian4),e.defined(_)||(_=o[u+1]=new n.Cartesian4),i.Cartesian3.multiplyByScalar(h,-f,c),i.Cartesian3.add(s,c,c),C.x=h.x,C.y=h.y,C.z=h.z,C.w=-i.Cartesian3.dot(h,c),i.Cartesian3.multiplyByScalar(h,f,c),i.Cartesian3.add(s,c,c),_.x=-h.x,_.y=-h.y,_.z=-h.z,_.w=-i.Cartesian3.dot(i.Cartesian3.negate(h,m),c),u+=2}return a},p.prototype.computeVisibility=function(t){for(var e=this.planes,a=!1,i=0,n=e.length;i<n;++i){var o=t.intersectPlane(l.Plane.fromCartesian4(e[i],C));if(o===r.Intersect.OUTSIDE)return r.Intersect.OUTSIDE;o===r.Intersect.INTERSECTING&&(a=!0)}return a?r.Intersect.INTERSECTING:r.Intersect.INSIDE},p.prototype.computeVisibilityWithPlaneMask=function(t,e){if(e===p.MASK_OUTSIDE||e===p.MASK_INSIDE)return e;for(var a=p.MASK_INSIDE,i=this.planes,n=0,o=i.length;n<o;++n){var s=n<31?1<<n:0;if(!(n<31&&0==(e&s))){var f=t.intersectPlane(l.Plane.fromCartesian4(i[n],C));if(f===r.Intersect.OUTSIDE)return p.MASK_OUTSIDE;f===r.Intersect.INTERSECTING&&(a|=s)}}return a},p.MASK_OUTSIDE=4294967295,p.MASK_INSIDE=0,p.MASK_INDETERMINATE=2147483647,Object.defineProperties(_.prototype,{projectionMatrix:{get:function(){return y(this),this._orthographicMatrix}}});var v=new i.Cartesian3,g=new i.Cartesian3,w=new i.Cartesian3,x=new i.Cartesian3;function b(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new _,this.width=t.width,this._width=void 0,this.aspectRatio=t.aspectRatio,this._aspectRatio=void 0,this.near=e.defaultValue(t.near,1),this._near=this.near,this.far=e.defaultValue(t.far,5e8),this._far=this.far}function M(t){var e=t._offCenterFrustum;if(t.width!==t._width||t.aspectRatio!==t._aspectRatio||t.near!==t._near||t.far!==t._far){t._aspectRatio=t.aspectRatio,t._width=t.width,t._near=t.near,t._far=t.far;var a=1/t.aspectRatio;e.right=.5*t.width,e.left=-e.right,e.top=a*e.right,e.bottom=-e.top,e.near=t.near,e.far=t.far}}function F(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT),this.left=t.left,this._left=void 0,this.right=t.right,this._right=void 0,this.top=t.top,this._top=void 0,this.bottom=t.bottom,this._bottom=void 0,this.near=e.defaultValue(t.near,1),this._near=this.near,this.far=e.defaultValue(t.far,5e8),this._far=this.far,this._cullingVolume=new p,this._perspectiveMatrix=new n.Matrix4,this._infinitePerspective=new n.Matrix4}function V(t){var e=t.top,a=t.bottom,i=t.right,r=t.left,o=t.near,s=t.far;e===t._top&&a===t._bottom&&r===t._left&&i===t._right&&o===t._near&&s===t._far||(t._left=r,t._right=i,t._top=e,t._bottom=a,t._near=o,t._far=s,t._perspectiveMatrix=n.Matrix4.computePerspectiveOffCenter(r,i,a,e,o,s,t._perspectiveMatrix),t._infinitePerspective=n.Matrix4.computeInfinitePerspectiveOffCenter(r,i,a,e,o,t._infinitePerspective))}_.prototype.computeCullingVolume=function(t,a,r){var o=this._cullingVolume.planes,s=this.top,f=this.bottom,u=this.right,l=this.left,h=this.near,p=this.far,d=i.Cartesian3.cross(a,r,v);i.Cartesian3.normalize(d,d);var c=g;i.Cartesian3.multiplyByScalar(a,h,c),i.Cartesian3.add(t,c,c);var m=w;i.Cartesian3.multiplyByScalar(d,l,m),i.Cartesian3.add(c,m,m);var C=o[0];return e.defined(C)||(C=o[0]=new n.Cartesian4),C.x=d.x,C.y=d.y,C.z=d.z,C.w=-i.Cartesian3.dot(d,m),i.Cartesian3.multiplyByScalar(d,u,m),i.Cartesian3.add(c,m,m),C=o[1],e.defined(C)||(C=o[1]=new n.Cartesian4),C.x=-d.x,C.y=-d.y,C.z=-d.z,C.w=-i.Cartesian3.dot(i.Cartesian3.negate(d,x),m),i.Cartesian3.multiplyByScalar(r,f,m),i.Cartesian3.add(c,m,m),C=o[2],e.defined(C)||(C=o[2]=new n.Cartesian4),C.x=r.x,C.y=r.y,C.z=r.z,C.w=-i.Cartesian3.dot(r,m),i.Cartesian3.multiplyByScalar(r,s,m),i.Cartesian3.add(c,m,m),C=o[3],e.defined(C)||(C=o[3]=new n.Cartesian4),C.x=-r.x,C.y=-r.y,C.z=-r.z,C.w=-i.Cartesian3.dot(i.Cartesian3.negate(r,x),m),C=o[4],e.defined(C)||(C=o[4]=new n.Cartesian4),C.x=a.x,C.y=a.y,C.z=a.z,C.w=-i.Cartesian3.dot(a,c),i.Cartesian3.multiplyByScalar(a,p,m),i.Cartesian3.add(t,m,m),C=o[5],e.defined(C)||(C=o[5]=new n.Cartesian4),C.x=-a.x,C.y=-a.y,C.z=-a.z,C.w=-i.Cartesian3.dot(i.Cartesian3.negate(a,x),m),this._cullingVolume},_.prototype.getPixelDimensions=function(t,e,a,i,r){y(this);var n=i*(this.right-this.left)/t,o=i*(this.top-this.bottom)/e;return r.x=n,r.y=o,r},_.prototype.clone=function(t){return e.defined(t)||(t=new _),t.left=this.left,t.right=this.right,t.top=this.top,t.bottom=this.bottom,t.near=this.near,t.far=this.far,t._left=void 0,t._right=void 0,t._top=void 0,t._bottom=void 0,t._near=void 0,t._far=void 0,t},_.prototype.equals=function(t){return e.defined(t)&&t instanceof _&&this.right===t.right&&this.left===t.left&&this.top===t.top&&this.bottom===t.bottom&&this.near===t.near&&this.far===t.far},_.prototype.equalsEpsilon=function(t,a,r){return t===this||e.defined(t)&&t instanceof _&&i.CesiumMath.equalsEpsilon(this.right,t.right,a,r)&&i.CesiumMath.equalsEpsilon(this.left,t.left,a,r)&&i.CesiumMath.equalsEpsilon(this.top,t.top,a,r)&&i.CesiumMath.equalsEpsilon(this.bottom,t.bottom,a,r)&&i.CesiumMath.equalsEpsilon(this.near,t.near,a,r)&&i.CesiumMath.equalsEpsilon(this.far,t.far,a,r)},b.packedLength=4,b.pack=function(t,a,i){return i=e.defaultValue(i,0),a[i++]=t.width,a[i++]=t.aspectRatio,a[i++]=t.near,a[i]=t.far,a},b.unpack=function(t,a,i){return a=e.defaultValue(a,0),e.defined(i)||(i=new b),i.width=t[a++],i.aspectRatio=t[a++],i.near=t[a++],i.far=t[a],i},Object.defineProperties(b.prototype,{projectionMatrix:{get:function(){return M(this),this._offCenterFrustum.projectionMatrix}}}),b.prototype.computeCullingVolume=function(t,e,a){return M(this),this._offCenterFrustum.computeCullingVolume(t,e,a)},b.prototype.getPixelDimensions=function(t,e,a,i,r){return M(this),this._offCenterFrustum.getPixelDimensions(t,e,a,i,r)},b.prototype.clone=function(t){return e.defined(t)||(t=new b),t.aspectRatio=this.aspectRatio,t.width=this.width,t.near=this.near,t.far=this.far,t._aspectRatio=void 0,t._width=void 0,t._near=void 0,t._far=void 0,this._offCenterFrustum.clone(t._offCenterFrustum),t},b.prototype.equals=function(t){return!!(e.defined(t)&&t instanceof b)&&(M(this),M(t),this.width===t.width&&this.aspectRatio===t.aspectRatio&&this._offCenterFrustum.equals(t._offCenterFrustum))},b.prototype.equalsEpsilon=function(t,a,r){return!!(e.defined(t)&&t instanceof b)&&(M(this),M(t),i.CesiumMath.equalsEpsilon(this.width,t.width,a,r)&&i.CesiumMath.equalsEpsilon(this.aspectRatio,t.aspectRatio,a,r)&&this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum,a,r))},Object.defineProperties(F.prototype,{projectionMatrix:{get:function(){return V(this),this._perspectiveMatrix}},infiniteProjectionMatrix:{get:function(){return V(this),this._infinitePerspective}}});var E=new i.Cartesian3,O=new i.Cartesian3,P=new i.Cartesian3,z=new i.Cartesian3;function R(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT),this._offCenterFrustum=new F,this.fov=t.fov,this._fov=void 0,this._fovy=void 0,this._sseDenominator=void 0,this.aspectRatio=t.aspectRatio,this._aspectRatio=void 0,this.near=e.defaultValue(t.near,1),this._near=this.near,this.far=e.defaultValue(t.far,5e8),this._far=this.far,this.xOffset=e.defaultValue(t.xOffset,0),this._xOffset=this.xOffset,this.yOffset=e.defaultValue(t.yOffset,0),this._yOffset=this.yOffset}function T(t){var e=t._offCenterFrustum;t.fov===t._fov&&t.aspectRatio===t._aspectRatio&&t.near===t._near&&t.far===t._far&&t.xOffset===t._xOffset&&t.yOffset===t._yOffset||(t._aspectRatio=t.aspectRatio,t._fov=t.fov,t._fovy=t.aspectRatio>1?t.fov:2*Math.atan(Math.tan(.5*t.fov)/t.aspectRatio),t._near=t.near,t._far=t.far,t._sseDenominator=2*Math.tan(.5*t._fovy),t._xOffset=t.xOffset,t._yOffset=t.yOffset,e.top=t.near*Math.tan(.5*t._fovy),e.bottom=-e.top,e.right=t.aspectRatio*e.top,e.left=-e.right,e.near=t.near,e.far=t.far,e.right+=t.xOffset,e.left+=t.xOffset,e.top+=t.yOffset,e.bottom+=t.yOffset)}F.prototype.computeCullingVolume=function(t,a,r){var o=this._cullingVolume.planes,s=this.top,f=this.bottom,u=this.right,l=this.left,h=this.near,p=this.far,d=i.Cartesian3.cross(a,r,E),c=O;i.Cartesian3.multiplyByScalar(a,h,c),i.Cartesian3.add(t,c,c);var m=P;i.Cartesian3.multiplyByScalar(a,p,m),i.Cartesian3.add(t,m,m);var C=z;i.Cartesian3.multiplyByScalar(d,l,C),i.Cartesian3.add(c,C,C),i.Cartesian3.subtract(C,t,C),i.Cartesian3.normalize(C,C),i.Cartesian3.cross(C,r,C),i.Cartesian3.normalize(C,C);var _=o[0];return e.defined(_)||(_=o[0]=new n.Cartesian4),_.x=C.x,_.y=C.y,_.z=C.z,_.w=-i.Cartesian3.dot(C,t),i.Cartesian3.multiplyByScalar(d,u,C),i.Cartesian3.add(c,C,C),i.Cartesian3.subtract(C,t,C),i.Cartesian3.cross(r,C,C),i.Cartesian3.normalize(C,C),_=o[1],e.defined(_)||(_=o[1]=new n.Cartesian4),_.x=C.x,_.y=C.y,_.z=C.z,_.w=-i.Cartesian3.dot(C,t),i.Cartesian3.multiplyByScalar(r,f,C),i.Cartesian3.add(c,C,C),i.Cartesian3.subtract(C,t,C),i.Cartesian3.cross(d,C,C),i.Cartesian3.normalize(C,C),_=o[2],e.defined(_)||(_=o[2]=new n.Cartesian4),_.x=C.x,_.y=C.y,_.z=C.z,_.w=-i.Cartesian3.dot(C,t),i.Cartesian3.multiplyByScalar(r,s,C),i.Cartesian3.add(c,C,C),i.Cartesian3.subtract(C,t,C),i.Cartesian3.cross(C,d,C),i.Cartesian3.normalize(C,C),_=o[3],e.defined(_)||(_=o[3]=new n.Cartesian4),_.x=C.x,_.y=C.y,_.z=C.z,_.w=-i.Cartesian3.dot(C,t),_=o[4],e.defined(_)||(_=o[4]=new n.Cartesian4),_.x=a.x,_.y=a.y,_.z=a.z,_.w=-i.Cartesian3.dot(a,c),i.Cartesian3.negate(a,C),_=o[5],e.defined(_)||(_=o[5]=new n.Cartesian4),_.x=C.x,_.y=C.y,_.z=C.z,_.w=-i.Cartesian3.dot(C,m),this._cullingVolume},F.prototype.getPixelDimensions=function(t,e,a,i,r){V(this);var n=1/this.near,o=this.top*n,s=2*i*a*o/e,f=2*i*a*(o=this.right*n)/t;return r.x=f,r.y=s,r},F.prototype.clone=function(t){return e.defined(t)||(t=new F),t.right=this.right,t.left=this.left,t.top=this.top,t.bottom=this.bottom,t.near=this.near,t.far=this.far,t._left=void 0,t._right=void 0,t._top=void 0,t._bottom=void 0,t._near=void 0,t._far=void 0,t},F.prototype.equals=function(t){return e.defined(t)&&t instanceof F&&this.right===t.right&&this.left===t.left&&this.top===t.top&&this.bottom===t.bottom&&this.near===t.near&&this.far===t.far},F.prototype.equalsEpsilon=function(t,a,r){return t===this||e.defined(t)&&t instanceof F&&i.CesiumMath.equalsEpsilon(this.right,t.right,a,r)&&i.CesiumMath.equalsEpsilon(this.left,t.left,a,r)&&i.CesiumMath.equalsEpsilon(this.top,t.top,a,r)&&i.CesiumMath.equalsEpsilon(this.bottom,t.bottom,a,r)&&i.CesiumMath.equalsEpsilon(this.near,t.near,a,r)&&i.CesiumMath.equalsEpsilon(this.far,t.far,a,r)},R.packedLength=6,R.pack=function(t,a,i){return i=e.defaultValue(i,0),a[i++]=t.fov,a[i++]=t.aspectRatio,a[i++]=t.near,a[i++]=t.far,a[i++]=t.xOffset,a[i]=t.yOffset,a},R.unpack=function(t,a,i){return a=e.defaultValue(a,0),e.defined(i)||(i=new R),i.fov=t[a++],i.aspectRatio=t[a++],i.near=t[a++],i.far=t[a++],i.xOffset=t[a++],i.yOffset=t[a],i},Object.defineProperties(R.prototype,{projectionMatrix:{get:function(){return T(this),this._offCenterFrustum.projectionMatrix}},infiniteProjectionMatrix:{get:function(){return T(this),this._offCenterFrustum.infiniteProjectionMatrix}},fovy:{get:function(){return T(this),this._fovy}},sseDenominator:{get:function(){return T(this),this._sseDenominator}}}),R.prototype.computeCullingVolume=function(t,e,a){return T(this),this._offCenterFrustum.computeCullingVolume(t,e,a)},R.prototype.getPixelDimensions=function(t,e,a,i,r){return T(this),this._offCenterFrustum.getPixelDimensions(t,e,a,i,r)},R.prototype.clone=function(t){return e.defined(t)||(t=new R),t.aspectRatio=this.aspectRatio,t.fov=this.fov,t.near=this.near,t.far=this.far,t._aspectRatio=void 0,t._fov=void 0,t._near=void 0,t._far=void 0,this._offCenterFrustum.clone(t._offCenterFrustum),t},R.prototype.equals=function(t){return!!(e.defined(t)&&t instanceof R)&&(T(this),T(t),this.fov===t.fov&&this.aspectRatio===t.aspectRatio&&this._offCenterFrustum.equals(t._offCenterFrustum))},R.prototype.equalsEpsilon=function(t,a,r){return!!(e.defined(t)&&t instanceof R)&&(T(this),T(t),i.CesiumMath.equalsEpsilon(this.fov,t.fov,a,r)&&i.CesiumMath.equalsEpsilon(this.aspectRatio,t.aspectRatio,a,r)&&this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum,a,r))};function S(t){var a,n,o=t.frustum,s=t.orientation,f=t.origin,u=e.defaultValue(t.vertexFormat,h.VertexFormat.DEFAULT),l=e.defaultValue(t._drawNearPlane,!0);o instanceof R?(a=0,n=R.packedLength):o instanceof b&&(a=1,n=b.packedLength),this._frustumType=a,this._frustum=o.clone(),this._origin=i.Cartesian3.clone(f),this._orientation=r.Quaternion.clone(s),this._drawNearPlane=l,this._vertexFormat=u,this._workerName="createFrustumGeometry",this.packedLength=2+n+i.Cartesian3.packedLength+r.Quaternion.packedLength+h.VertexFormat.packedLength}S.pack=function(t,a,n){n=e.defaultValue(n,0);var o=t._frustumType,s=t._frustum;return a[n++]=o,0===o?(R.pack(s,a,n),n+=R.packedLength):(b.pack(s,a,n),n+=b.packedLength),i.Cartesian3.pack(t._origin,a,n),n+=i.Cartesian3.packedLength,r.Quaternion.pack(t._orientation,a,n),n+=r.Quaternion.packedLength,h.VertexFormat.pack(t._vertexFormat,a,n),a[n+=h.VertexFormat.packedLength]=t._drawNearPlane?1:0,a};var k=new R,A=new b,D=new r.Quaternion,I=new i.Cartesian3,q=new h.VertexFormat;function B(t,a,i,r,n,o,s,f){for(var u=t/3*2,l=0;l<4;++l)e.defined(a)&&(a[t]=o.x,a[t+1]=o.y,a[t+2]=o.z),e.defined(i)&&(i[t]=s.x,i[t+1]=s.y,i[t+2]=s.z),e.defined(r)&&(r[t]=f.x,r[t+1]=f.y,r[t+2]=f.z),t+=3;n[u]=0,n[u+1]=0,n[u+2]=1,n[u+3]=0,n[u+4]=1,n[u+5]=1,n[u+6]=0,n[u+7]=1}S.unpack=function(t,a,n){a=e.defaultValue(a,0);var o,s=t[a++];0===s?(o=R.unpack(t,a,k),a+=R.packedLength):(o=b.unpack(t,a,A),a+=b.packedLength);var f=i.Cartesian3.unpack(t,a,I);a+=i.Cartesian3.packedLength;var u=r.Quaternion.unpack(t,a,D);a+=r.Quaternion.packedLength;var l=h.VertexFormat.unpack(t,a,q),p=1===t[a+=h.VertexFormat.packedLength];if(!e.defined(n))return new S({frustum:o,origin:f,orientation:u,vertexFormat:l,_drawNearPlane:p});var d=s===n._frustumType?n._frustum:void 0;return n._frustum=o.clone(d),n._frustumType=s,n._origin=i.Cartesian3.clone(f,n._origin),n._orientation=r.Quaternion.clone(u,n._orientation),n._vertexFormat=h.VertexFormat.clone(l,n._vertexFormat),n._drawNearPlane=p,n};var L=new n.Matrix3,N=new n.Matrix4,G=new n.Matrix4,j=new i.Cartesian3,U=new i.Cartesian3,Q=new i.Cartesian3,K=new i.Cartesian3,Y=new i.Cartesian3,J=new i.Cartesian3,W=new Array(3),X=new Array(4);X[0]=new n.Cartesian4(-1,-1,1,1),X[1]=new n.Cartesian4(1,-1,1,1),X[2]=new n.Cartesian4(1,1,1,1),X[3]=new n.Cartesian4(-1,1,1,1);for(var Z=new Array(4),H=0;H<4;++H)Z[H]=new n.Cartesian4;S._computeNearFarPlanes=function(t,a,r,o,s,f,u,l){var h=n.Matrix3.fromQuaternion(a,L),p=e.defaultValue(f,j),d=e.defaultValue(u,U),c=e.defaultValue(l,Q);p=n.Matrix3.getColumn(h,0,p),d=n.Matrix3.getColumn(h,1,d),c=n.Matrix3.getColumn(h,2,c),i.Cartesian3.normalize(p,p),i.Cartesian3.normalize(d,d),i.Cartesian3.normalize(c,c),i.Cartesian3.negate(p,p);var m,C,_=n.Matrix4.computeView(t,c,d,p,N);if(0===r){var y=o.projectionMatrix,v=n.Matrix4.multiply(y,_,G);C=n.Matrix4.inverse(v,G)}else m=n.Matrix4.inverseTransformation(_,G);e.defined(C)?(W[0]=o.near,W[1]=o.far):(W[0]=0,W[1]=o.near,W[2]=o.far);for(var g=0;g<2;++g)for(var w=0;w<4;++w){var x=n.Cartesian4.clone(X[w],Z[w]);if(e.defined(C)){var b=1/(x=n.Matrix4.multiplyByVector(C,x,x)).w;i.Cartesian3.multiplyByScalar(x,b,x),i.Cartesian3.subtract(x,t,x),i.Cartesian3.normalize(x,x);var M=i.Cartesian3.dot(c,x);i.Cartesian3.multiplyByScalar(x,W[g]/M,x),i.Cartesian3.add(x,t,x)}else{e.defined(o._offCenterFrustum)&&(o=o._offCenterFrustum);var F=W[g],V=W[g+1];x.x=.5*(x.x*(o.right-o.left)+o.left+o.right),x.y=.5*(x.y*(o.top-o.bottom)+o.bottom+o.top),x.z=.5*(x.z*(F-V)-F-V),x.w=1,n.Matrix4.multiplyByVector(m,x,x)}s[12*g+3*w]=x.x,s[12*g+3*w+1]=x.y,s[12*g+3*w+2]=x.z}},S.createGeometry=function(t){var a=t._frustumType,n=t._frustum,l=t._origin,h=t._orientation,p=t._drawNearPlane,d=t._vertexFormat,c=p?6:5,m=new Float64Array(72);S._computeNearFarPlanes(l,h,a,n,m);var C=24;m[C]=m[12],m[C+1]=m[13],m[C+2]=m[14],m[C+3]=m[0],m[C+4]=m[1],m[C+5]=m[2],m[C+6]=m[9],m[C+7]=m[10],m[C+8]=m[11],m[C+9]=m[21],m[C+10]=m[22],m[C+11]=m[23],m[C+=12]=m[15],m[C+1]=m[16],m[C+2]=m[17],m[C+3]=m[3],m[C+4]=m[4],m[C+5]=m[5],m[C+6]=m[0],m[C+7]=m[1],m[C+8]=m[2],m[C+9]=m[12],m[C+10]=m[13],m[C+11]=m[14],m[C+=12]=m[3],m[C+1]=m[4],m[C+2]=m[5],m[C+3]=m[15],m[C+4]=m[16],m[C+5]=m[17],m[C+6]=m[18],m[C+7]=m[19],m[C+8]=m[20],m[C+9]=m[6],m[C+10]=m[7],m[C+11]=m[8],m[C+=12]=m[6],m[C+1]=m[7],m[C+2]=m[8],m[C+3]=m[18],m[C+4]=m[19],m[C+5]=m[20],m[C+6]=m[21],m[C+7]=m[22],m[C+8]=m[23],m[C+9]=m[9],m[C+10]=m[10],m[C+11]=m[11],p||(m=m.subarray(12));var _=new u.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m})});if(e.defined(d.normal)||e.defined(d.tangent)||e.defined(d.bitangent)||e.defined(d.st)){var y=e.defined(d.normal)?new Float32Array(12*c):void 0,v=e.defined(d.tangent)?new Float32Array(12*c):void 0,g=e.defined(d.bitangent)?new Float32Array(12*c):void 0,w=e.defined(d.st)?new Float32Array(8*c):void 0,x=j,b=U,M=Q,F=i.Cartesian3.negate(x,K),V=i.Cartesian3.negate(b,Y),E=i.Cartesian3.negate(M,J);C=0,p&&(B(C,y,v,g,w,E,x,b),C+=12),B(C,y,v,g,w,M,F,b),B(C+=12,y,v,g,w,F,E,b),B(C+=12,y,v,g,w,V,E,F),B(C+=12,y,v,g,w,x,M,b),B(C+=12,y,v,g,w,b,M,F),e.defined(y)&&(_.normal=new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:y})),e.defined(v)&&(_.tangent=new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),e.defined(g)&&(_.bitangent=new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:g})),e.defined(w)&&(_.st=new s.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:w}))}for(var O=new Uint16Array(6*c),P=0;P<c;++P){var z=6*P,R=4*P;O[z]=R,O[z+1]=R+1,O[z+2]=R+2,O[z+3]=R,O[z+4]=R+2,O[z+5]=R+3}return new s.Geometry({attributes:_,indices:O,primitiveType:f.PrimitiveType.TRIANGLES,boundingSphere:r.BoundingSphere.fromVertices(m)})},t.FrustumGeometry=S,t.OrthographicFrustum=b,t.PerspectiveFrustum=R}));
