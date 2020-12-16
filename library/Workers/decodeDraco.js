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

define(['./when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Matrix4-c68aaa66', './RuntimeError-5b606d78', './WebGLConstants-30fc6f5c', './ComponentDatatype-a863af81', './PrimitiveType-4c1d698a', './IndexDatatype-571b3b65', './createTaskProcessorWorker', './CreatePhysicalArray-a5662e79'], function (when, Check, Cartesian3, Matrix4, RuntimeError, WebGLConstants, ComponentDatatype, PrimitiveType, IndexDatatype, createTaskProcessorWorker, CreatePhysicalArray) { 'use strict';

    var DracoType = {
        DRACO_COMPRESSION: 0,
        MATER_COMPRESSION: 1,//mater 压缩
        PROJECTIVE_TRANSFORM: 2,//球面投影变换
        POINT_CLOUD: 3
    };
    var DracoType$1 = Object.freeze(DracoType);

    /* global require */

    var draco;
    var physical;
    var lbSpaMgr;

    function decodeIndexArray(dracoGeometry, dracoDecoder) {
        var numPoints = dracoGeometry.num_points();
        var numFaces = dracoGeometry.num_faces();
        var faceIndices = new draco.DracoInt32Array();
        var numIndices = numFaces * 3;
        var indexArray = IndexDatatype.IndexDatatype.createTypedArray(numPoints, numIndices);

        var offset = 0;
        for (var i = 0; i < numFaces; ++i) {
            dracoDecoder.GetFaceFromMesh(dracoGeometry, i, faceIndices);

            indexArray[offset + 0] = faceIndices.GetValue(0);
            indexArray[offset + 1] = faceIndices.GetValue(1);
            indexArray[offset + 2] = faceIndices.GetValue(2);
            offset += 3;
        }

        draco.destroy(faceIndices);

        return {
            typedArray: indexArray,
            numberOfIndices: numIndices
        };
    }

    function decodeQuantizedDracoTypedArray(dracoGeometry, dracoDecoder, dracoAttribute, quantization, vertexArrayLength) {
        var vertexArray;
        var attributeData;
        if (quantization.quantizationBits <= 8) {
            attributeData = new draco.DracoUInt8Array();
            vertexArray = new Uint8Array(vertexArrayLength);
            dracoDecoder.GetAttributeUInt8ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
        } else {
            attributeData = new draco.DracoUInt16Array();
            vertexArray = new Uint16Array(vertexArrayLength);
            dracoDecoder.GetAttributeUInt16ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
        }

        for (var i = 0; i < vertexArrayLength; ++i) {
            vertexArray[i] = attributeData.GetValue(i);
        }

        draco.destroy(attributeData);
        return vertexArray;
    }

    function decodeDracoTypedArray(dracoGeometry, dracoDecoder, dracoAttribute, vertexArrayLength) {
        var vertexArray;
        var attributeData;

        // Some attribute types are casted down to 32 bit since Draco only returns 32 bit values
        switch (dracoAttribute.data_type()) {
            case 1:
            case 11: // DT_INT8 or DT_BOOL
                attributeData = new draco.DracoInt8Array();
                vertexArray = new Int8Array(vertexArrayLength);
                dracoDecoder.GetAttributeInt8ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
                break;
            case 2: // DT_UINT8
                attributeData = new draco.DracoUInt8Array();
                vertexArray = new Uint8Array(vertexArrayLength);
                dracoDecoder.GetAttributeUInt8ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
                break;
            case 3: // DT_INT16
                attributeData = new draco.DracoInt16Array();
                vertexArray = new Int16Array(vertexArrayLength);
                dracoDecoder.GetAttributeInt16ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
                break;
            case 4: // DT_UINT16
                attributeData = new draco.DracoUInt16Array();
                vertexArray = new Uint16Array(vertexArrayLength);
                dracoDecoder.GetAttributeUInt16ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
                break;
            case 5:
            case 7: // DT_INT32 or DT_INT64
                attributeData = new draco.DracoInt32Array();
                vertexArray = new Int32Array(vertexArrayLength);
                dracoDecoder.GetAttributeInt32ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
                break;
            case 6:
            case 8: // DT_UINT32 or DT_UINT64
                attributeData = new draco.DracoUInt32Array();
                vertexArray = new Uint32Array(vertexArrayLength);
                dracoDecoder.GetAttributeUInt32ForAllPoints(dracoGeometry, dracoAttribute, attributeData);
                break;
            case 9:
            case 10: // DT_FLOAT32 or DT_FLOAT64
                attributeData = new draco.DracoFloat32Array();
                vertexArray = new Float32Array(vertexArrayLength);
                dracoDecoder.GetAttributeFloatForAllPoints(dracoGeometry, dracoAttribute, attributeData);
                break;
        }

        for (var i = 0; i < vertexArrayLength; ++i) {
            vertexArray[i] = attributeData.GetValue(i);
        }

        draco.destroy(attributeData);
        return vertexArray;
    }

    function decodeAttribute(dracoGeometry, dracoDecoder, dracoAttribute) {
        var numPoints = dracoGeometry.num_points();
        var numComponents = dracoAttribute.num_components();

        var quantization;
        var transform = new draco.AttributeQuantizationTransform();
        if (transform.InitFromAttribute(dracoAttribute)) {
            var minValues = new Array(numComponents);
            for (var i = 0; i < numComponents; ++i) {
                minValues[i] = transform.min_value(i);
            }
            quantization = {
                quantizationBits: transform.quantization_bits(),
                minValues: minValues,
                range: transform.range(),
                octEncoded: false
            };
        }
        draco.destroy(transform);

        transform = new draco.AttributeOctahedronTransform();
        if (transform.InitFromAttribute(dracoAttribute)) {
            quantization = {
                quantizationBits: transform.quantization_bits(),
                octEncoded: true
            };
        }
        draco.destroy(transform);

        var vertexArrayLength = numPoints * numComponents;
        var vertexArray;
        if (when.defined(quantization)) {
            vertexArray = decodeQuantizedDracoTypedArray(dracoGeometry, dracoDecoder, dracoAttribute, quantization, vertexArrayLength);
        } else {
            vertexArray = decodeDracoTypedArray(dracoGeometry, dracoDecoder, dracoAttribute, vertexArrayLength);
        }

        var componentDatatype = ComponentDatatype.ComponentDatatype.fromTypedArray(vertexArray);

        return {
            array: vertexArray,
            data: {
                componentsPerAttribute: numComponents,
                componentDatatype: componentDatatype,
                byteOffset: dracoAttribute.byte_offset(),
                byteStride: ComponentDatatype.ComponentDatatype.getSizeInBytes(componentDatatype) * numComponents,
                normalized: dracoAttribute.normalized(),
                quantization: quantization
            }
        };
    }

    function decodePointCloud(parameters) {
        var dracoDecoder = new draco.Decoder();

        if (parameters.dequantizeInShader) {
            dracoDecoder.SkipAttributeTransform(draco.POSITION);
            dracoDecoder.SkipAttributeTransform(draco.NORMAL);
        }

        var buffer = new draco.DecoderBuffer();
        buffer.Init(parameters.buffer, parameters.buffer.length);

        var geometryType = dracoDecoder.GetEncodedGeometryType(buffer);
        if (geometryType !== draco.POINT_CLOUD) {
            throw new RuntimeError.RuntimeError('Draco geometry type must be POINT_CLOUD.');
        }

        var dracoPointCloud = new draco.PointCloud();
        var decodingStatus = dracoDecoder.DecodeBufferToPointCloud(buffer, dracoPointCloud);
        if (!decodingStatus.ok() || dracoPointCloud.ptr === 0) {
            throw new RuntimeError.RuntimeError('Error decoding draco point cloud: ' + decodingStatus.error_msg());
        }

        draco.destroy(buffer);

        var result = {};

        var properties = parameters.properties;
        for (var propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
                var attributeId = properties[propertyName];
                var dracoAttribute = dracoDecoder.GetAttributeByUniqueId(dracoPointCloud, attributeId);
                result[propertyName] = decodeAttribute(dracoPointCloud, dracoDecoder, dracoAttribute);
            }
        }

        draco.destroy(dracoPointCloud);
        draco.destroy(dracoDecoder);

        return result;
    }

    function decodePrimitive(parameters) {
        var dracoDecoder = new draco.Decoder();

        // Skip all parameter types except generic
        var attributesToSkip = ['POSITION', 'NORMAL', 'COLOR', 'TEX_COORD'];
        if (parameters.dequantizeInShader) {
            for (var i = 0; i < attributesToSkip.length; ++i) {
                dracoDecoder.SkipAttributeTransform(draco[attributesToSkip[i]]);
            }
        }

        var bufferView = parameters.bufferView;
        var buffer = new draco.DecoderBuffer();
        buffer.Init(parameters.array, bufferView.byteLength);

        var geometryType = dracoDecoder.GetEncodedGeometryType(buffer);
        if (geometryType !== draco.TRIANGULAR_MESH) {
            throw new RuntimeError.RuntimeError('Unsupported draco mesh geometry type.');
        }

        var dracoGeometry = new draco.Mesh();
        var decodingStatus = dracoDecoder.DecodeBufferToMesh(buffer, dracoGeometry);
        if (!decodingStatus.ok() || dracoGeometry.ptr === 0) {
            throw new RuntimeError.RuntimeError('Error decoding draco mesh geometry: ' + decodingStatus.error_msg());
        }

        draco.destroy(buffer);

        var attributeData = {};
        var min = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
        var max = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];

        var compressedAttributes = parameters.compressedAttributes;
        for (var attributeName in compressedAttributes) {
            if (compressedAttributes.hasOwnProperty(attributeName)) {
                var compressedAttribute = compressedAttributes[attributeName];
                var dracoAttribute = dracoDecoder.GetAttributeByUniqueId(dracoGeometry, compressedAttribute);
                attributeData[attributeName] = decodeAttribute(dracoGeometry, dracoDecoder, dracoAttribute);
                //投影变换
                if (attributeName === 'POSITION' && parameters.projected && !parameters.isInstance) {
                    var projectionString = parameters.projectionString;
                    var dCenX = parameters.dCenX;
                    var dCenY = parameters.dCenY;
                    var dCenZ = parameters.dCenZ;
                    var lbdeal = new physical.LBDeal();
                    var isInit = lbdeal.Init(projectionString, dCenX, dCenY, dCenZ);
                    if (isInit) {
                        var typedArray = attributeData[attributeName].array;
                        var iPtNum = typedArray.length;
                        var matrix = parameters.matrix;

                        var numBytes = typedArray.byteLength;
                        var ptr = physical._malloc(numBytes);
                        physical.HEAPF32.set(typedArray, ptr / 4);

                        var matrixPtr = physical._malloc(matrix.byteLength);
                        physical.HEAPF64.set(matrix, matrixPtr / 8);
                        lbdeal.ComputeProjToCartesian(ptr, iPtNum, matrixPtr);
                        // lbdeal.compute_utm_to_cartesian_pts(dCenX,dCenY,dCenZ,ptr,iPtNum,matrixPtr);

                        var resultAttributeData = new Float32Array(typedArray.length);

                        for (var index = 0; index < typedArray.length; ++index) {
                            resultAttributeData[index] = physical.HEAPF32[(ptr >> 2) + index];
                            if (min[index % 3] > resultAttributeData[index]) {
                                min[index % 3] = resultAttributeData[index];
                            }
                            if (max[index % 3] < resultAttributeData[index]) {
                                max[index % 3] = resultAttributeData[index];
                            }
                        }
                        attributeData[attributeName].array = resultAttributeData;
                        physical._free(ptr);
                        physical._free(matrixPtr);
                    }
                    physical.destroy(lbdeal);
                }
            }
        }
        var indexArray = decodeIndexArray(dracoGeometry, dracoDecoder);
        var pPtAry = when.defined(attributeData['POSITION']) ? attributeData['POSITION'].array : undefined;
        var pBatchIdAry = when.defined(attributeData['_BATCHID']) ? attributeData['_BATCHID'].array : undefined;
        var pIndexAry = indexArray.typedArray;
        var pEdgeCheckAry;
        var physicalArray = CreatePhysicalArray.CreatePhysicalArray.createPhysicalArrayFromModel(physical, lbSpaMgr, parameters.primitiveMode, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry);
        attributeData['_PHYSICAL'] = {
            array: physicalArray
        };

        var result = {
            indexArray: indexArray,
            attributeData: attributeData,
            min: min,
            max: max
        };

        draco.destroy(dracoGeometry);
        draco.destroy(dracoDecoder);
        return result;
    }

    function projectiveTransform(parameters, transferableObjects) {
        var result = {};
        if (parameters.projected) {
            var projectionString = parameters.projectionString;
            var dCenX = parameters.dCenX;
            var dCenY = parameters.dCenY;
            var dCenZ = parameters.dCenZ;
            var lbdeal = new physical.LBDeal();
            var isInit = lbdeal.Init(projectionString, dCenX, dCenY, dCenZ);
            if (isInit) {
                var typedArray = new Float32Array(parameters.array.buffer, 0);
                var iPtNum = typedArray.length;
                var matrix = parameters.matrix;

                var numBytes = typedArray.byteLength;
                var ptr = physical._malloc(numBytes);
                physical.HEAPF32.set(typedArray, ptr / 4);

                var matrixPtr = physical._malloc(matrix.byteLength);
                physical.HEAPF64.set(matrix, matrixPtr / 8);
                lbdeal.ComputeProjToCartesian(ptr, iPtNum, matrixPtr);

                var resultAttributeData = new Float32Array(typedArray.length);
                for (var index = 0; index < typedArray.length; ++index) {
                    resultAttributeData[index] = physical.HEAPF32[(ptr >> 2) + index];
                }
                result = {
                    attributeData: resultAttributeData
                };

                transferableObjects.push(resultAttributeData.buffer);

                physical._free(ptr);
                physical._free(matrixPtr);

            }
            physical.destroy(lbdeal);
        }

        return result;
    }

    function materAttribute(vertexArray, numComponents, bnorm) {
        var componentDatatype = ComponentDatatype.ComponentDatatype.fromTypedArray(vertexArray);
        return {
            array: vertexArray,
            data: {
                componentsPerAttribute: numComponents,
                componentDatatype: componentDatatype,
                byteOffset: 0,
                byteStride: ComponentDatatype.ComponentDatatype.getSizeInBytes(componentDatatype) * numComponents,
                normalized: bnorm,
                quantization: undefined
            }
        };
    }

    function materPrimitive(parameters) {
        var bufferView = parameters.bufferView;
        var materdecoder = new physical.MaterPrimitiveDecoder();
        if (!materdecoder.Decode(parameters.array, bufferView.byteLength)) {
            physical.destroy(materdecoder);
            throw new RuntimeError.RuntimeError('error mater compress.');
        }

        var numPoints = materdecoder.GetPtNum();
        var numIndices = materdecoder.GetIndexNum();
        var indexArray = IndexDatatype.IndexDatatype.createTypedArray(numPoints, numIndices);
        var i = 0;
        for (; i < numIndices; ++i) {
            indexArray[i] = materdecoder.GetIndex(i);
        }
        var edgeCheck;
        if (materdecoder.IsHaveEdgeCheck()) {
            edgeCheck = new Int8Array(numIndices);
            for (i = 0; i < numIndices; ++i) {
                edgeCheck[i] = materdecoder.GetEdgeCheck(i);
            }
        }

        var attributeData = {};
        var min = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];
        var max = [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY];

        //POSITION
        var cPtAry = new Float32Array(numPoints * 3);
        for (i = 0; i < numPoints; ++i) {
            cPtAry[i * 3] = materdecoder.GetPtVal(i, 0);
            cPtAry[i * 3 + 1] = materdecoder.GetPtVal(i, 1);
            cPtAry[i * 3 + 2] = materdecoder.GetPtVal(i, 2);
        }
        attributeData['POSITION'] = materAttribute(cPtAry, 3, false);
        if (parameters.projected && !parameters.isInstance) {
            var projectionString = parameters.projectionString;
            var dCenX = parameters.dCenX;
            var dCenY = parameters.dCenY;
            var dCenZ = parameters.dCenZ;
            var lbdeal = new physical.LBDeal();
            var isInit = lbdeal.Init(projectionString, dCenX, dCenY, dCenZ);
            if (isInit) {
                var typedArray = attributeData['POSITION'].array;
                var iPtNum = typedArray.length;
                var matrix = parameters.matrix;

                var numBytes = typedArray.byteLength;
                var ptr = physical._malloc(numBytes);
                physical.HEAPF32.set(typedArray, ptr / 4);

                var matrixPtr = physical._malloc(matrix.byteLength);
                physical.HEAPF64.set(matrix, matrixPtr / 8);
                lbdeal.ComputeProjToCartesian(ptr, iPtNum, matrixPtr);

                var resultAttributeData = new Float32Array(typedArray.length);

                for (var index = 0; index < typedArray.length; ++index) {
                    resultAttributeData[index] = physical.HEAPF32[(ptr >> 2) + index];
                    if (min[index % 3] > resultAttributeData[index]) {
                        min[index % 3] = resultAttributeData[index];
                    }
                    if (max[index % 3] < resultAttributeData[index]) {
                        max[index % 3] = resultAttributeData[index];
                    }
                }
                attributeData['POSITION'].array = resultAttributeData;
                physical._free(ptr);
                physical._free(matrixPtr);
            }
            physical.destroy(lbdeal);
        }

        //TEXCOORD_0
        if (materdecoder.IsHaveUV()) {
            var cUVAry = new Float32Array(numPoints * 2);
            for (i = 0; i < numPoints; ++i) {
                cUVAry[i * 2] = materdecoder.GetUVVal(i, 0);
                cUVAry[i * 2 + 1] = materdecoder.GetUVVal(i, 1);
            }
            attributeData['TEXCOORD_0'] = materAttribute(cUVAry, 2, false);
        }

        //NORMAL
        if (materdecoder.IsHaveNormal()) {
            var cNormAry = new Float32Array(numPoints * 3);
            for (i = 0; i < numPoints; ++i) {
                cNormAry[i * 3] = materdecoder.GetNormalVal(i, 0);
                cNormAry[i * 3 + 1] = materdecoder.GetNormalVal(i, 1);
                cNormAry[i * 3 + 2] = materdecoder.GetNormalVal(i, 2);
            }
            attributeData['NORMAL'] = materAttribute(cNormAry, 3, true);
        }

        //_BATCHID
        if (materdecoder.IsHaveBatchId()) {
            var cBatchIdAry = new Float32Array(numPoints);
            for (i = 0; i < numPoints; ++i) {
                cBatchIdAry[i] = materdecoder.GetBatchId(i);
            }
            attributeData['_BATCHID'] = materAttribute(cBatchIdAry, 1, false);
        }

        //_MATERIALID
        if (materdecoder.IsHaveMaterialId()) {
            var cMaterialIdAry = new Float32Array(numPoints);
            for (i = 0; i < numPoints; ++i) {
                cMaterialIdAry[i] = materdecoder.GetMaterialId(i);
            }
            attributeData['_MATERIALID'] = materAttribute(cMaterialIdAry, 1, false);
        }

        //_OUTLINECOORD
        if (materdecoder.IsHaveOutlineCoord()) {
            var cOutlineCoordAry = new Int8Array(numPoints);
            for (i = 0; i < numPoints; ++i) {
                cOutlineCoordAry[i] = materdecoder.GetOutlineCoord(i);
            }
            attributeData['_OUTLINECOORD'] = materAttribute(cOutlineCoordAry, 1, false);
        }
        var pPtAry = when.defined(attributeData['POSITION']) ? attributeData['POSITION'].array : undefined;
        var pBatchIdAry = when.defined(attributeData['_BATCHID']) ? attributeData['_BATCHID'].array : undefined;
        var pIndexAry = indexArray;
        var pEdgeCheckAry = edgeCheck;
        var physicalArray = CreatePhysicalArray.CreatePhysicalArray.createPhysicalArrayFromModel(physical, lbSpaMgr, parameters.primitiveMode, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry);
        attributeData['_PHYSICAL'] = {
            array: physicalArray
        };

        var result = {
            indexArray: {typedArray: indexArray, numberOfIndices: numIndices},
            attributeData: attributeData,
            min: min,
            max: max
        };

        physical.destroy(materdecoder);
        return result;
    }

    function decode(parameters, transferableObjects) {
        if (when.defined(parameters.dracoType) && parameters.dracoType === DracoType$1.PROJECTIVE_TRANSFORM) {
            //非压缩模型，直接球面投影变换
            return projectiveTransform(parameters, transferableObjects);
        }
        if (when.defined(parameters.primitive)) {
            if (when.defined(parameters.dracoType) && parameters.dracoType === DracoType$1.MATER_COMPRESSION) {
                return materPrimitive(parameters);
            }
            return decodePrimitive(parameters);
        }
        return decodePointCloud(parameters);
    }

    function initWorker(dracoModule, wasmBinaryFileES6) {
        fetch(wasmBinaryFileES6)
            .then(response => response.arrayBuffer())
            .then(function (bytes) {
                var WebAssemblyType = {
                    wasmBinary: bytes,
                    onModuleLoaded: function (inmod) {
                        physical = inmod;

                        lbSpaMgr = new physical.LBSpaMgr();
                        draco = dracoModule;
                        self.onmessage = createTaskProcessorWorker(decode);
                        self.postMessage(true);
                    }
                };

                CreatePhysicalArray.materem(WebAssemblyType);
            });
    }

    function decodeDraco(event) {
        var data = event.data;

        // Expect the first message to be to load a web assembly module
        var wasmConfig = data.webAssemblyConfig;
        if (when.defined(wasmConfig)) {
            // Require and compile WebAssembly module, or use fallback if not supported
            return require([wasmConfig.modulePath], function (dracoModule) {
                if (when.defined(wasmConfig.wasmBinaryFile)) {
                    if (!when.defined(dracoModule)) {
                        dracoModule = self.DracoDecoderModule;
                    }

                    dracoModule(wasmConfig).then(function (compiledModule) {
                        initWorker(compiledModule, wasmConfig.wasmBinaryFileES6);
                    });
                } else {
                    initWorker(dracoModule(), wasmConfig.wasmBinaryFileES6);
                }
            });
        }
    }

    return decodeDraco;

});
//# sourceMappingURL=decodeDraco.js.map
