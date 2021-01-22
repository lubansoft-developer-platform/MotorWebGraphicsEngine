define(["exports","./when-7ef6387a","./Check-ed6a1804","./Cartesian3-cb3509e0","./Transforms-fe3a4031","./ComponentDatatype-3593b1c2","./GeometryAttribute-e8505198","./PrimitiveType-4c1d698a","./GeometryAttributes-cb18da36","./GeometryOffsetAttribute-e4fca9ed","./VertexFormat-c6d7c90a"],(function(e,t,a,n,r,i,o,m,u,s,y){"use strict";var p=new n.Cartesian3;function x(e){var a=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).minimum,r=e.maximum,i=t.defaultValue(e.vertexFormat,y.VertexFormat.DEFAULT);this._minimum=n.Cartesian3.clone(a),this._maximum=n.Cartesian3.clone(r),this._vertexFormat=i,this._offsetAttribute=e.offsetAttribute,this._workerName="createBoxGeometry"}x.fromDimensions=function(e){var a=(e=t.defaultValue(e,t.defaultValue.EMPTY_OBJECT)).dimensions,r=n.Cartesian3.multiplyByScalar(a,.5,new n.Cartesian3);return new x({minimum:n.Cartesian3.negate(r,new n.Cartesian3),maximum:r,vertexFormat:e.vertexFormat,offsetAttribute:e.offsetAttribute})},x.fromAxisAlignedBoundingBox=function(e){return new x({minimum:e.minimum,maximum:e.maximum})},x.packedLength=2*n.Cartesian3.packedLength+y.VertexFormat.packedLength+1,x.pack=function(e,a,r){return r=t.defaultValue(r,0),n.Cartesian3.pack(e._minimum,a,r),n.Cartesian3.pack(e._maximum,a,r+n.Cartesian3.packedLength),y.VertexFormat.pack(e._vertexFormat,a,r+2*n.Cartesian3.packedLength),a[r+2*n.Cartesian3.packedLength+y.VertexFormat.packedLength]=t.defaultValue(e._offsetAttribute,-1),a};var f,c=new n.Cartesian3,A=new n.Cartesian3,l=new y.VertexFormat,d={minimum:c,maximum:A,vertexFormat:l,offsetAttribute:void 0};x.unpack=function(e,a,r){a=t.defaultValue(a,0);var i=n.Cartesian3.unpack(e,a,c),o=n.Cartesian3.unpack(e,a+n.Cartesian3.packedLength,A),m=y.VertexFormat.unpack(e,a+2*n.Cartesian3.packedLength,l),u=e[a+2*n.Cartesian3.packedLength+y.VertexFormat.packedLength];return t.defined(r)?(r._minimum=n.Cartesian3.clone(i,r._minimum),r._maximum=n.Cartesian3.clone(o,r._maximum),r._vertexFormat=y.VertexFormat.clone(m,r._vertexFormat),r._offsetAttribute=-1===u?void 0:u,r):(d.offsetAttribute=-1===u?void 0:u,new x(d))},x.createGeometry=function(e){var a=e._minimum,y=e._maximum,x=e._vertexFormat;if(!n.Cartesian3.equals(a,y)){var f,c,A=new u.GeometryAttributes;if(x.position&&(x.st||x.normal||x.tangent||x.bitangent)){if(x.position&&((c=new Float64Array(72))[0]=a.x,c[1]=a.y,c[2]=y.z,c[3]=y.x,c[4]=a.y,c[5]=y.z,c[6]=y.x,c[7]=y.y,c[8]=y.z,c[9]=a.x,c[10]=y.y,c[11]=y.z,c[12]=a.x,c[13]=a.y,c[14]=a.z,c[15]=y.x,c[16]=a.y,c[17]=a.z,c[18]=y.x,c[19]=y.y,c[20]=a.z,c[21]=a.x,c[22]=y.y,c[23]=a.z,c[24]=y.x,c[25]=a.y,c[26]=a.z,c[27]=y.x,c[28]=y.y,c[29]=a.z,c[30]=y.x,c[31]=y.y,c[32]=y.z,c[33]=y.x,c[34]=a.y,c[35]=y.z,c[36]=a.x,c[37]=a.y,c[38]=a.z,c[39]=a.x,c[40]=y.y,c[41]=a.z,c[42]=a.x,c[43]=y.y,c[44]=y.z,c[45]=a.x,c[46]=a.y,c[47]=y.z,c[48]=a.x,c[49]=y.y,c[50]=a.z,c[51]=y.x,c[52]=y.y,c[53]=a.z,c[54]=y.x,c[55]=y.y,c[56]=y.z,c[57]=a.x,c[58]=y.y,c[59]=y.z,c[60]=a.x,c[61]=a.y,c[62]=a.z,c[63]=y.x,c[64]=a.y,c[65]=a.z,c[66]=y.x,c[67]=a.y,c[68]=y.z,c[69]=a.x,c[70]=a.y,c[71]=y.z,A.position=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c})),x.normal){var l=new Float32Array(72);l[0]=0,l[1]=0,l[2]=1,l[3]=0,l[4]=0,l[5]=1,l[6]=0,l[7]=0,l[8]=1,l[9]=0,l[10]=0,l[11]=1,l[12]=0,l[13]=0,l[14]=-1,l[15]=0,l[16]=0,l[17]=-1,l[18]=0,l[19]=0,l[20]=-1,l[21]=0,l[22]=0,l[23]=-1,l[24]=1,l[25]=0,l[26]=0,l[27]=1,l[28]=0,l[29]=0,l[30]=1,l[31]=0,l[32]=0,l[33]=1,l[34]=0,l[35]=0,l[36]=-1,l[37]=0,l[38]=0,l[39]=-1,l[40]=0,l[41]=0,l[42]=-1,l[43]=0,l[44]=0,l[45]=-1,l[46]=0,l[47]=0,l[48]=0,l[49]=1,l[50]=0,l[51]=0,l[52]=1,l[53]=0,l[54]=0,l[55]=1,l[56]=0,l[57]=0,l[58]=1,l[59]=0,l[60]=0,l[61]=-1,l[62]=0,l[63]=0,l[64]=-1,l[65]=0,l[66]=0,l[67]=-1,l[68]=0,l[69]=0,l[70]=-1,l[71]=0,A.normal=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:l})}if(x.st){var d=new Float32Array(48);d[0]=0,d[1]=0,d[2]=1,d[3]=0,d[4]=1,d[5]=1,d[6]=0,d[7]=1,d[8]=1,d[9]=0,d[10]=0,d[11]=0,d[12]=0,d[13]=1,d[14]=1,d[15]=1,d[16]=0,d[17]=0,d[18]=1,d[19]=0,d[20]=1,d[21]=1,d[22]=0,d[23]=1,d[24]=1,d[25]=0,d[26]=0,d[27]=0,d[28]=0,d[29]=1,d[30]=1,d[31]=1,d[32]=1,d[33]=0,d[34]=0,d[35]=0,d[36]=0,d[37]=1,d[38]=1,d[39]=1,d[40]=0,d[41]=0,d[42]=1,d[43]=0,d[44]=1,d[45]=1,d[46]=0,d[47]=1,A.st=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:d})}if(x.tangent){var b=new Float32Array(72);b[0]=1,b[1]=0,b[2]=0,b[3]=1,b[4]=0,b[5]=0,b[6]=1,b[7]=0,b[8]=0,b[9]=1,b[10]=0,b[11]=0,b[12]=-1,b[13]=0,b[14]=0,b[15]=-1,b[16]=0,b[17]=0,b[18]=-1,b[19]=0,b[20]=0,b[21]=-1,b[22]=0,b[23]=0,b[24]=0,b[25]=1,b[26]=0,b[27]=0,b[28]=1,b[29]=0,b[30]=0,b[31]=1,b[32]=0,b[33]=0,b[34]=1,b[35]=0,b[36]=0,b[37]=-1,b[38]=0,b[39]=0,b[40]=-1,b[41]=0,b[42]=0,b[43]=-1,b[44]=0,b[45]=0,b[46]=-1,b[47]=0,b[48]=-1,b[49]=0,b[50]=0,b[51]=-1,b[52]=0,b[53]=0,b[54]=-1,b[55]=0,b[56]=0,b[57]=-1,b[58]=0,b[59]=0,b[60]=1,b[61]=0,b[62]=0,b[63]=1,b[64]=0,b[65]=0,b[66]=1,b[67]=0,b[68]=0,b[69]=1,b[70]=0,b[71]=0,A.tangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:b})}if(x.bitangent){var C=new Float32Array(72);C[0]=0,C[1]=1,C[2]=0,C[3]=0,C[4]=1,C[5]=0,C[6]=0,C[7]=1,C[8]=0,C[9]=0,C[10]=1,C[11]=0,C[12]=0,C[13]=1,C[14]=0,C[15]=0,C[16]=1,C[17]=0,C[18]=0,C[19]=1,C[20]=0,C[21]=0,C[22]=1,C[23]=0,C[24]=0,C[25]=0,C[26]=1,C[27]=0,C[28]=0,C[29]=1,C[30]=0,C[31]=0,C[32]=1,C[33]=0,C[34]=0,C[35]=1,C[36]=0,C[37]=0,C[38]=1,C[39]=0,C[40]=0,C[41]=1,C[42]=0,C[43]=0,C[44]=1,C[45]=0,C[46]=0,C[47]=1,C[48]=0,C[49]=0,C[50]=1,C[51]=0,C[52]=0,C[53]=1,C[54]=0,C[55]=0,C[56]=1,C[57]=0,C[58]=0,C[59]=1,C[60]=0,C[61]=0,C[62]=1,C[63]=0,C[64]=0,C[65]=1,C[66]=0,C[67]=0,C[68]=1,C[69]=0,C[70]=0,C[71]=1,A.bitangent=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:C})}(f=new Uint16Array(36))[0]=0,f[1]=1,f[2]=2,f[3]=0,f[4]=2,f[5]=3,f[6]=6,f[7]=5,f[8]=4,f[9]=7,f[10]=6,f[11]=4,f[12]=8,f[13]=9,f[14]=10,f[15]=8,f[16]=10,f[17]=11,f[18]=14,f[19]=13,f[20]=12,f[21]=15,f[22]=14,f[23]=12,f[24]=18,f[25]=17,f[26]=16,f[27]=19,f[28]=18,f[29]=16,f[30]=20,f[31]=21,f[32]=22,f[33]=20,f[34]=22,f[35]=23}else(c=new Float64Array(24))[0]=a.x,c[1]=a.y,c[2]=a.z,c[3]=y.x,c[4]=a.y,c[5]=a.z,c[6]=y.x,c[7]=y.y,c[8]=a.z,c[9]=a.x,c[10]=y.y,c[11]=a.z,c[12]=a.x,c[13]=a.y,c[14]=y.z,c[15]=y.x,c[16]=a.y,c[17]=y.z,c[18]=y.x,c[19]=y.y,c[20]=y.z,c[21]=a.x,c[22]=y.y,c[23]=y.z,A.position=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),(f=new Uint16Array(36))[0]=4,f[1]=5,f[2]=6,f[3]=4,f[4]=6,f[5]=7,f[6]=1,f[7]=0,f[8]=3,f[9]=1,f[10]=3,f[11]=2,f[12]=1,f[13]=6,f[14]=5,f[15]=1,f[16]=2,f[17]=6,f[18]=2,f[19]=3,f[20]=7,f[21]=2,f[22]=7,f[23]=6,f[24]=3,f[25]=0,f[26]=4,f[27]=3,f[28]=4,f[29]=7,f[30]=0,f[31]=1,f[32]=5,f[33]=0,f[34]=5,f[35]=4;var v=n.Cartesian3.subtract(y,a,p),z=.5*n.Cartesian3.magnitude(v);if(t.defined(e._offsetAttribute)){var F=c.length,w=new Uint8Array(F/3),_=e._offsetAttribute===s.GeometryOffsetAttribute.NONE?0:1;s.arrayFill(w,_),A.applyOffset=new o.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:w})}return new o.Geometry({attributes:A,indices:f,primitiveType:m.PrimitiveType.TRIANGLES,boundingSphere:new r.BoundingSphere(n.Cartesian3.ZERO,z),offsetAttribute:e._offsetAttribute})}},x.getUnitBox=function(){return t.defined(f)||(f=x.createGeometry(x.fromDimensions({dimensions:new n.Cartesian3(1,1,1),vertexFormat:y.VertexFormat.POSITION_ONLY}))),f},e.BoxGeometry=x}));
