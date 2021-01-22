define(["exports","./Check-ed6a1804","./Cartesian3-cb3509e0","./Matrix4-a5b26d08","./Cartesian2-7da3df11","./OrientedBoundingBox-5bb639ea"],(function(n,t,e,a,r,i){"use strict";var o={},u=new e.Cartesian3,s=new e.Cartesian3,C=new e.Cartesian3,c=new e.Cartesian3,d=new i.OrientedBoundingBox;function m(n,t,a,i,o){var s=e.Cartesian3.subtract(n,t,u),C=e.Cartesian3.dot(a,s),c=e.Cartesian3.dot(i,s);return r.Cartesian2.fromElements(C,c,o)}o.validOutline=function(n){var t=i.OrientedBoundingBox.fromPoints(n,d).halfAxes,r=a.Matrix3.getColumn(t,0,s),o=a.Matrix3.getColumn(t,1,C),u=a.Matrix3.getColumn(t,2,c),m=e.Cartesian3.magnitude(r),g=e.Cartesian3.magnitude(o),l=e.Cartesian3.magnitude(u);return!(0===m&&(0===g||0===l)||0===g&&0===l)},o.computeProjectTo2DArguments=function(n,t,r,o){var u,m,g=i.OrientedBoundingBox.fromPoints(n,d),l=g.halfAxes,f=a.Matrix3.getColumn(l,0,s),x=a.Matrix3.getColumn(l,1,C),B=a.Matrix3.getColumn(l,2,c),M=e.Cartesian3.magnitude(f),P=e.Cartesian3.magnitude(x),b=e.Cartesian3.magnitude(B),h=Math.min(M,P,b);return(0!==M||0!==P&&0!==b)&&(0!==P||0!==b)&&(h!==P&&h!==b||(u=f),h===M?u=x:h===b&&(m=x),h!==M&&h!==P||(m=B),e.Cartesian3.normalize(u,r),e.Cartesian3.normalize(m,o),e.Cartesian3.clone(g.center,t),!0)},o.createProjectPointsTo2DFunction=function(n,t,e){return function(a){for(var r=new Array(a.length),i=0;i<a.length;i++)r[i]=m(a[i],n,t,e);return r}},o.createProjectPointTo2DFunction=function(n,t,e){return function(a,r){return m(a,n,t,e,r)}},n.CoplanarPolygonGeometryLibrary=o}));
