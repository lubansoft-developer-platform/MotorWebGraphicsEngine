/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
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
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */

define(['./when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Ellipsoid-f29f901d', './Transforms-7fcb5ea2', './Matrix4-c68aaa66', './RuntimeError-5b606d78', './Cartesian2-e5f465dc', './WebGLConstants-30fc6f5c', './ComponentDatatype-a863af81', './PrimitiveType-4c1d698a', './EnvironmentVariables-cc0d0032', './AttributeCompression-414035f7', './IndexDatatype-571b3b65', './IntersectionTests-44b0fe21', './Plane-f22e7e98', './WebMercatorProjection-96eb07e4', './createTaskProcessorWorker', './EllipsoidTangentPlane-03282d71', './OrientedBoundingBox-f3c3f2ec', './CreatePhysicalArray-a5662e79', './TerrainEncoding-ab1deba0', './TerrainProvider-d509ef7c'], function (when, Check, Cartesian3, Ellipsoid, Transforms, Matrix4, RuntimeError, Cartesian2, WebGLConstants, ComponentDatatype, PrimitiveType, EnvironmentVariables, AttributeCompression, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection, createTaskProcessorWorker, EllipsoidTangentPlane, OrientedBoundingBox, CreatePhysicalArray, TerrainEncoding, TerrainProvider) { 'use strict';

    var maxShort = 32767;

    var cartesian3Scratch = new Cartesian3.Cartesian3();
    var scratchMinimum = new Cartesian3.Cartesian3();
    var scratchMaximum = new Cartesian3.Cartesian3();
    var cartographicScratch = new Ellipsoid.Cartographic();
    var toPack = new Cartesian2.Cartesian2();
    var scratchNormal = new Cartesian3.Cartesian3();
    var scratchToENU = new Matrix4.Matrix4();
    var scratchFromENU = new Matrix4.Matrix4();
    var physical;
    var lbSpaMgr;

    function createVertices(parameters, transferableObjects) {
        var quantizedVertices = parameters.quantizedVertices;
        var quantizedVertexCount = quantizedVertices.length / 3;
        var octEncodedNormals = parameters.octEncodedNormals;
        var edgeVertexCount = parameters.westIndices.length + parameters.eastIndices.length +
                              parameters.southIndices.length + parameters.northIndices.length;
        var includeWebMercatorT = parameters.includeWebMercatorT;

        var rectangle = Cartesian2.Rectangle.clone(parameters.rectangle);
        var west = rectangle.west;
        var south = rectangle.south;
        var east = rectangle.east;
        var north = rectangle.north;

        var ellipsoid = Ellipsoid.Ellipsoid.clone(parameters.ellipsoid);

        var exaggeration = parameters.exaggeration;
        var minimumHeight = parameters.minimumHeight * exaggeration;
        var maximumHeight = parameters.maximumHeight * exaggeration;

        var center = parameters.relativeToCenter;
        var fromENU = Transforms.Transforms.eastNorthUpToFixedFrame(center, ellipsoid);
        var toENU = Matrix4.Matrix4.inverseTransformation(fromENU, new Matrix4.Matrix4());

        var southMercatorY;
        var oneOverMercatorHeight;
        if (includeWebMercatorT) {
            southMercatorY = WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(south);
            oneOverMercatorHeight = 1.0 / (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(north) - southMercatorY);
        }

        var uBuffer = quantizedVertices.subarray(0, quantizedVertexCount);
        var vBuffer = quantizedVertices.subarray(quantizedVertexCount, 2 * quantizedVertexCount);
        var heightBuffer = quantizedVertices.subarray(quantizedVertexCount * 2, 3 * quantizedVertexCount);
        var hasVertexNormals = when.defined(octEncodedNormals);

        var uvs = new Array(quantizedVertexCount);
        var heights = new Array(quantizedVertexCount);
        var positions = new Array(quantizedVertexCount);
        var webMercatorTs = includeWebMercatorT ? new Array(quantizedVertexCount) : [];

        var minimum = scratchMinimum;
        minimum.x = Number.POSITIVE_INFINITY;
        minimum.y = Number.POSITIVE_INFINITY;
        minimum.z = Number.POSITIVE_INFINITY;

        var maximum = scratchMaximum;
        maximum.x = Number.NEGATIVE_INFINITY;
        maximum.y = Number.NEGATIVE_INFINITY;
        maximum.z = Number.NEGATIVE_INFINITY;

        var minLongitude = Number.POSITIVE_INFINITY;
        var maxLongitude = Number.NEGATIVE_INFINITY;
        var minLatitude = Number.POSITIVE_INFINITY;
        var maxLatitude = Number.NEGATIVE_INFINITY;

        for (var i = 0; i < quantizedVertexCount; ++i) {
            var rawU = uBuffer[i];
            var rawV = vBuffer[i];

            var u = rawU / maxShort;
            var v = rawV / maxShort;
            var height = Cartesian3.CesiumMath.lerp(minimumHeight, maximumHeight, heightBuffer[i] / maxShort);

            cartographicScratch.longitude = Cartesian3.CesiumMath.lerp(west, east, u);
            cartographicScratch.latitude = Cartesian3.CesiumMath.lerp(south, north, v);
            cartographicScratch.height = height;

            minLongitude = Math.min(cartographicScratch.longitude, minLongitude);
            maxLongitude = Math.max(cartographicScratch.longitude, maxLongitude);
            minLatitude = Math.min(cartographicScratch.latitude, minLatitude);
            maxLatitude = Math.max(cartographicScratch.latitude, maxLatitude);

            var position = ellipsoid.cartographicToCartesian(cartographicScratch);

            uvs[i] = new Cartesian2.Cartesian2(u, v);
            heights[i] = height;
            positions[i] = position;

            if (includeWebMercatorT) {
                webMercatorTs[i] = (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(cartographicScratch.latitude) - southMercatorY) * oneOverMercatorHeight;
            }

            Matrix4.Matrix4.multiplyByPoint(toENU, position, cartesian3Scratch);

            Cartesian3.Cartesian3.minimumByComponent(cartesian3Scratch, minimum, minimum);
            Cartesian3.Cartesian3.maximumByComponent(cartesian3Scratch, maximum, maximum);
        }

        var westIndicesSouthToNorth = copyAndSort(parameters.westIndices, function (a, b) {
            return uvs[a].y - uvs[b].y;
        });
        var eastIndicesNorthToSouth = copyAndSort(parameters.eastIndices, function (a, b) {
            return uvs[b].y - uvs[a].y;
        });
        var southIndicesEastToWest = copyAndSort(parameters.southIndices, function (a, b) {
            return uvs[b].x - uvs[a].x;
        });
        var northIndicesWestToEast = copyAndSort(parameters.northIndices, function (a, b) {
            return uvs[a].x - uvs[b].x;
        });

        var orientedBoundingBox;
        var boundingSphere;

        if (exaggeration !== 1.0) {
            // Bounding volumes need to be recomputed since the tile payload assumes no exaggeration.
            boundingSphere = Transforms.BoundingSphere.fromPoints(positions);
            orientedBoundingBox = OrientedBoundingBox.OrientedBoundingBox.fromRectangle(rectangle, minimumHeight, maximumHeight, ellipsoid);
        }

        var occludeePointInScaledSpace;
        if (exaggeration !== 1.0 || minimumHeight < 0.0) {
            // Horizon culling point needs to be recomputed since the tile payload assumes no exaggeration.
            var occluder = new TerrainEncoding.EllipsoidalOccluder(ellipsoid);
            occludeePointInScaledSpace = occluder.computeHorizonCullingPointPossiblyUnderEllipsoid(center, positions, minimumHeight);
        }

        var hMin = minimumHeight;
        hMin = Math.min(hMin, findMinMaxSkirts(parameters.westIndices, parameters.westSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));
        hMin = Math.min(hMin, findMinMaxSkirts(parameters.southIndices, parameters.southSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));
        hMin = Math.min(hMin, findMinMaxSkirts(parameters.eastIndices, parameters.eastSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));
        hMin = Math.min(hMin, findMinMaxSkirts(parameters.northIndices, parameters.northSkirtHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum));

        var aaBox = new EllipsoidTangentPlane.AxisAlignedBoundingBox(minimum, maximum, center);
        var encoding = new TerrainEncoding.TerrainEncoding(aaBox, hMin, maximumHeight, fromENU, hasVertexNormals, includeWebMercatorT);
        var vertexStride = encoding.getStride();
        var size = quantizedVertexCount * vertexStride + edgeVertexCount * vertexStride;
        var vertexBuffer = new Float32Array(size);

        var bufferIndex = 0;
        for (var j = 0; j < quantizedVertexCount; ++j) {
            if (hasVertexNormals) {
                var n = j * 2.0;
                toPack.x = octEncodedNormals[n];
                toPack.y = octEncodedNormals[n + 1];

                if (exaggeration !== 1.0) {
                    var normal = AttributeCompression.AttributeCompression.octDecode(toPack.x, toPack.y, scratchNormal);
                    var fromENUNormal = Transforms.Transforms.eastNorthUpToFixedFrame(positions[j], ellipsoid, scratchFromENU);
                    var toENUNormal = Matrix4.Matrix4.inverseTransformation(fromENUNormal, scratchToENU);

                    Matrix4.Matrix4.multiplyByPointAsVector(toENUNormal, normal, normal);
                    normal.z *= exaggeration;
                    Cartesian3.Cartesian3.normalize(normal, normal);

                    Matrix4.Matrix4.multiplyByPointAsVector(fromENUNormal, normal, normal);
                    Cartesian3.Cartesian3.normalize(normal, normal);

                    AttributeCompression.AttributeCompression.octEncode(normal, toPack);
                }
            }

            bufferIndex = encoding.encode(vertexBuffer, bufferIndex, positions[j], uvs[j], heights[j], toPack, webMercatorTs[j]);
        }

        var edgeTriangleCount = Math.max(0, (edgeVertexCount - 4) * 2);
        var indexBufferLength = parameters.indices.length + edgeTriangleCount * 3;
        var indexBuffer = IndexDatatype.IndexDatatype.createTypedArray(quantizedVertexCount + edgeVertexCount, indexBufferLength);
        indexBuffer.set(parameters.indices, 0);

        var percentage = 0.0001;
        var lonOffset = (maxLongitude - minLongitude) * percentage;
        var latOffset = (maxLatitude - minLatitude) * percentage;
        var westLongitudeOffset = -lonOffset;
        var westLatitudeOffset = 0.0;
        var eastLongitudeOffset = lonOffset;
        var eastLatitudeOffset = 0.0;
        var northLongitudeOffset = 0.0;
        var northLatitudeOffset = latOffset;
        var southLongitudeOffset = 0.0;
        var southLatitudeOffset = -latOffset;

        // Add skirts.
        var vertexBufferIndex = quantizedVertexCount * vertexStride;
        addSkirt(vertexBuffer, vertexBufferIndex, westIndicesSouthToNorth, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.westSkirtHeight, exaggeration, southMercatorY, oneOverMercatorHeight, westLongitudeOffset, westLatitudeOffset);
        vertexBufferIndex += parameters.westIndices.length * vertexStride;
        addSkirt(vertexBuffer, vertexBufferIndex, southIndicesEastToWest, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.southSkirtHeight, exaggeration, southMercatorY, oneOverMercatorHeight, southLongitudeOffset, southLatitudeOffset);
        vertexBufferIndex += parameters.southIndices.length * vertexStride;
        addSkirt(vertexBuffer, vertexBufferIndex, eastIndicesNorthToSouth, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.eastSkirtHeight, exaggeration, southMercatorY, oneOverMercatorHeight, eastLongitudeOffset, eastLatitudeOffset);
        vertexBufferIndex += parameters.eastIndices.length * vertexStride;
        addSkirt(vertexBuffer, vertexBufferIndex, northIndicesWestToEast, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, parameters.northSkirtHeight, exaggeration, southMercatorY, oneOverMercatorHeight, northLongitudeOffset, northLatitudeOffset);

        TerrainProvider.TerrainProvider.addSkirtIndices(westIndicesSouthToNorth, southIndicesEastToWest, eastIndicesNorthToSouth, northIndicesWestToEast, quantizedVertexCount, indexBuffer, parameters.indices.length);

        var physicalArray = CreatePhysicalArray.CreatePhysicalArray.createPhysicalArrayFromTerrain(physical, lbSpaMgr, parameters.relativeToCenter, positions, parameters.indices);
        transferableObjects.push(vertexBuffer.buffer, indexBuffer.buffer, physicalArray.buffer);

        return {
            vertices: vertexBuffer.buffer,
            indices: indexBuffer.buffer,
            westIndicesSouthToNorth: westIndicesSouthToNorth,
            southIndicesEastToWest: southIndicesEastToWest,
            eastIndicesNorthToSouth: eastIndicesNorthToSouth,
            northIndicesWestToEast: northIndicesWestToEast,
            vertexStride: vertexStride,
            center: center,
            minimumHeight: minimumHeight,
            maximumHeight: maximumHeight,
            boundingSphere: boundingSphere,
            orientedBoundingBox: orientedBoundingBox,
            occludeePointInScaledSpace: occludeePointInScaledSpace,
            encoding: encoding,
            indexCountWithoutSkirts: parameters.indices.length,
            physicalArray: physicalArray
        };
    }

    function findMinMaxSkirts(edgeIndices, edgeHeight, heights, uvs, rectangle, ellipsoid, toENU, minimum, maximum) {
        var hMin = Number.POSITIVE_INFINITY;

        var north = rectangle.north;
        var south = rectangle.south;
        var east = rectangle.east;
        var west = rectangle.west;

        if (east < west) {
            east += Cartesian3.CesiumMath.TWO_PI;
        }

        var length = edgeIndices.length;
        for (var i = 0; i < length; ++i) {
            var index = edgeIndices[i];
            var h = heights[index];
            var uv = uvs[index];

            cartographicScratch.longitude = Cartesian3.CesiumMath.lerp(west, east, uv.x);
            cartographicScratch.latitude = Cartesian3.CesiumMath.lerp(south, north, uv.y);
            cartographicScratch.height = h - edgeHeight;

            var position = ellipsoid.cartographicToCartesian(cartographicScratch, cartesian3Scratch);
            Matrix4.Matrix4.multiplyByPoint(toENU, position, position);

            Cartesian3.Cartesian3.minimumByComponent(position, minimum, minimum);
            Cartesian3.Cartesian3.maximumByComponent(position, maximum, maximum);

            hMin = Math.min(hMin, cartographicScratch.height);
        }
        return hMin;
    }

    function addSkirt(vertexBuffer, vertexBufferIndex, edgeVertices, encoding, heights, uvs, octEncodedNormals, ellipsoid, rectangle, skirtLength, exaggeration, southMercatorY, oneOverMercatorHeight, longitudeOffset, latitudeOffset) {
        var hasVertexNormals = when.defined(octEncodedNormals);

        var north = rectangle.north;
        var south = rectangle.south;
        var east = rectangle.east;
        var west = rectangle.west;

        if (east < west) {
            east += Cartesian3.CesiumMath.TWO_PI;
        }

        var length = edgeVertices.length;
        for (var i = 0; i < length; ++i) {
            var index = edgeVertices[i];
            var h = heights[index];
            var uv = uvs[index];

            cartographicScratch.longitude = Cartesian3.CesiumMath.lerp(west, east, uv.x) + longitudeOffset;
            cartographicScratch.latitude = Cartesian3.CesiumMath.lerp(south, north, uv.y) + latitudeOffset;
            cartographicScratch.height = h - skirtLength;

            var position = ellipsoid.cartographicToCartesian(cartographicScratch, cartesian3Scratch);

            if (hasVertexNormals) {
                var n = index * 2.0;
                toPack.x = octEncodedNormals[n];
                toPack.y = octEncodedNormals[n + 1];

                if (exaggeration !== 1.0) {
                    var normal = AttributeCompression.AttributeCompression.octDecode(toPack.x, toPack.y, scratchNormal);
                    var fromENUNormal = Transforms.Transforms.eastNorthUpToFixedFrame(cartesian3Scratch, ellipsoid, scratchFromENU);
                    var toENUNormal = Matrix4.Matrix4.inverseTransformation(fromENUNormal, scratchToENU);

                    Matrix4.Matrix4.multiplyByPointAsVector(toENUNormal, normal, normal);
                    normal.z *= exaggeration;
                    Cartesian3.Cartesian3.normalize(normal, normal);

                    Matrix4.Matrix4.multiplyByPointAsVector(fromENUNormal, normal, normal);
                    Cartesian3.Cartesian3.normalize(normal, normal);

                    AttributeCompression.AttributeCompression.octEncode(normal, toPack);
                }
            }

            var webMercatorT;
            if (encoding.hasWebMercatorT) {
                webMercatorT = (WebMercatorProjection.WebMercatorProjection.geodeticLatitudeToMercatorAngle(cartographicScratch.latitude) - southMercatorY) * oneOverMercatorHeight;
            }

            vertexBufferIndex = encoding.encode(vertexBuffer, vertexBufferIndex, position, uv, cartographicScratch.height, toPack, webMercatorT);
        }
    }

    function copyAndSort(typedArray, comparator) {
        var copy;
        if (typeof typedArray.slice === 'function') {
            copy = typedArray.slice();
            if (typeof copy.sort !== 'function') {
                // Sliced typed array isn't sortable, so we can't use it.
                copy = undefined;
            }
        }

        if (!when.defined(copy)) {
            copy = Array.prototype.slice.call(typedArray);
        }

        copy.sort(comparator);

        return copy;
    }

    function createVerticesFromQuantizedTerrainMesh(event) {
        var data = event.data;
        var wasmConfig = data.webAssemblyConfig;
        if (when.defined(wasmConfig)) {
            fetch(wasmConfig.wasmBinaryFileES6)
                .then(response => response.arrayBuffer())
                .then(function (bytes) {
                    var WebAssemblyType = {
                        wasmBinary: bytes,
                        onModuleLoaded: function (currentModule) {
                            physical = currentModule;
                            lbSpaMgr = new physical.LBSpaMgr();
                            self.onmessage = createTaskProcessorWorker(createVertices);
                            self.postMessage(true);
                        }
                    };

                    CreatePhysicalArray.materem(WebAssemblyType);
                });
        }
    }

    return createVerticesFromQuantizedTerrainMesh;

});
//# sourceMappingURL=createVerticesFromQuantizedTerrainMesh.js.map
