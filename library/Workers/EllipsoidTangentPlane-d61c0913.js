define(["exports","./when-7ef6387a","./Check-ed6a1804","./Cartesian3-2a8ef78e","./Ellipsoid-367a1bb3","./Transforms-2448ecca","./Cartesian2-dcadeea9","./IntersectionTests-1ea321e8","./Plane-15b63a5b"],(function(e,n,t,i,a,r,s,o,c){"use strict";function l(e,t,a){this.minimum=i.Cartesian3.clone(n.defaultValue(e,i.Cartesian3.ZERO)),this.maximum=i.Cartesian3.clone(n.defaultValue(t,i.Cartesian3.ZERO)),a=n.defined(a)?i.Cartesian3.clone(a):i.Cartesian3.midpoint(this.minimum,this.maximum,new i.Cartesian3),this.center=a}l.fromPoints=function(e,t){if(n.defined(t)||(t=new l),!n.defined(e)||0===e.length)return t.minimum=i.Cartesian3.clone(i.Cartesian3.ZERO,t.minimum),t.maximum=i.Cartesian3.clone(i.Cartesian3.ZERO,t.maximum),t.center=i.Cartesian3.clone(i.Cartesian3.ZERO,t.center),t;for(var a=e[0].x,r=e[0].y,s=e[0].z,o=e[0].x,c=e[0].y,m=e[0].z,d=e.length,u=1;u<d;u++){var f=e[u],h=f.x,C=f.y,p=f.z;a=Math.min(h,a),o=Math.max(h,o),r=Math.min(C,r),c=Math.max(C,c),s=Math.min(p,s),m=Math.max(p,m)}var x=t.minimum;x.x=a,x.y=r,x.z=s;var y=t.maximum;return y.x=o,y.y=c,y.z=m,t.center=i.Cartesian3.midpoint(x,y,t.center),t},l.clone=function(e,t){if(n.defined(e))return n.defined(t)?(t.minimum=i.Cartesian3.clone(e.minimum,t.minimum),t.maximum=i.Cartesian3.clone(e.maximum,t.maximum),t.center=i.Cartesian3.clone(e.center,t.center),t):new l(e.minimum,e.maximum,e.center)},l.equals=function(e,t){return e===t||n.defined(e)&&n.defined(t)&&i.Cartesian3.equals(e.center,t.center)&&i.Cartesian3.equals(e.minimum,t.minimum)&&i.Cartesian3.equals(e.maximum,t.maximum)};var m=new i.Cartesian3;l.intersectPlane=function(e,n){t.Check.defined("box",e),t.Check.defined("plane",n),m=i.Cartesian3.subtract(e.maximum,e.minimum,m);var a=i.Cartesian3.multiplyByScalar(m,.5,m),s=n.normal,o=a.x*Math.abs(s.x)+a.y*Math.abs(s.y)+a.z*Math.abs(s.z),c=i.Cartesian3.dot(e.center,s)+n.distance;return c-o>0?r.Intersect.INSIDE:c+o<0?r.Intersect.OUTSIDE:r.Intersect.INTERSECTING},l.prototype.clone=function(e){return l.clone(this,e)},l.prototype.intersectPlane=function(e){return l.intersectPlane(this,e)},l.prototype.equals=function(e){return l.equals(this,e)};var d=new r.Cartesian4;function u(e,s){if(t.Check.defined("origin",e),e=(s=n.defaultValue(s,a.Ellipsoid.WGS84)).scaleToGeodeticSurface(e),!n.defined(e))throw new t.DeveloperError("origin must not be at the center of the ellipsoid.");var o=r.Transforms.eastNorthUpToFixedFrame(e,s);this._ellipsoid=s,this._origin=e,this._xAxis=i.Cartesian3.fromCartesian4(r.Matrix4.getColumn(o,0,d)),this._yAxis=i.Cartesian3.fromCartesian4(r.Matrix4.getColumn(o,1,d));var l=i.Cartesian3.fromCartesian4(r.Matrix4.getColumn(o,2,d));this._plane=c.Plane.fromPointNormal(e,l)}Object.defineProperties(u.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},origin:{get:function(){return this._origin}},plane:{get:function(){return this._plane}},xAxis:{get:function(){return this._xAxis}},yAxis:{get:function(){return this._yAxis}},zAxis:{get:function(){return this._plane.normal}}});var f=new l;u.fromPoints=function(e,n){return t.Check.defined("cartesians",e),new u(l.fromPoints(e,f).center,n)};var h=new o.Ray,C=new i.Cartesian3;u.prototype.projectPointOntoPlane=function(e,a){t.Check.defined("cartesian",e);var r=h;r.origin=e,i.Cartesian3.normalize(e,r.direction);var c=o.IntersectionTests.rayPlane(r,this._plane,C);if(n.defined(c)||(i.Cartesian3.negate(r.direction,r.direction),c=o.IntersectionTests.rayPlane(r,this._plane,C)),n.defined(c)){var l=i.Cartesian3.subtract(c,this._origin,c),m=i.Cartesian3.dot(this._xAxis,l),d=i.Cartesian3.dot(this._yAxis,l);return n.defined(a)?(a.x=m,a.y=d,a):new s.Cartesian2(m,d)}},u.prototype.projectPointsOntoPlane=function(e,i){t.Check.defined("cartesians",e),n.defined(i)||(i=[]);for(var a=0,r=e.length,s=0;s<r;s++){var o=this.projectPointOntoPlane(e[s],i[a]);n.defined(o)&&(i[a]=o,a++)}return i.length=a,i},u.prototype.projectPointToNearestOnPlane=function(e,a){t.Check.defined("cartesian",e),n.defined(a)||(a=new s.Cartesian2);var r=h;r.origin=e,i.Cartesian3.clone(this._plane.normal,r.direction);var c=o.IntersectionTests.rayPlane(r,this._plane,C);n.defined(c)||(i.Cartesian3.negate(r.direction,r.direction),c=o.IntersectionTests.rayPlane(r,this._plane,C));var l=i.Cartesian3.subtract(c,this._origin,c),m=i.Cartesian3.dot(this._xAxis,l),d=i.Cartesian3.dot(this._yAxis,l);return a.x=m,a.y=d,a},u.prototype.projectPointsToNearestOnPlane=function(e,i){t.Check.defined("cartesians",e),n.defined(i)||(i=[]);var a=e.length;i.length=a;for(var r=0;r<a;r++)i[r]=this.projectPointToNearestOnPlane(e[r],i[r]);return i};var p=new i.Cartesian3;u.prototype.projectPointOntoEllipsoid=function(e,a){t.Check.defined("cartesian",e),n.defined(a)||(a=new i.Cartesian3);var r=this._ellipsoid,s=this._origin,o=this._xAxis,c=this._yAxis,l=p;return i.Cartesian3.multiplyByScalar(o,e.x,l),a=i.Cartesian3.add(s,l,a),i.Cartesian3.multiplyByScalar(c,e.y,l),i.Cartesian3.add(a,l,a),r.scaleToGeocentricSurface(a,a),a},u.prototype.projectPointsOntoEllipsoid=function(e,i){t.Check.defined("cartesians",e);var a=e.length;n.defined(i)?i.length=a:i=new Array(a);for(var r=0;r<a;++r)i[r]=this.projectPointOntoEllipsoid(e[r],i[r]);return i},e.AxisAlignedBoundingBox=l,e.EllipsoidTangentPlane=u}));
//# sourceMappingURL=EllipsoidTangentPlane-d61c0913.js.map