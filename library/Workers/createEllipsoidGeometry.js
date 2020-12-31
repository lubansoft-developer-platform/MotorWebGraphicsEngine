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

define(['./when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Ellipsoid-f29f901d', './Transforms-7fcb5ea2', './Matrix4-c68aaa66', './RuntimeError-5b606d78', './Cartesian2-e5f465dc', './WebGLConstants-30fc6f5c', './ComponentDatatype-a863af81', './GeometryAttribute-a2d75c0f', './PrimitiveType-4c1d698a', './EnvironmentVariables-cc0d0032', './GeometryAttributes-cb18da36', './IndexDatatype-571b3b65', './GeometryOffsetAttribute-5cfc2755', './VertexFormat-d75df48f', './EllipsoidGeometry-6d6f60e9'], function (when, Check, Cartesian3, Ellipsoid, Transforms, Matrix4, RuntimeError, Cartesian2, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, EnvironmentVariables, GeometryAttributes, IndexDatatype, GeometryOffsetAttribute, VertexFormat, EllipsoidGeometry) { 'use strict';

    function createEllipsoidGeometry(ellipsoidGeometry, offset) {
            if (when.defined(offset)) {
                ellipsoidGeometry = EllipsoidGeometry.EllipsoidGeometry.unpack(ellipsoidGeometry, offset);
            }
            return EllipsoidGeometry.EllipsoidGeometry.createGeometry(ellipsoidGeometry);
        }

    return createEllipsoidGeometry;

});
//# sourceMappingURL=createEllipsoidGeometry.js.map
