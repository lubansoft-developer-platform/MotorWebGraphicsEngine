/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./Ellipsoid-d2aa3b12","./Transforms-7b04d7e0","./Matrix4-33464f2b","./FeatureDetection-0d4fee13","./ComponentDatatype-329b9462","./GeometryAttribute-b8faa946","./GeometryAttributes-614c63f8","./GeometryPipeline-f9bdb2cf","./IndexDatatype-153fdd7f","./WebMercatorProjection-72bc39e7"],(function(e,t,r,n,i,o,a,s,d,p,f,u,c,m){"use strict";function h(e,r,n){e=t.defaultValue(e,0),r=t.defaultValue(r,0),n=t.defaultValue(n,0),this.value=new Float32Array([e,r,n])}function l(e,t){var r=e.attributes,n=r.position,i=n.values.length/n.componentsPerAttribute;r.batchId=new p.GeometryAttribute({componentDatatype:d.ComponentDatatype.FLOAT,componentsPerAttribute:1,values:new Float32Array(i)});for(var o=r.batchId.values,a=0;a<i;++a)o[a]=t}function g(e){var n,i,s,p=e.instances,f=e.projection,c=e.elementIndexUintSupported,m=e.scene3DOnly,h=e.vertexCacheOptimize,g=e.compressVertices,y=e.modelMatrix,b=p.length;for(n=0;n<b;++n)if(t.defined(p[n].geometry)){s=p[n].geometry.primitiveType;break}for(n=1;n<b;++n)if(t.defined(p[n].geometry)&&p[n].geometry.primitiveType!==s)throw new r.DeveloperError("All instance geometries must have the same primitiveType.");if(function(e,r,n){var i,o=!n,s=e.length;if(!o&&s>1){var d=e[0].modelMatrix;for(i=1;i<s;++i)if(!a.Matrix4.equals(d,e[i].modelMatrix)){o=!0;break}}if(o)for(i=0;i<s;++i)t.defined(e[i].geometry)&&u.GeometryPipeline.transformToWorldCoordinates(e[i]);else a.Matrix4.multiplyTransformation(r,e[0].modelMatrix,r)}(p,y,m),!m)for(n=0;n<b;++n)t.defined(p[n].geometry)&&u.GeometryPipeline.splitLongitude(p[n]);if(function(e){for(var r=e.length,n=0;n<r;++n){var i=e[n];t.defined(i.geometry)?l(i.geometry,n):t.defined(i.westHemisphereGeometry)&&t.defined(i.eastHemisphereGeometry)&&(l(i.westHemisphereGeometry,n),l(i.eastHemisphereGeometry,n))}}(p),h)for(n=0;n<b;++n){var v=p[n];t.defined(v.geometry)?(u.GeometryPipeline.reorderForPostVertexCache(v.geometry),u.GeometryPipeline.reorderForPreVertexCache(v.geometry)):t.defined(v.westHemisphereGeometry)&&t.defined(v.eastHemisphereGeometry)&&(u.GeometryPipeline.reorderForPostVertexCache(v.westHemisphereGeometry),u.GeometryPipeline.reorderForPreVertexCache(v.westHemisphereGeometry),u.GeometryPipeline.reorderForPostVertexCache(v.eastHemisphereGeometry),u.GeometryPipeline.reorderForPreVertexCache(v.eastHemisphereGeometry))}var x=u.GeometryPipeline.combineInstances(p);for(b=x.length,n=0;n<b;++n){var G,S=(i=x[n]).attributes;if(m)for(G in S)S.hasOwnProperty(G)&&S[G].componentDatatype===d.ComponentDatatype.DOUBLE&&u.GeometryPipeline.encodeAttribute(i,G,G+"3DHigh",G+"3DLow");else for(G in S)if(S.hasOwnProperty(G)&&S[G].componentDatatype===d.ComponentDatatype.DOUBLE){var P=G+"3D",k=G+"2D";u.GeometryPipeline.projectTo2D(i,G,P,k,f),t.defined(i.boundingSphere)&&"position"===G&&(i.boundingSphereCV=o.BoundingSphere.fromVertices(i.attributes.position2D.values)),u.GeometryPipeline.encodeAttribute(i,P,P+"High",P+"Low"),u.GeometryPipeline.encodeAttribute(i,k,k+"High",k+"Low")}g&&u.GeometryPipeline.compressVertices(i)}if(!c){var C=[];for(b=x.length,n=0;n<b;++n)i=x[n],C=C.concat(u.GeometryPipeline.fitToUnsignedShortIndices(i));x=C}return x}function y(e,r,n,i){var o,a,s,d=i.length-1;if(d>=0){var p=i[d];o=p.offset+p.count,a=n[s=p.index].indices.length}else o=0,a=n[s=0].indices.length;for(var f=e.length,u=0;u<f;++u){var c=e[u][r];if(t.defined(c)){var m=c.indices.length;o+m>a&&(o=0,a=n[++s].indices.length),i.push({index:s,offset:o,count:m}),o+=m}}}n.defineProperties(h.prototype,{componentDatatype:{get:function(){return d.ComponentDatatype.FLOAT}},componentsPerAttribute:{get:function(){return 3}},normalize:{get:function(){return!1}}}),h.fromCartesian3=function(e){return r.Check.defined("offset",e),new h(e.x,e.y,e.z)},h.toValue=function(e,n){return r.Check.defined("offset",e),t.defined(n)||(n=new Float32Array([e.x,e.y,e.z])),n[0]=e.x,n[1]=e.y,n[2]=e.z,n};var b={};function v(e,r){var n=e.attributes;for(var i in n)if(n.hasOwnProperty(i)){var o=n[i];t.defined(o)&&t.defined(o.values)&&r.push(o.values.buffer)}t.defined(e.indices)&&r.push(e.indices.buffer)}function x(e,r){var n=e.length,i=new Float64Array(1+19*n),o=0;i[o++]=n;for(var s=0;s<n;s++){var d=e[s];if(a.Matrix4.pack(d.modelMatrix,i,o),o+=a.Matrix4.packedLength,t.defined(d.attributes)&&t.defined(d.attributes.offset)){var p=d.attributes.offset.value;i[o]=p[0],i[o+1]=p[1],i[o+2]=p[2]}o+=3}return r.push(i.buffer),i}function G(e){var r=e.length,n=1+(o.BoundingSphere.packedLength+1)*r,i=new Float32Array(n),a=0;i[a++]=r;for(var s=0;s<r;++s){var d=e[s];t.defined(d)?(i[a++]=1,o.BoundingSphere.pack(e[s],i,a)):i[a++]=0,a+=o.BoundingSphere.packedLength}return i}function S(e){for(var t=new Array(e[0]),r=0,n=1;n<e.length;)1===e[n++]&&(t[r]=o.BoundingSphere.unpack(e,n)),++r,n+=o.BoundingSphere.packedLength;return t}b.combineGeometry=function(e){var r,n,i,a,s=e.instances,d=s.length,p=!1;d>0&&((r=g(e)).length>0&&(n=u.GeometryPipeline.createAttributeLocations(r[0]),e.createPickOffsets&&(i=function(e,t){var r=[];return y(e,"geometry",t,r),y(e,"westHemisphereGeometry",t,r),y(e,"eastHemisphereGeometry",t,r),r}(s,r))),t.defined(s[0].attributes)&&t.defined(s[0].attributes.offset)&&(a=new Array(d),p=!0));for(var f=new Array(d),c=new Array(d),m=0;m<d;++m){var h=s[m],l=h.geometry;t.defined(l)&&(f[m]=l.boundingSphere,c[m]=l.boundingSphereCV,p&&(a[m]=h.geometry.offsetAttribute));var b=h.eastHemisphereGeometry,v=h.westHemisphereGeometry;t.defined(b)&&t.defined(v)&&(t.defined(b.boundingSphere)&&t.defined(v.boundingSphere)&&(f[m]=o.BoundingSphere.union(b.boundingSphere,v.boundingSphere)),t.defined(b.boundingSphereCV)&&t.defined(v.boundingSphereCV)&&(c[m]=o.BoundingSphere.union(b.boundingSphereCV,v.boundingSphereCV)))}return{geometries:r,modelMatrix:e.modelMatrix,attributeLocations:n,pickOffsets:i,offsetInstanceExtend:a,boundingSpheres:f,boundingSpheresCV:c}},b.packCreateGeometryResults=function(e,r){var n=new Float64Array(function(e){for(var r=1,n=e.length,i=0;i<n;i++){var a=e[i];if(++r,t.defined(a)){var s=a.attributes;for(var d in r+=7+2*o.BoundingSphere.packedLength+(t.defined(a.indices)?a.indices.length:0),s){if(s.hasOwnProperty(d)&&t.defined(s[d]))r+=5+s[d].values.length}}}return r}(e)),i=[],a={},s=e.length,d=0;n[d++]=s;for(var p=0;p<s;p++){var f=e[p],u=t.defined(f);if(n[d++]=u?1:0,u){n[d++]=f.primitiveType,n[d++]=f.geometryType,n[d++]=t.defaultValue(f.offsetAttribute,-1);var c=t.defined(f.boundingSphere)?1:0;n[d++]=c,c&&o.BoundingSphere.pack(f.boundingSphere,n,d),d+=o.BoundingSphere.packedLength;var m=t.defined(f.boundingSphereCV)?1:0;n[d++]=m,m&&o.BoundingSphere.pack(f.boundingSphereCV,n,d),d+=o.BoundingSphere.packedLength;var h=f.attributes,l=[];for(var g in h)h.hasOwnProperty(g)&&t.defined(h[g])&&(l.push(g),t.defined(a[g])||(a[g]=i.length,i.push(g)));n[d++]=l.length;for(var y=0;y<l.length;y++){var b=l[y],v=h[b];n[d++]=a[b],n[d++]=v.componentDatatype,n[d++]=v.componentsPerAttribute,n[d++]=v.normalize?1:0,n[d++]=v.values.length,n.set(v.values,d),d+=v.values.length}var x=t.defined(f.indices)?f.indices.length:0;n[d++]=x,x>0&&(n.set(f.indices,d),d+=x)}}return r.push(n.buffer),{stringTable:i,packedData:n}},b.unpackCreateGeometryResults=function(e){for(var t,r=e.stringTable,n=e.packedData,i=new Array(n[0]),a=0,s=1;s<n.length;){if(1===n[s++]){var u,m,h,l,g,y=n[s++],b=n[s++],v=n[s++];-1===v&&(v=void 0),1===n[s++]&&(u=o.BoundingSphere.unpack(n,s)),s+=o.BoundingSphere.packedLength,1===n[s++]&&(m=o.BoundingSphere.unpack(n,s)),s+=o.BoundingSphere.packedLength;var x,G=new f.GeometryAttributes,S=n[s++];for(t=0;t<S;t++){var P=r[n[s++]],k=n[s++];g=n[s++];var C=0!==n[s++];h=n[s++],l=d.ComponentDatatype.createTypedArray(k,h);for(var w=0;w<h;w++)l[w]=n[s++];G[P]=new p.GeometryAttribute({componentDatatype:k,componentsPerAttribute:g,normalize:C,values:l})}if((h=n[s++])>0){var A=l.length/g;for(x=c.IndexDatatype.createTypedArray(A,h),t=0;t<h;t++)x[t]=n[s++]}i[a++]=new p.Geometry({primitiveType:y,geometryType:b,boundingSphere:u,boundingSphereCV:m,indices:x,attributes:G,offsetAttribute:v})}else i[a++]=void 0}return i},b.packCombineGeometryParameters=function(e,t){for(var r=e.createGeometryResults,n=r.length,i=0;i<n;i++)t.push(r[i].packedData.buffer);return{createGeometryResults:e.createGeometryResults,packedInstances:x(e.instances,t),ellipsoid:e.ellipsoid,isGeographic:e.projection instanceof o.GeographicProjection,elementIndexUintSupported:e.elementIndexUintSupported,scene3DOnly:e.scene3DOnly,vertexCacheOptimize:e.vertexCacheOptimize,compressVertices:e.compressVertices,modelMatrix:e.modelMatrix,createPickOffsets:e.createPickOffsets}},b.unpackCombineGeometryParameters=function(e){for(var r=function(e){for(var r=e,n=new Array(r[0]),i=0,o=1;o<r.length;){var s,d=a.Matrix4.unpack(r,o);o+=a.Matrix4.packedLength,t.defined(r[o])&&(s={offset:new h(r[o],r[o+1],r[o+2])}),o+=3,n[i++]={modelMatrix:d,attributes:s}}return n}(e.packedInstances),n=e.createGeometryResults,s=n.length,d=0,p=0;p<s;p++)for(var f=b.unpackCreateGeometryResults(n[p]),u=f.length,c=0;c<u;c++){var l=f[c];r[d].geometry=l,++d}var g=i.Ellipsoid.clone(e.ellipsoid);return{instances:r,ellipsoid:g,projection:e.isGeographic?new o.GeographicProjection(g):new m.WebMercatorProjection(g),elementIndexUintSupported:e.elementIndexUintSupported,scene3DOnly:e.scene3DOnly,vertexCacheOptimize:e.vertexCacheOptimize,compressVertices:e.compressVertices,modelMatrix:a.Matrix4.clone(e.modelMatrix),createPickOffsets:e.createPickOffsets}},b.packCombineGeometryResults=function(e,r){t.defined(e.geometries)&&function(e,t){for(var r=e.length,n=0;n<r;++n)v(e[n],t)}(e.geometries,r);var n=G(e.boundingSpheres),i=G(e.boundingSpheresCV);return r.push(n.buffer,i.buffer),{geometries:e.geometries,attributeLocations:e.attributeLocations,modelMatrix:e.modelMatrix,pickOffsets:e.pickOffsets,offsetInstanceExtend:e.offsetInstanceExtend,boundingSpheres:n,boundingSpheresCV:i}},b.unpackCombineGeometryResults=function(e){return{geometries:e.geometries,attributeLocations:e.attributeLocations,modelMatrix:e.modelMatrix,pickOffsets:e.pickOffsets,offsetInstanceExtend:e.offsetInstanceExtend,boundingSpheres:S(e.boundingSpheres),boundingSpheresCV:S(e.boundingSpheresCV)}},e.PrimitivePipeline=b}));