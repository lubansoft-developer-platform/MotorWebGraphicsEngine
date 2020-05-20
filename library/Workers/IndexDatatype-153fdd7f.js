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
define(["exports","./when-4ca4e419","./Check-430b3551","./defineProperties-163ddb68","./WebGLConstants-2ddfa2f9"],(function(e,r,n,t,i){"use strict";var E={UNSIGNED_BYTE:i.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:i.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:i.WebGLConstants.UNSIGNED_INT,getSizeInBytes:function(e){switch(e){case E.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case E.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case E.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT}throw new n.DeveloperError("indexDatatype is required and must be a valid IndexDatatype constant.")},validate:function(e){return r.defined(e)&&(e===E.UNSIGNED_BYTE||e===E.UNSIGNED_SHORT||e===E.UNSIGNED_INT)},createTypedArray:function(e,i){if(!r.defined(e))throw new n.DeveloperError("numberOfVertices is required.");return e>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(i):new Uint16Array(i)},createTypedArrayFromArrayBuffer:function(e,i,E,a){if(!r.defined(e))throw new n.DeveloperError("numberOfVertices is required.");if(!r.defined(i))throw new n.DeveloperError("sourceArray is required.");if(!r.defined(E))throw new n.DeveloperError("byteOffset is required.");return e>=t.CesiumMath.SIXTY_FOUR_KILOBYTES?new Uint32Array(i,E,a):new Uint16Array(i,E,a)}},a=r.freezeObject(E);e.IndexDatatype=a}));
