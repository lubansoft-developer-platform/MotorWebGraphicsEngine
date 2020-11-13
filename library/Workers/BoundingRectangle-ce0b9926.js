define(["exports","./when-7ef6387a","./Check-ed6a1804","./Ellipsoid-367a1bb3","./Transforms-2448ecca","./Cartesian2-dcadeea9"],(function(e,t,i,n,h,r){"use strict";function a(e,i,n,h){this.x=t.defaultValue(e,0),this.y=t.defaultValue(i,0),this.width=t.defaultValue(n,0),this.height=t.defaultValue(h,0)}a.packedLength=4,a.pack=function(e,n,h){return i.Check.typeOf.object("value",e),i.Check.defined("array",n),h=t.defaultValue(h,0),n[h++]=e.x,n[h++]=e.y,n[h++]=e.width,n[h]=e.height,n},a.unpack=function(e,n,h){return i.Check.defined("array",e),n=t.defaultValue(n,0),t.defined(h)||(h=new a),h.x=e[n++],h.y=e[n++],h.width=e[n++],h.height=e[n],h},a.fromPoints=function(e,i){if(t.defined(i)||(i=new a),!t.defined(e)||0===e.length)return i.x=0,i.y=0,i.width=0,i.height=0,i;for(var n=e.length,h=e[0].x,r=e[0].y,c=e[0].x,d=e[0].y,u=1;u<n;u++){var f=e[u],o=f.x,y=f.y;h=Math.min(o,h),c=Math.max(o,c),r=Math.min(y,r),d=Math.max(y,d)}return i.x=h,i.y=r,i.width=c-h,i.height=d-r,i};var c=new h.GeographicProjection,d=new n.Cartographic,u=new n.Cartographic;a.fromRectangle=function(e,i,n){if(t.defined(n)||(n=new a),!t.defined(e))return n.x=0,n.y=0,n.width=0,n.height=0,n;var h=(i=t.defaultValue(i,c)).project(r.Rectangle.southwest(e,d)),f=i.project(r.Rectangle.northeast(e,u));return r.Cartesian2.subtract(f,h,f),n.x=h.x,n.y=h.y,n.width=f.x,n.height=f.y,n},a.clone=function(e,i){if(t.defined(e))return t.defined(i)?(i.x=e.x,i.y=e.y,i.width=e.width,i.height=e.height,i):new a(e.x,e.y,e.width,e.height)},a.union=function(e,n,h){i.Check.typeOf.object("left",e),i.Check.typeOf.object("right",n),t.defined(h)||(h=new a);var r=Math.min(e.x,n.x),c=Math.min(e.y,n.y),d=Math.max(e.x+e.width,n.x+n.width),u=Math.max(e.y+e.height,n.y+n.height);return h.x=r,h.y=c,h.width=d-r,h.height=u-c,h},a.expand=function(e,t,n){i.Check.typeOf.object("rectangle",e),i.Check.typeOf.object("point",t),n=a.clone(e,n);var h=t.x-n.x,r=t.y-n.y;return h>n.width?n.width=h:h<0&&(n.width-=h,n.x=t.x),r>n.height?n.height=r:r<0&&(n.height-=r,n.y=t.y),n},a.intersect=function(e,t){i.Check.typeOf.object("left",e),i.Check.typeOf.object("right",t);var n=e.x,r=e.y,a=t.x,c=t.y;return n>a+t.width||n+e.width<a||r+e.height<c||r>c+t.height?h.Intersect.OUTSIDE:h.Intersect.INTERSECTING},a.equals=function(e,i){return e===i||t.defined(e)&&t.defined(i)&&e.x===i.x&&e.y===i.y&&e.width===i.width&&e.height===i.height},a.prototype.clone=function(e){return a.clone(this,e)},a.prototype.intersect=function(e){return a.intersect(this,e)},a.prototype.equals=function(e){return a.equals(this,e)},e.BoundingRectangle=a}));
//# sourceMappingURL=BoundingRectangle-ce0b9926.js.map