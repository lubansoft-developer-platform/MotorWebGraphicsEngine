define(["exports","./when-7ef6387a","./Check-ed6a1804","./Cartesian3-cb3509e0","./Ellipsoid-fc93f17d","./Transforms-fe3a4031","./Cartesian2-7da3df11","./GeometryAttribute-e8505198"],(function(t,n,a,r,e,o,s,i){"use strict";var g=Math.cos,h=Math.sin,u=Math.sqrt,c={computePosition:function(t,a,r,e,o,s,i){var c=a.radiiSquared,C=t.nwCorner,l=t.boundingRectangle,d=C.latitude-t.granYCos*e+o*t.granXSin,S=g(d),w=h(d),M=c.z*w,f=C.longitude+e*t.granYSin+o*t.granXCos,X=S*g(f),Y=S*h(f),m=c.x*X,p=c.y*Y,v=u(m*X+p*Y+M*w);if(s.x=m/v,s.y=p/v,s.z=M/v,r){var G=t.stNwCorner;n.defined(G)?(d=G.latitude-t.stGranYCos*e+o*t.stGranXSin,f=G.longitude+e*t.stGranYSin+o*t.stGranXCos,i.x=(f-t.stWest)*t.lonScalar,i.y=(d-t.stSouth)*t.latScalar):(i.x=(f-l.west)*t.lonScalar,i.y=(d-l.south)*t.latScalar)}}},C=new i.Matrix2,l=new r.Cartesian3,d=new e.Cartographic,S=new r.Cartesian3,w=new o.GeographicProjection;function M(t,n,a,e,o,s,g){var h=Math.cos(n),u=e*h,c=a*h,d=Math.sin(n),M=e*d,f=a*d;l=w.project(t,l),l=r.Cartesian3.subtract(l,S,l);var X=i.Matrix2.fromRotation(n,C);l=i.Matrix2.multiplyByVector(X,l,l),l=r.Cartesian3.add(l,S,l),s-=1,g-=1;var Y=(t=w.unproject(l,t)).latitude,m=Y+s*f,p=Y-u*g,v=Y-u*g+s*f,G=Math.max(Y,m,p,v),x=Math.min(Y,m,p,v),R=t.longitude,y=R+s*c,O=R+g*M,b=R+g*M+s*c;return{north:G,south:x,east:Math.max(R,y,O,b),west:Math.min(R,y,O,b),granYCos:u,granYSin:M,granXCos:c,granXSin:f,nwCorner:t}}c.computeOptions=function(t,n,a,e,o,i,g){var h,u,c,C,l,f=t.east,X=t.west,Y=t.north,m=t.south,p=!1,v=!1;Y===r.CesiumMath.PI_OVER_TWO&&(p=!0),m===-r.CesiumMath.PI_OVER_TWO&&(v=!0);var G=Y-m;c=(l=X>f?r.CesiumMath.TWO_PI-X+f:f-X)/((h=Math.ceil(l/n)+1)-1),C=G/((u=Math.ceil(G/n)+1)-1);var x=s.Rectangle.northwest(t,i),R=s.Rectangle.center(t,d);0===a&&0===e||(R.longitude<x.longitude&&(R.longitude+=r.CesiumMath.TWO_PI),S=w.project(R,S));var y=C,O=c,b=s.Rectangle.clone(t,o),P={granYCos:y,granYSin:0,granXCos:O,granXSin:0,nwCorner:x,boundingRectangle:b,width:h,height:u,northCap:p,southCap:v};if(0!==a){var W=M(x,a,c,C,0,h,u);Y=W.north,m=W.south,f=W.east,X=W.west,P.granYCos=W.granYCos,P.granYSin=W.granYSin,P.granXCos=W.granXCos,P.granXSin=W.granXSin,b.north=Y,b.south=m,b.east=f,b.west=X}if(0!==e){a-=e;var _=s.Rectangle.northwest(b,g),T=M(_,a,c,C,0,h,u);P.stGranYCos=T.granYCos,P.stGranXCos=T.granXCos,P.stGranYSin=T.granYSin,P.stGranXSin=T.granXSin,P.stNwCorner=_,P.stWest=T.west,P.stSouth=T.south}return P},t.RectangleGeometryLibrary=c}));