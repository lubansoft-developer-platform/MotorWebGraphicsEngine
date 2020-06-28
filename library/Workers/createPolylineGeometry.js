define(["./when-7ef6387a","./Check-ed6a1804","./Math-55f9392d","./Ellipsoid-911f8bc2","./Transforms-d8f9dcbd","./RuntimeError-5b606d78","./Cartesian2-ff47d58f","./WebGLConstants-30fc6f5c","./ComponentDatatype-a863af81","./GeometryAttribute-45a4c7c8","./GeometryAttributes-cb18da36","./IndexDatatype-891b5845","./IntersectionTests-c6e3245b","./Plane-02009bbb","./VertexFormat-d75df48f","./arrayRemoveDuplicates-8221727f","./ArcType-2ee8dfbb","./EllipsoidRhumbLine-bd68e2e2","./EllipsoidGeodesic-4c36336e","./PolylinePipeline-bc6ce324","./Color-c9a50038"],(function(e,t,r,o,a,n,i,l,s,p,d,c,u,y,f,h,m,v,C,g,w){"use strict";var E=[];function b(e,t,r,o,a){var n,i=E;i.length=a;var l=r.red,s=r.green,p=r.blue,d=r.alpha,c=o.red,u=o.green,y=o.blue,f=o.alpha;if(w.Color.equals(r,o)){for(n=0;n<a;n++)i[n]=w.Color.clone(r);return i}var h=(c-l)/a,m=(u-s)/a,v=(y-p)/a,C=(f-d)/a;for(n=0;n<a;n++)i[n]=new w.Color(l+n*h,s+n*m,p+n*v,d+n*C);return i}function _(a){var n=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).positions,i=a.colors,l=e.defaultValue(a.width,1),s=e.defaultValue(a.colorsPerVertex,!1);if(!e.defined(n)||n.length<2)throw new t.DeveloperError("At least two positions are required.");if("number"!=typeof l)throw new t.DeveloperError("width must be a number");if(e.defined(i)&&(s&&i.length<n.length||!s&&i.length<n.length-1))throw new t.DeveloperError("colors has an invalid length.");this._positions=n,this._colors=i,this._width=l,this._colorsPerVertex=s,this._vertexFormat=f.VertexFormat.clone(e.defaultValue(a.vertexFormat,f.VertexFormat.DEFAULT)),this._arcType=e.defaultValue(a.arcType,m.ArcType.GEODESIC),this._granularity=e.defaultValue(a.granularity,r.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=o.Ellipsoid.clone(e.defaultValue(a.ellipsoid,o.Ellipsoid.WGS84)),this._workerName="createPolylineGeometry";var p=1+n.length*o.Cartesian3.packedLength;p+=e.defined(i)?1+i.length*w.Color.packedLength:1,this.packedLength=p+o.Ellipsoid.packedLength+f.VertexFormat.packedLength+4}_.pack=function(r,a,n){if(!e.defined(r))throw new t.DeveloperError("value is required");if(!e.defined(a))throw new t.DeveloperError("array is required");var i;n=e.defaultValue(n,0);var l=r._positions,s=l.length;for(a[n++]=s,i=0;i<s;++i,n+=o.Cartesian3.packedLength)o.Cartesian3.pack(l[i],a,n);var p=r._colors;for(s=e.defined(p)?p.length:0,a[n++]=s,i=0;i<s;++i,n+=w.Color.packedLength)w.Color.pack(p[i],a,n);return o.Ellipsoid.pack(r._ellipsoid,a,n),n+=o.Ellipsoid.packedLength,f.VertexFormat.pack(r._vertexFormat,a,n),n+=f.VertexFormat.packedLength,a[n++]=r._width,a[n++]=r._colorsPerVertex?1:0,a[n++]=r._arcType,a[n]=r._granularity,a};var A=o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),P=new f.VertexFormat,D={positions:void 0,colors:void 0,ellipsoid:A,vertexFormat:P,width:void 0,colorsPerVertex:void 0,arcType:void 0,granularity:void 0};_.unpack=function(r,a,n){if(!e.defined(r))throw new t.DeveloperError("array is required");var i;a=e.defaultValue(a,0);var l=r[a++],s=new Array(l);for(i=0;i<l;++i,a+=o.Cartesian3.packedLength)s[i]=o.Cartesian3.unpack(r,a);var p=(l=r[a++])>0?new Array(l):void 0;for(i=0;i<l;++i,a+=w.Color.packedLength)p[i]=w.Color.unpack(r,a);var d=o.Ellipsoid.unpack(r,a,A);a+=o.Ellipsoid.packedLength;var c=f.VertexFormat.unpack(r,a,P);a+=f.VertexFormat.packedLength;var u=r[a++],y=1===r[a++],h=r[a++],m=r[a];return e.defined(n)?(n._positions=s,n._colors=p,n._ellipsoid=o.Ellipsoid.clone(d,n._ellipsoid),n._vertexFormat=f.VertexFormat.clone(c,n._vertexFormat),n._width=u,n._colorsPerVertex=y,n._arcType=h,n._granularity=m,n):(D.positions=s,D.colors=p,D.width=u,D.colorsPerVertex=y,D.arcType=h,D.granularity=m,new _(D))};var T=new o.Cartesian3,x=new o.Cartesian3,k=new o.Cartesian3,V=new o.Cartesian3;return _.createGeometry=function(t){var n,i,l,u=t._width,y=t._vertexFormat,f=t._colors,v=t._colorsPerVertex,C=t._arcType,_=t._granularity,A=t._ellipsoid,P=h.arrayRemoveDuplicates(t._positions,o.Cartesian3.equalsEpsilon),D=P.length;if(!(D<2||u<=0)){if(C===m.ArcType.GEODESIC||C===m.ArcType.RHUMB){var L,F;C===m.ArcType.GEODESIC?(L=r.CesiumMath.chordLength(_,A.maximumRadius),F=g.PolylinePipeline.numberOfPoints):(L=_,F=g.PolylinePipeline.numberOfPointsRhumbLine);var G=g.PolylinePipeline.extractHeights(P,A);if(e.defined(f)){var O=1;for(n=0;n<D-1;++n)O+=F(P[n],P[n+1],L);var R=new Array(O),I=0;for(n=0;n<D-1;++n){var S=P[n],B=P[n+1],U=f[n],N=F(S,B,L);if(v&&n<O){var q=b(0,0,U,f[n+1],N),M=q.length;for(i=0;i<M;++i)R[I++]=q[i]}else for(i=0;i<N;++i)R[I++]=w.Color.clone(U)}R[I]=w.Color.clone(f[f.length-1]),f=R,E.length=0}P=C===m.ArcType.GEODESIC?g.PolylinePipeline.generateCartesianArc({positions:P,minDistance:L,ellipsoid:A,height:G}):g.PolylinePipeline.generateCartesianRhumbArc({positions:P,granularity:L,ellipsoid:A,height:G})}var H,W=4*(D=P.length)-4,Y=new Float64Array(3*W),z=new Float64Array(3*W),J=new Float64Array(3*W),j=new Float32Array(2*W),K=y.st?new Float32Array(2*W):void 0,Q=e.defined(f)?new Uint8Array(4*W):void 0,X=0,Z=0,$=0,ee=0;for(i=0;i<D;++i){var te,re;0===i?(H=T,o.Cartesian3.subtract(P[0],P[1],H),o.Cartesian3.add(P[0],H,H)):H=P[i-1],o.Cartesian3.clone(H,k),o.Cartesian3.clone(P[i],x),i===D-1?(H=T,o.Cartesian3.subtract(P[D-1],P[D-2],H),o.Cartesian3.add(P[D-1],H,H)):H=P[i+1],o.Cartesian3.clone(H,V),e.defined(Q)&&(te=0===i||v?f[i]:f[i-1],i!==D-1&&(re=f[i]));var oe=i===D-1?2:4;for(l=0===i?2:0;l<oe;++l){o.Cartesian3.pack(x,Y,X),o.Cartesian3.pack(k,z,X),o.Cartesian3.pack(V,J,X),X+=3;var ae=l-2<0?-1:1;if(j[Z++]=l%2*2-1,j[Z++]=ae*u,y.st&&(K[$++]=i/(D-1),K[$++]=Math.max(j[Z-2],0)),e.defined(Q)){var ne=l<2?te:re;Q[ee++]=w.Color.floatToByte(ne.red),Q[ee++]=w.Color.floatToByte(ne.green),Q[ee++]=w.Color.floatToByte(ne.blue),Q[ee++]=w.Color.floatToByte(ne.alpha)}}}var ie=new d.GeometryAttributes;ie.position=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:Y}),ie.prevPosition=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:z}),ie.nextPosition=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:J}),ie.expandAndWidth=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:j}),y.st&&(ie.st=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:K})),e.defined(Q)&&(ie.color=new p.GeometryAttribute({componentDatatype:s.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:Q,normalize:!0}));var le=c.IndexDatatype.createTypedArray(W,6*D-6),se=0,pe=0,de=D-1;for(i=0;i<de;++i)le[pe++]=se,le[pe++]=se+2,le[pe++]=se+1,le[pe++]=se+1,le[pe++]=se+2,le[pe++]=se+3,se+=4;return new p.Geometry({attributes:ie,indices:le,primitiveType:p.PrimitiveType.TRIANGLES,boundingSphere:a.BoundingSphere.fromPoints(P),geometryType:p.GeometryType.POLYLINES})}},function(t,r){return e.defined(r)&&(t=_.unpack(t,r)),t._ellipsoid=o.Ellipsoid.clone(t._ellipsoid),_.createGeometry(t)}}));
//# sourceMappingURL=createPolylineGeometry.js.map
