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

define(['./when-7ef6387a', './Check-ed6a1804', './Cartesian3-18c04df5', './Matrix4-c68aaa66', './RuntimeError-5b606d78', './WebGLConstants-30fc6f5c', './PrimitiveType-4c1d698a', './createTaskProcessorWorker', './CreatePhysicalArray-e814d1fd'], function (when, Check, Cartesian3, Matrix4, RuntimeError, WebGLConstants, PrimitiveType, createTaskProcessorWorker, CreatePhysicalArray) { 'use strict';

    var PhysicalLogicType = {
        ADD_PRIMITIVE : 0,
        ADD_SURFACE : 1,
        UPDATE : 2,
        PICK_FROM_RAY : 3,//射线PICK
        UPDATE_INSTANCE_MATRIX : 4//更新lod树的matrix
    };
    var PhysicalLogicType$1 = Object.freeze(PhysicalLogicType);

    /**
         * An enum describing the x, y, and z axes and helper conversion functions.
         *
         * @exports Axis
         * @private
         */
        var Axis = {
            /**
             * Denotes the x-axis.
             *
             * @type {Number}
             * @constant
             */
            X : 0,

            /**
             * Denotes the y-axis.
             *
             * @type {Number}
             * @constant
             */
            Y : 1,

            /**
             * Denotes the z-axis.
             *
             * @type {Number}
             * @constant
             */
            Z : 2,

            /**
             * Matrix used to convert from y-up to z-up
             *
             * @type {Matrix4}
             * @constant
             */
            Y_UP_TO_Z_UP : Matrix4.Matrix4.fromRotationTranslation(Matrix4.Matrix3.fromRotationX(Cartesian3.CesiumMath.PI_OVER_TWO)),

            /**
             * Matrix used to convert from z-up to y-up
             *
             * @type {Matrix4}
             * @constant
             */
            Z_UP_TO_Y_UP : Matrix4.Matrix4.fromRotationTranslation(Matrix4.Matrix3.fromRotationX(-Cartesian3.CesiumMath.PI_OVER_TWO)),

            /**
             * Matrix used to convert from x-up to z-up
             *
             * @type {Matrix4}
             * @constant
             */
            X_UP_TO_Z_UP : Matrix4.Matrix4.fromRotationTranslation(Matrix4.Matrix3.fromRotationY(-Cartesian3.CesiumMath.PI_OVER_TWO)),

            /**
             * Matrix used to convert from z-up to x-up
             *
             * @type {Matrix4}
             * @constant
             */
            Z_UP_TO_X_UP : Matrix4.Matrix4.fromRotationTranslation(Matrix4.Matrix3.fromRotationY(Cartesian3.CesiumMath.PI_OVER_TWO)),

            /**
             * Matrix used to convert from x-up to y-up
             *
             * @type {Matrix4}
             * @constant
             */
            X_UP_TO_Y_UP : Matrix4.Matrix4.fromRotationTranslation(Matrix4.Matrix3.fromRotationZ(Cartesian3.CesiumMath.PI_OVER_TWO)),

            /**
             * Matrix used to convert from y-up to x-up
             *
             * @type {Matrix4}
             * @constant
             */
            Y_UP_TO_X_UP : Matrix4.Matrix4.fromRotationTranslation(Matrix4.Matrix3.fromRotationZ(-Cartesian3.CesiumMath.PI_OVER_TWO)),

            /**
             * Gets the axis by name
             *
             * @param {String} name The name of the axis.
             * @returns {Number} The axis enum.
             */
            fromName : function(name) {
                //>>includeStart('debug', pragmas.debug);
                Check.Check.typeOf.string('name', name);
                //>>includeEnd('debug');

                return Axis[name];
            }
        };
    var Axis$1 = Object.freeze(Axis);

    /* global require */

    var physicalModule;
    var lbSpaMgr;
    var keyCollection;
    var globeSurfaceTileCollection;

    function taskDispatcher(parameters) {
        switch (parameters.logicType) {
            case PhysicalLogicType$1.UPDATE_INSTANCE_MATRIX: {
                updateLodInstanceMatrix(parameters);
                break;
            }
            case PhysicalLogicType$1.ADD_PRIMITIVE: {
                addPrimitives(parameters);
                break;
            }
            case PhysicalLogicType$1.ADD_SURFACE : {
                globeSurfaceTileHandler(parameters);
                break;
            }
            case PhysicalLogicType$1.UPDATE: {
                lbSpaMgr.EnableAllPrimitiveSelected(false);
                selectPrimitive(parameters.selectedGuidArray);
                removePrimitive(parameters.removedGuidArray);
                selectSurface(parameters.selectedSurfaceArray);
                removeSurface(parameters.removedSurfaceArray);
                break;
            }
            case PhysicalLogicType$1.PICK_FROM_RAY: {
                return getSearchResult(parameters);
            }
            default:
                throw new Check.DeveloperError('physicalLogicType is not a valid value.');
        }
        return true;
    }

    function globeSurfaceTileHandler(parameters) {
        var surfaceTiles = parameters.surfaceTiles;
        for (var tile of surfaceTiles) {
            var guid = tile.guid;
            var physicalArray = tile.physicalArray;
            //serial read
            var pSerialRead = new physicalModule.LBSpaSerial();
            var pBufferAry = physicalModule._malloc(physicalArray.byteLength);
            physicalModule.HEAPU8.set(physicalArray, pBufferAry);
            var pPrimitiveSpatial = pSerialRead.ReadSpatial(pBufferAry, physicalArray.byteLength);
            physicalModule._free(pBufferAry);
            physicalModule.destroy(pSerialRead);

            var pointer = lbSpaMgr.AddPrimitiveSpatial(pPrimitiveSpatial);
            if (when.defined(tile.projectCenterMatrixArray)) {
                var pMat = new physicalModule.LBSpaMat;
                cvtMatrixAryToMat(tile.projectCenterMatrixArray, pMat);
                lbSpaMgr.SetPrimitiveSpatialMat(pointer, pMat);
                physicalModule.destroy(pMat);
            }
            globeSurfaceTileCollection.set(guid, pointer);
        }
    }

    function selectPrimitive(guidArray) {
        if (when.defined(guidArray) && guidArray.length > 0) {
            for (var index = 0; index < guidArray.length; ++index) {
                var guid = guidArray[index];
                if (keyCollection.has(guid)) {
                    var array = keyCollection.get(guid);
                    for (var pointer of array) {
                        lbSpaMgr.EnablePrimitiveSelected(pointer, true);
                    }
                }
            }
        }
    }

    function selectSurface(guidArray) {
        if (when.defined(guidArray) && guidArray.length > 0) {
            for (var index = 0; index < guidArray.length; ++index) {
                var guid = guidArray[index];
                if (globeSurfaceTileCollection.has(guid)) {
                    var pointer = globeSurfaceTileCollection.get(guid);
                    if (when.defined(pointer)) {
                        lbSpaMgr.EnablePrimitiveSelected(pointer, true);
                    }
                }
            }
        }
    }

    function removeSurface(guidArray) {
        if (when.defined(guidArray) && guidArray.length > 0) {
            for (var index = 0; index < guidArray.length; ++index) {
                var guid = guidArray[index];
                if (globeSurfaceTileCollection.has(guid)) {
                    var pointer = globeSurfaceTileCollection.get(guid);
                    lbSpaMgr.RemovePrimitiveSpatial(pointer);
                    globeSurfaceTileCollection.delete(guid);
                }
            }
        }
    }

    function addPrimitives(parameters) {
        var primitives = parameters.primitives;
        if (primitives.length > 0) {
            for (var primitive of primitives) {
                addPrimitive(primitive);
            }
        }
    }

    //默认矩阵
    var defautlNodeMatrixArray = Matrix4.Matrix4.toArray(Axis$1.Y_UP_TO_Z_UP);
    var projectCenterMatrix = new Matrix4.Matrix4();

    function addPrimitive(primitive) {
        var modelGUID = primitive.guid;
        var primitiveMode = primitive.primitiveMode;
        var physicalArray = primitive.physicalArray;
        var physicalArrayOptions = primitive.physicalArrayOptions;
        var projectCenterMatrixArray = primitive.projectCenterMatrixArray;
        var pointer;

        var pPrimitiveSpatial;
        if(when.defined(physicalArray)){
            //serial read
            var pSerialRead = new physicalModule.LBSpaSerial();
            var pBufferAry = physicalModule._malloc(physicalArray.byteLength);
            physicalModule.HEAPU8.set(physicalArray, pBufferAry);
            pPrimitiveSpatial = pSerialRead.ReadSpatial(pBufferAry, physicalArray.byteLength);
            physicalModule._free(pBufferAry);
            physicalModule.destroy(pSerialRead);
        }
        if(when.defined(physicalArrayOptions)){
            var pPtAry = physicalArrayOptions.pPtAry;
            var pBatchIdAry = physicalArrayOptions.pBatchIdAry;
            var pIndexAry = physicalArrayOptions.pIndexAry;
            var pEdgeCheckAry = physicalArrayOptions.pEdgeCheckAry;
            pPrimitiveSpatial = CreatePhysicalArray.CreatePhysicalArray.createSpaPrimitive(physicalModule, lbSpaMgr, primitiveMode, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry);
        }

        if (when.defined(primitive.instanceMatrixTypeArray) || when.defined(primitive.lodInstanceMatrixTypeArray)) {
            var pPrimitiveCluster = lbSpaMgr.CreatePrimitiveCluster(pPrimitiveSpatial);
            pointer = lbSpaMgr.AddPrimitiveSpatial(pPrimitiveCluster);

            var isLodInstance = when.defined(primitive.lodInstanceMatrixTypeArray);
            var nodeMatrixArray = isLodInstance ? defautlNodeMatrixArray : undefined;
            var instanceArray = isLodInstance ? primitive.lodInstanceMatrixTypeArray : primitive.instanceMatrixTypeArray;
            setInstanceMatrix(pPrimitiveCluster, projectCenterMatrixArray, nodeMatrixArray, instanceArray, isLodInstance);
        } else {
            pointer = lbSpaMgr.AddPrimitiveSpatial(pPrimitiveSpatial);
            setSpatialMatrix(pointer, projectCenterMatrixArray);
        }
        addToKeyCollection(modelGUID, pointer);

        return pointer;
    }

    function setSpatialMatrix(pointer, projectCenterMatrixArray) {
        if (when.defined(projectCenterMatrixArray)) {
            var pMat = new physicalModule.LBSpaMat;
            cvtMatrixAryToMat(projectCenterMatrixArray, pMat);
            lbSpaMgr.SetPrimitiveSpatialMat(pointer, pMat);
            physicalModule.destroy(pMat);
        }
    }

    var nodeMatrix = new Matrix4.Matrix4();
    var instanceMatrix = new Matrix4.Matrix4();

    function setInstanceMatrix(primitiveCluster, projectCenterMatrixArray, nodeMatrixArray, instanceMatrixTypeArray, isLodInstance) {
        when.defined(projectCenterMatrixArray) && Matrix4.Matrix4.fromArray(projectCenterMatrixArray, 0, projectCenterMatrix);
        when.defined(nodeMatrixArray) && Matrix4.Matrix4.fromArray(nodeMatrixArray, 0, nodeMatrix);
        for (var index = 0; index < instanceMatrixTypeArray.length; index += 16) {
            Matrix4.Matrix4.fromArray(instanceMatrixTypeArray, index, instanceMatrix);
            if (when.defined(nodeMatrixArray)) {
                Matrix4.Matrix4.multiply(instanceMatrix, nodeMatrix, instanceMatrix);
            }
            if (!isLodInstance && when.defined(projectCenterMatrixArray)) {
                //静态模型Instance
                Matrix4.Matrix4.multiply(projectCenterMatrix, instanceMatrix, instanceMatrix);
            }
            var pMat = new physicalModule.LBSpaMat();
            cvtMatrixAryToMat(instanceMatrix, pMat);
            primitiveCluster.SetIndexMatrix(index / 16, pMat);
            physicalModule.destroy(pMat);
        }
    }

    function updateLodInstanceMatrix(parameters) {
        var instanceMatrixArray = parameters.instanceMatrixArray;
        for (var instance of instanceMatrixArray) {
            var modelGUID = instance.guid;
            var instanceMatrixTypeArray = instance.instanceMatrixTypeArray;
            if (keyCollection.has(modelGUID)) {
                var modelArray = keyCollection.get(modelGUID);
                for (var index = 0; index < modelArray.length; ++index) {
                    var pointer = modelArray[index];
                    var primitiveCluster = lbSpaMgr.GetPrimitiveCluster(pointer);
                    if (when.defined(primitiveCluster)) {
                        primitiveCluster.RemoveAllMatrix();
                        setInstanceMatrix(primitiveCluster, undefined, defautlNodeMatrixArray, instanceMatrixTypeArray, true);
                    }
                }
            }
        }
    }

    function cvtMatrixAryToMat(pMatrixAry, pMat) {
        for (var i = 0; i < 4; ++i) {
            var cCol = pMat.At(i);
            cCol.x = pMatrixAry[i * 4];
            cCol.y = pMatrixAry[i * 4 + 1];
            cCol.z = pMatrixAry[i * 4 + 2];
            cCol.w = pMatrixAry[i * 4 + 3];
        }
    }

    function addToKeyCollection(modelGUID, pointer) {
        var modelArray;
        if (keyCollection.has(modelGUID)) {
            modelArray = keyCollection.get(modelGUID);
            modelArray.push(pointer);
        } else {
            modelArray = [];
            modelArray.push(pointer);
            keyCollection.set(modelGUID, modelArray);
        }
    }

    function removePrimitive(guidArray) {
        if (when.defined(guidArray) && guidArray.length > 0) {
            for (var index = 0; index < guidArray.length; ++index) {
                var guid = guidArray[index];
                if (keyCollection.has(guid)) {
                    var array = keyCollection.get(guid);
                    for (var pointer of array) {
                        lbSpaMgr.RemovePrimitiveSpatial(pointer);
                    }
                    keyCollection.delete(guid);
                }
            }
        }
    }

    function getSearchResult(parameters) {
        var result = {};
        var rayArray = parameters.ray;
        var lineMode = parameters.lineMode;
        var triangleMode = parameters.triangleMode;
        var selectEdge = when.defined(parameters.selectEdge) ? parameters.selectEdge : false;
        var maxDist = when.defined(parameters.maxDist) ? parameters.maxDist : 0.1;

        if (lineMode) {
            result.lineMode = {};
            getStepLineResult(rayArray, selectEdge, maxDist, result.lineMode);
        }

        if (triangleMode) {
            result.triangleMode = {};
            getTriangleResult(rayArray, selectEdge, maxDist, result.triangleMode);
        }
        return result;
    }

    function getTriangleResult(rayArray, selectEdge, maxDist, result) {
        pickTriangleFromRay(rayArray, false, maxDist, result);
        if (selectEdge) {
            pickTriangleFromRay(rayArray, true, maxDist, result);
        }
    }

    function pickTriangleFromRay(rayArray, selectEdge, maxDist, result) {
        var cSpaSearthCondition = new physicalModule.LBSpaSearthCondition();
        cSpaSearthCondition.EnableTriangleSearch(true);
        cSpaSearthCondition.SetRay(rayArray[0], rayArray[1], rayArray[2], rayArray[3], rayArray[4], rayArray[5], maxDist, selectEdge);
        var cSpaSearthResult = new physicalModule.LBSpaSearthResult();
        if (lbSpaMgr.Search(cSpaSearthCondition, cSpaSearthResult)) {
            if (selectEdge) {
                result.primitives = [];
                for (var index = 0; index < cSpaSearthResult.GetResultElemSize(); ++index) {
                    var primitiveEdge = {};
                    getSpaTriangleSelElem(cSpaSearthResult.GetResultElem(index), primitiveEdge);
                    result.primitives.push(primitiveEdge);
                }
            } else {
                var pickPosition = cSpaSearthResult.GetPickPt();
                if (when.defined(pickPosition)) {
                    result.pickPosition = {
                        x: pickPosition.x,
                        y: pickPosition.y,
                        z: pickPosition.z
                    };
                }
            }
        }
        physicalModule.destroy(cSpaSearthCondition);
        physicalModule.destroy(cSpaSearthResult);
    }

    function getSpaTriangleSelElem(cSelElem, result) {
        var iPrimitiveId = cSelElem.GetPrimitiveId();
        var bIsCluster = cSelElem.IsCluster();
        // console.log('primitive id:' + iPrimitiveId + ', iscluster:' + bIsCluster);
        result.primitiveId = iPrimitiveId;
        result.isCluster = bIsCluster;
        result.triangles = [];

        for (var i = 0; i < cSelElem.GetSelIndexSize(); ++i) {
            var currentTriangle = {};
            var iTriNo = cSelElem.GetSelIndex(i);
            var iPtIndex0 = cSelElem.GetSelIndexIndex(iTriNo * 3);
            var iPtIndex1 = cSelElem.GetSelIndexIndex(iTriNo * 3 + 1);
            var iPtIndex2 = cSelElem.GetSelIndexIndex(iTriNo * 3 + 2);

            currentTriangle.vertices = [
                {x: cSelElem.GetPtX(iPtIndex0), y: cSelElem.GetPtY(iPtIndex0), z: cSelElem.GetPtZ(iPtIndex0)},
                {x: cSelElem.GetPtX(iPtIndex1), y: cSelElem.GetPtY(iPtIndex1), z: cSelElem.GetPtZ(iPtIndex1)},
                {x: cSelElem.GetPtX(iPtIndex2), y: cSelElem.GetPtY(iPtIndex2), z: cSelElem.GetPtZ(iPtIndex2)}];
            if (cSelElem.IsHaveBatchId()) {
                var iBatchId0 = cSelElem.GetBatchId(iPtIndex0);
                var iBatchId1 = cSelElem.GetBatchId(iPtIndex1);
                var iBatchId2 = cSelElem.GetBatchId(iPtIndex2);
                currentTriangle.batchId = [iBatchId0, iBatchId1, iBatchId2];
            }

            if (cSelElem.IsHaveCheckEdge()) {
                currentTriangle.edges = [];
                var iCheckEdge = cSelElem.GetSelIndexCheckEdge(i);
                if (iCheckEdge & 0x01) {
                    //cPt0 cPt1
                    currentTriangle.edges.push(0, 1);
                }
                if (iCheckEdge & 0x02) {
                    //cPt1 cPt2
                    currentTriangle.edges.push(1, 2);
                }
                if (iCheckEdge & 0x04) {
                    //cPt2 cPt0
                    currentTriangle.edges.push(2, 0);
                }
            }
            result.triangles.push(currentTriangle);
        }
    }

    function getStepLineResult(rayArray, selectEdge, maxDist, result) {
        pickStepLineFromRay(rayArray, false, maxDist, result);
        if (selectEdge) {
            pickStepLineFromRay(rayArray, true, maxDist, result);
        }
    }

    function pickStepLineFromRay(rayArray, selectEdge, maxDist, result) {
        var cSpaSearthCondition = new physicalModule.LBSpaSearthCondition();
        cSpaSearthCondition.EnableTriangleSearch(false);
        cSpaSearthCondition.SetRay(rayArray[0], rayArray[1], rayArray[2], rayArray[3], rayArray[4], rayArray[5], maxDist, selectEdge);
        var cSpaSearthResult = new physicalModule.LBSpaSearthResult();
        if (lbSpaMgr.Search(cSpaSearthCondition, cSpaSearthResult)) {
            if (selectEdge) {
                result.primitives = [];
                for (var index = 0; index < cSpaSearthResult.GetResultElemSize(); ++index) {
                    var primitiveLine = {};
                    getSpaStepLineSelElem(cSpaSearthResult.GetResultElem(index), primitiveLine);
                    result.primitives.push(primitiveLine);
                }
            } else {
                var pickPosition = cSpaSearthResult.GetPickPt();
                if (when.defined(pickPosition)) {
                    result.pickPosition = {
                        x: pickPosition.x,
                        y: pickPosition.y,
                        z: pickPosition.z
                    };
                }
            }
        }
        physicalModule.destroy(cSpaSearthCondition);
        physicalModule.destroy(cSpaSearthResult);
    }

    function getSpaStepLineSelElem(cSelElem, result) {
        var iPrimitiveId = cSelElem.GetPrimitiveId();
        var bIsCluster = cSelElem.IsCluster();
        // console.log('primitive key:' + iPrimitiveId + ', iscluster:' + bIsCluster);
        result.primitiveId = iPrimitiveId;
        result.isCluster = bIsCluster;
        result.lines = [];

        for (var i = 0; i < cSelElem.GetSelIndexSize(); ++i) {
            var currentLine = {};
            var iSegNo = cSelElem.GetSelIndex(i);
            var iPtIndex0 = cSelElem.GetSelIndexIndex(iSegNo * 2);
            var iPtIndex1 = cSelElem.GetSelIndexIndex(iSegNo * 2 + 1);

            currentLine.vertices = [
                {x: cSelElem.GetPtX(iPtIndex0), y: cSelElem.GetPtY(iPtIndex0), z: cSelElem.GetPtZ(iPtIndex0)},
                {x: cSelElem.GetPtX(iPtIndex1), y: cSelElem.GetPtY(iPtIndex1), z: cSelElem.GetPtZ(iPtIndex1)}];
            if (cSelElem.IsHaveBatchId()) {
                var iBatchId0 = cSelElem.GetBatchId(iPtIndex0);//cluster batchid is index
                var iBatchId1 = cSelElem.GetBatchId(iPtIndex1);
                currentLine.batchId = [iBatchId0, iBatchId1];
            }
            result.lines.push(currentLine);
        }
    }

    function createPhysicalEngine(event) {
        var data = event.data;
        var wasmConfig = data.webAssemblyConfig;
        if (when.defined(wasmConfig)) {
            if(when.defined(wasmConfig.debug)){
                return require([wasmConfig.debug], function (currentModule) {
                    physicalModule = currentModule();
                    lbSpaMgr = new physicalModule.LBSpaMgr();
                    keyCollection = new Map();
                    globeSurfaceTileCollection = new Map();
                    self.onmessage = createTaskProcessorWorker(taskDispatcher);
                    self.postMessage(true);
                });
            }
            fetch(wasmConfig.wasmBinaryFileES6)
                .then(response => response.arrayBuffer())
                .then(function (bytes) {
                    var WebAssemblyType = {
                        wasmBinary: bytes,
                        onModuleLoaded: function (currentModule) {
                            physicalModule = currentModule;
                            lbSpaMgr = new physicalModule.LBSpaMgr();
                            keyCollection = new Map();
                            globeSurfaceTileCollection = new Map();
                            self.onmessage = createTaskProcessorWorker(taskDispatcher);
                            self.postMessage(true);
                        }
                    };

                    CreatePhysicalArray.materem(WebAssemblyType);
                });
        }
    }

    return createPhysicalEngine;

});
//# sourceMappingURL=createPhysicalEngine.js.map
