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

define(['exports', './when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Ellipsoid-f29f901d'], function (exports, when, Check, Cartesian3, Ellipsoid) { 'use strict';

    /**
         * A two dimensional region specified as longitude and latitude coordinates.
         *
         * @alias Rectangle
         * @constructor
         *
         * @param {Number} [west=0.0] The westernmost longitude, in radians, in the range [-Pi, Pi].
         * @param {Number} [south=0.0] The southernmost latitude, in radians, in the range [-Pi/2, Pi/2].
         * @param {Number} [east=0.0] The easternmost longitude, in radians, in the range [-Pi, Pi].
         * @param {Number} [north=0.0] The northernmost latitude, in radians, in the range [-Pi/2, Pi/2].
         *
         * @see Packable
         */
        function Rectangle(west, south, east, north) {
            /**
             * The westernmost longitude in radians in the range [-Pi, Pi].
             *
             * @type {Number}
             * @default 0.0
             */
            this.west = when.defaultValue(west, 0.0);

            /**
             * The southernmost latitude in radians in the range [-Pi/2, Pi/2].
             *
             * @type {Number}
             * @default 0.0
             */
            this.south = when.defaultValue(south, 0.0);

            /**
             * The easternmost longitude in radians in the range [-Pi, Pi].
             *
             * @type {Number}
             * @default 0.0
             */
            this.east = when.defaultValue(east, 0.0);

            /**
             * The northernmost latitude in radians in the range [-Pi/2, Pi/2].
             *
             * @type {Number}
             * @default 0.0
             */
            this.north = when.defaultValue(north, 0.0);
        }

        Object.defineProperties(Rectangle.prototype, {
            /**
             * Gets the width of the rectangle in radians.
             * @memberof Rectangle.prototype
             * @type {Number}
             */
            width : {
                get : function() {
                    return Rectangle.computeWidth(this);
                }
            },

            /**
             * Gets the height of the rectangle in radians.
             * @memberof Rectangle.prototype
             * @type {Number}
             */
            height : {
                get : function() {
                    return Rectangle.computeHeight(this);
                }
            }
        });

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        Rectangle.packedLength = 4;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {Rectangle} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        Rectangle.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            array[startingIndex++] = value.west;
            array[startingIndex++] = value.south;
            array[startingIndex++] = value.east;
            array[startingIndex] = value.north;

            return array;
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {Rectangle} [result] The object into which to store the result.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if one was not provided.
         */
        Rectangle.unpack = function(array, startingIndex, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            if (!when.defined(result)) {
                result = new Rectangle();
            }

            result.west = array[startingIndex++];
            result.south = array[startingIndex++];
            result.east = array[startingIndex++];
            result.north = array[startingIndex];
            return result;
        };

        /**
         * Computes the width of a rectangle in radians.
         * @param {Rectangle} rectangle The rectangle to compute the width of.
         * @returns {Number} The width.
         */
        Rectangle.computeWidth = function(rectangle) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');
            var east = rectangle.east;
            var west = rectangle.west;
            if (east < west) {
                east += Cartesian3.CesiumMath.TWO_PI;
            }
            return east - west;
        };

        /**
         * Computes the height of a rectangle in radians.
         * @param {Rectangle} rectangle The rectangle to compute the height of.
         * @returns {Number} The height.
         */
        Rectangle.computeHeight = function(rectangle) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');
            return rectangle.north - rectangle.south;
        };

        /**
         * Creates a rectangle given the boundary longitude and latitude in degrees.
         *
         * @param {Number} [west=0.0] The westernmost longitude in degrees in the range [-180.0, 180.0].
         * @param {Number} [south=0.0] The southernmost latitude in degrees in the range [-90.0, 90.0].
         * @param {Number} [east=0.0] The easternmost longitude in degrees in the range [-180.0, 180.0].
         * @param {Number} [north=0.0] The northernmost latitude in degrees in the range [-90.0, 90.0].
         * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
         *
         * @example
         * var rectangle = Cesium.Rectangle.fromDegrees(0.0, 20.0, 10.0, 30.0);
         */
        Rectangle.fromDegrees = function(west, south, east, north, result) {
            west = Cartesian3.CesiumMath.toRadians(when.defaultValue(west, 0.0));
            south = Cartesian3.CesiumMath.toRadians(when.defaultValue(south, 0.0));
            east = Cartesian3.CesiumMath.toRadians(when.defaultValue(east, 0.0));
            north = Cartesian3.CesiumMath.toRadians(when.defaultValue(north, 0.0));

            if (!when.defined(result)) {
                return new Rectangle(west, south, east, north);
            }

            result.west = west;
            result.south = south;
            result.east = east;
            result.north = north;

            return result;
        };

        /**
         * Creates a rectangle given the boundary longitude and latitude in radians.
         *
         * @param {Number} [west=0.0] The westernmost longitude in radians in the range [-Math.PI, Math.PI].
         * @param {Number} [south=0.0] The southernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].
         * @param {Number} [east=0.0] The easternmost longitude in radians in the range [-Math.PI, Math.PI].
         * @param {Number} [north=0.0] The northernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].
         * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
         *
         * @example
         * var rectangle = Cesium.Rectangle.fromRadians(0.0, Math.PI/4, Math.PI/8, 3*Math.PI/4);
         */
        Rectangle.fromRadians = function(west, south, east, north, result) {
            if (!when.defined(result)) {
                return new Rectangle(west, south, east, north);
            }

            result.west = when.defaultValue(west, 0.0);
            result.south = when.defaultValue(south, 0.0);
            result.east = when.defaultValue(east, 0.0);
            result.north = when.defaultValue(north, 0.0);

            return result;
        };

        /**
         * Creates the smallest possible Rectangle that encloses all positions in the provided array.
         *
         * @param {Cartographic[]} cartographics The list of Cartographic instances.
         * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
         */
        Rectangle.fromCartographicArray = function(cartographics, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('cartographics', cartographics);
            //>>includeEnd('debug');

            var west = Number.MAX_VALUE;
            var east = -Number.MAX_VALUE;
            var westOverIDL = Number.MAX_VALUE;
            var eastOverIDL = -Number.MAX_VALUE;
            var south = Number.MAX_VALUE;
            var north = -Number.MAX_VALUE;

            for ( var i = 0, len = cartographics.length; i < len; i++) {
                var position = cartographics[i];
                west = Math.min(west, position.longitude);
                east = Math.max(east, position.longitude);
                south = Math.min(south, position.latitude);
                north = Math.max(north, position.latitude);

                var lonAdjusted = position.longitude >= 0 ?  position.longitude : position.longitude +  Cartesian3.CesiumMath.TWO_PI;
                westOverIDL = Math.min(westOverIDL, lonAdjusted);
                eastOverIDL = Math.max(eastOverIDL, lonAdjusted);
            }

            if(east - west > eastOverIDL - westOverIDL) {
                west = westOverIDL;
                east = eastOverIDL;

                if (east > Cartesian3.CesiumMath.PI) {
                    east = east - Cartesian3.CesiumMath.TWO_PI;
                }
                if (west > Cartesian3.CesiumMath.PI) {
                    west = west - Cartesian3.CesiumMath.TWO_PI;
                }
            }

            if (!when.defined(result)) {
                return new Rectangle(west, south, east, north);
            }

            result.west = west;
            result.south = south;
            result.east = east;
            result.north = north;
            return result;
        };

        /**
         * Creates the smallest possible Rectangle that encloses all positions in the provided array.
         *
         * @param {Cartesian3[]} cartesians The list of Cartesian instances.
         * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid the cartesians are on.
         * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
         */
        Rectangle.fromCartesianArray = function(cartesians, ellipsoid, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('cartesians', cartesians);
            //>>includeEnd('debug');
            ellipsoid = when.defaultValue(ellipsoid, Ellipsoid.Ellipsoid.WGS84);

            var west = Number.MAX_VALUE;
            var east = -Number.MAX_VALUE;
            var westOverIDL = Number.MAX_VALUE;
            var eastOverIDL = -Number.MAX_VALUE;
            var south = Number.MAX_VALUE;
            var north = -Number.MAX_VALUE;

            for ( var i = 0, len = cartesians.length; i < len; i++) {
                var position = ellipsoid.cartesianToCartographic(cartesians[i]);
                west = Math.min(west, position.longitude);
                east = Math.max(east, position.longitude);
                south = Math.min(south, position.latitude);
                north = Math.max(north, position.latitude);

                var lonAdjusted = position.longitude >= 0 ?  position.longitude : position.longitude +  Cartesian3.CesiumMath.TWO_PI;
                westOverIDL = Math.min(westOverIDL, lonAdjusted);
                eastOverIDL = Math.max(eastOverIDL, lonAdjusted);
            }

            if(east - west > eastOverIDL - westOverIDL) {
                west = westOverIDL;
                east = eastOverIDL;

                if (east > Cartesian3.CesiumMath.PI) {
                    east = east - Cartesian3.CesiumMath.TWO_PI;
                }
                if (west > Cartesian3.CesiumMath.PI) {
                    west = west - Cartesian3.CesiumMath.TWO_PI;
                }
            }

            if (!when.defined(result)) {
                return new Rectangle(west, south, east, north);
            }

            result.west = west;
            result.south = south;
            result.east = east;
            result.north = north;
            return result;
        };

        /**
         * Duplicates a Rectangle.
         *
         * @param {Rectangle} rectangle The rectangle to clone.
         * @param {Rectangle} [result] The object onto which to store the result, or undefined if a new instance should be created.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided. (Returns undefined if rectangle is undefined)
         */
        Rectangle.clone = function(rectangle, result) {
            if (!when.defined(rectangle)) {
                return undefined;
            }

            if (!when.defined(result)) {
                return new Rectangle(rectangle.west, rectangle.south, rectangle.east, rectangle.north);
            }

            result.west = rectangle.west;
            result.south = rectangle.south;
            result.east = rectangle.east;
            result.north = rectangle.north;
            return result;
        };

        /**
         * Compares the provided Rectangles componentwise and returns
         * <code>true</code> if they pass an absolute or relative tolerance test,
         * <code>false</code> otherwise.
         *
         * @param {Rectangle} [left] The first Rectangle.
         * @param {Rectangle} [right] The second Rectangle.
         * @param {Number} absoluteEpsilon The absolute epsilon tolerance to use for equality testing.
         * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
         */
        Rectangle.equalsEpsilon = function(left, right, absoluteEpsilon) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.number('absoluteEpsilon', absoluteEpsilon);
            //>>includeEnd('debug');

            return (left === right) ||
                   (when.defined(left) &&
                    when.defined(right) &&
                    (Math.abs(left.west - right.west) <= absoluteEpsilon) &&
                    (Math.abs(left.south - right.south) <= absoluteEpsilon) &&
                    (Math.abs(left.east - right.east) <= absoluteEpsilon) &&
                    (Math.abs(left.north - right.north) <= absoluteEpsilon));
        };

        /**
         * Duplicates this Rectangle.
         *
         * @param {Rectangle} [result] The object onto which to store the result.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
         */
        Rectangle.prototype.clone = function(result) {
            return Rectangle.clone(this, result);
        };

        /**
         * Compares the provided Rectangle with this Rectangle componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Rectangle} [other] The Rectangle to compare.
         * @returns {Boolean} <code>true</code> if the Rectangles are equal, <code>false</code> otherwise.
         */
        Rectangle.prototype.equals = function(other) {
            return Rectangle.equals(this, other);
        };

        /**
         * Compares the provided rectangles and returns <code>true</code> if they are equal,
         * <code>false</code> otherwise.
         *
         * @param {Rectangle} [left] The first Rectangle.
         * @param {Rectangle} [right] The second Rectangle.
         * @returns {Boolean} <code>true</code> if left and right are equal; otherwise <code>false</code>.
         */
        Rectangle.equals = function(left, right) {
            return (left === right) ||
                   ((when.defined(left)) &&
                    (when.defined(right)) &&
                    (left.west === right.west) &&
                    (left.south === right.south) &&
                    (left.east === right.east) &&
                    (left.north === right.north));
        };

        /**
         * Compares the provided Rectangle with this Rectangle componentwise and returns
         * <code>true</code> if they are within the provided epsilon,
         * <code>false</code> otherwise.
         *
         * @param {Rectangle} [other] The Rectangle to compare.
         * @param {Number} epsilon The epsilon to use for equality testing.
         * @returns {Boolean} <code>true</code> if the Rectangles are within the provided epsilon, <code>false</code> otherwise.
         */
        Rectangle.prototype.equalsEpsilon = function(other, epsilon) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.number('epsilon', epsilon);
            //>>includeEnd('debug');

            return Rectangle.equalsEpsilon(this, other, epsilon);
        };

        /**
         * Checks a Rectangle's properties and throws if they are not in valid ranges.
         *
         * @param {Rectangle} rectangle The rectangle to validate
         *
         * @exception {DeveloperError} <code>north</code> must be in the interval [<code>-Pi/2</code>, <code>Pi/2</code>].
         * @exception {DeveloperError} <code>south</code> must be in the interval [<code>-Pi/2</code>, <code>Pi/2</code>].
         * @exception {DeveloperError} <code>east</code> must be in the interval [<code>-Pi</code>, <code>Pi</code>].
         * @exception {DeveloperError} <code>west</code> must be in the interval [<code>-Pi</code>, <code>Pi</code>].
         */
        Rectangle.validate = function(rectangle) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);

            var north = rectangle.north;
            Check.Check.typeOf.number.greaterThanOrEquals('north', north, -Cartesian3.CesiumMath.PI_OVER_TWO);
            Check.Check.typeOf.number.lessThanOrEquals('north', north, Cartesian3.CesiumMath.PI_OVER_TWO);

            var south = rectangle.south;
            Check.Check.typeOf.number.greaterThanOrEquals('south', south, -Cartesian3.CesiumMath.PI_OVER_TWO);
            Check.Check.typeOf.number.lessThanOrEquals('south', south, Cartesian3.CesiumMath.PI_OVER_TWO);

            var west = rectangle.west;
            Check.Check.typeOf.number.greaterThanOrEquals('west', west, -Math.PI);
            Check.Check.typeOf.number.lessThanOrEquals('west', west, Math.PI);

            var east = rectangle.east;
            Check.Check.typeOf.number.greaterThanOrEquals('east', east, -Math.PI);
            Check.Check.typeOf.number.lessThanOrEquals('east', east, Math.PI);
            //>>includeEnd('debug');
        };

        /**
         * Computes the southwest corner of a rectangle.
         *
         * @param {Rectangle} rectangle The rectangle for which to find the corner
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
         */
        Rectangle.southwest = function(rectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                return new Ellipsoid.Cartographic(rectangle.west, rectangle.south);
            }
            result.longitude = rectangle.west;
            result.latitude = rectangle.south;
            result.height = 0.0;
            return result;
        };

        /**
         * Computes the northwest corner of a rectangle.
         *
         * @param {Rectangle} rectangle The rectangle for which to find the corner
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
         */
        Rectangle.northwest = function(rectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                return new Ellipsoid.Cartographic(rectangle.west, rectangle.north);
            }
            result.longitude = rectangle.west;
            result.latitude = rectangle.north;
            result.height = 0.0;
            return result;
        };

        /**
         * Computes the northeast corner of a rectangle.
         *
         * @param {Rectangle} rectangle The rectangle for which to find the corner
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
         */
        Rectangle.northeast = function(rectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                return new Ellipsoid.Cartographic(rectangle.east, rectangle.north);
            }
            result.longitude = rectangle.east;
            result.latitude = rectangle.north;
            result.height = 0.0;
            return result;
        };

        /**
         * Computes the southeast corner of a rectangle.
         *
         * @param {Rectangle} rectangle The rectangle for which to find the corner
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
         */
        Rectangle.southeast = function(rectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                return new Ellipsoid.Cartographic(rectangle.east, rectangle.south);
            }
            result.longitude = rectangle.east;
            result.latitude = rectangle.south;
            result.height = 0.0;
            return result;
        };

        /**
         * Computes the center of a rectangle.
         *
         * @param {Rectangle} rectangle The rectangle for which to find the center
         * @param {Cartographic} [result] The object onto which to store the result.
         * @returns {Cartographic} The modified result parameter or a new Cartographic instance if none was provided.
         */
        Rectangle.center = function(rectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');

            var east = rectangle.east;
            var west = rectangle.west;

            if (east < west) {
                east += Cartesian3.CesiumMath.TWO_PI;
            }

            var longitude = Cartesian3.CesiumMath.negativePiToPi((west + east) * 0.5);
            var latitude = (rectangle.south + rectangle.north) * 0.5;

            if (!when.defined(result)) {
                return new Ellipsoid.Cartographic(longitude, latitude);
            }

            result.longitude = longitude;
            result.latitude = latitude;
            result.height = 0.0;
            return result;
        };

        /**
         * Computes the intersection of two rectangles.  This function assumes that the rectangle's coordinates are
         * latitude and longitude in radians and produces a correct intersection, taking into account the fact that
         * the same angle can be represented with multiple values as well as the wrapping of longitude at the
         * anti-meridian.  For a simple intersection that ignores these factors and can be used with projected
         * coordinates, see {@link Rectangle.simpleIntersection}.
         *
         * @param {Rectangle} rectangle On rectangle to find an intersection
         * @param {Rectangle} otherRectangle Another rectangle to find an intersection
         * @param {Rectangle} [result] The object onto which to store the result.
         * @returns {Rectangle|undefined} The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.
         */
        Rectangle.intersection = function(rectangle, otherRectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            Check.Check.typeOf.object('otherRectangle', otherRectangle);
            //>>includeEnd('debug');

            var rectangleEast = rectangle.east;
            var rectangleWest = rectangle.west;

            var otherRectangleEast = otherRectangle.east;
            var otherRectangleWest = otherRectangle.west;

            if (rectangleEast < rectangleWest && otherRectangleEast > 0.0) {
                rectangleEast += Cartesian3.CesiumMath.TWO_PI;
            } else if (otherRectangleEast < otherRectangleWest && rectangleEast > 0.0) {
                otherRectangleEast += Cartesian3.CesiumMath.TWO_PI;
            }

            if (rectangleEast < rectangleWest && otherRectangleWest < 0.0) {
                otherRectangleWest += Cartesian3.CesiumMath.TWO_PI;
            } else if (otherRectangleEast < otherRectangleWest && rectangleWest < 0.0) {
                rectangleWest += Cartesian3.CesiumMath.TWO_PI;
            }

            var west = Cartesian3.CesiumMath.negativePiToPi(Math.max(rectangleWest, otherRectangleWest));
            var east = Cartesian3.CesiumMath.negativePiToPi(Math.min(rectangleEast, otherRectangleEast));

            if ((rectangle.west < rectangle.east || otherRectangle.west < otherRectangle.east) && east <= west) {
                return undefined;
            }

            var south = Math.max(rectangle.south, otherRectangle.south);
            var north = Math.min(rectangle.north, otherRectangle.north);

            if (south >= north) {
                return undefined;
            }

            if (!when.defined(result)) {
                return new Rectangle(west, south, east, north);
            }
            result.west = west;
            result.south = south;
            result.east = east;
            result.north = north;
            return result;
        };

        /**
         * Computes a simple intersection of two rectangles.  Unlike {@link Rectangle.intersection}, this function
         * does not attempt to put the angular coordinates into a consistent range or to account for crossing the
         * anti-meridian.  As such, it can be used for rectangles where the coordinates are not simply latitude
         * and longitude (i.e. projected coordinates).
         *
         * @param {Rectangle} rectangle On rectangle to find an intersection
         * @param {Rectangle} otherRectangle Another rectangle to find an intersection
         * @param {Rectangle} [result] The object onto which to store the result.
         * @returns {Rectangle|undefined} The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.
         */
        Rectangle.simpleIntersection = function(rectangle, otherRectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            Check.Check.typeOf.object('otherRectangle', otherRectangle);
            //>>includeEnd('debug');

            var west = Math.max(rectangle.west, otherRectangle.west);
            var south = Math.max(rectangle.south, otherRectangle.south);
            var east = Math.min(rectangle.east, otherRectangle.east);
            var north = Math.min(rectangle.north, otherRectangle.north);

            if (south >= north || west >= east) {
                return undefined;
            }

            if (!when.defined(result)) {
                return new Rectangle(west, south, east, north);
            }

            result.west = west;
            result.south = south;
            result.east = east;
            result.north = north;
            return result;
        };

        /**
         * Computes a rectangle that is the union of two rectangles.
         *
         * @param {Rectangle} rectangle A rectangle to enclose in rectangle.
         * @param {Rectangle} otherRectangle A rectangle to enclose in a rectangle.
         * @param {Rectangle} [result] The object onto which to store the result.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if none was provided.
         */
        Rectangle.union = function(rectangle, otherRectangle, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            Check.Check.typeOf.object('otherRectangle', otherRectangle);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                result = new Rectangle();
            }

            var rectangleEast = rectangle.east;
            var rectangleWest = rectangle.west;

            var otherRectangleEast = otherRectangle.east;
            var otherRectangleWest = otherRectangle.west;

            if (rectangleEast < rectangleWest && otherRectangleEast > 0.0) {
                rectangleEast += Cartesian3.CesiumMath.TWO_PI;
            } else if (otherRectangleEast < otherRectangleWest && rectangleEast > 0.0) {
                otherRectangleEast += Cartesian3.CesiumMath.TWO_PI;
            }

            if (rectangleEast < rectangleWest && otherRectangleWest < 0.0) {
                otherRectangleWest += Cartesian3.CesiumMath.TWO_PI;
            } else if (otherRectangleEast < otherRectangleWest && rectangleWest < 0.0) {
                rectangleWest += Cartesian3.CesiumMath.TWO_PI;
            }

            var west = Cartesian3.CesiumMath.convertLongitudeRange(Math.min(rectangleWest, otherRectangleWest));
            var east = Cartesian3.CesiumMath.convertLongitudeRange(Math.max(rectangleEast, otherRectangleEast));

            result.west = west;
            result.south = Math.min(rectangle.south, otherRectangle.south);
            result.east = east;
            result.north = Math.max(rectangle.north, otherRectangle.north);

            return result;
        };

        /**
         * Computes a rectangle by enlarging the provided rectangle until it contains the provided cartographic.
         *
         * @param {Rectangle} rectangle A rectangle to expand.
         * @param {Cartographic} cartographic A cartographic to enclose in a rectangle.
         * @param {Rectangle} [result] The object onto which to store the result.
         * @returns {Rectangle} The modified result parameter or a new Rectangle instance if one was not provided.
         */
        Rectangle.expand = function(rectangle, cartographic, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            Check.Check.typeOf.object('cartographic', cartographic);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                result = new Rectangle();
            }

            result.west = Math.min(rectangle.west, cartographic.longitude);
            result.south = Math.min(rectangle.south, cartographic.latitude);
            result.east = Math.max(rectangle.east, cartographic.longitude);
            result.north = Math.max(rectangle.north, cartographic.latitude);

            return result;
        };

        /**
         * Returns true if the cartographic is on or inside the rectangle, false otherwise.
         *
         * @param {Rectangle} rectangle The rectangle
         * @param {Cartographic} cartographic The cartographic to test.
         * @returns {Boolean} true if the provided cartographic is inside the rectangle, false otherwise.
         */
        Rectangle.contains = function(rectangle, cartographic) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            Check.Check.typeOf.object('cartographic', cartographic);
            //>>includeEnd('debug');

            var longitude = cartographic.longitude;
            var latitude = cartographic.latitude;

            var west = rectangle.west;
            var east = rectangle.east;

            if (east < west) {
                east += Cartesian3.CesiumMath.TWO_PI;
                if (longitude < 0.0) {
                    longitude += Cartesian3.CesiumMath.TWO_PI;
                }
            }
            return (longitude > west || Cartesian3.CesiumMath.equalsEpsilon(longitude, west, Cartesian3.CesiumMath.EPSILON14)) &&
                   (longitude < east || Cartesian3.CesiumMath.equalsEpsilon(longitude, east, Cartesian3.CesiumMath.EPSILON14)) &&
                   latitude >= rectangle.south &&
                   latitude <= rectangle.north;
        };

        var subsampleLlaScratch = new Ellipsoid.Cartographic();
        /**
         * Samples a rectangle so that it includes a list of Cartesian points suitable for passing to
         * {@link BoundingSphere#fromPoints}.  Sampling is necessary to account
         * for rectangles that cover the poles or cross the equator.
         *
         * @param {Rectangle} rectangle The rectangle to subsample.
         * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid to use.
         * @param {Number} [surfaceHeight=0.0] The height of the rectangle above the ellipsoid.
         * @param {Cartesian3[]} [result] The array of Cartesians onto which to store the result.
         * @returns {Cartesian3[]} The modified result parameter or a new Array of Cartesians instances if none was provided.
         */
        Rectangle.subsample = function(rectangle, ellipsoid, surfaceHeight, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('rectangle', rectangle);
            //>>includeEnd('debug');

            ellipsoid = when.defaultValue(ellipsoid, Ellipsoid.Ellipsoid.WGS84);
            surfaceHeight = when.defaultValue(surfaceHeight, 0.0);

            if (!when.defined(result)) {
                result = [];
            }
            var length = 0;

            var north = rectangle.north;
            var south = rectangle.south;
            var east = rectangle.east;
            var west = rectangle.west;

            var lla = subsampleLlaScratch;
            lla.height = surfaceHeight;

            lla.longitude = west;
            lla.latitude = north;
            result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
            length++;

            lla.longitude = east;
            result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
            length++;

            lla.latitude = south;
            result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
            length++;

            lla.longitude = west;
            result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
            length++;

            if (north < 0.0) {
                lla.latitude = north;
            } else if (south > 0.0) {
                lla.latitude = south;
            } else {
                lla.latitude = 0.0;
            }

            for ( var i = 1; i < 8; ++i) {
                lla.longitude = -Math.PI + i * Cartesian3.CesiumMath.PI_OVER_TWO;
                if (Rectangle.contains(rectangle, lla)) {
                    result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
                    length++;
                }
            }

            if (lla.latitude === 0.0) {
                lla.longitude = west;
                result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
                length++;
                lla.longitude = east;
                result[length] = ellipsoid.cartographicToCartesian(lla, result[length]);
                length++;
            }
            result.length = length;
            return result;
        };

        /**
         * The largest possible rectangle.
         *
         * @type {Rectangle}
         * @constant
        */
        Rectangle.MAX_VALUE = Object.freeze(new Rectangle(-Math.PI, -Cartesian3.CesiumMath.PI_OVER_TWO, Math.PI, Cartesian3.CesiumMath.PI_OVER_TWO));

    /**
         * A 2D Cartesian point.
         * @alias Cartesian2
         * @constructor
         *
         * @param {Number} [x=0.0] The X component.
         * @param {Number} [y=0.0] The Y component.
         *
         * @see Cartesian3
         * @see Cartesian4
         * @see Packable
         */
        function Cartesian2(x, y) {
            /**
             * The X component.
             * @type {Number}
             * @default 0.0
             */
            this.x = when.defaultValue(x, 0.0);

            /**
             * The Y component.
             * @type {Number}
             * @default 0.0
             */
            this.y = when.defaultValue(y, 0.0);
        }

        /**
         * Creates a Cartesian2 instance from x and y coordinates.
         *
         * @param {Number} x The x coordinate.
         * @param {Number} y The y coordinate.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.fromElements = function(x, y, result) {
            if (!when.defined(result)) {
                return new Cartesian2(x, y);
            }

            result.x = x;
            result.y = y;
            return result;
        };

        /**
         * Duplicates a Cartesian2 instance.
         *
         * @param {Cartesian2} cartesian The Cartesian to duplicate.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided. (Returns undefined if cartesian is undefined)
         */
        Cartesian2.clone = function(cartesian, result) {
            if (!when.defined(cartesian)) {
                return undefined;
            }
            if (!when.defined(result)) {
                return new Cartesian2(cartesian.x, cartesian.y);
            }

            result.x = cartesian.x;
            result.y = cartesian.y;
            return result;
        };

        /**
         * Creates a Cartesian2 instance from an existing Cartesian3.  This simply takes the
         * x and y properties of the Cartesian3 and drops z.
         * @function
         *
         * @param {Cartesian3} cartesian The Cartesian3 instance to create a Cartesian2 instance from.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.fromCartesian3 = Cartesian2.clone;

        /**
         * Creates a Cartesian2 instance from an existing Cartesian4.  This simply takes the
         * x and y properties of the Cartesian4 and drops z and w.
         * @function
         *
         * @param {Cartesian4} cartesian The Cartesian4 instance to create a Cartesian2 instance from.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.fromCartesian4 = Cartesian2.clone;

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        Cartesian2.packedLength = 2;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {Cartesian2} value The value to pack.
         * @param {Number[]} array The array to pack into.
         * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
         *
         * @returns {Number[]} The array that was packed into
         */
        Cartesian2.pack = function(value, array, startingIndex) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('value', value);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            array[startingIndex++] = value.x;
            array[startingIndex] = value.y;

            return array;
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {Cartesian2} [result] The object into which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.unpack = function(array, startingIndex, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            startingIndex = when.defaultValue(startingIndex, 0);

            if (!when.defined(result)) {
                result = new Cartesian2();
            }
            result.x = array[startingIndex++];
            result.y = array[startingIndex];
            return result;
        };

        /**
         * Flattens an array of Cartesian2s into and array of components.
         *
         * @param {Cartesian2[]} array The array of cartesians to pack.
         * @param {Number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 2 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 2) elements.

         * @returns {Number[]} The packed array.
         */
        Cartesian2.packArray = function(array, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            var length = array.length;
            var resultLength = length * 2;
            if (!when.defined(result)) {
                result = new Array(resultLength);
            } else if (!Array.isArray(result) && result.length !== resultLength) {
                throw new Check.DeveloperError('If result is a typed array, it must have exactly array.length * 2 elements');
            } else if (result.length !== resultLength) {
                result.length = resultLength;
            }

            for (var i = 0; i < length; ++i) {
                Cartesian2.pack(array[i], result, i * 2);
            }
            return result;
        };

        /**
         * Unpacks an array of cartesian components into and array of Cartesian2s.
         *
         * @param {Number[]} array The array of components to unpack.
         * @param {Cartesian2[]} [result] The array onto which to store the result.
         * @returns {Cartesian2[]} The unpacked array.
         */
        Cartesian2.unpackArray = function(array, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            Check.Check.typeOf.number.greaterThanOrEquals('array.length', array.length, 2);
            if (array.length % 2 !== 0) {
                throw new Check.DeveloperError('array length must be a multiple of 2.');
            }
            //>>includeEnd('debug');

            var length = array.length;
            if (!when.defined(result)) {
                result = new Array(length / 2);
            } else {
                result.length = length / 2;
            }

            for (var i = 0; i < length; i += 2) {
                var index = i / 2;
                result[index] = Cartesian2.unpack(array, i, result[index]);
            }
            return result;
        };

        /**
         * Creates a Cartesian2 from two consecutive elements in an array.
         * @function
         *
         * @param {Number[]} array The array whose two consecutive elements correspond to the x and y components, respectively.
         * @param {Number} [startingIndex=0] The offset into the array of the first element, which corresponds to the x component.
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         *
         * @example
         * // Create a Cartesian2 with (1.0, 2.0)
         * var v = [1.0, 2.0];
         * var p = Cesium.Cartesian2.fromArray(v);
         *
         * // Create a Cartesian2 with (1.0, 2.0) using an offset into an array
         * var v2 = [0.0, 0.0, 1.0, 2.0];
         * var p2 = Cesium.Cartesian2.fromArray(v2, 2);
         */
        Cartesian2.fromArray = Cartesian2.unpack;

        /**
         * Computes the value of the maximum component for the supplied Cartesian.
         *
         * @param {Cartesian2} cartesian The cartesian to use.
         * @returns {Number} The value of the maximum component.
         */
        Cartesian2.maximumComponent = function(cartesian) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            //>>includeEnd('debug');

            return Math.max(cartesian.x, cartesian.y);
        };

        /**
         * Computes the value of the minimum component for the supplied Cartesian.
         *
         * @param {Cartesian2} cartesian The cartesian to use.
         * @returns {Number} The value of the minimum component.
         */
        Cartesian2.minimumComponent = function(cartesian) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            //>>includeEnd('debug');

            return Math.min(cartesian.x, cartesian.y);
        };

        /**
         * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
         *
         * @param {Cartesian2} first A cartesian to compare.
         * @param {Cartesian2} second A cartesian to compare.
         * @param {Cartesian2} result The object into which to store the result.
         * @returns {Cartesian2} A cartesian with the minimum components.
         */
        Cartesian2.minimumByComponent = function(first, second, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('first', first);
            Check.Check.typeOf.object('second', second);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = Math.min(first.x, second.x);
            result.y = Math.min(first.y, second.y);

            return result;
        };

        /**
         * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
         *
         * @param {Cartesian2} first A cartesian to compare.
         * @param {Cartesian2} second A cartesian to compare.
         * @param {Cartesian2} result The object into which to store the result.
         * @returns {Cartesian2} A cartesian with the maximum components.
         */
        Cartesian2.maximumByComponent = function(first, second, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('first', first);
            Check.Check.typeOf.object('second', second);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = Math.max(first.x, second.x);
            result.y = Math.max(first.y, second.y);
            return result;
        };

        /**
         * Computes the provided Cartesian's squared magnitude.
         *
         * @param {Cartesian2} cartesian The Cartesian instance whose squared magnitude is to be computed.
         * @returns {Number} The squared magnitude.
         */
        Cartesian2.magnitudeSquared = function(cartesian) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            //>>includeEnd('debug');

            return cartesian.x * cartesian.x + cartesian.y * cartesian.y;
        };

        /**
         * Computes the Cartesian's magnitude (length).
         *
         * @param {Cartesian2} cartesian The Cartesian instance whose magnitude is to be computed.
         * @returns {Number} The magnitude.
         */
        Cartesian2.magnitude = function(cartesian) {
            return Math.sqrt(Cartesian2.magnitudeSquared(cartesian));
        };

        var distanceScratch = new Cartesian2();

        /**
         * Computes the distance between two points.
         *
         * @param {Cartesian2} left The first point to compute the distance from.
         * @param {Cartesian2} right The second point to compute the distance to.
         * @returns {Number} The distance between two points.
         *
         * @example
         * // Returns 1.0
         * var d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(2.0, 0.0));
         */
        Cartesian2.distance = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            Cartesian2.subtract(left, right, distanceScratch);
            return Cartesian2.magnitude(distanceScratch);
        };

        /**
         * Computes the squared distance between two points.  Comparing squared distances
         * using this function is more efficient than comparing distances using {@link Cartesian2#distance}.
         *
         * @param {Cartesian2} left The first point to compute the distance from.
         * @param {Cartesian2} right The second point to compute the distance to.
         * @returns {Number} The distance between two points.
         *
         * @example
         * // Returns 4.0, not 2.0
         * var d = Cesium.Cartesian2.distance(new Cesium.Cartesian2(1.0, 0.0), new Cesium.Cartesian2(3.0, 0.0));
         */
        Cartesian2.distanceSquared = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            Cartesian2.subtract(left, right, distanceScratch);
            return Cartesian2.magnitudeSquared(distanceScratch);
        };

        /**
         * Computes the normalized form of the supplied Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian to be normalized.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.normalize = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            var magnitude = Cartesian2.magnitude(cartesian);

            result.x = cartesian.x / magnitude;
            result.y = cartesian.y / magnitude;

            //>>includeStart('debug', pragmas.debug);
            if (isNaN(result.x) || isNaN(result.y)) {
                throw new Check.DeveloperError('normalized result is not a number');
            }
            //>>includeEnd('debug');

            return result;
        };

        /**
         * Computes the dot (scalar) product of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @returns {Number} The dot product.
         */
        Cartesian2.dot = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            return left.x * right.x + left.y * right.y;
        };

        /**
         * Computes the componentwise product of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.multiplyComponents = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x * right.x;
            result.y = left.y * right.y;
            return result;
        };

        /**
         * Computes the componentwise quotient of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.divideComponents = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x / right.x;
            result.y = left.y / right.y;
            return result;
        };

        /**
         * Computes the componentwise sum of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.add = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x + right.x;
            result.y = left.y + right.y;
            return result;
        };

        /**
         * Computes the componentwise difference of two Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.subtract = function(left, right, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = left.x - right.x;
            result.y = left.y - right.y;
            return result;
        };

        /**
         * Multiplies the provided Cartesian componentwise by the provided scalar.
         *
         * @param {Cartesian2} cartesian The Cartesian to be scaled.
         * @param {Number} scalar The scalar to multiply with.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.multiplyByScalar = function(cartesian, scalar, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.number('scalar', scalar);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = cartesian.x * scalar;
            result.y = cartesian.y * scalar;
            return result;
        };

        /**
         * Divides the provided Cartesian componentwise by the provided scalar.
         *
         * @param {Cartesian2} cartesian The Cartesian to be divided.
         * @param {Number} scalar The scalar to divide by.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.divideByScalar = function(cartesian, scalar, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.number('scalar', scalar);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = cartesian.x / scalar;
            result.y = cartesian.y / scalar;
            return result;
        };

        /**
         * Negates the provided Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian to be negated.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.negate = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = -cartesian.x;
            result.y = -cartesian.y;
            return result;
        };

        /**
         * Computes the absolute value of the provided Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian whose absolute value is to be computed.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.abs = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            result.x = Math.abs(cartesian.x);
            result.y = Math.abs(cartesian.y);
            return result;
        };

        var lerpScratch = new Cartesian2();
        /**
         * Computes the linear interpolation or extrapolation at t using the provided cartesians.
         *
         * @param {Cartesian2} start The value corresponding to t at 0.0.
         * @param {Cartesian2} end The value corresponding to t at 1.0.
         * @param {Number} t The point along t at which to interpolate.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter.
         */
        Cartesian2.lerp = function(start, end, t, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('start', start);
            Check.Check.typeOf.object('end', end);
            Check.Check.typeOf.number('t', t);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            Cartesian2.multiplyByScalar(end, t, lerpScratch);
            result = Cartesian2.multiplyByScalar(start, 1.0 - t, result);
            return Cartesian2.add(lerpScratch, result, result);
        };

        var angleBetweenScratch = new Cartesian2();
        var angleBetweenScratch2 = new Cartesian2();
        /**
         * Returns the angle, in radians, between the provided Cartesians.
         *
         * @param {Cartesian2} left The first Cartesian.
         * @param {Cartesian2} right The second Cartesian.
         * @returns {Number} The angle between the Cartesians.
         */
        Cartesian2.angleBetween = function(left, right) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('left', left);
            Check.Check.typeOf.object('right', right);
            //>>includeEnd('debug');

            Cartesian2.normalize(left, angleBetweenScratch);
            Cartesian2.normalize(right, angleBetweenScratch2);
            return Cartesian3.CesiumMath.acosClamped(Cartesian2.dot(angleBetweenScratch, angleBetweenScratch2));
        };

        var mostOrthogonalAxisScratch = new Cartesian2();
        /**
         * Returns the axis that is most orthogonal to the provided Cartesian.
         *
         * @param {Cartesian2} cartesian The Cartesian on which to find the most orthogonal axis.
         * @param {Cartesian2} result The object onto which to store the result.
         * @returns {Cartesian2} The most orthogonal axis.
         */
        Cartesian2.mostOrthogonalAxis = function(cartesian, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.typeOf.object('cartesian', cartesian);
            Check.Check.typeOf.object('result', result);
            //>>includeEnd('debug');

            var f = Cartesian2.normalize(cartesian, mostOrthogonalAxisScratch);
            Cartesian2.abs(f, f);

            if (f.x <= f.y) {
                result = Cartesian2.clone(Cartesian2.UNIT_X, result);
            } else {
                result = Cartesian2.clone(Cartesian2.UNIT_Y, result);
            }

            return result;
        };

        /**
         * Compares the provided Cartesians componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Cartesian2} [left] The first Cartesian.
         * @param {Cartesian2} [right] The second Cartesian.
         * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
         */
        Cartesian2.equals = function(left, right) {
            return (left === right) ||
                   ((when.defined(left)) &&
                    (when.defined(right)) &&
                    (left.x === right.x) &&
                    (left.y === right.y));
        };

        /**
         * @private
         */
        Cartesian2.equalsArray = function(cartesian, array, offset) {
            return cartesian.x === array[offset] &&
                   cartesian.y === array[offset + 1];
        };

        /**
         * Compares the provided Cartesians componentwise and returns
         * <code>true</code> if they pass an absolute or relative tolerance test,
         * <code>false</code> otherwise.
         *
         * @param {Cartesian2} [left] The first Cartesian.
         * @param {Cartesian2} [right] The second Cartesian.
         * @param {Number} relativeEpsilon The relative epsilon tolerance to use for equality testing.
         * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
         * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
         */
        Cartesian2.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
            return (left === right) ||
                   (when.defined(left) &&
                    when.defined(right) &&
                    Cartesian3.CesiumMath.equalsEpsilon(left.x, right.x, relativeEpsilon, absoluteEpsilon) &&
                    Cartesian3.CesiumMath.equalsEpsilon(left.y, right.y, relativeEpsilon, absoluteEpsilon));
        };

        /**
         * An immutable Cartesian2 instance initialized to (0.0, 0.0).
         *
         * @type {Cartesian2}
         * @constant
         */
        Cartesian2.ZERO = Object.freeze(new Cartesian2(0.0, 0.0));

        /**
         * An immutable Cartesian2 instance initialized to (1.0, 0.0).
         *
         * @type {Cartesian2}
         * @constant
         */
        Cartesian2.UNIT_X = Object.freeze(new Cartesian2(1.0, 0.0));

        /**
         * An immutable Cartesian2 instance initialized to (0.0, 1.0).
         *
         * @type {Cartesian2}
         * @constant
         */
        Cartesian2.UNIT_Y = Object.freeze(new Cartesian2(0.0, 1.0));

        /**
         * Duplicates this Cartesian2 instance.
         *
         * @param {Cartesian2} [result] The object onto which to store the result.
         * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
         */
        Cartesian2.prototype.clone = function(result) {
            return Cartesian2.clone(this, result);
        };

        /**
         * Compares this Cartesian against the provided Cartesian componentwise and returns
         * <code>true</code> if they are equal, <code>false</code> otherwise.
         *
         * @param {Cartesian2} [right] The right hand side Cartesian.
         * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
         */
        Cartesian2.prototype.equals = function(right) {
            return Cartesian2.equals(this, right);
        };

        /**
         * Compares this Cartesian against the provided Cartesian componentwise and returns
         * <code>true</code> if they pass an absolute or relative tolerance test,
         * <code>false</code> otherwise.
         *
         * @param {Cartesian2} [right] The right hand side Cartesian.
         * @param {Number} relativeEpsilon The relative epsilon tolerance to use for equality testing.
         * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
         * @returns {Boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
         */
        Cartesian2.prototype.equalsEpsilon = function(right, relativeEpsilon, absoluteEpsilon) {
            return Cartesian2.equalsEpsilon(this, right, relativeEpsilon, absoluteEpsilon);
        };

        /**
         * Creates a string representing this Cartesian in the format '(x, y)'.
         *
         * @returns {String} A string representing the provided Cartesian in the format '(x, y)'.
         */
        Cartesian2.prototype.toString = function() {
            return '(' + this.x + ', ' + this.y + ')';
        };

    exports.Cartesian2 = Cartesian2;
    exports.Rectangle = Rectangle;

});
//# sourceMappingURL=Cartesian2-e5f465dc.js.map
