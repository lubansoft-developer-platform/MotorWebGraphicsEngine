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
define(["exports","./when-4ca4e419","./Check-430b3551","./FeatureDetection-0d4fee13","./WebGLConstants-2ddfa2f9"],(function(e,r,n,t,a){"use strict";var E={BYTE:a.WebGLConstants.BYTE,UNSIGNED_BYTE:a.WebGLConstants.UNSIGNED_BYTE,SHORT:a.WebGLConstants.SHORT,UNSIGNED_SHORT:a.WebGLConstants.UNSIGNED_SHORT,INT:a.WebGLConstants.INT,UNSIGNED_INT:a.WebGLConstants.UNSIGNED_INT,FLOAT:a.WebGLConstants.FLOAT,DOUBLE:a.WebGLConstants.DOUBLE,getSizeInBytes:function(e){if(!r.defined(e))throw new n.DeveloperError("value is required.");switch(e){case E.BYTE:return Int8Array.BYTES_PER_ELEMENT;case E.UNSIGNED_BYTE:return Uint8Array.BYTES_PER_ELEMENT;case E.SHORT:return Int16Array.BYTES_PER_ELEMENT;case E.UNSIGNED_SHORT:return Uint16Array.BYTES_PER_ELEMENT;case E.INT:return Int32Array.BYTES_PER_ELEMENT;case E.UNSIGNED_INT:return Uint32Array.BYTES_PER_ELEMENT;case E.FLOAT:return Float32Array.BYTES_PER_ELEMENT;case E.DOUBLE:return Float64Array.BYTES_PER_ELEMENT;default:throw new n.DeveloperError("componentDatatype is not a valid value.")}},fromTypedArray:function(e){return e instanceof Int8Array?E.BYTE:e instanceof Uint8Array?E.UNSIGNED_BYTE:e instanceof Int16Array?E.SHORT:e instanceof Uint16Array?E.UNSIGNED_SHORT:e instanceof Int32Array?E.INT:e instanceof Uint32Array?E.UNSIGNED_INT:e instanceof Float32Array?E.FLOAT:e instanceof Float64Array?E.DOUBLE:void 0},validate:function(e){return r.defined(e)&&(e===E.BYTE||e===E.UNSIGNED_BYTE||e===E.SHORT||e===E.UNSIGNED_SHORT||e===E.INT||e===E.UNSIGNED_INT||e===E.FLOAT||e===E.DOUBLE)},createTypedArray:function(e,t){if(!r.defined(e))throw new n.DeveloperError("componentDatatype is required.");if(!r.defined(t))throw new n.DeveloperError("valuesOrLength is required.");switch(e){case E.BYTE:return new Int8Array(t);case E.UNSIGNED_BYTE:return new Uint8Array(t);case E.SHORT:return new Int16Array(t);case E.UNSIGNED_SHORT:return new Uint16Array(t);case E.INT:return new Int32Array(t);case E.UNSIGNED_INT:return new Uint32Array(t);case E.FLOAT:return new Float32Array(t);case E.DOUBLE:return new Float64Array(t);default:throw new n.DeveloperError("componentDatatype is not a valid value.")}},createArrayBufferView:function(e,t,a,N){if(!r.defined(e))throw new n.DeveloperError("componentDatatype is required.");if(!r.defined(t))throw new n.DeveloperError("buffer is required.");switch(a=r.defaultValue(a,0),N=r.defaultValue(N,(t.byteLength-a)/E.getSizeInBytes(e)),e){case E.BYTE:return new Int8Array(t,a,N);case E.UNSIGNED_BYTE:return new Uint8Array(t,a,N);case E.SHORT:return new Int16Array(t,a,N);case E.UNSIGNED_SHORT:return new Uint16Array(t,a,N);case E.INT:return new Int32Array(t,a,N);case E.UNSIGNED_INT:return new Uint32Array(t,a,N);case E.FLOAT:return new Float32Array(t,a,N);case E.DOUBLE:return new Float64Array(t,a,N);default:throw new n.DeveloperError("componentDatatype is not a valid value.")}},fromName:function(e){switch(e){case"BYTE":return E.BYTE;case"UNSIGNED_BYTE":return E.UNSIGNED_BYTE;case"SHORT":return E.SHORT;case"UNSIGNED_SHORT":return E.UNSIGNED_SHORT;case"INT":return E.INT;case"UNSIGNED_INT":return E.UNSIGNED_INT;case"FLOAT":return E.FLOAT;case"DOUBLE":return E.DOUBLE;default:throw new n.DeveloperError("name is not a valid value.")}}},N=r.freezeObject(E);e.ComponentDatatype=N}));
