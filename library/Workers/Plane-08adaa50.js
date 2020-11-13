define(["exports","./when-7ef6387a","./DeveloperError-101d8eb9","./Check-71521db1","./Cartesian3-ca5d3f12","./Matrix4-027dd006"],(function(e,n,t,a,r,i){"use strict";function o(e,n){if(a.Check.typeOf.object("normal",e),!r.CesiumMath.equalsEpsilon(r.Cartesian3.magnitude(e),1,r.CesiumMath.EPSILON6))throw new t.DeveloperError("normal must be normalized.");a.Check.typeOf.number("distance",n),this.normal=r.Cartesian3.clone(e),this.distance=n}o.fromPointNormal=function(e,i,c){if(a.Check.typeOf.object("point",e),a.Check.typeOf.object("normal",i),!r.CesiumMath.equalsEpsilon(r.Cartesian3.magnitude(i),1,r.CesiumMath.EPSILON6))throw new t.DeveloperError("normal must be normalized.");var s=-r.Cartesian3.dot(i,e);return n.defined(c)?(r.Cartesian3.clone(i,c.normal),c.distance=s,c):new o(i,s)};var c=new r.Cartesian3;o.fromCartesian4=function(e,i){a.Check.typeOf.object("coefficients",e);var s=r.Cartesian3.fromCartesian4(e,c),l=e.w;if(!r.CesiumMath.equalsEpsilon(r.Cartesian3.magnitude(s),1,r.CesiumMath.EPSILON6))throw new t.DeveloperError("normal must be normalized.");return n.defined(i)?(r.Cartesian3.clone(s,i.normal),i.distance=l,i):new o(s,l)},o.getPointDistance=function(e,n){return a.Check.typeOf.object("plane",e),a.Check.typeOf.object("point",n),r.Cartesian3.dot(e.normal,n)+e.distance};var s=new r.Cartesian3;o.projectPointOntoPlane=function(e,t,i){a.Check.typeOf.object("plane",e),a.Check.typeOf.object("point",t),n.defined(i)||(i=new r.Cartesian3);var c=o.getPointDistance(e,t),l=r.Cartesian3.multiplyByScalar(e.normal,c,s);return r.Cartesian3.subtract(t,l,i)};var l=new r.Cartesian3;o.transform=function(e,n,t){return a.Check.typeOf.object("plane",e),a.Check.typeOf.object("transform",n),i.Matrix4.multiplyByPointAsVector(n,e.normal,c),r.Cartesian3.normalize(c,c),r.Cartesian3.multiplyByScalar(e.normal,-e.distance,l),i.Matrix4.multiplyByPoint(n,l,l),o.fromPointNormal(l,c,t)},o.clone=function(e,t){return a.Check.typeOf.object("plane",e),n.defined(t)?(r.Cartesian3.clone(e.normal,t.normal),t.distance=e.distance,t):new o(e.normal,e.distance)},o.equals=function(e,n){return a.Check.typeOf.object("left",e),a.Check.typeOf.object("right",n),e.distance===n.distance&&r.Cartesian3.equals(e.normal,n.normal)},o.ORIGIN_XY_PLANE=Object.freeze(new o(r.Cartesian3.UNIT_Z,0)),o.ORIGIN_YZ_PLANE=Object.freeze(new o(r.Cartesian3.UNIT_X,0)),o.ORIGIN_ZX_PLANE=Object.freeze(new o(r.Cartesian3.UNIT_Y,0)),e.Plane=o}));
//# sourceMappingURL=Plane-08adaa50.js.map