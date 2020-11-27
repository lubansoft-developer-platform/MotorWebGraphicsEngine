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

define(['./when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Ellipsoid-f29f901d', './Cartesian2-e5f465dc', './WebGLConstants-30fc6f5c', './AttributeCompression-414035f7', './IndexDatatype-571b3b65', './createTaskProcessorWorker'], function (when, Check, Cartesian3, Ellipsoid, Cartesian2, WebGLConstants, AttributeCompression, IndexDatatype, createTaskProcessorWorker) { 'use strict';

    var maxShort = 32767;

        var scratchBVCartographic = new Ellipsoid.Cartographic();
        var scratchEncodedPosition = new Cartesian3.Cartesian3();

        function decodePositions(positions, rectangle, minimumHeight, maximumHeight, ellipsoid) {
            var positionsLength = positions.length / 3;
            var uBuffer = positions.subarray(0, positionsLength);
            var vBuffer = positions.subarray(positionsLength, 2 * positionsLength);
            var heightBuffer = positions.subarray(2 * positionsLength, 3 * positionsLength);
            AttributeCompression.AttributeCompression.zigZagDeltaDecode(uBuffer, vBuffer, heightBuffer);

            var decoded = new Float64Array(positions.length);
            for (var i = 0; i < positionsLength; ++i) {
                var u = uBuffer[i];
                var v = vBuffer[i];
                var h = heightBuffer[i];

                var lon = Cartesian3.CesiumMath.lerp(rectangle.west, rectangle.east, u / maxShort);
                var lat = Cartesian3.CesiumMath.lerp(rectangle.south, rectangle.north, v / maxShort);
                var alt = Cartesian3.CesiumMath.lerp(minimumHeight, maximumHeight, h / maxShort);

                var cartographic = Ellipsoid.Cartographic.fromRadians(lon, lat, alt, scratchBVCartographic);
                var decodedPosition = ellipsoid.cartographicToCartesian(cartographic, scratchEncodedPosition);
                Cartesian3.Cartesian3.pack(decodedPosition, decoded, i * 3);
            }
            return decoded;
        }

        var scratchRectangle = new Cartesian2.Rectangle();
        var scratchEllipsoid = new Ellipsoid.Ellipsoid();
        var scratchCenter = new Cartesian3.Cartesian3();
        var scratchMinMaxHeights = {
            min : undefined,
            max : undefined
        };

        function unpackBuffer(packedBuffer) {
            packedBuffer = new Float64Array(packedBuffer);

            var offset = 0;
            scratchMinMaxHeights.min = packedBuffer[offset++];
            scratchMinMaxHeights.max = packedBuffer[offset++];

            Cartesian2.Rectangle.unpack(packedBuffer, offset, scratchRectangle);
            offset += Cartesian2.Rectangle.packedLength;

            Ellipsoid.Ellipsoid.unpack(packedBuffer, offset, scratchEllipsoid);
            offset += Ellipsoid.Ellipsoid.packedLength;

            Cartesian3.Cartesian3.unpack(packedBuffer, offset, scratchCenter);
        }

        var scratchP0 = new Cartesian3.Cartesian3();
        var scratchP1 = new Cartesian3.Cartesian3();
        var scratchPrev = new Cartesian3.Cartesian3();
        var scratchCur = new Cartesian3.Cartesian3();
        var scratchNext = new Cartesian3.Cartesian3();

        function createVectorTilePolylines(parameters, transferableObjects) {
            var encodedPositions = new Uint16Array(parameters.positions);
            var widths = new Uint16Array(parameters.widths);
            var counts = new Uint32Array(parameters.counts);
            var batchIds = new Uint16Array(parameters.batchIds);

            unpackBuffer(parameters.packedBuffer);
            var rectangle = scratchRectangle;
            var ellipsoid = scratchEllipsoid;
            var center = scratchCenter;
            var minimumHeight = scratchMinMaxHeights.min;
            var maximumHeight = scratchMinMaxHeights.max;

            var positions = decodePositions(encodedPositions, rectangle, minimumHeight, maximumHeight, ellipsoid);

            var positionsLength = positions.length / 3;
            var size = positionsLength * 4 - 4;

            var curPositions = new Float32Array(size * 3);
            var prevPositions = new Float32Array(size * 3);
            var nextPositions = new Float32Array(size * 3);
            var expandAndWidth = new Float32Array(size * 2);
            var vertexBatchIds = new Uint16Array(size);

            var positionIndex = 0;
            var expandAndWidthIndex = 0;
            var batchIdIndex = 0;

            var i;
            var offset = 0;
            var length = counts.length;

            for (i = 0; i < length; ++i) {
                var count = counts [i];
                var width = widths[i];
                var batchId = batchIds[i];

                for (var j = 0; j < count; ++j) {
                    var previous;
                    if (j === 0) {
                        var p0 = Cartesian3.Cartesian3.unpack(positions, offset * 3, scratchP0);
                        var p1 = Cartesian3.Cartesian3.unpack(positions, (offset + 1) * 3, scratchP1);

                        previous = Cartesian3.Cartesian3.subtract(p0, p1, scratchPrev);
                        Cartesian3.Cartesian3.add(p0, previous, previous);
                    } else {
                        previous = Cartesian3.Cartesian3.unpack(positions, (offset + j - 1) * 3, scratchPrev);
                    }

                    var current = Cartesian3.Cartesian3.unpack(positions, (offset + j) * 3, scratchCur);

                    var next;
                    if (j === count - 1) {
                        var p2 = Cartesian3.Cartesian3.unpack(positions, (offset + count - 1) * 3, scratchP0);
                        var p3 = Cartesian3.Cartesian3.unpack(positions, (offset + count - 2) * 3, scratchP1);

                        next = Cartesian3.Cartesian3.subtract(p2, p3, scratchNext);
                        Cartesian3.Cartesian3.add(p2, next, next);
                    } else {
                        next = Cartesian3.Cartesian3.unpack(positions, (offset + j + 1) * 3, scratchNext);
                    }

                    Cartesian3.Cartesian3.subtract(previous, center, previous);
                    Cartesian3.Cartesian3.subtract(current, center, current);
                    Cartesian3.Cartesian3.subtract(next, center, next);

                    var startK = j === 0 ? 2 : 0;
                    var endK = j === count - 1 ? 2 : 4;

                    for (var k = startK; k < endK; ++k) {
                        Cartesian3.Cartesian3.pack(current, curPositions, positionIndex);
                        Cartesian3.Cartesian3.pack(previous, prevPositions, positionIndex);
                        Cartesian3.Cartesian3.pack(next, nextPositions, positionIndex);
                        positionIndex += 3;

                        var direction = (k - 2 < 0) ? -1.0 : 1.0;
                        expandAndWidth[expandAndWidthIndex++] = 2 * (k % 2) - 1;
                        expandAndWidth[expandAndWidthIndex++] = direction * width;

                        vertexBatchIds[batchIdIndex++] = batchId;
                    }
                }

                offset += count;
            }

            var indices = IndexDatatype.IndexDatatype.createTypedArray(size, positionsLength * 6 - 6);
            var index = 0;
            var indicesIndex = 0;
            length = positionsLength - 1;
            for (i = 0; i < length; ++i) {
                indices[indicesIndex++] = index;
                indices[indicesIndex++] = index + 2;
                indices[indicesIndex++] = index + 1;

                indices[indicesIndex++] = index + 1;
                indices[indicesIndex++] = index + 2;
                indices[indicesIndex++] = index + 3;

                index += 4;
            }

            transferableObjects.push(curPositions.buffer, prevPositions.buffer, nextPositions.buffer);
            transferableObjects.push(expandAndWidth.buffer, vertexBatchIds.buffer, indices.buffer);

            return {
                indexDatatype : (indices.BYTES_PER_ELEMENT === 2) ? IndexDatatype.IndexDatatype.UNSIGNED_SHORT : IndexDatatype.IndexDatatype.UNSIGNED_INT,
                currentPositions : curPositions.buffer,
                previousPositions : prevPositions.buffer,
                nextPositions : nextPositions.buffer,
                expandAndWidth : expandAndWidth.buffer,
                batchIds : vertexBatchIds.buffer,
                indices : indices.buffer
            };
        }
    var createVectorTilePolylines$1 = createTaskProcessorWorker(createVectorTilePolylines);

    return createVectorTilePolylines$1;

});
//# sourceMappingURL=createVectorTilePolylines.js.map
