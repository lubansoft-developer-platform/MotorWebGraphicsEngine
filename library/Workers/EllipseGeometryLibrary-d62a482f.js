define(["exports","./Math-85667bf9","./Ellipsoid-1cbb4ac9","./Transforms-b7ddb22a"],(function(a,r,e,i){"use strict";var t={},n=new e.Cartesian3,s=new e.Cartesian3,o=new i.Quaternion,l=new i.Matrix3;function C(a,r,t,C,y,u,m,c,h,x){var M=a+r;e.Cartesian3.multiplyByScalar(C,Math.cos(M),n),e.Cartesian3.multiplyByScalar(t,Math.sin(M),s),e.Cartesian3.add(n,s,n);var f=Math.cos(a);f*=f;var z=Math.sin(a);z*=z;var d=u/Math.sqrt(m*f+y*z)/c;return i.Quaternion.fromAxisAngle(n,d,o),i.Matrix3.fromQuaternion(o,l),i.Matrix3.multiplyByVector(l,h,x),e.Cartesian3.normalize(x,x),e.Cartesian3.multiplyByScalar(x,c,x),x}var y=new e.Cartesian3,u=new e.Cartesian3,m=new e.Cartesian3,c=new e.Cartesian3;t.raisePositionsToHeight=function(a,r,i){for(var t=r.ellipsoid,n=r.height,s=r.extrudedHeight,o=i?a.length/3*2:a.length/3,l=new Float64Array(3*o),C=a.length,h=i?C:0,x=0;x<C;x+=3){var M=x+1,f=x+2,z=e.Cartesian3.fromArray(a,x,y);t.scaleToGeodeticSurface(z,z);var d=e.Cartesian3.clone(z,u),_=t.geodeticSurfaceNormal(z,c),v=e.Cartesian3.multiplyByScalar(_,n,m);e.Cartesian3.add(z,v,z),i&&(e.Cartesian3.multiplyByScalar(_,s,v),e.Cartesian3.add(d,v,d),l[x+h]=d.x,l[M+h]=d.y,l[f+h]=d.z),l[x]=z.x,l[M]=z.y,l[f]=z.z}return l};var h=new e.Cartesian3,x=new e.Cartesian3,M=new e.Cartesian3;t.computeEllipsePositions=function(a,i,t){var n=a.semiMinorAxis,s=a.semiMajorAxis,o=a.rotation,l=a.center,c=8*a.granularity,f=n*n,z=s*s,d=s*n,_=e.Cartesian3.magnitude(l),v=e.Cartesian3.normalize(l,h),O=e.Cartesian3.cross(e.Cartesian3.UNIT_Z,l,x);O=e.Cartesian3.normalize(O,O);var p=e.Cartesian3.cross(v,O,M),w=1+Math.ceil(r.CesiumMath.PI_OVER_TWO/c),P=r.CesiumMath.PI_OVER_TWO/(w-1),T=r.CesiumMath.PI_OVER_TWO-w*P;T<0&&(w-=Math.ceil(Math.abs(T)/P));var E,I,g,V,A,R=i?new Array(3*(w*(w+2)*2)):void 0,W=0,b=y,S=u,B=4*w*3,Q=B-1,G=0,H=t?new Array(B):void 0;for(b=C(T=r.CesiumMath.PI_OVER_TWO,o,p,O,f,d,z,_,v,b),i&&(R[W++]=b.x,R[W++]=b.y,R[W++]=b.z),t&&(H[Q--]=b.z,H[Q--]=b.y,H[Q--]=b.x),T=r.CesiumMath.PI_OVER_TWO-P,E=1;E<w+1;++E){if(b=C(T,o,p,O,f,d,z,_,v,b),S=C(Math.PI-T,o,p,O,f,d,z,_,v,S),i){for(R[W++]=b.x,R[W++]=b.y,R[W++]=b.z,g=2*E+2,I=1;I<g-1;++I)V=I/(g-1),A=e.Cartesian3.lerp(b,S,V,m),R[W++]=A.x,R[W++]=A.y,R[W++]=A.z;R[W++]=S.x,R[W++]=S.y,R[W++]=S.z}t&&(H[Q--]=b.z,H[Q--]=b.y,H[Q--]=b.x,H[G++]=S.x,H[G++]=S.y,H[G++]=S.z),T=r.CesiumMath.PI_OVER_TWO-(E+1)*P}for(E=w;E>1;--E){if(b=C(-(T=r.CesiumMath.PI_OVER_TWO-(E-1)*P),o,p,O,f,d,z,_,v,b),S=C(T+Math.PI,o,p,O,f,d,z,_,v,S),i){for(R[W++]=b.x,R[W++]=b.y,R[W++]=b.z,g=2*(E-1)+2,I=1;I<g-1;++I)V=I/(g-1),A=e.Cartesian3.lerp(b,S,V,m),R[W++]=A.x,R[W++]=A.y,R[W++]=A.z;R[W++]=S.x,R[W++]=S.y,R[W++]=S.z}t&&(H[Q--]=b.z,H[Q--]=b.y,H[Q--]=b.x,H[G++]=S.x,H[G++]=S.y,H[G++]=S.z)}b=C(-(T=r.CesiumMath.PI_OVER_TWO),o,p,O,f,d,z,_,v,b);var N={};return i&&(R[W++]=b.x,R[W++]=b.y,R[W++]=b.z,N.positions=R,N.numPts=w),t&&(H[Q--]=b.z,H[Q--]=b.y,H[Q--]=b.x,N.outerPositions=H),N},a.EllipseGeometryLibrary=t}));
//# sourceMappingURL=EllipseGeometryLibrary-d62a482f.js.map