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

define(['exports', './when-7ef6387a', './Check-ed6a1804'], function (exports, when, Check) { 'use strict';

  /*
    I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
    so it's better encapsulated. Now you can have multiple random number generators
    and they won't stomp all over eachother's state.

    If you want to use this as a substitute for Math.random(), use the random()
    method like so:

    var m = new MersenneTwister();
    var randomNumber = m.random();

    You can also call the other genrand_{foo}() methods on the instance.

    If you want to use a specific seed in order to get a repeatable random
    sequence, pass an integer into the constructor:

    var m = new MersenneTwister(123);

    and that will always produce the same random sequence.

    Sean McCullough (banksean@gmail.com)
  */

  /*
     A C-program for MT19937, with initialization improved 2002/1/26.
     Coded by Takuji Nishimura and Makoto Matsumoto.

     Before using, initialize the state by using init_genrand(seed)
     or init_by_array(init_key, key_length).
  */
  /**
  @license
  mersenne-twister.js - https://gist.github.com/banksean/300494

     Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
     All rights reserved.

     Redistribution and use in source and binary forms, with or without
     modification, are permitted provided that the following conditions
     are met:

       1. Redistributions of source code must retain the above copyright
          notice, this list of conditions and the following disclaimer.

       2. Redistributions in binary form must reproduce the above copyright
          notice, this list of conditions and the following disclaimer in the
          documentation and/or other materials provided with the distribution.

       3. The names of its contributors may not be used to endorse or promote
          products derived from this software without specific prior written
          permission.

     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
     A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
     CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
     PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
     PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
  /*
     Any feedback is very welcome.
     http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
     email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
  */

  var MersenneTwister = function(seed) {
    if (seed == undefined) {
      seed = new Date().getTime();
    }
    /* Period parameters */
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;   /* constant vector a */
    this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
    this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

    this.mt = new Array(this.N); /* the array for the state vector */
    this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

    this.init_genrand(seed);
  };

  /* initializes mt[N] with a seed */
  MersenneTwister.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti=1; this.mti<this.N; this.mti++) {
        var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
     this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
    + this.mti;
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
        this.mt[this.mti] >>>= 0;
        /* for >32 bit machines */
    }
  };

  /* initialize by an array with array-length */
  /* init_key is the array for initializing keys */
  /* key_length is its length */
  /* slight change for C++, 2004/2/26 */
  //MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
  //  var i, j, k;
  //  this.init_genrand(19650218);
  //  i=1; j=0;
  //  k = (this.N>key_length ? this.N : key_length);
  //  for (; k; k--) {
  //    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)
  //    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
  //      + init_key[j] + j; /* non linear */
  //    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
  //    i++; j++;
  //    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
  //    if (j>=key_length) j=0;
  //  }
  //  for (k=this.N-1; k; k--) {
  //    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
  //    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
  //      - i; /* non linear */
  //    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
  //    i++;
  //    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
  //  }
  //
  //  this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
  //}

  /* generates a random number on [0,0xffffffff]-interval */
  MersenneTwister.prototype.genrand_int32 = function() {
    var y;
    var mag01 = new Array(0x0, this.MATRIX_A);
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (this.mti >= this.N) { /* generate N words at one time */
      var kk;

      if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
        this.init_genrand(5489); /* a default initial seed is used */

      for (kk=0;kk<this.N-this.M;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (;kk<this.N-1;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
      this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this.mti = 0;
    }

    y = this.mt[this.mti++];

    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  };

  /* generates a random number on [0,0x7fffffff]-interval */
  //MersenneTwister.prototype.genrand_int31 = function() {
  //  return (this.genrand_int32()>>>1);
  //}

  /* generates a random number on [0,1]-real-interval */
  //MersenneTwister.prototype.genrand_real1 = function() {
  //  return this.genrand_int32()*(1.0/4294967295.0);
  //  /* divided by 2^32-1 */
  //}

  /* generates a random number on [0,1)-real-interval */
  MersenneTwister.prototype.random = function() {
    return this.genrand_int32()*(1.0/4294967296.0);
    /* divided by 2^32 */
  };

  /**
       * Math functions.
       *
       * @exports CesiumMath
       * @alias Math
       */
      var CesiumMath = {};

      /**
       * 0.1
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON1 = 0.1;

      /**
       * 0.01
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON2 = 0.01;

      /**
       * 0.001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON3 = 0.001;

      /**
       * 0.0001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON4 = 0.0001;

      /**
       * 0.00001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON5 = 0.00001;

      /**
       * 0.000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON6 = 0.000001;

      /**
       * 0.0000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON7 = 0.0000001;

      /**
       * 0.00000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON8 = 0.00000001;

      /**
       * 0.000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON9 = 0.000000001;

      /**
       * 0.0000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON10 = 0.0000000001;

      /**
       * 0.00000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON11 = 0.00000000001;

      /**
       * 0.000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON12 = 0.000000000001;

      /**
       * 0.0000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON13 = 0.0000000000001;

      /**
       * 0.00000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON14 = 0.00000000000001;

      /**
       * 0.000000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON15 = 0.000000000000001;

      /**
       * 0.0000000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON16 = 0.0000000000000001;

      /**
       * 0.00000000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON17 = 0.00000000000000001;

      /**
       * 0.000000000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON18 = 0.000000000000000001;

      /**
       * 0.0000000000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON19 = 0.0000000000000000001;

      /**
       * 0.00000000000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON20 = 0.00000000000000000001;

      /**
       * 0.000000000000000000001
       * @type {Number}
       * @constant
       */
      CesiumMath.EPSILON21 = 0.000000000000000000001;

      /**
       * The gravitational parameter of the Earth in meters cubed
       * per second squared as defined by the WGS84 model: 3.986004418e14
       * @type {Number}
       * @constant
       */
      CesiumMath.GRAVITATIONALPARAMETER = 3.986004418e14;

      /**
       * Radius of the sun in meters: 6.955e8
       * @type {Number}
       * @constant
       */
      CesiumMath.SOLAR_RADIUS = 6.955e8 * 3.0;

      /**
       * The mean radius of the moon, according to the "Report of the IAU/IAG Working Group on
       * Cartographic Coordinates and Rotational Elements of the Planets and satellites: 2000",
       * Celestial Mechanics 82: 83-110, 2002.
       * @type {Number}
       * @constant
       */
      CesiumMath.LUNAR_RADIUS = 1737400.0 * 3.0;

      /**
       * 64 * 1024
       * @type {Number}
       * @constant
       */
      CesiumMath.SIXTY_FOUR_KILOBYTES = 64 * 1024;

      /**
       * 4 * 1024 * 1024 * 1024
       * @type {Number}
       * @constant
       */
      CesiumMath.FOUR_GIGABYTES = 4 * 1024 * 1024 * 1024;

      /**
       * Returns the sign of the value; 1 if the value is positive, -1 if the value is
       * negative, or 0 if the value is 0.
       *
       * @function
       * @param {Number} value The value to return the sign of.
       * @returns {Number} The sign of value.
       */
      CesiumMath.sign = when.defaultValue(Math.sign, function sign(value) {
          value = +value; // coerce to number
          if (value === 0 || value !== value) {
              // zero or NaN
              return value;
          }
          return value > 0 ? 1 : -1;
      });

      /**
       * Returns 1.0 if the given value is positive or zero, and -1.0 if it is negative.
       * This is similar to {@link CesiumMath#sign} except that returns 1.0 instead of
       * 0.0 when the input value is 0.0.
       * @param {Number} value The value to return the sign of.
       * @returns {Number} The sign of value.
       */
      CesiumMath.signNotZero = function(value) {
          return value < 0.0 ? -1.0 : 1.0;
      };

      /**
       * Converts a scalar value in the range [-1.0, 1.0] to a SNORM in the range [0, rangeMaximum]
       * @param {Number} value The scalar value in the range [-1.0, 1.0]
       * @param {Number} [rangeMaximum=255] The maximum value in the mapped range, 255 by default.
       * @returns {Number} A SNORM value, where 0 maps to -1.0 and rangeMaximum maps to 1.0.
       *
       * @see CesiumMath.fromSNorm
       */
      CesiumMath.toSNorm = function(value, rangeMaximum) {
          rangeMaximum = when.defaultValue(rangeMaximum, 255);
          return Math.round((CesiumMath.clamp(value, -1.0, 1.0) * 0.5 + 0.5) * rangeMaximum);
      };

      /**
       * Converts a SNORM value in the range [0, rangeMaximum] to a scalar in the range [-1.0, 1.0].
       * @param {Number} value SNORM value in the range [0, rangeMaximum]
       * @param {Number} [rangeMaximum=255] The maximum value in the SNORM range, 255 by default.
       * @returns {Number} Scalar in the range [-1.0, 1.0].
       *
       * @see CesiumMath.toSNorm
       */
      CesiumMath.fromSNorm = function(value, rangeMaximum) {
          rangeMaximum = when.defaultValue(rangeMaximum, 255);
          return CesiumMath.clamp(value, 0.0, rangeMaximum) / rangeMaximum * 2.0 - 1.0;
      };

      /**
       * Converts a scalar value in the range [rangeMinimum, rangeMaximum] to a scalar in the range [0.0, 1.0]
       * @param {Number} value The scalar value in the range [rangeMinimum, rangeMaximum]
       * @param {Number} rangeMinimum The minimum value in the mapped range.
       * @param {Number} rangeMaximum The maximum value in the mapped range.
       * @returns {Number} A scalar value, where rangeMinimum maps to 0.0 and rangeMaximum maps to 1.0.
       */
      CesiumMath.normalize = function(value, rangeMinimum, rangeMaximum) {
          rangeMaximum = Math.max(rangeMaximum - rangeMinimum, 0.0);
          return rangeMaximum === 0.0 ? 0.0 : CesiumMath.clamp((value - rangeMinimum) / rangeMaximum, 0.0, 1.0);
      };

      /**
       * Returns the hyperbolic sine of a number.
       * The hyperbolic sine of <em>value</em> is defined to be
       * (<em>e<sup>x</sup>&nbsp;-&nbsp;e<sup>-x</sup></em>)/2.0
       * where <i>e</i> is Euler's number, approximately 2.71828183.
       *
       * <p>Special cases:
       *   <ul>
       *     <li>If the argument is NaN, then the result is NaN.</li>
       *
       *     <li>If the argument is infinite, then the result is an infinity
       *     with the same sign as the argument.</li>
       *
       *     <li>If the argument is zero, then the result is a zero with the
       *     same sign as the argument.</li>
       *   </ul>
       *</p>
       *
       * @function
       * @param {Number} value The number whose hyperbolic sine is to be returned.
       * @returns {Number} The hyperbolic sine of <code>value</code>.
       */
      CesiumMath.sinh = when.defaultValue(Math.sinh, function sinh(value) {
          return (Math.exp(value) - Math.exp(-value)) / 2.0;
      });

      /**
       * Returns the hyperbolic cosine of a number.
       * The hyperbolic cosine of <strong>value</strong> is defined to be
       * (<em>e<sup>x</sup>&nbsp;+&nbsp;e<sup>-x</sup></em>)/2.0
       * where <i>e</i> is Euler's number, approximately 2.71828183.
       *
       * <p>Special cases:
       *   <ul>
       *     <li>If the argument is NaN, then the result is NaN.</li>
       *
       *     <li>If the argument is infinite, then the result is positive infinity.</li>
       *
       *     <li>If the argument is zero, then the result is 1.0.</li>
       *   </ul>
       *</p>
       *
       * @function
       * @param {Number} value The number whose hyperbolic cosine is to be returned.
       * @returns {Number} The hyperbolic cosine of <code>value</code>.
       */
      CesiumMath.cosh = when.defaultValue(Math.cosh, function cosh(value) {
          return (Math.exp(value) + Math.exp(-value)) / 2.0;
      });

      /**
       * Computes the linear interpolation of two values.
       *
       * @param {Number} p The start value to interpolate.
       * @param {Number} q The end value to interpolate.
       * @param {Number} time The time of interpolation generally in the range <code>[0.0, 1.0]</code>.
       * @returns {Number} The linearly interpolated value.
       *
       * @example
       * var n = Cesium.Math.lerp(0.0, 2.0, 0.5); // returns 1.0
       */
      CesiumMath.lerp = function(p, q, time) {
          return ((1.0 - time) * p) + (time * q);
      };

      /**
       * pi
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.PI = Math.PI;

      /**
       * 1/pi
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.ONE_OVER_PI = 1.0 / Math.PI;

      /**
       * pi/2
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.PI_OVER_TWO = Math.PI / 2.0;

      /**
       * pi/3
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.PI_OVER_THREE = Math.PI / 3.0;

      /**
       * pi/4
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.PI_OVER_FOUR = Math.PI / 4.0;

      /**
       * pi/6
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.PI_OVER_SIX = Math.PI / 6.0;

      /**
       * 3pi/2
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.THREE_PI_OVER_TWO = 3.0 * Math.PI / 2.0;

      /**
       * 2pi
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.TWO_PI = 2.0 * Math.PI;

      /**
       * 1/2pi
       *
       * @type {Number}
       * @constant
       */
      CesiumMath.ONE_OVER_TWO_PI = 1.0 / (2.0 * Math.PI);

      /**
       * The number of radians in a degree.
       *
       * @type {Number}
       * @constant
       * @default Math.PI / 180.0
       */
      CesiumMath.RADIANS_PER_DEGREE = Math.PI / 180.0;

      /**
       * The number of degrees in a radian.
       *
       * @type {Number}
       * @constant
       * @default 180.0 / Math.PI
       */
      CesiumMath.DEGREES_PER_RADIAN = 180.0 / Math.PI;

      /**
       * The number of radians in an arc second.
       *
       * @type {Number}
       * @constant
       * @default {@link CesiumMath.RADIANS_PER_DEGREE} / 3600.0
       */
      CesiumMath.RADIANS_PER_ARCSECOND = CesiumMath.RADIANS_PER_DEGREE / 3600.0;

      /**
       * Converts degrees to radians.
       * @param {Number} degrees The angle to convert in degrees.
       * @returns {Number} The corresponding angle in radians.
       */
      CesiumMath.toRadians = function(degrees) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(degrees)) {
              throw new Check.DeveloperError('degrees is required.');
          }
          //>>includeEnd('debug');
          return degrees * CesiumMath.RADIANS_PER_DEGREE;
      };

      /**
       * Converts radians to degrees.
       * @param {Number} radians The angle to convert in radians.
       * @returns {Number} The corresponding angle in degrees.
       */
      CesiumMath.toDegrees = function(radians) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(radians)) {
              throw new Check.DeveloperError('radians is required.');
          }
          //>>includeEnd('debug');
          return radians * CesiumMath.DEGREES_PER_RADIAN;
      };

      /**
       * Converts a longitude value, in radians, to the range [<code>-Math.PI</code>, <code>Math.PI</code>).
       *
       * @param {Number} angle The longitude value, in radians, to convert to the range [<code>-Math.PI</code>, <code>Math.PI</code>).
       * @returns {Number} The equivalent longitude value in the range [<code>-Math.PI</code>, <code>Math.PI</code>).
       *
       * @example
       * // Convert 270 degrees to -90 degrees longitude
       * var longitude = Cesium.Math.convertLongitudeRange(Cesium.Math.toRadians(270.0));
       */
      CesiumMath.convertLongitudeRange = function(angle) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(angle)) {
              throw new Check.DeveloperError('angle is required.');
          }
          //>>includeEnd('debug');
          var twoPi = CesiumMath.TWO_PI;

          var simplified = angle - Math.floor(angle / twoPi) * twoPi;

          if (simplified < -Math.PI) {
              return simplified + twoPi;
          }
          if (simplified >= Math.PI) {
              return simplified - twoPi;
          }

          return simplified;
      };

      /**
       * Convenience function that clamps a latitude value, in radians, to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
       * Useful for sanitizing data before use in objects requiring correct range.
       *
       * @param {Number} angle The latitude value, in radians, to clamp to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
       * @returns {Number} The latitude value clamped to the range [<code>-Math.PI/2</code>, <code>Math.PI/2</code>).
       *
       * @example
       * // Clamp 108 degrees latitude to 90 degrees latitude
       * var latitude = Cesium.Math.clampToLatitudeRange(Cesium.Math.toRadians(108.0));
       */
      CesiumMath.clampToLatitudeRange = function(angle) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(angle)) {
              throw new Check.DeveloperError('angle is required.');
          }
          //>>includeEnd('debug');

          return CesiumMath.clamp(angle, -1*CesiumMath.PI_OVER_TWO, CesiumMath.PI_OVER_TWO);
      };

      /**
       * Produces an angle in the range -Pi <= angle <= Pi which is equivalent to the provided angle.
       *
       * @param {Number} angle in radians
       * @returns {Number} The angle in the range [<code>-CesiumMath.PI</code>, <code>CesiumMath.PI</code>].
       */
      CesiumMath.negativePiToPi = function(angle) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(angle)) {
              throw new Check.DeveloperError('angle is required.');
          }
          //>>includeEnd('debug');
          return CesiumMath.zeroToTwoPi(angle + CesiumMath.PI) - CesiumMath.PI;
      };

      /**
       * Produces an angle in the range 0 <= angle <= 2Pi which is equivalent to the provided angle.
       *
       * @param {Number} angle in radians
       * @returns {Number} The angle in the range [0, <code>CesiumMath.TWO_PI</code>].
       */
      CesiumMath.zeroToTwoPi = function(angle) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(angle)) {
              throw new Check.DeveloperError('angle is required.');
          }
          //>>includeEnd('debug');
          var mod = CesiumMath.mod(angle, CesiumMath.TWO_PI);
          if (Math.abs(mod) < CesiumMath.EPSILON14 && Math.abs(angle) > CesiumMath.EPSILON14) {
              return CesiumMath.TWO_PI;
          }
          return mod;
      };

      /**
       * The modulo operation that also works for negative dividends.
       *
       * @param {Number} m The dividend.
       * @param {Number} n The divisor.
       * @returns {Number} The remainder.
       */
      CesiumMath.mod = function(m, n) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(m)) {
              throw new Check.DeveloperError('m is required.');
          }
          if (!when.defined(n)) {
              throw new Check.DeveloperError('n is required.');
          }
          //>>includeEnd('debug');
          return ((m % n) + n) % n;
      };

      /**
       * Determines if two values are equal using an absolute or relative tolerance test. This is useful
       * to avoid problems due to roundoff error when comparing floating-point values directly. The values are
       * first compared using an absolute tolerance test. If that fails, a relative tolerance test is performed.
       * Use this test if you are unsure of the magnitudes of left and right.
       *
       * @param {Number} left The first value to compare.
       * @param {Number} right The other value to compare.
       * @param {Number} relativeEpsilon The maximum inclusive delta between <code>left</code> and <code>right</code> for the relative tolerance test.
       * @param {Number} [absoluteEpsilon=relativeEpsilon] The maximum inclusive delta between <code>left</code> and <code>right</code> for the absolute tolerance test.
       * @returns {Boolean} <code>true</code> if the values are equal within the epsilon; otherwise, <code>false</code>.
       *
       * @example
       * var a = Cesium.Math.equalsEpsilon(0.0, 0.01, Cesium.Math.EPSILON2); // true
       * var b = Cesium.Math.equalsEpsilon(0.0, 0.1, Cesium.Math.EPSILON2);  // false
       * var c = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON7); // true
       * var d = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON9); // false
       */
      CesiumMath.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(left)) {
              throw new Check.DeveloperError('left is required.');
          }
          if (!when.defined(right)) {
              throw new Check.DeveloperError('right is required.');
          }
          if (!when.defined(relativeEpsilon)) {
              throw new Check.DeveloperError('relativeEpsilon is required.');
          }
          //>>includeEnd('debug');
          absoluteEpsilon = when.defaultValue(absoluteEpsilon, relativeEpsilon);
          var absDiff = Math.abs(left - right);
          return absDiff <= absoluteEpsilon || absDiff <= relativeEpsilon * Math.max(Math.abs(left), Math.abs(right));
      };

      /**
       * Determines if the left value is less than the right value. If the two values are within
       * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns false.
       *
       * @param {Number} left The first number to compare.
       * @param {Number} right The second number to compare.
       * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
       * @returns {Boolean} <code>true</code> if <code>left</code> is less than <code>right</code> by more than
       *          <code>absoluteEpsilon<code>. <code>false</code> if <code>left</code> is greater or if the two
       *          values are nearly equal.
       */
      CesiumMath.lessThan = function(left, right, absoluteEpsilon) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(left)) {
              throw new Check.DeveloperError('first is required.');
          }
          if (!when.defined(right)) {
              throw new Check.DeveloperError('second is required.');
          }
          if (!when.defined(absoluteEpsilon)) {
              throw new Check.DeveloperError('relativeEpsilon is required.');
          }
          //>>includeEnd('debug');
          return left - right < -absoluteEpsilon;
      };

      /**
       * Determines if the left value is less than or equal to the right value. If the two values are within
       * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns true.
       *
       * @param {Number} left The first number to compare.
       * @param {Number} right The second number to compare.
       * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
       * @returns {Boolean} <code>true</code> if <code>left</code> is less than <code>right</code> or if the
       *          the values are nearly equal.
       */
      CesiumMath.lessThanOrEquals = function(left, right, absoluteEpsilon) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(left)) {
              throw new Check.DeveloperError('first is required.');
          }
          if (!when.defined(right)) {
              throw new Check.DeveloperError('second is required.');
          }
          if (!when.defined(absoluteEpsilon)) {
              throw new Check.DeveloperError('relativeEpsilon is required.');
          }
          //>>includeEnd('debug');
          return left - right < absoluteEpsilon;
      };

      /**
       * Determines if the left value is greater the right value. If the two values are within
       * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns false.
       *
       * @param {Number} left The first number to compare.
       * @param {Number} right The second number to compare.
       * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
       * @returns {Boolean} <code>true</code> if <code>left</code> is greater than <code>right</code> by more than
       *          <code>absoluteEpsilon<code>. <code>false</code> if <code>left</code> is less or if the two
       *          values are nearly equal.
       */
      CesiumMath.greaterThan = function(left, right, absoluteEpsilon) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(left)) {
              throw new Check.DeveloperError('first is required.');
          }
          if (!when.defined(right)) {
              throw new Check.DeveloperError('second is required.');
          }
          if (!when.defined(absoluteEpsilon)) {
              throw new Check.DeveloperError('relativeEpsilon is required.');
          }
          //>>includeEnd('debug');
          return left - right > absoluteEpsilon;
      };

      /**
       * Determines if the left value is greater than or equal to the right value. If the two values are within
       * <code>absoluteEpsilon</code> of each other, they are considered equal and this function returns true.
       *
       * @param {Number} left The first number to compare.
       * @param {Number} right The second number to compare.
       * @param {Number} absoluteEpsilon The absolute epsilon to use in comparison.
       * @returns {Boolean} <code>true</code> if <code>left</code> is greater than <code>right</code> or if the
       *          the values are nearly equal.
       */
      CesiumMath.greaterThanOrEquals = function(left, right, absoluteEpsilon) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(left)) {
              throw new Check.DeveloperError('first is required.');
          }
          if (!when.defined(right)) {
              throw new Check.DeveloperError('second is required.');
          }
          if (!when.defined(absoluteEpsilon)) {
              throw new Check.DeveloperError('relativeEpsilon is required.');
          }
          //>>includeEnd('debug');
          return left - right > -absoluteEpsilon;
      };

      var factorials = [1];

      /**
       * Computes the factorial of the provided number.
       *
       * @param {Number} n The number whose factorial is to be computed.
       * @returns {Number} The factorial of the provided number or undefined if the number is less than 0.
       *
       * @exception {DeveloperError} A number greater than or equal to 0 is required.
       *
       *
       * @example
       * //Compute 7!, which is equal to 5040
       * var computedFactorial = Cesium.Math.factorial(7);
       *
       * @see {@link http://en.wikipedia.org/wiki/Factorial|Factorial on Wikipedia}
       */
      CesiumMath.factorial = function(n) {
          //>>includeStart('debug', pragmas.debug);
          if (typeof n !== 'number' || n < 0) {
              throw new Check.DeveloperError('A number greater than or equal to 0 is required.');
          }
          //>>includeEnd('debug');

          var length = factorials.length;
          if (n >= length) {
              var sum = factorials[length - 1];
              for (var i = length; i <= n; i++) {
                  var next = sum * i;
                  factorials.push(next);
                  sum = next;
              }
          }
          return factorials[n];
      };

      /**
       * Increments a number with a wrapping to a minimum value if the number exceeds the maximum value.
       *
       * @param {Number} [n] The number to be incremented.
       * @param {Number} [maximumValue] The maximum incremented value before rolling over to the minimum value.
       * @param {Number} [minimumValue=0.0] The number reset to after the maximum value has been exceeded.
       * @returns {Number} The incremented number.
       *
       * @exception {DeveloperError} Maximum value must be greater than minimum value.
       *
       * @example
       * var n = Cesium.Math.incrementWrap(5, 10, 0); // returns 6
       * var n = Cesium.Math.incrementWrap(10, 10, 0); // returns 0
       */
      CesiumMath.incrementWrap = function(n, maximumValue, minimumValue) {
          minimumValue = when.defaultValue(minimumValue, 0.0);

          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(n)) {
              throw new Check.DeveloperError('n is required.');
          }
          if (maximumValue <= minimumValue) {
              throw new Check.DeveloperError('maximumValue must be greater than minimumValue.');
          }
          //>>includeEnd('debug');

          ++n;
          if (n > maximumValue) {
              n = minimumValue;
          }
          return n;
      };

      /**
       * Determines if a positive integer is a power of two.
       *
       * @param {Number} n The positive integer to test.
       * @returns {Boolean} <code>true</code> if the number if a power of two; otherwise, <code>false</code>.
       *
       * @exception {DeveloperError} A number greater than or equal to 0 is required.
       *
       * @example
       * var t = Cesium.Math.isPowerOfTwo(16); // true
       * var f = Cesium.Math.isPowerOfTwo(20); // false
       */
      CesiumMath.isPowerOfTwo = function(n) {
          //>>includeStart('debug', pragmas.debug);
          if (typeof n !== 'number' || n < 0) {
              throw new Check.DeveloperError('A number greater than or equal to 0 is required.');
          }
          //>>includeEnd('debug');

          return (n !== 0) && ((n & (n - 1)) === 0);
      };

      /**
       * Computes the next power-of-two integer greater than or equal to the provided positive integer.
       *
       * @param {Number} n The positive integer to test.
       * @returns {Number} The next power-of-two integer.
       *
       * @exception {DeveloperError} A number greater than or equal to 0 is required.
       *
       * @example
       * var n = Cesium.Math.nextPowerOfTwo(29); // 32
       * var m = Cesium.Math.nextPowerOfTwo(32); // 32
       */
      CesiumMath.nextPowerOfTwo = function(n) {
          //>>includeStart('debug', pragmas.debug);
          if (typeof n !== 'number' || n < 0) {
              throw new Check.DeveloperError('A number greater than or equal to 0 is required.');
          }
          //>>includeEnd('debug');

          // From http://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
          --n;
          n |= n >> 1;
          n |= n >> 2;
          n |= n >> 4;
          n |= n >> 8;
          n |= n >> 16;
          ++n;

          return n;
      };

      /**
       * Constraint a value to lie between two values.
       *
       * @param {Number} value The value to constrain.
       * @param {Number} min The minimum value.
       * @param {Number} max The maximum value.
       * @returns {Number} The value clamped so that min <= value <= max.
       */
      CesiumMath.clamp = function(value, min, max) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(value)) {
              throw new Check.DeveloperError('value is required');
          }
          if (!when.defined(min)) {
              throw new Check.DeveloperError('min is required.');
          }
          if (!when.defined(max)) {
              throw new Check.DeveloperError('max is required.');
          }
          //>>includeEnd('debug');
          return value < min ? min : value > max ? max : value;
      };

      var randomNumberGenerator = new MersenneTwister();

      /**
       * Sets the seed used by the random number generator
       * in {@link CesiumMath#nextRandomNumber}.
       *
       * @param {Number} seed An integer used as the seed.
       */
      CesiumMath.setRandomNumberSeed = function(seed) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(seed)) {
              throw new Check.DeveloperError('seed is required.');
          }
          //>>includeEnd('debug');

          randomNumberGenerator = new MersenneTwister(seed);
      };

      /**
       * Generates a random floating point number in the range of [0.0, 1.0)
       * using a Mersenne twister.
       *
       * @returns {Number} A random number in the range of [0.0, 1.0).
       *
       * @see CesiumMath.setRandomNumberSeed
       * @see {@link http://en.wikipedia.org/wiki/Mersenne_twister|Mersenne twister on Wikipedia}
       */
      CesiumMath.nextRandomNumber = function() {
          return randomNumberGenerator.random();
      };

      /**
       * Generates a random number between two numbers.
       *
       * @param {Number} min The minimum value.
       * @param {Number} max The maximum value.
       * @returns {Number} A random number between the min and max.
       */
      CesiumMath.randomBetween = function(min, max) {
          return CesiumMath.nextRandomNumber() * (max - min) + min;
      };

      /**
       * Computes <code>Math.acos(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
       * so that the function will never return NaN.
       *
       * @param {Number} value The value for which to compute acos.
       * @returns {Number} The acos of the value if the value is in the range [-1.0, 1.0], or the acos of -1.0 or 1.0,
       *          whichever is closer, if the value is outside the range.
       */
      CesiumMath.acosClamped = function(value) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(value)) {
              throw new Check.DeveloperError('value is required.');
          }
          //>>includeEnd('debug');
          return Math.acos(CesiumMath.clamp(value, -1.0, 1.0));
      };

      /**
       * Computes <code>Math.asin(value)</code>, but first clamps <code>value</code> to the range [-1.0, 1.0]
       * so that the function will never return NaN.
       *
       * @param {Number} value The value for which to compute asin.
       * @returns {Number} The asin of the value if the value is in the range [-1.0, 1.0], or the asin of -1.0 or 1.0,
       *          whichever is closer, if the value is outside the range.
       */
      CesiumMath.asinClamped = function(value) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(value)) {
              throw new Check.DeveloperError('value is required.');
          }
          //>>includeEnd('debug');
          return Math.asin(CesiumMath.clamp(value, -1.0, 1.0));
      };

      /**
       * Finds the chord length between two points given the circle's radius and the angle between the points.
       *
       * @param {Number} angle The angle between the two points.
       * @param {Number} radius The radius of the circle.
       * @returns {Number} The chord length.
       */
      CesiumMath.chordLength = function(angle, radius) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(angle)) {
              throw new Check.DeveloperError('angle is required.');
          }
          if (!when.defined(radius)) {
              throw new Check.DeveloperError('radius is required.');
          }
          //>>includeEnd('debug');
          return 2.0 * radius * Math.sin(angle * 0.5);
      };

      /**
       * Finds the logarithm of a number to a base.
       *
       * @param {Number} number The number.
       * @param {Number} base The base.
       * @returns {Number} The result.
       */
      CesiumMath.logBase = function(number, base) {
          //>>includeStart('debug', pragmas.debug);
          if (!when.defined(number)) {
              throw new Check.DeveloperError('number is required.');
          }
          if (!when.defined(base)) {
              throw new Check.DeveloperError('base is required.');
          }
          //>>includeEnd('debug');
          return Math.log(number) / Math.log(base);
      };

      /**
       * Finds the cube root of a number.
       * Returns NaN if <code>number</code> is not provided.
       *
       * @function
       * @param {Number} [number] The number.
       * @returns {Number} The result.
       */
      CesiumMath.cbrt = when.defaultValue(Math.cbrt, function cbrt(number) {
          var result = Math.pow(Math.abs(number), 1.0 / 3.0);
          return number < 0.0 ? -result : result;
      });

      /**
       * Finds the base 2 logarithm of a number.
       *
       * @function
       * @param {Number} number The number.
       * @returns {Number} The result.
       */
      CesiumMath.log2 = when.defaultValue(Math.log2, function log2(number) {
          return Math.log(number) * Math.LOG2E;
      });

      /**
       * @private
       */
      CesiumMath.fog = function(distanceToCamera, density) {
          var scalar = distanceToCamera * density;
          return 1.0 - Math.exp(-(scalar * scalar));
      };

      /**
       * Computes a fast approximation of Atan for input in the range [-1, 1].
       *
       * Based on Michal Drobot's approximation from ShaderFastLibs,
       * which in turn is based on "Efficient approximations for the arctangent function,"
       * Rajan, S. Sichun Wang Inkol, R. Joyal, A., May 2006.
       * Adapted from ShaderFastLibs under MIT License.
       *
       * @param {Number} x An input number in the range [-1, 1]
       * @returns {Number} An approximation of atan(x)
       */
      CesiumMath.fastApproximateAtan = function(x) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.number('x', x);
          //>>includeEnd('debug');

          return x * (-0.1784 * Math.abs(x) - 0.0663 * x * x + 1.0301);
      };

      /**
       * Computes a fast approximation of Atan2(x, y) for arbitrary input scalars.
       *
       * Range reduction math based on nvidia's cg reference implementation: http://developer.download.nvidia.com/cg/atan2.html
       *
       * @param {Number} x An input number that isn't zero if y is zero.
       * @param {Number} y An input number that isn't zero if x is zero.
       * @returns {Number} An approximation of atan2(x, y)
       */
      CesiumMath.fastApproximateAtan2 = function(x, y) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.number('x', x);
          Check.Check.typeOf.number('y', y);
          //>>includeEnd('debug');

          // atan approximations are usually only reliable over [-1, 1]
          // So reduce the range by flipping whether x or y is on top based on which is bigger.
          var opposite;
          var adjacent;
          var t = Math.abs(x); // t used as swap and atan result.
          opposite = Math.abs(y);
          adjacent = Math.max(t, opposite);
          opposite = Math.min(t, opposite);

          var oppositeOverAdjacent = opposite / adjacent;
          //>>includeStart('debug', pragmas.debug);
          if (isNaN(oppositeOverAdjacent)) {
              throw new Check.DeveloperError('either x or y must be nonzero');
          }
          //>>includeEnd('debug');
          t = CesiumMath.fastApproximateAtan(oppositeOverAdjacent);

          // Undo range reduction
          t = Math.abs(y) > Math.abs(x) ? CesiumMath.PI_OVER_TWO - t : t;
          t = x < 0.0 ?  CesiumMath.PI - t : t;
          t = y < 0.0 ? -t : t;
          return t;
      };

  /**
       * A 3D Cartesian point.
       * @alias Cartesian3
       * @constructor
       *
       * @param {Number} [x=0.0] The X component.
       * @param {Number} [y=0.0] The Y component.
       * @param {Number} [z=0.0] The Z component.
       *
       * @see Cartesian2
       * @see Cartesian4
       * @see Packable
       */
      function Cartesian3(x, y, z) {
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

          /**
           * The Z component.
           * @type {Number}
           * @default 0.0
           */
          this.z = when.defaultValue(z, 0.0);
      }

      /**
       * Converts the provided Spherical into Cartesian3 coordinates.
       *
       * @param {Spherical} spherical The Spherical to be converted to Cartesian3.
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
       */
      Cartesian3.fromSpherical = function(spherical, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('spherical', spherical);
          //>>includeEnd('debug');

          if (!when.defined(result)) {
              result = new Cartesian3();
          }

          var clock = spherical.clock;
          var cone = spherical.cone;
          var magnitude = when.defaultValue(spherical.magnitude, 1.0);
          var radial = magnitude * Math.sin(cone);
          result.x = radial * Math.cos(clock);
          result.y = radial * Math.sin(clock);
          result.z = magnitude * Math.cos(cone);
          return result;
      };

      /**
       * Creates a Cartesian3 instance from x, y and z coordinates.
       *
       * @param {Number} x The x coordinate.
       * @param {Number} y The y coordinate.
       * @param {Number} z The z coordinate.
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
       */
      Cartesian3.fromElements = function(x, y, z, result) {
          if (!when.defined(result)) {
              return new Cartesian3(x, y, z);
          }

          result.x = x;
          result.y = y;
          result.z = z;
          return result;
      };

      /**
       * Duplicates a Cartesian3 instance.
       *
       * @param {Cartesian3} cartesian The Cartesian to duplicate.
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided. (Returns undefined if cartesian is undefined)
       */
      Cartesian3.clone = function(cartesian, result) {
          if (!when.defined(cartesian)) {
              return undefined;
          }
          if (!when.defined(result)) {
              return new Cartesian3(cartesian.x, cartesian.y, cartesian.z);
          }

          result.x = cartesian.x;
          result.y = cartesian.y;
          result.z = cartesian.z;
          return result;
      };

      /**
       * Creates a Cartesian3 instance from an existing Cartesian4.  This simply takes the
       * x, y, and z properties of the Cartesian4 and drops w.
       * @function
       *
       * @param {Cartesian4} cartesian The Cartesian4 instance to create a Cartesian3 instance from.
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
       */
      Cartesian3.fromCartesian4 = Cartesian3.clone;

      /**
       * The number of elements used to pack the object into an array.
       * @type {Number}
       */
      Cartesian3.packedLength = 3;

      /**
       * Stores the provided instance into the provided array.
       *
       * @param {Cartesian3} value The value to pack.
       * @param {Number[]} array The array to pack into.
       * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
       *
       * @returns {Number[]} The array that was packed into
       */
      Cartesian3.pack = function(value, array, startingIndex) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('value', value);
          Check.Check.defined('array', array);
          //>>includeEnd('debug');

          startingIndex = when.defaultValue(startingIndex, 0);

          array[startingIndex++] = value.x;
          array[startingIndex++] = value.y;
          array[startingIndex] = value.z;

          return array;
      };

      /**
       * Retrieves an instance from a packed array.
       *
       * @param {Number[]} array The packed array.
       * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
       * @param {Cartesian3} [result] The object into which to store the result.
       * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
       */
      Cartesian3.unpack = function(array, startingIndex, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('array', array);
          //>>includeEnd('debug');

          startingIndex = when.defaultValue(startingIndex, 0);

          if (!when.defined(result)) {
              result = new Cartesian3();
          }
          result.x = array[startingIndex++];
          result.y = array[startingIndex++];
          result.z = array[startingIndex];
          return result;
      };

      /**
       * Flattens an array of Cartesian3s into an array of components.
       *
       * @param {Cartesian3[]} array The array of cartesians to pack.
       * @param {Number[]} [result] The array onto which to store the result. If this is a typed array, it must have array.length * 3 components, else a {@link DeveloperError} will be thrown. If it is a regular array, it will be resized to have (array.length * 3) elements.
       * @returns {Number[]} The packed array.
       */
      Cartesian3.packArray = function(array, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('array', array);
          //>>includeEnd('debug');

          var length = array.length;
          var resultLength = length * 3;
          if (!when.defined(result)) {
              result = new Array(resultLength);
          } else if (!Array.isArray(result) && result.length !== resultLength) {
              throw new Check.DeveloperError('If result is a typed array, it must have exactly array.length * 3 elements');
          } else if (result.length !== resultLength) {
              result.length = resultLength;
          }

          for (var i = 0; i < length; ++i) {
              Cartesian3.pack(array[i], result, i * 3);
          }
          return result;
      };

      /**
       * Unpacks an array of cartesian components into an array of Cartesian3s.
       *
       * @param {Number[]} array The array of components to unpack.
       * @param {Cartesian3[]} [result] The array onto which to store the result.
       * @returns {Cartesian3[]} The unpacked array.
       */
      Cartesian3.unpackArray = function(array, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('array', array);
          Check.Check.typeOf.number.greaterThanOrEquals('array.length', array.length, 3);
          if (array.length % 3 !== 0) {
              throw new Check.DeveloperError('array length must be a multiple of 3.');
          }
          //>>includeEnd('debug');

          var length = array.length;
          if (!when.defined(result)) {
              result = new Array(length / 3);
          } else {
              result.length = length / 3;
          }

          for (var i = 0; i < length; i += 3) {
              var index = i / 3;
              result[index] = Cartesian3.unpack(array, i, result[index]);
          }
          return result;
      };

      /**
       * Creates a Cartesian3 from three consecutive elements in an array.
       * @function
       *
       * @param {Number[]} array The array whose three consecutive elements correspond to the x, y, and z components, respectively.
       * @param {Number} [startingIndex=0] The offset into the array of the first element, which corresponds to the x component.
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
       *
       * @example
       * // Create a Cartesian3 with (1.0, 2.0, 3.0)
       * var v = [1.0, 2.0, 3.0];
       * var p = Cesium.Cartesian3.fromArray(v);
       *
       * // Create a Cartesian3 with (1.0, 2.0, 3.0) using an offset into an array
       * var v2 = [0.0, 0.0, 1.0, 2.0, 3.0];
       * var p2 = Cesium.Cartesian3.fromArray(v2, 2);
       */
      Cartesian3.fromArray = Cartesian3.unpack;

      /**
       * Computes the value of the maximum component for the supplied Cartesian.
       *
       * @param {Cartesian3} cartesian The cartesian to use.
       * @returns {Number} The value of the maximum component.
       */
      Cartesian3.maximumComponent = function(cartesian) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          //>>includeEnd('debug');

          return Math.max(cartesian.x, cartesian.y, cartesian.z);
      };

      /**
       * Computes the value of the minimum component for the supplied Cartesian.
       *
       * @param {Cartesian3} cartesian The cartesian to use.
       * @returns {Number} The value of the minimum component.
       */
      Cartesian3.minimumComponent = function(cartesian) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          //>>includeEnd('debug');

          return Math.min(cartesian.x, cartesian.y, cartesian.z);
      };

      /**
       * Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.
       *
       * @param {Cartesian3} first A cartesian to compare.
       * @param {Cartesian3} second A cartesian to compare.
       * @param {Cartesian3} result The object into which to store the result.
       * @returns {Cartesian3} A cartesian with the minimum components.
       */
      Cartesian3.minimumByComponent = function(first, second, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('first', first);
          Check.Check.typeOf.object('second', second);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = Math.min(first.x, second.x);
          result.y = Math.min(first.y, second.y);
          result.z = Math.min(first.z, second.z);

          return result;
      };

      /**
       * Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.
       *
       * @param {Cartesian3} first A cartesian to compare.
       * @param {Cartesian3} second A cartesian to compare.
       * @param {Cartesian3} result The object into which to store the result.
       * @returns {Cartesian3} A cartesian with the maximum components.
       */
      Cartesian3.maximumByComponent = function(first, second, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('first', first);
          Check.Check.typeOf.object('second', second);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = Math.max(first.x, second.x);
          result.y = Math.max(first.y, second.y);
          result.z = Math.max(first.z, second.z);
          return result;
      };

      /**
       * Computes the provided Cartesian's squared magnitude.
       *
       * @param {Cartesian3} cartesian The Cartesian instance whose squared magnitude is to be computed.
       * @returns {Number} The squared magnitude.
       */
      Cartesian3.magnitudeSquared = function(cartesian) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          //>>includeEnd('debug');

          return cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z;
      };

      /**
       * Computes the Cartesian's magnitude (length).
       *
       * @param {Cartesian3} cartesian The Cartesian instance whose magnitude is to be computed.
       * @returns {Number} The magnitude.
       */
      Cartesian3.magnitude = function(cartesian) {
          return Math.sqrt(Cartesian3.magnitudeSquared(cartesian));
      };

      var distanceScratch = new Cartesian3();

      /**
       * Computes the distance between two points.
       *
       * @param {Cartesian3} left The first point to compute the distance from.
       * @param {Cartesian3} right The second point to compute the distance to.
       * @returns {Number} The distance between two points.
       *
       * @example
       * // Returns 1.0
       * var d = Cesium.Cartesian3.distance(new Cesium.Cartesian3(1.0, 0.0, 0.0), new Cesium.Cartesian3(2.0, 0.0, 0.0));
       */
      Cartesian3.distance = function(left, right) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          //>>includeEnd('debug');

          Cartesian3.subtract(left, right, distanceScratch);
          return Cartesian3.magnitude(distanceScratch);
      };

      /**
       * Computes the squared distance between two points.  Comparing squared distances
       * using this function is more efficient than comparing distances using {@link Cartesian3#distance}.
       *
       * @param {Cartesian3} left The first point to compute the distance from.
       * @param {Cartesian3} right The second point to compute the distance to.
       * @returns {Number} The distance between two points.
       *
       * @example
       * // Returns 4.0, not 2.0
       * var d = Cesium.Cartesian3.distanceSquared(new Cesium.Cartesian3(1.0, 0.0, 0.0), new Cesium.Cartesian3(3.0, 0.0, 0.0));
       */
      Cartesian3.distanceSquared = function(left, right) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          //>>includeEnd('debug');

          Cartesian3.subtract(left, right, distanceScratch);
          return Cartesian3.magnitudeSquared(distanceScratch);
      };

      /**
       * Computes the normalized form of the supplied Cartesian.
       *
       * @param {Cartesian3} cartesian The Cartesian to be normalized.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.normalize = function(cartesian, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          var magnitude = Cartesian3.magnitude(cartesian);

          result.x = cartesian.x / magnitude;
          result.y = cartesian.y / magnitude;
          result.z = cartesian.z / magnitude;

          //>>includeStart('debug', pragmas.debug);
          if (isNaN(result.x) || isNaN(result.y) || isNaN(result.z)) {
              throw new Check.DeveloperError('normalized result is not a number');
          }
          //>>includeEnd('debug');

          return result;
      };

      /**
       * Computes the dot (scalar) product of two Cartesians.
       *
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @returns {Number} The dot product.
       */
      Cartesian3.dot = function(left, right) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          //>>includeEnd('debug');

          return left.x * right.x + left.y * right.y + left.z * right.z;
      };

      /**
       * Computes the componentwise product of two Cartesians.
       *
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.multiplyComponents = function(left, right, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = left.x * right.x;
          result.y = left.y * right.y;
          result.z = left.z * right.z;
          return result;
      };

      /**
       * Computes the componentwise quotient of two Cartesians.
       *
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.divideComponents = function(left, right, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = left.x / right.x;
          result.y = left.y / right.y;
          result.z = left.z / right.z;
          return result;
      };

      /**
       * Computes the componentwise sum of two Cartesians.
       *
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.add = function(left, right, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = left.x + right.x;
          result.y = left.y + right.y;
          result.z = left.z + right.z;
          return result;
      };

      /**
       * Computes the componentwise difference of two Cartesians.
       *
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.subtract = function(left, right, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = left.x - right.x;
          result.y = left.y - right.y;
          result.z = left.z - right.z;
          return result;
      };

      /**
       * Multiplies the provided Cartesian componentwise by the provided scalar.
       *
       * @param {Cartesian3} cartesian The Cartesian to be scaled.
       * @param {Number} scalar The scalar to multiply with.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.multiplyByScalar = function(cartesian, scalar, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          Check.Check.typeOf.number('scalar', scalar);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = cartesian.x * scalar;
          result.y = cartesian.y * scalar;
          result.z = cartesian.z * scalar;
          return result;
      };

      /**
       * Divides the provided Cartesian componentwise by the provided scalar.
       *
       * @param {Cartesian3} cartesian The Cartesian to be divided.
       * @param {Number} scalar The scalar to divide by.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.divideByScalar = function(cartesian, scalar, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          Check.Check.typeOf.number('scalar', scalar);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = cartesian.x / scalar;
          result.y = cartesian.y / scalar;
          result.z = cartesian.z / scalar;
          return result;
      };

      /**
       * Negates the provided Cartesian.
       *
       * @param {Cartesian3} cartesian The Cartesian to be negated.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.negate = function(cartesian, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = -cartesian.x;
          result.y = -cartesian.y;
          result.z = -cartesian.z;
          return result;
      };

      /**
       * Computes the absolute value of the provided Cartesian.
       *
       * @param {Cartesian3} cartesian The Cartesian whose absolute value is to be computed.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.abs = function(cartesian, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = Math.abs(cartesian.x);
          result.y = Math.abs(cartesian.y);
          result.z = Math.abs(cartesian.z);
          return result;
      };

      var lerpScratch = new Cartesian3();
      /**
       * Computes the linear interpolation or extrapolation at t using the provided cartesians.
       *
       * @param {Cartesian3} start The value corresponding to t at 0.0.
       * @param {Cartesian3} end The value corresponding to t at 1.0.
       * @param {Number} t The point along t at which to interpolate.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter.
       */
      Cartesian3.lerp = function(start, end, t, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('start', start);
          Check.Check.typeOf.object('end', end);
          Check.Check.typeOf.number('t', t);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          Cartesian3.multiplyByScalar(end, t, lerpScratch);
          result = Cartesian3.multiplyByScalar(start, 1.0 - t, result);
          return Cartesian3.add(lerpScratch, result, result);
      };

      var angleBetweenScratch = new Cartesian3();
      var angleBetweenScratch2 = new Cartesian3();
      /**
       * Returns the angle, in radians, between the provided Cartesians.
       *
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @returns {Number} The angle between the Cartesians.
       */
      Cartesian3.angleBetween = function(left, right) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          //>>includeEnd('debug');

          Cartesian3.normalize(left, angleBetweenScratch);
          Cartesian3.normalize(right, angleBetweenScratch2);
          var cosine = Cartesian3.dot(angleBetweenScratch, angleBetweenScratch2);
          var sine = Cartesian3.magnitude(Cartesian3.cross(angleBetweenScratch, angleBetweenScratch2, angleBetweenScratch));
          return Math.atan2(sine, cosine);
      };

      var mostOrthogonalAxisScratch = new Cartesian3();
      /**
       * Returns the axis that is most orthogonal to the provided Cartesian.
       *
       * @param {Cartesian3} cartesian The Cartesian on which to find the most orthogonal axis.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The most orthogonal axis.
       */
      Cartesian3.mostOrthogonalAxis = function(cartesian, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('cartesian', cartesian);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          var f = Cartesian3.normalize(cartesian, mostOrthogonalAxisScratch);
          Cartesian3.abs(f, f);

          if (f.x <= f.y) {
              if (f.x <= f.z) {
                  result = Cartesian3.clone(Cartesian3.UNIT_X, result);
              } else {
                  result = Cartesian3.clone(Cartesian3.UNIT_Z, result);
              }
          } else if (f.y <= f.z) {
              result = Cartesian3.clone(Cartesian3.UNIT_Y, result);
          } else {
              result = Cartesian3.clone(Cartesian3.UNIT_Z, result);
          }

          return result;
      };

      /**
       * Projects vector a onto vector b
       * @param {Cartesian3} a The vector that needs projecting
       * @param {Cartesian3} b The vector to project onto
       * @param {Cartesian3} result The result cartesian
       * @returns {Cartesian3} The modified result parameter
       */
      Cartesian3.projectVector = function(a, b, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('a', a);
          Check.Check.defined('b', b);
          Check.Check.defined('result', result);
          //>>includeEnd('debug');

          var scalar = Cartesian3.dot(a, b) / Cartesian3.dot(b, b);
          return Cartesian3.multiplyByScalar(b, scalar, result);
      };

      /**
       * Compares the provided Cartesians componentwise and returns
       * <code>true</code> if they are equal, <code>false</code> otherwise.
       *
       * @param {Cartesian3} [left] The first Cartesian.
       * @param {Cartesian3} [right] The second Cartesian.
       * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
       */
      Cartesian3.equals = function(left, right) {
              return (left === right) ||
                ((when.defined(left)) &&
                 (when.defined(right)) &&
                 (left.x === right.x) &&
                 (left.y === right.y) &&
                 (left.z === right.z));
      };

      /**
       * @private
       */
      Cartesian3.equalsArray = function(cartesian, array, offset) {
          return cartesian.x === array[offset] &&
                 cartesian.y === array[offset + 1] &&
                 cartesian.z === array[offset + 2];
      };

      /**
       * Compares the provided Cartesians componentwise and returns
       * <code>true</code> if they pass an absolute or relative tolerance test,
       * <code>false</code> otherwise.
       *
       * @param {Cartesian3} [left] The first Cartesian.
       * @param {Cartesian3} [right] The second Cartesian.
       * @param {Number} relativeEpsilon The relative epsilon tolerance to use for equality testing.
       * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
       * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
       */
      Cartesian3.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
          return (left === right) ||
                 (when.defined(left) &&
                  when.defined(right) &&
                  CesiumMath.equalsEpsilon(left.x, right.x, relativeEpsilon, absoluteEpsilon) &&
                  CesiumMath.equalsEpsilon(left.y, right.y, relativeEpsilon, absoluteEpsilon) &&
                  CesiumMath.equalsEpsilon(left.z, right.z, relativeEpsilon, absoluteEpsilon));
      };

      /**
       * Computes the cross (outer) product of two Cartesians.
       *
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The cross product.
       */
      Cartesian3.cross = function(left, right, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          var leftX = left.x;
          var leftY = left.y;
          var leftZ = left.z;
          var rightX = right.x;
          var rightY = right.y;
          var rightZ = right.z;

          var x = leftY * rightZ - leftZ * rightY;
          var y = leftZ * rightX - leftX * rightZ;
          var z = leftX * rightY - leftY * rightX;

          result.x = x;
          result.y = y;
          result.z = z;
          return result;
      };

      /**
       * Computes the midpoint between the right and left Cartesian.
       * @param {Cartesian3} left The first Cartesian.
       * @param {Cartesian3} right The second Cartesian.
       * @param {Cartesian3} result The object onto which to store the result.
       * @returns {Cartesian3} The midpoint.
       */
      Cartesian3.midpoint = function(left, right, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.object('left', left);
          Check.Check.typeOf.object('right', right);
          Check.Check.typeOf.object('result', result);
          //>>includeEnd('debug');

          result.x = (left.x + right.x) * 0.5;
          result.y = (left.y + right.y) * 0.5;
          result.z = (left.z + right.z) * 0.5;

          return result;
      };

      /**
       * Returns a Cartesian3 position from longitude and latitude values given in degrees.
       *
       * @param {Number} longitude The longitude, in degrees
       * @param {Number} latitude The latitude, in degrees
       * @param {Number} [height=0.0] The height, in meters, above the ellipsoid.
       * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the position lies.
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The position
       *
       * @example
       * var position = Cesium.Cartesian3.fromDegrees(-115.0, 37.0);
       */
      Cartesian3.fromDegrees = function(longitude, latitude, height, ellipsoid, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.number('longitude', longitude);
          Check.Check.typeOf.number('latitude', latitude);
          //>>includeEnd('debug');

          longitude = CesiumMath.toRadians(longitude);
          latitude = CesiumMath.toRadians(latitude);
          return Cartesian3.fromRadians(longitude, latitude, height, ellipsoid, result);
      };

      var scratchN = new Cartesian3();
      var scratchK = new Cartesian3();
      var wgs84RadiiSquared = new Cartesian3(6378137.0 * 6378137.0, 6378137.0 * 6378137.0, 6356752.3142451793 * 6356752.3142451793);

      /**
       * Returns a Cartesian3 position from longitude and latitude values given in radians.
       *
       * @param {Number} longitude The longitude, in radians
       * @param {Number} latitude The latitude, in radians
       * @param {Number} [height=0.0] The height, in meters, above the ellipsoid.
       * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the position lies.
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The position
       *
       * @example
       * var position = Cesium.Cartesian3.fromRadians(-2.007, 0.645);
       */
      Cartesian3.fromRadians = function(longitude, latitude, height, ellipsoid, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.typeOf.number('longitude', longitude);
          Check.Check.typeOf.number('latitude', latitude);
          //>>includeEnd('debug');

          height = when.defaultValue(height, 0.0);
          var radiiSquared = when.defined(ellipsoid) ? ellipsoid.radiiSquared : wgs84RadiiSquared;

          var cosLatitude = Math.cos(latitude);
          scratchN.x = cosLatitude * Math.cos(longitude);
          scratchN.y = cosLatitude * Math.sin(longitude);
          scratchN.z = Math.sin(latitude);
          scratchN = Cartesian3.normalize(scratchN, scratchN);

          Cartesian3.multiplyComponents(radiiSquared, scratchN, scratchK);
          var gamma = Math.sqrt(Cartesian3.dot(scratchN, scratchK));
          scratchK = Cartesian3.divideByScalar(scratchK, gamma, scratchK);
          scratchN = Cartesian3.multiplyByScalar(scratchN, height, scratchN);

          if (!when.defined(result)) {
              result = new Cartesian3();
          }
          return Cartesian3.add(scratchK, scratchN, result);
      };

      /**
       * Returns an array of Cartesian3 positions given an array of longitude and latitude values given in degrees.
       *
       * @param {Number[]} coordinates A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].
       * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the coordinates lie.
       * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
       * @returns {Cartesian3[]} The array of positions.
       *
       * @example
       * var positions = Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0, -107.0, 33.0]);
       */
      Cartesian3.fromDegreesArray = function(coordinates, ellipsoid, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('coordinates', coordinates);
          if (coordinates.length < 2 || coordinates.length % 2 !== 0) {
              throw new Check.DeveloperError('the number of coordinates must be a multiple of 2 and at least 2');
          }
          //>>includeEnd('debug');

          var length = coordinates.length;
          if (!when.defined(result)) {
              result = new Array(length / 2);
          } else {
              result.length = length / 2;
          }

          for (var i = 0; i < length; i += 2) {
              var longitude = coordinates[i];
              var latitude = coordinates[i + 1];
              var index = i / 2;
              result[index] = Cartesian3.fromDegrees(longitude, latitude, 0, ellipsoid, result[index]);
          }

          return result;
      };

      /**
       * Returns an array of Cartesian3 positions given an array of longitude and latitude values given in radians.
       *
       * @param {Number[]} coordinates A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].
       * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the coordinates lie.
       * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
       * @returns {Cartesian3[]} The array of positions.
       *
       * @example
       * var positions = Cesium.Cartesian3.fromRadiansArray([-2.007, 0.645, -1.867, .575]);
       */
      Cartesian3.fromRadiansArray = function(coordinates, ellipsoid, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('coordinates', coordinates);
          if (coordinates.length < 2 || coordinates.length % 2 !== 0) {
              throw new Check.DeveloperError('the number of coordinates must be a multiple of 2 and at least 2');
          }
          //>>includeEnd('debug');

          var length = coordinates.length;
          if (!when.defined(result)) {
              result = new Array(length / 2);
          } else {
              result.length = length / 2;
          }

          for (var i = 0; i < length; i += 2) {
              var longitude = coordinates[i];
              var latitude = coordinates[i + 1];
              var index = i / 2;
              result[index] = Cartesian3.fromRadians(longitude, latitude, 0, ellipsoid, result[index]);
          }

          return result;
      };

      /**
       * Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in degrees.
       *
       * @param {Number[]} coordinates A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].
       * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the position lies.
       * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
       * @returns {Cartesian3[]} The array of positions.
       *
       * @example
       * var positions = Cesium.Cartesian3.fromDegreesArrayHeights([-115.0, 37.0, 100000.0, -107.0, 33.0, 150000.0]);
       */
      Cartesian3.fromDegreesArrayHeights = function(coordinates, ellipsoid, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('coordinates', coordinates);
          if (coordinates.length < 3 || coordinates.length % 3 !== 0) {
              throw new Check.DeveloperError('the number of coordinates must be a multiple of 3 and at least 3');
          }
          //>>includeEnd('debug');

          var length = coordinates.length;
          if (!when.defined(result)) {
              result = new Array(length / 3);
          } else {
              result.length = length / 3;
          }

          for (var i = 0; i < length; i += 3) {
              var longitude = coordinates[i];
              var latitude = coordinates[i + 1];
              var height = coordinates[i + 2];
              var index = i / 3;
              result[index] = Cartesian3.fromDegrees(longitude, latitude, height, ellipsoid, result[index]);
          }

          return result;
      };

      /**
       * Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in radians.
       *
       * @param {Number[]} coordinates A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].
       * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the position lies.
       * @param {Cartesian3[]} [result] An array of Cartesian3 objects to store the result.
       * @returns {Cartesian3[]} The array of positions.
       *
       * @example
       * var positions = Cesium.Cartesian3.fromRadiansArrayHeights([-2.007, 0.645, 100000.0, -1.867, .575, 150000.0]);
       */
      Cartesian3.fromRadiansArrayHeights = function(coordinates, ellipsoid, result) {
          //>>includeStart('debug', pragmas.debug);
          Check.Check.defined('coordinates', coordinates);
          if (coordinates.length < 3 || coordinates.length % 3 !== 0) {
              throw new Check.DeveloperError('the number of coordinates must be a multiple of 3 and at least 3');
          }
          //>>includeEnd('debug');

          var length = coordinates.length;
          if (!when.defined(result)) {
              result = new Array(length / 3);
          } else {
              result.length = length / 3;
          }

          for (var i = 0; i < length; i += 3) {
              var longitude = coordinates[i];
              var latitude = coordinates[i + 1];
              var height = coordinates[i + 2];
              var index = i / 3;
              result[index] = Cartesian3.fromRadians(longitude, latitude, height, ellipsoid, result[index]);
          }

          return result;
      };

      /**
       * An immutable Cartesian3 instance initialized to (0.0, 0.0, 0.0).
       *
       * @type {Cartesian3}
       * @constant
       */
      Cartesian3.ZERO = Object.freeze(new Cartesian3(0.0, 0.0, 0.0));

      /**
       * An immutable Cartesian3 instance initialized to (1.0, 0.0, 0.0).
       *
       * @type {Cartesian3}
       * @constant
       */
      Cartesian3.UNIT_X = Object.freeze(new Cartesian3(1.0, 0.0, 0.0));

      /**
       * An immutable Cartesian3 instance initialized to (0.0, 1.0, 0.0).
       *
       * @type {Cartesian3}
       * @constant
       */
      Cartesian3.UNIT_Y = Object.freeze(new Cartesian3(0.0, 1.0, 0.0));

      /**
       * An immutable Cartesian3 instance initialized to (0.0, 0.0, 1.0).
       *
       * @type {Cartesian3}
       * @constant
       */
      Cartesian3.UNIT_Z = Object.freeze(new Cartesian3(0.0, 0.0, 1.0));

      /**
       * Duplicates this Cartesian3 instance.
       *
       * @param {Cartesian3} [result] The object onto which to store the result.
       * @returns {Cartesian3} The modified result parameter or a new Cartesian3 instance if one was not provided.
       */
      Cartesian3.prototype.clone = function(result) {
          return Cartesian3.clone(this, result);
      };

      /**
       * Compares this Cartesian against the provided Cartesian componentwise and returns
       * <code>true</code> if they are equal, <code>false</code> otherwise.
       *
       * @param {Cartesian3} [right] The right hand side Cartesian.
       * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
       */
      Cartesian3.prototype.equals = function(right) {
          return Cartesian3.equals(this, right);
      };

      /**
       * Compares this Cartesian against the provided Cartesian componentwise and returns
       * <code>true</code> if they pass an absolute or relative tolerance test,
       * <code>false</code> otherwise.
       *
       * @param {Cartesian3} [right] The right hand side Cartesian.
       * @param {Number} relativeEpsilon The relative epsilon tolerance to use for equality testing.
       * @param {Number} [absoluteEpsilon=relativeEpsilon] The absolute epsilon tolerance to use for equality testing.
       * @returns {Boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
       */
      Cartesian3.prototype.equalsEpsilon = function(right, relativeEpsilon, absoluteEpsilon) {
          return Cartesian3.equalsEpsilon(this, right, relativeEpsilon, absoluteEpsilon);
      };

      /**
       * Creates a string representing this Cartesian in the format '(x, y, z)'.
       *
       * @returns {String} A string representing this Cartesian in the format '(x, y, z)'.
       */
      Cartesian3.prototype.toString = function() {
          return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
      };

  exports.Cartesian3 = Cartesian3;
  exports.CesiumMath = CesiumMath;

});
//# sourceMappingURL=Cartesian3-18c04df5.js.map
