define(["./when-7ef6387a","./Check-ed6a1804","./Math-55f9392d","./Ellipsoid-911f8bc2","./Transforms-d8f9dcbd","./RuntimeError-5b606d78","./Cartesian2-ff47d58f","./WebGLConstants-30fc6f5c","./ComponentDatatype-a863af81","./GeometryAttribute-45a4c7c8","./GeometryAttributes-cb18da36","./AttributeCompression-31bd05f3","./GeometryPipeline-bccb2d54","./EncodedCartesian3-fe5f78b3","./IndexDatatype-891b5845","./IntersectionTests-c6e3245b","./Plane-02009bbb","./GeometryOffsetAttribute-5cfc2755","./VertexFormat-d75df48f","./GeometryInstance-ca11f8fa","./EllipsoidRhumbLine-bd68e2e2","./PolygonPipeline-41e201d5","./RectangleGeometryLibrary-afbeb163"],(function(t,e,a,r,n,o,i,s,l,u,c,m,p,d,g,y,f,h,v,b,_,A,w){"use strict";var x=new r.Cartesian3,C=new r.Cartesian3,R=new r.Cartesian3,E=new r.Cartesian3,F=new i.Rectangle,G=new i.Cartesian2,P=new n.BoundingSphere,V=new n.BoundingSphere;function D(t,e){var a=new u.Geometry({attributes:new c.GeometryAttributes,primitiveType:u.PrimitiveType.TRIANGLES});return a.attributes.position=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e.positions}),t.normal&&(a.attributes.normal=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.normals})),t.tangent&&(a.attributes.tangent=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.tangents})),t.bitangent&&(a.attributes.bitangent=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e.bitangents})),a}var L=new r.Cartesian3,M=new r.Cartesian3;function O(t,e){var a=t._vertexFormat,o=t._ellipsoid,i=e.height,s=e.width,c=e.northCap,m=e.southCap,p=0,d=i,y=i,f=0;c&&(p=1,y-=1,f+=1),m&&(d-=1,y-=1,f+=1),f+=s*y;for(var h=a.position?new Float64Array(3*f):void 0,v=a.st?new Float32Array(2*f):void 0,b=0,_=0,A=x,F=G,P=Number.MAX_VALUE,V=Number.MAX_VALUE,L=-Number.MAX_VALUE,M=-Number.MAX_VALUE,O=p;O<d;++O)for(var T=0;T<s;++T)w.RectangleGeometryLibrary.computePosition(e,o,a.st,O,T,A,F),h[b++]=A.x,h[b++]=A.y,h[b++]=A.z,a.st&&(v[_++]=F.x,v[_++]=F.y,P=Math.min(P,F.x),V=Math.min(V,F.y),L=Math.max(L,F.x),M=Math.max(M,F.y));if(c&&(w.RectangleGeometryLibrary.computePosition(e,o,a.st,0,0,A,F),h[b++]=A.x,h[b++]=A.y,h[b++]=A.z,a.st&&(v[_++]=F.x,v[_++]=F.y,P=F.x,V=F.y,L=F.x,M=F.y)),m&&(w.RectangleGeometryLibrary.computePosition(e,o,a.st,i-1,0,A,F),h[b++]=A.x,h[b++]=A.y,h[b]=A.z,a.st&&(v[_++]=F.x,v[_]=F.y,P=Math.min(P,F.x),V=Math.min(V,F.y),L=Math.max(L,F.x),M=Math.max(M,F.y))),a.st&&(P<0||V<0||L>1||M>1))for(var N=0;N<v.length;N+=2)v[N]=(v[N]-P)/(L-P),v[N+1]=(v[N+1]-V)/(M-V);var k=function(t,e,a,o){var i=t.length,s=e.normal?new Float32Array(i):void 0,l=e.tangent?new Float32Array(i):void 0,u=e.bitangent?new Float32Array(i):void 0,c=0,m=E,p=R,d=C;if(e.normal||e.tangent||e.bitangent)for(var g=0;g<i;g+=3){var y=r.Cartesian3.fromArray(t,g,x),f=c+1,h=c+2;d=a.geodeticSurfaceNormal(y,d),(e.tangent||e.bitangent)&&(r.Cartesian3.cross(r.Cartesian3.UNIT_Z,d,p),n.Matrix3.multiplyByVector(o,p,p),r.Cartesian3.normalize(p,p),e.bitangent&&r.Cartesian3.normalize(r.Cartesian3.cross(d,p,m),m)),e.normal&&(s[c]=d.x,s[f]=d.y,s[h]=d.z),e.tangent&&(l[c]=p.x,l[f]=p.y,l[h]=p.z),e.bitangent&&(u[c]=m.x,u[f]=m.y,u[h]=m.z),c+=3}return D(e,{positions:t,normals:s,tangents:l,bitangents:u})}(h,a,o,e.tangentRotationMatrix),S=6*(s-1)*(y-1);c&&(S+=3*(s-1)),m&&(S+=3*(s-1));var I,H=g.IndexDatatype.createTypedArray(f,S),z=0,B=0;for(I=0;I<y-1;++I){for(var U=0;U<s-1;++U){var q=z,Y=q+s,j=Y+1,X=q+1;H[B++]=q,H[B++]=Y,H[B++]=X,H[B++]=X,H[B++]=Y,H[B++]=j,++z}++z}if(c||m){var Q,W,J=f-1,Z=f-1;if(c&&m&&(J=f-2),z=0,c)for(I=0;I<s-1;I++)W=(Q=z)+1,H[B++]=J,H[B++]=Q,H[B++]=W,++z;if(m)for(z=(y-1)*s,I=0;I<s-1;I++)W=(Q=z)+1,H[B++]=Q,H[B++]=Z,H[B++]=W,++z}return k.indices=H,a.st&&(k.attributes.st=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:v})),k}function T(t,e,a,r,n){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a+2],t[e++]=n[a],t[e++]=n[a+1],t[e]=n[a+2],t}function N(t,e,a,r){return t[e++]=r[a],t[e++]=r[a+1],t[e++]=r[a],t[e]=r[a+1],t}var k=new v.VertexFormat;function S(e,n){var o,i=e._shadowVolume,s=e._offsetAttribute,c=e._vertexFormat,m=e._extrudedHeight,d=e._surfaceHeight,y=e._ellipsoid,f=n.height,_=n.width;if(i){var w=v.VertexFormat.clone(c,k);w.normal=!0,e._vertexFormat=w}var F=O(e,n);i&&(e._vertexFormat=c);var G=A.PolygonPipeline.scaleToGeodeticHeight(F.attributes.position.values,d,y,!1),P=(G=new Float64Array(G)).length,V=2*P,S=new Float64Array(V);S.set(G);var I=A.PolygonPipeline.scaleToGeodeticHeight(F.attributes.position.values,m,y);S.set(I,P),F.attributes.position.values=S;var H,z,B,U=c.normal?new Float32Array(V):void 0,q=c.tangent?new Float32Array(V):void 0,Y=c.bitangent?new Float32Array(V):void 0,j=c.st?new Float32Array(V/3*2):void 0;if(c.normal){for(z=F.attributes.normal.values,U.set(z),o=0;o<P;o++)z[o]=-z[o];U.set(z,P),F.attributes.normal.values=U}if(i){z=F.attributes.normal.values,c.normal||(F.attributes.normal=void 0);var X=new Float32Array(V);for(o=0;o<P;o++)z[o]=-z[o];X.set(z,P),F.attributes.extrudeDirection=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:X})}var Q=t.defined(s);if(Q){var W=P/3*2,J=new Uint8Array(W);s===h.GeometryOffsetAttribute.TOP?J=h.arrayFill(J,1,0,W/2):(B=s===h.GeometryOffsetAttribute.NONE?0:1,J=h.arrayFill(J,B)),F.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:J})}if(c.tangent){var Z=F.attributes.tangent.values;for(q.set(Z),o=0;o<P;o++)Z[o]=-Z[o];q.set(Z,P),F.attributes.tangent.values=q}if(c.bitangent){var K=F.attributes.bitangent.values;Y.set(K),Y.set(K,P),F.attributes.bitangent.values=Y}c.st&&(H=F.attributes.st.values,j.set(H),j.set(H,P/3*2),F.attributes.st.values=j);var $=F.indices,tt=$.length,et=P/3,at=g.IndexDatatype.createTypedArray(V/3,2*tt);for(at.set($),o=0;o<tt;o+=3)at[o+tt]=$[o+2]+et,at[o+1+tt]=$[o+1]+et,at[o+2+tt]=$[o]+et;F.indices=at;var rt=n.northCap,nt=n.southCap,ot=f,it=2,st=0,lt=4,ut=4;rt&&(it-=1,ot-=1,st+=1,lt-=2,ut-=1),nt&&(it-=1,ot-=1,st+=1,lt-=2,ut-=1);var ct=2*((st+=it*_+2*ot-lt)+ut),mt=new Float64Array(3*ct),pt=i?new Float32Array(3*ct):void 0,dt=Q?new Uint8Array(ct):void 0,gt=c.st?new Float32Array(2*ct):void 0,yt=s===h.GeometryOffsetAttribute.TOP;Q&&!yt&&(B=s===h.GeometryOffsetAttribute.ALL?1:0,dt=h.arrayFill(dt,B));var ft,ht=0,vt=0,bt=0,_t=0,At=_*ot;for(o=0;o<At;o+=_)mt=T(mt,ht,ft=3*o,G,I),ht+=6,c.st&&(gt=N(gt,vt,2*o,H),vt+=4),i&&(bt+=3,pt[bt++]=z[ft],pt[bt++]=z[ft+1],pt[bt++]=z[ft+2]),yt&&(dt[_t++]=1,_t+=1);if(nt){var wt=rt?At+1:At;for(ft=3*wt,o=0;o<2;o++)mt=T(mt,ht,ft,G,I),ht+=6,c.st&&(gt=N(gt,vt,2*wt,H),vt+=4),i&&(bt+=3,pt[bt++]=z[ft],pt[bt++]=z[ft+1],pt[bt++]=z[ft+2]),yt&&(dt[_t++]=1,_t+=1)}else for(o=At-_;o<At;o++)mt=T(mt,ht,ft=3*o,G,I),ht+=6,c.st&&(gt=N(gt,vt,2*o,H),vt+=4),i&&(bt+=3,pt[bt++]=z[ft],pt[bt++]=z[ft+1],pt[bt++]=z[ft+2]),yt&&(dt[_t++]=1,_t+=1);for(o=At-1;o>0;o-=_)mt=T(mt,ht,ft=3*o,G,I),ht+=6,c.st&&(gt=N(gt,vt,2*o,H),vt+=4),i&&(bt+=3,pt[bt++]=z[ft],pt[bt++]=z[ft+1],pt[bt++]=z[ft+2]),yt&&(dt[_t++]=1,_t+=1);if(rt){var xt=At;for(ft=3*xt,o=0;o<2;o++)mt=T(mt,ht,ft,G,I),ht+=6,c.st&&(gt=N(gt,vt,2*xt,H),vt+=4),i&&(bt+=3,pt[bt++]=z[ft],pt[bt++]=z[ft+1],pt[bt++]=z[ft+2]),yt&&(dt[_t++]=1,_t+=1)}else for(o=_-1;o>=0;o--)mt=T(mt,ht,ft=3*o,G,I),ht+=6,c.st&&(gt=N(gt,vt,2*o,H),vt+=4),i&&(bt+=3,pt[bt++]=z[ft],pt[bt++]=z[ft+1],pt[bt++]=z[ft+2]),yt&&(dt[_t++]=1,_t+=1);var Ct=function(t,e,n){var o=t.length,i=e.normal?new Float32Array(o):void 0,s=e.tangent?new Float32Array(o):void 0,l=e.bitangent?new Float32Array(o):void 0,u=0,c=0,m=0,p=!0,d=E,g=R,y=C;if(e.normal||e.tangent||e.bitangent)for(var f=0;f<o;f+=6){var h=r.Cartesian3.fromArray(t,f,x),v=r.Cartesian3.fromArray(t,(f+6)%o,L);if(p){var b=r.Cartesian3.fromArray(t,(f+3)%o,M);r.Cartesian3.subtract(v,h,v),r.Cartesian3.subtract(b,h,b),y=r.Cartesian3.normalize(r.Cartesian3.cross(b,v,y),y),p=!1}r.Cartesian3.equalsEpsilon(v,h,a.CesiumMath.EPSILON10)&&(p=!0),(e.tangent||e.bitangent)&&(d=n.geodeticSurfaceNormal(h,d),e.tangent&&(g=r.Cartesian3.normalize(r.Cartesian3.cross(d,y,g),g))),e.normal&&(i[u++]=y.x,i[u++]=y.y,i[u++]=y.z,i[u++]=y.x,i[u++]=y.y,i[u++]=y.z),e.tangent&&(s[c++]=g.x,s[c++]=g.y,s[c++]=g.z,s[c++]=g.x,s[c++]=g.y,s[c++]=g.z),e.bitangent&&(l[m++]=d.x,l[m++]=d.y,l[m++]=d.z,l[m++]=d.x,l[m++]=d.y,l[m++]=d.z)}return D(e,{positions:t,normals:i,tangents:s,bitangents:l})}(mt,c,y);c.st&&(Ct.attributes.st=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:gt})),i&&(Ct.attributes.extrudeDirection=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:pt})),Q&&(Ct.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:dt}));var Rt,Et,Ft,Gt,Pt=g.IndexDatatype.createTypedArray(ct,6*st);P=mt.length/3;var Vt=0;for(o=0;o<P-1;o+=2){Gt=((Rt=o)+2)%P;var Dt=r.Cartesian3.fromArray(mt,3*Rt,L),Lt=r.Cartesian3.fromArray(mt,3*Gt,M);r.Cartesian3.equalsEpsilon(Dt,Lt,a.CesiumMath.EPSILON10)||(Ft=((Et=(Rt+1)%P)+2)%P,Pt[Vt++]=Rt,Pt[Vt++]=Et,Pt[Vt++]=Gt,Pt[Vt++]=Gt,Pt[Vt++]=Et,Pt[Vt++]=Ft)}return Ct.indices=Pt,(Ct=p.GeometryPipeline.combineInstances([new b.GeometryInstance({geometry:F}),new b.GeometryInstance({geometry:Ct})]))[0]}var I=[new r.Cartesian3,new r.Cartesian3,new r.Cartesian3,new r.Cartesian3],H=new r.Cartographic,z=new r.Cartographic;function B(t,e,a,r,n){if(0===a)return i.Rectangle.clone(t,n);var o=w.RectangleGeometryLibrary.computeOptions(t,e,a,0,F,H),s=o.height,l=o.width,u=I;return w.RectangleGeometryLibrary.computePosition(o,r,!1,0,0,u[0]),w.RectangleGeometryLibrary.computePosition(o,r,!1,0,l-1,u[1]),w.RectangleGeometryLibrary.computePosition(o,r,!1,s-1,0,u[2]),w.RectangleGeometryLibrary.computePosition(o,r,!1,s-1,l-1,u[3]),i.Rectangle.fromCartesianArray(u,r,n)}function U(n){var o=(n=t.defaultValue(n,t.defaultValue.EMPTY_OBJECT)).rectangle;if(e.Check.typeOf.object("rectangle",o),i.Rectangle.validate(o),o.north<o.south)throw new e.DeveloperError("options.rectangle.north must be greater than or equal to options.rectangle.south");var s=t.defaultValue(n.height,0),l=t.defaultValue(n.extrudedHeight,s);this._rectangle=i.Rectangle.clone(o),this._granularity=t.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=r.Ellipsoid.clone(t.defaultValue(n.ellipsoid,r.Ellipsoid.WGS84)),this._surfaceHeight=Math.max(s,l),this._rotation=t.defaultValue(n.rotation,0),this._stRotation=t.defaultValue(n.stRotation,0),this._vertexFormat=v.VertexFormat.clone(t.defaultValue(n.vertexFormat,v.VertexFormat.DEFAULT)),this._extrudedHeight=Math.min(s,l),this._shadowVolume=t.defaultValue(n.shadowVolume,!1),this._workerName="createRectangleGeometry",this._offsetAttribute=n.offsetAttribute,this._rotatedRectangle=void 0,this._textureCoordinateRotationPoints=void 0}U.packedLength=i.Rectangle.packedLength+r.Ellipsoid.packedLength+v.VertexFormat.packedLength+7,U.pack=function(a,n,o){return e.Check.typeOf.object("value",a),e.Check.defined("array",n),o=t.defaultValue(o,0),i.Rectangle.pack(a._rectangle,n,o),o+=i.Rectangle.packedLength,r.Ellipsoid.pack(a._ellipsoid,n,o),o+=r.Ellipsoid.packedLength,v.VertexFormat.pack(a._vertexFormat,n,o),o+=v.VertexFormat.packedLength,n[o++]=a._granularity,n[o++]=a._surfaceHeight,n[o++]=a._rotation,n[o++]=a._stRotation,n[o++]=a._extrudedHeight,n[o++]=a._shadowVolume?1:0,n[o]=t.defaultValue(a._offsetAttribute,-1),n};var q=new i.Rectangle,Y=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),j={rectangle:q,ellipsoid:Y,vertexFormat:k,granularity:void 0,height:void 0,rotation:void 0,stRotation:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};U.unpack=function(a,n,o){e.Check.defined("array",a),n=t.defaultValue(n,0);var s=i.Rectangle.unpack(a,n,q);n+=i.Rectangle.packedLength;var l=r.Ellipsoid.unpack(a,n,Y);n+=r.Ellipsoid.packedLength;var u=v.VertexFormat.unpack(a,n,k);n+=v.VertexFormat.packedLength;var c=a[n++],m=a[n++],p=a[n++],d=a[n++],g=a[n++],y=1===a[n++],f=a[n];return t.defined(o)?(o._rectangle=i.Rectangle.clone(s,o._rectangle),o._ellipsoid=r.Ellipsoid.clone(l,o._ellipsoid),o._vertexFormat=v.VertexFormat.clone(u,o._vertexFormat),o._granularity=c,o._surfaceHeight=m,o._rotation=p,o._stRotation=d,o._extrudedHeight=g,o._shadowVolume=y,o._offsetAttribute=-1===f?void 0:f,o):(j.granularity=c,j.height=m,j.rotation=p,j.stRotation=d,j.extrudedHeight=g,j.shadowVolume=y,j.offsetAttribute=-1===f?void 0:f,new U(j))},U.computeRectangle=function(n,o){var s=(n=t.defaultValue(n,t.defaultValue.EMPTY_OBJECT)).rectangle;if(e.Check.typeOf.object("rectangle",s),i.Rectangle.validate(s),s.north<s.south)throw new e.DeveloperError("options.rectangle.north must be greater than or equal to options.rectangle.south");var l=t.defaultValue(n.granularity,a.CesiumMath.RADIANS_PER_DEGREE),u=t.defaultValue(n.ellipsoid,r.Ellipsoid.WGS84);return B(s,l,t.defaultValue(n.rotation,0),u,o)};var X=new n.Matrix3,Q=new n.Quaternion,W=new r.Cartographic;U.createGeometry=function(e){if(!a.CesiumMath.equalsEpsilon(e._rectangle.north,e._rectangle.south,a.CesiumMath.EPSILON10)&&!a.CesiumMath.equalsEpsilon(e._rectangle.east,e._rectangle.west,a.CesiumMath.EPSILON10)){var r=e._rectangle,o=e._ellipsoid,s=e._rotation,c=e._stRotation,m=e._vertexFormat,p=w.RectangleGeometryLibrary.computeOptions(r,e._granularity,s,c,F,H,z),d=X;if(0!==c||0!==s){var g=i.Rectangle.center(r,W),y=o.geodeticSurfaceNormalCartographic(g,L);n.Quaternion.fromAxisAngle(y,-c,Q),n.Matrix3.fromQuaternion(Q,d)}else n.Matrix3.clone(n.Matrix3.IDENTITY,d);var f,v,b=e._surfaceHeight,_=e._extrudedHeight,x=!a.CesiumMath.equalsEpsilon(b,_,0,a.CesiumMath.EPSILON2);if(p.lonScalar=1/e._rectangle.width,p.latScalar=1/e._rectangle.height,p.tangentRotationMatrix=d,r=e._rectangle,x){f=S(e,p);var C=n.BoundingSphere.fromRectangle3D(r,o,b,V),R=n.BoundingSphere.fromRectangle3D(r,o,_,P);v=n.BoundingSphere.union(C,R)}else{if((f=O(e,p)).attributes.position.values=A.PolygonPipeline.scaleToGeodeticHeight(f.attributes.position.values,b,o,!1),t.defined(e._offsetAttribute)){var E=f.attributes.position.values.length,G=new Uint8Array(E/3),D=e._offsetAttribute===h.GeometryOffsetAttribute.NONE?0:1;h.arrayFill(G,D),f.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:l.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:G})}v=n.BoundingSphere.fromRectangle3D(r,o,b)}return m.position||delete f.attributes.position,new u.Geometry({attributes:f.attributes,indices:f.indices,primitiveType:f.primitiveType,boundingSphere:v,offsetAttribute:e._offsetAttribute})}},U.createShadowVolume=function(t,e,a){var r=t._granularity,n=t._ellipsoid,o=e(r,n),i=a(r,n);return new U({rectangle:t._rectangle,rotation:t._rotation,ellipsoid:n,stRotation:t._stRotation,granularity:r,extrudedHeight:i,height:o,vertexFormat:v.VertexFormat.POSITION_ONLY,shadowVolume:!0})};var J=new i.Rectangle,Z=[new i.Cartesian2,new i.Cartesian2,new i.Cartesian2],K=new u.Matrix2,$=new r.Cartographic;return Object.defineProperties(U.prototype,{rectangle:{get:function(){return t.defined(this._rotatedRectangle)||(this._rotatedRectangle=B(this._rectangle,this._granularity,this._rotation,this._ellipsoid)),this._rotatedRectangle}},textureCoordinateRotationPoints:{get:function(){return t.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(t){if(0===t._stRotation)return[0,0,0,1,1,0];var e=i.Rectangle.clone(t._rectangle,J),a=t._granularity,r=t._ellipsoid,n=B(e,a,t._rotation-t._stRotation,r,J),o=Z;o[0].x=n.west,o[0].y=n.south,o[1].x=n.west,o[1].y=n.north,o[2].x=n.east,o[2].y=n.south;for(var s=t.rectangle,l=u.Matrix2.fromRotation(t._stRotation,K),c=i.Rectangle.center(s,$),m=0;m<3;++m){var p=o[m];p.x-=c.longitude,p.y-=c.latitude,u.Matrix2.multiplyByVector(l,p,p),p.x+=c.longitude,p.y+=c.latitude,p.x=(p.x-s.west)/s.width,p.y=(p.y-s.south)/s.height}var d=o[0],g=o[1],y=o[2],f=new Array(6);return i.Cartesian2.pack(d,f),i.Cartesian2.pack(g,f,2),i.Cartesian2.pack(y,f,4),f}(this)),this._textureCoordinateRotationPoints}}}),function(e,a){return t.defined(a)&&(e=U.unpack(e,a)),e._ellipsoid=r.Ellipsoid.clone(e._ellipsoid),e._rectangle=i.Rectangle.clone(e._rectangle),U.createGeometry(e)}}));
//# sourceMappingURL=createRectangleGeometry.js.map
