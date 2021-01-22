define(["exports","./when-7ef6387a","./Check-ed6a1804","./Cartesian3-cb3509e0","./Ellipsoid-fc93f17d","./Transforms-fe3a4031","./Matrix4-a5b26d08","./Cartesian2-7da3df11","./Plane-49ba40bc","./EllipsoidTangentPlane-e5201ea2"],(function(a,t,e,n,r,i,s,o,C,c){"use strict";function u(a,e){this.center=n.Cartesian3.clone(t.defaultValue(a,n.Cartesian3.ZERO)),this.halfAxes=s.Matrix3.clone(t.defaultValue(e,s.Matrix3.ZERO))}u.packedLength=n.Cartesian3.packedLength+s.Matrix3.packedLength,u.pack=function(a,e,r){return r=t.defaultValue(r,0),n.Cartesian3.pack(a.center,e,r),s.Matrix3.pack(a.halfAxes,e,r+n.Cartesian3.packedLength),e},u.unpack=function(a,e,r){return e=t.defaultValue(e,0),t.defined(r)||(r=new u),n.Cartesian3.unpack(a,e,r.center),s.Matrix3.unpack(a,e+n.Cartesian3.packedLength,r.halfAxes),r};var d=new n.Cartesian3,l=new n.Cartesian3,h=new n.Cartesian3,x=new n.Cartesian3,m=new n.Cartesian3,M=new n.Cartesian3,f=new s.Matrix3,p={unitary:new s.Matrix3,diagonal:new s.Matrix3};u.fromPoints=function(a,e){if(t.defined(e)||(e=new u),!t.defined(a)||0===a.length)return e.halfAxes=s.Matrix3.ZERO,e.center=n.Cartesian3.ZERO,e;var r,i=a.length,o=n.Cartesian3.clone(a[0],d);for(r=1;r<i;r++)n.Cartesian3.add(o,a[r],o);var C=1/i;n.Cartesian3.multiplyByScalar(o,C,o);var c,g=0,w=0,y=0,b=0,O=0,P=0;for(r=0;r<i;r++)g+=(c=n.Cartesian3.subtract(a[r],o,l)).x*c.x,w+=c.x*c.y,y+=c.x*c.z,b+=c.y*c.y,O+=c.y*c.z,P+=c.z*c.z;g*=C,w*=C,y*=C,b*=C,O*=C,P*=C;var N=f;N[0]=g,N[1]=w,N[2]=y,N[3]=w,N[4]=b,N[5]=O,N[6]=y,N[7]=O,N[8]=P;var v=s.Matrix3.computeEigenDecomposition(N,p),A=s.Matrix3.clone(v.unitary,e.halfAxes),T=s.Matrix3.getColumn(A,0,x),R=s.Matrix3.getColumn(A,1,m),E=s.Matrix3.getColumn(A,2,M),I=-Number.MAX_VALUE,L=-Number.MAX_VALUE,z=-Number.MAX_VALUE,S=Number.MAX_VALUE,U=Number.MAX_VALUE,B=Number.MAX_VALUE;for(r=0;r<i;r++)c=a[r],I=Math.max(n.Cartesian3.dot(T,c),I),L=Math.max(n.Cartesian3.dot(R,c),L),z=Math.max(n.Cartesian3.dot(E,c),z),S=Math.min(n.Cartesian3.dot(T,c),S),U=Math.min(n.Cartesian3.dot(R,c),U),B=Math.min(n.Cartesian3.dot(E,c),B);T=n.Cartesian3.multiplyByScalar(T,.5*(S+I),T),R=n.Cartesian3.multiplyByScalar(R,.5*(U+L),R),E=n.Cartesian3.multiplyByScalar(E,.5*(B+z),E);var V=n.Cartesian3.add(T,R,e.center);n.Cartesian3.add(V,E,V);var _=h;return _.x=I-S,_.y=L-U,_.z=z-B,n.Cartesian3.multiplyByScalar(_,.5,_),s.Matrix3.multiplyByScale(e.halfAxes,_,e.halfAxes),e};var g=new n.Cartesian3,w=new n.Cartesian3;function y(a,e,r,i,o,C,c,d,l,h,x){t.defined(x)||(x=new u);var m=x.halfAxes;s.Matrix3.setColumn(m,0,e,m),s.Matrix3.setColumn(m,1,r,m),s.Matrix3.setColumn(m,2,i,m);var M=g;M.x=(o+C)/2,M.y=(c+d)/2,M.z=(l+h)/2;var f=w;f.x=(C-o)/2,f.y=(d-c)/2,f.z=(h-l)/2;var p=x.center;return M=s.Matrix3.multiplyByVector(m,M,M),n.Cartesian3.add(a,M,p),s.Matrix3.multiplyByScale(m,f,m),x}var b=new r.Cartographic,O=new n.Cartesian3,P=new r.Cartographic,N=new r.Cartographic,v=new r.Cartographic,A=new r.Cartographic,T=new r.Cartographic,R=new n.Cartesian3,E=new n.Cartesian3,I=new n.Cartesian3,L=new n.Cartesian3,z=new n.Cartesian3,S=new o.Cartesian2,U=new o.Cartesian2,B=new o.Cartesian2,V=new o.Cartesian2,_=new o.Cartesian2,k=new n.Cartesian3,W=new n.Cartesian3,D=new n.Cartesian3,q=new n.Cartesian3,X=new o.Cartesian2,j=new n.Cartesian3,Z=new n.Cartesian3,G=new n.Cartesian3,F=new C.Plane(n.Cartesian3.UNIT_X,0);u.fromRectangle=function(a,e,i,s,u){var d,l,h,x,m,M,f;if(e=t.defaultValue(e,0),i=t.defaultValue(i,0),s=t.defaultValue(s,r.Ellipsoid.WGS84),a.width<=n.CesiumMath.PI){var p=o.Rectangle.center(a,b),g=s.cartographicToCartesian(p,O),w=new c.EllipsoidTangentPlane(g,s);f=w.plane;var Y=p.longitude,H=a.south<0&&a.north>0?0:p.latitude,J=r.Cartographic.fromRadians(Y,a.north,i,P),K=r.Cartographic.fromRadians(a.west,a.north,i,N),Q=r.Cartographic.fromRadians(a.west,H,i,v),$=r.Cartographic.fromRadians(a.west,a.south,i,A),aa=r.Cartographic.fromRadians(Y,a.south,i,T),ta=s.cartographicToCartesian(J,R),ea=s.cartographicToCartesian(K,E),na=s.cartographicToCartesian(Q,I),ra=s.cartographicToCartesian($,L),ia=s.cartographicToCartesian(aa,z),sa=w.projectPointToNearestOnPlane(ta,S),oa=w.projectPointToNearestOnPlane(ea,U),Ca=w.projectPointToNearestOnPlane(na,B),ca=w.projectPointToNearestOnPlane(ra,V),ua=w.projectPointToNearestOnPlane(ia,_);return l=-(d=Math.min(oa.x,Ca.x,ca.x)),x=Math.max(oa.y,sa.y),h=Math.min(ca.y,ua.y),K.height=$.height=e,ea=s.cartographicToCartesian(K,E),ra=s.cartographicToCartesian($,L),m=Math.min(C.Plane.getPointDistance(f,ea),C.Plane.getPointDistance(f,ra)),M=i,y(w.origin,w.xAxis,w.yAxis,w.zAxis,d,l,h,x,m,M,u)}var da=a.south>0,la=a.north<0,ha=da?a.south:la?a.north:0,xa=o.Rectangle.center(a,b).longitude,ma=n.Cartesian3.fromRadians(xa,ha,i,s,k);ma.z=0;var Ma=Math.abs(ma.x)<n.CesiumMath.EPSILON10&&Math.abs(ma.y)<n.CesiumMath.EPSILON10?n.Cartesian3.UNIT_X:n.Cartesian3.normalize(ma,W),fa=n.Cartesian3.UNIT_Z,pa=n.Cartesian3.cross(Ma,fa,D);f=C.Plane.fromPointNormal(ma,Ma,F);var ga=n.Cartesian3.fromRadians(xa+n.CesiumMath.PI_OVER_TWO,ha,i,s,q);d=-(l=n.Cartesian3.dot(C.Plane.projectPointOntoPlane(f,ga,X),pa)),x=n.Cartesian3.fromRadians(0,a.north,la?e:i,s,j).z,h=n.Cartesian3.fromRadians(0,a.south,da?e:i,s,Z).z;var wa=n.Cartesian3.fromRadians(a.east,ha,i,s,G);return y(ma,pa,fa,Ma,d,l,h,x,m=C.Plane.getPointDistance(f,wa),M=0,u)},u.clone=function(a,e){if(t.defined(a))return t.defined(e)?(n.Cartesian3.clone(a.center,e.center),s.Matrix3.clone(a.halfAxes,e.halfAxes),e):new u(a.center,a.halfAxes)},u.intersectPlane=function(a,t){var e=a.center,r=t.normal,o=a.halfAxes,C=r.x,c=r.y,u=r.z,d=Math.abs(C*o[s.Matrix3.COLUMN0ROW0]+c*o[s.Matrix3.COLUMN0ROW1]+u*o[s.Matrix3.COLUMN0ROW2])+Math.abs(C*o[s.Matrix3.COLUMN1ROW0]+c*o[s.Matrix3.COLUMN1ROW1]+u*o[s.Matrix3.COLUMN1ROW2])+Math.abs(C*o[s.Matrix3.COLUMN2ROW0]+c*o[s.Matrix3.COLUMN2ROW1]+u*o[s.Matrix3.COLUMN2ROW2]),l=n.Cartesian3.dot(r,e)+t.distance;return l<=-d?i.Intersect.OUTSIDE:l>=d?i.Intersect.INSIDE:i.Intersect.INTERSECTING};var Y=new n.Cartesian3,H=new n.Cartesian3,J=new n.Cartesian3,K=new n.Cartesian3;u.distanceSquaredTo=function(a,t){var e=n.Cartesian3.subtract(t,a.center,g),r=a.halfAxes,i=s.Matrix3.getColumn(r,0,Y),o=s.Matrix3.getColumn(r,1,H),C=s.Matrix3.getColumn(r,2,J),c=n.Cartesian3.magnitude(i),u=n.Cartesian3.magnitude(o),d=n.Cartesian3.magnitude(C);n.Cartesian3.normalize(i,i),n.Cartesian3.normalize(o,o),n.Cartesian3.normalize(C,C);var l=K;l.x=n.Cartesian3.dot(e,i),l.y=n.Cartesian3.dot(e,o),l.z=n.Cartesian3.dot(e,C);var h,x=0;return l.x<-c?x+=(h=l.x+c)*h:l.x>c&&(x+=(h=l.x-c)*h),l.y<-u?x+=(h=l.y+u)*h:l.y>u&&(x+=(h=l.y-u)*h),l.z<-d?x+=(h=l.z+d)*h:l.z>d&&(x+=(h=l.z-d)*h),x};var Q=new n.Cartesian3,$=new n.Cartesian3;u.computePlaneDistances=function(a,e,r,o){t.defined(o)||(o=new i.Interval);var C=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY,u=a.center,d=a.halfAxes,l=s.Matrix3.getColumn(d,0,Y),h=s.Matrix3.getColumn(d,1,H),x=s.Matrix3.getColumn(d,2,J),m=n.Cartesian3.add(l,h,Q);n.Cartesian3.add(m,x,m),n.Cartesian3.add(m,u,m);var M=n.Cartesian3.subtract(m,e,$),f=n.Cartesian3.dot(r,M);return C=Math.min(f,C),c=Math.max(f,c),n.Cartesian3.add(u,l,m),n.Cartesian3.add(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(r,M),C=Math.min(f,C),c=Math.max(f,c),n.Cartesian3.add(u,l,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.add(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(r,M),C=Math.min(f,C),c=Math.max(f,c),n.Cartesian3.add(u,l,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(r,M),C=Math.min(f,C),c=Math.max(f,c),n.Cartesian3.subtract(u,l,m),n.Cartesian3.add(m,h,m),n.Cartesian3.add(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(r,M),C=Math.min(f,C),c=Math.max(f,c),n.Cartesian3.subtract(u,l,m),n.Cartesian3.add(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(r,M),C=Math.min(f,C),c=Math.max(f,c),n.Cartesian3.subtract(u,l,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.add(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(r,M),C=Math.min(f,C),c=Math.max(f,c),n.Cartesian3.subtract(u,l,m),n.Cartesian3.subtract(m,h,m),n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(m,e,M),f=n.Cartesian3.dot(r,M),C=Math.min(f,C),c=Math.max(f,c),o.start=C,o.stop=c,o};var aa=new i.BoundingSphere;u.isOccluded=function(a,t){var e=i.BoundingSphere.fromOrientedBoundingBox(a,aa);return!t.isBoundingSphereVisible(e)},u.prototype.intersectPlane=function(a){return u.intersectPlane(this,a)},u.prototype.distanceSquaredTo=function(a){return u.distanceSquaredTo(this,a)},u.prototype.computePlaneDistances=function(a,t,e){return u.computePlaneDistances(this,a,t,e)},u.prototype.isOccluded=function(a){return u.isOccluded(this,a)},u.equals=function(a,e){return a===e||t.defined(a)&&t.defined(e)&&n.Cartesian3.equals(a.center,e.center)&&s.Matrix3.equals(a.halfAxes,e.halfAxes)},u.prototype.clone=function(a){return u.clone(this,a)},u.prototype.equals=function(a){return u.equals(this,a)};var ta=new n.Cartesian3;u.prototype.intersectRay=function(a){var t=i.BoundingSphere.fromOrientedBoundingBox(this,aa),e=t.center,r=n.Cartesian3.subtract(e,a.origin,ta);return n.Cartesian3.magnitude(n.Cartesian3.cross(r,a.direction,ta))<=t.radius},a.OrientedBoundingBox=u}));
