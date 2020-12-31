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

define(['./when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Ellipsoid-f29f901d', './Transforms-7fcb5ea2', './Matrix4-c68aaa66', './RuntimeError-5b606d78', './Cartesian2-e5f465dc', './WebGLConstants-30fc6f5c', './ComponentDatatype-a863af81', './GeometryAttribute-a2d75c0f', './PrimitiveType-4c1d698a', './EnvironmentVariables-cc0d0032', './GeometryAttributes-cb18da36', './IndexDatatype-571b3b65', './IntersectionTests-44b0fe21', './Plane-f22e7e98', './arrayRemoveDuplicates-7f5acdbe', './BoundingRectangle-7439df6e', './EllipsoidTangentPlane-03282d71', './EllipsoidRhumbLine-e9bf1af4', './PolygonPipeline-aaf99843', './PolylineVolumeGeometryLibrary-310fca03', './EllipsoidGeodesic-80195a45', './PolylinePipeline-475595ab'], function (when, Check, Cartesian3, Ellipsoid, Transforms, Matrix4, RuntimeError, Cartesian2, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, EnvironmentVariables, GeometryAttributes, IndexDatatype, IntersectionTests, Plane, arrayRemoveDuplicates, BoundingRectangle, EllipsoidTangentPlane, EllipsoidRhumbLine, PolygonPipeline, PolylineVolumeGeometryLibrary, EllipsoidGeodesic, PolylinePipeline) { 'use strict';

    function computeAttributes(positions, shape) {
            var attributes = new GeometryAttributes.GeometryAttributes();
            attributes.position = new GeometryAttribute.GeometryAttribute({
                componentDatatype : ComponentDatatype.ComponentDatatype.DOUBLE,
                componentsPerAttribute : 3,
                values : positions
            });

            var shapeLength = shape.length;
            var vertexCount = attributes.position.values.length / 3;
            var positionLength = positions.length / 3;
            var shapeCount = positionLength / shapeLength;
            var indices = IndexDatatype.IndexDatatype.createTypedArray(vertexCount, 2 * shapeLength * (shapeCount + 1));
            var i, j;
            var index = 0;
            i = 0;
            var offset = i * shapeLength;
            for (j = 0; j < shapeLength - 1; j++) {
                indices[index++] = j + offset;
                indices[index++] = j + offset + 1;
            }
            indices[index++] = shapeLength - 1 + offset;
            indices[index++] = offset;

            i = shapeCount - 1;
            offset = i * shapeLength;
            for (j = 0; j < shapeLength - 1; j++) {
                indices[index++] = j + offset;
                indices[index++] = j + offset + 1;
            }
            indices[index++] = shapeLength - 1 + offset;
            indices[index++] = offset;

            for (i = 0; i < shapeCount - 1; i++) {
                var firstOffset = shapeLength * i;
                var secondOffset = firstOffset + shapeLength;
                for (j = 0; j < shapeLength; j++) {
                    indices[index++] = j + firstOffset;
                    indices[index++] = j + secondOffset;
                }
            }

            var geometry = new GeometryAttribute.Geometry({
                attributes : attributes,
                indices : IndexDatatype.IndexDatatype.createTypedArray(vertexCount, indices),
                boundingSphere : Transforms.BoundingSphere.fromVertices(positions),
                primitiveType : PrimitiveType.PrimitiveType.LINES
            });

            return geometry;
        }

        /**
         * A description of a polyline with a volume (a 2D shape extruded along a polyline).
         *
         * @alias PolylineVolumeOutlineGeometry
         * @constructor
         *
         * @param {Object} options Object with the following properties:
         * @param {Cartesian3[]} options.polylinePositions An array of positions that define the center of the polyline volume.
         * @param {Cartesian2[]} options.shapePositions An array of positions that define the shape to be extruded along the polyline
         * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid to be used as a reference.
         * @param {Number} [options.granularity=CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
         * @param {CornerType} [options.cornerType=CornerType.ROUNDED] Determines the style of the corners.
         *
         * @see PolylineVolumeOutlineGeometry#createGeometry
         *
         * @example
         * function computeCircle(radius) {
         *   var positions = [];
         *   for (var i = 0; i < 360; i++) {
         *     var radians = Cesium.Math.toRadians(i);
         *     positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
         *   }
         *   return positions;
         * }
         *
         * var volumeOutline = new Cesium.PolylineVolumeOutlineGeometry({
         *   polylinePositions : Cesium.Cartesian3.fromDegreesArray([
         *     -72.0, 40.0,
         *     -70.0, 35.0
         *   ]),
         *   shapePositions : computeCircle(100000.0)
         * });
         */
        function PolylineVolumeOutlineGeometry(options) {
            options = when.defaultValue(options, when.defaultValue.EMPTY_OBJECT);
            var positions = options.polylinePositions;
            var shape = options.shapePositions;

            //>>includeStart('debug', pragmas.debug);
            if (!when.defined(positions)) {
                throw new Check.DeveloperError('options.polylinePositions is required.');
            }
            if (!when.defined(shape)) {
                throw new Check.DeveloperError('options.shapePositions is required.');
            }
            //>>includeEnd('debug');

            this._positions = positions;
            this._shape = shape;
            this._ellipsoid = Ellipsoid.Ellipsoid.clone(when.defaultValue(options.ellipsoid, Ellipsoid.Ellipsoid.WGS84));
            this._cornerType = when.defaultValue(options.cornerType, PolylineVolumeGeometryLibrary.CornerType.ROUNDED);
            this._granularity = when.defaultValue(options.granularity, Cartesian3.CesiumMath.RADIANS_PER_DEGREE);
            this._workerName = 'createPolylineVolumeOutlineGeometry';

            var numComponents = 1 + positions.length * Cartesian3.Cartesian3.packedLength;
            numComponents += 1 + shape.length * Cartesian2.Cartesian2.packedLength;

            /**
             * The number of elements used to pack the object into an array.
             * @type {Number}
             */
            this.packedLength = numComponents + Ellipsoid.Ellipsoid.packedLength + 2;
        }

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {PolylineVolumeOutlineGeometry} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        PolylineVolumeOutlineGeometry.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            if (!when.defined(value)) {
                throw new Check.DeveloperError('value is required');
            }
            if (!when.defined(array)) {
                throw new Check.DeveloperError('array is required');
            }
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            var i;

            var positions = value._positions;
            var length = positions.length;
            array[startingIndex++] = length;

            for (i = 0; i < length; ++i, startingIndex += Cartesian3.Cartesian3.packedLength) {
                Cartesian3.Cartesian3.pack(positions[i], array, startingIndex);
            }

            var shape = value._shape;
            length = shape.length;
            array[startingIndex++] = length;

            for (i = 0; i < length; ++i, startingIndex += Cartesian2.Cartesian2.packedLength) {
                Cartesian2.Cartesian2.pack(shape[i], array, startingIndex);
            }

            Ellipsoid.Ellipsoid.pack(value._ellipsoid, array, startingIndex);
            startingIndex += Ellipsoid.Ellipsoid.packedLength;

            array[startingIndex++] = value._cornerType;
            array[startingIndex]   = value._granularity;

            return array;
        };

        var scratchEllipsoid = Ellipsoid.Ellipsoid.clone(Ellipsoid.Ellipsoid.UNIT_SPHERE);
        var scratchOptions = {
            polylinePositions : undefined,
            shapePositions : undefined,
            ellipsoid : scratchEllipsoid,
            height : undefined,
            cornerType : undefined,
            granularity : undefined
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {PolylineVolumeOutlineGeometry} [result] The object into which to store the result.
         * @returns {PolylineVolumeOutlineGeometry} The modified result parameter or a new PolylineVolumeOutlineGeometry instance if one was not provided.
         */
        PolylineVolumeOutlineGeometry.unpack = function(array, startingIndex, result) {
            //>>includeStart('debug', pragmas.debug);
            if (!when.defined(array)) {
                throw new Check.DeveloperError('array is required');
            }
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            var i;

            var length = array[startingIndex++];
            var positions = new Array(length);

            for (i = 0; i < length; ++i, startingIndex += Cartesian3.Cartesian3.packedLength) {
                positions[i] = Cartesian3.Cartesian3.unpack(array, startingIndex);
            }

            length = array[startingIndex++];
            var shape = new Array(length);

            for (i = 0; i < length; ++i, startingIndex += Cartesian2.Cartesian2.packedLength) {
                shape[i] = Cartesian2.Cartesian2.unpack(array, startingIndex);
            }

            var ellipsoid = Ellipsoid.Ellipsoid.unpack(array, startingIndex, scratchEllipsoid);
            startingIndex += Ellipsoid.Ellipsoid.packedLength;

            var cornerType = array[startingIndex++];
            var granularity = array[startingIndex];

            if (!when.defined(result)) {
                scratchOptions.polylinePositions = positions;
                scratchOptions.shapePositions = shape;
                scratchOptions.cornerType = cornerType;
                scratchOptions.granularity = granularity;
                return new PolylineVolumeOutlineGeometry(scratchOptions);
            }

            result._positions = positions;
            result._shape = shape;
            result._ellipsoid = Ellipsoid.Ellipsoid.clone(ellipsoid, result._ellipsoid);
            result._cornerType = cornerType;
            result._granularity = granularity;

            return result;
        };

        var brScratch = new BoundingRectangle.BoundingRectangle();

        /**
         * Computes the geometric representation of the outline of a polyline with a volume, including its vertices, indices, and a bounding sphere.
         *
         * @param {PolylineVolumeOutlineGeometry} polylineVolumeOutlineGeometry A description of the polyline volume outline.
         * @returns {Geometry|undefined} The computed vertices and indices.
         */
        PolylineVolumeOutlineGeometry.createGeometry = function(polylineVolumeOutlineGeometry) {
            var positions = polylineVolumeOutlineGeometry._positions;
            var cleanPositions = arrayRemoveDuplicates.arrayRemoveDuplicates(positions, Cartesian3.Cartesian3.equalsEpsilon);
            var shape2D = polylineVolumeOutlineGeometry._shape;
            shape2D = PolylineVolumeGeometryLibrary.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(shape2D);

            if (cleanPositions.length < 2 || shape2D.length < 3) {
                return undefined;
            }

            if (PolygonPipeline.PolygonPipeline.computeWindingOrder2D(shape2D) === PolygonPipeline.WindingOrder.CLOCKWISE) {
                shape2D.reverse();
            }
            var boundingRectangle = BoundingRectangle.BoundingRectangle.fromPoints(shape2D, brScratch);

            var computedPositions = PolylineVolumeGeometryLibrary.PolylineVolumeGeometryLibrary.computePositions(cleanPositions, shape2D, boundingRectangle, polylineVolumeOutlineGeometry, false);
            return computeAttributes(computedPositions, shape2D);
        };

    function createPolylineVolumeOutlineGeometry(polylineVolumeOutlineGeometry, offset) {
            if (when.defined(offset)) {
                polylineVolumeOutlineGeometry = PolylineVolumeOutlineGeometry.unpack(polylineVolumeOutlineGeometry, offset);
            }
            polylineVolumeOutlineGeometry._ellipsoid = Ellipsoid.Ellipsoid.clone(polylineVolumeOutlineGeometry._ellipsoid);
            return PolylineVolumeOutlineGeometry.createGeometry(polylineVolumeOutlineGeometry);
        }

    return createPolylineVolumeOutlineGeometry;

});
//# sourceMappingURL=createPolylineVolumeOutlineGeometry.js.map
