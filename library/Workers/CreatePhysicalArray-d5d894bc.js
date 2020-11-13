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

define(['exports', './when-7ef6387a', './Cartesian3-18c04df5', './Matrix4-c68aaa66', './PrimitiveType-4c1d698a'], function (exports, when, Cartesian3, Matrix4, PrimitiveType) { 'use strict';

    class CreatePhysicalArray {
    }

    var negateRelativeToCenter = new Cartesian3.Cartesian3();
    var negateRelativeToCenterMatrix = new Matrix4.Matrix4();
    var relativePosition = new Cartesian3.Cartesian3();

    CreatePhysicalArray.createPhysicalArrayFromTerrain = function (physical, lbSpaMgr, relativeToCenter, positions, indices) {
        var hasRelativeToCenter = when.defined(relativeToCenter);
        relativeToCenter = hasRelativeToCenter ? relativeToCenter : Cartesian3.Cartesian3.ZERO;
        Cartesian3.Cartesian3.negate(relativeToCenter, negateRelativeToCenter);
        Matrix4.Matrix4.fromTranslation(negateRelativeToCenter, negateRelativeToCenterMatrix);

        var physicalVertices = new Float32Array(positions.length * 3.0);
        var indexVertices = 0;
        for (var index = 0; index < positions.length; ++index) {
            var position = positions[index];
            Matrix4.Matrix4.multiplyByPoint(negateRelativeToCenterMatrix, position, relativePosition);

            physicalVertices[indexVertices++] = relativePosition.x;
            physicalVertices[indexVertices++] = relativePosition.y;
            physicalVertices[indexVertices++] = relativePosition.z;
        }

        var pPrimitive = new physical.LBSpaPrimitive();
        initSpaTrianglePrimitive(pPrimitive, physicalVertices, undefined, indices, undefined);
        var pPrimitiveSpatial = lbSpaMgr.CreateTriangleSpatial(pPrimitive);

        //serial write
        var pSerialWrite = new physical.LBSpaSerial();
        pSerialWrite.WriteSpatial(pPrimitiveSpatial);
        var physicalArray = new Uint8Array(pSerialWrite.GetBufferSize());
        for (var i = 0; i < physicalArray.length; ++i) {
            physicalArray[i] = pSerialWrite.GetBufferVal(i);
        }
        physical.destroy(pSerialWrite);
        physical.destroy(pPrimitiveSpatial);

        return physicalArray;
    };

    CreatePhysicalArray.createPhysicalArrayFromModel = function (physical, lbSpaMgr, primitiveMode, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry) {
        var pPrimitive = new physical.LBSpaPrimitive();
        var pPrimitiveSpatial;
        if (PrimitiveType.PrimitiveType.LINES === primitiveMode) {
            initStepLinePrimitive(pPrimitive, pPtAry, pBatchIdAry);
            pPrimitiveSpatial = lbSpaMgr.CreateStepLineSpatial(pPrimitive);
        } else {
            initSpaTrianglePrimitive(pPrimitive, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry);
            pPrimitiveSpatial = lbSpaMgr.CreateTriangleSpatial(pPrimitive);
        }

        //serial write
        var pSerialWrite = new physical.LBSpaSerial();
        pSerialWrite.WriteSpatial(pPrimitiveSpatial);
        var physicalArray = new Uint8Array(pSerialWrite.GetBufferSize());
        for (var index = 0; index < physicalArray.length; ++index) {
            physicalArray[index] = pSerialWrite.GetBufferVal(index);
        }

        physical.destroy(pSerialWrite);
        physical.destroy(pPrimitiveSpatial);
        return physicalArray;
    };

    function initSpaTrianglePrimitive(pPrimitive, pPtAry, pBatchIdAry, pIndexAry, pEdgeCheckAry) {
        var bBatchId = when.defined(pBatchIdAry);
        pPrimitive.SetPtValNum(pPtAry.length, bBatchId);//true desc have batch
        var i;
        for (i = 0; i < pPtAry.length; ++i) {
            pPrimitive.SetPtValVal(i, pPtAry[i]);
        }
        if (bBatchId) {
            for (i = 0; i < pBatchIdAry.length; ++i) {
                pPrimitive.SetBatchIdVal(i, pBatchIdAry[i]);
            }
        }
        var bEdgeCheck = when.defined(pEdgeCheckAry);
        pPrimitive.SetIndexNum(pIndexAry.length, bEdgeCheck);//need edge
        for (i = 0; i < pIndexAry.length; ++i) {
            pPrimitive.SetIndexVal(i, pIndexAry[i]);
        }
        if (bEdgeCheck) {
            for (i = 0; i < pEdgeCheckAry.length; ++i) {
                pPrimitive.SetEdgeCheckVal(i, pEdgeCheckAry[i]);
            }
        }
    }

    function initStepLinePrimitive(pPrimitive, pPtAry, pBatchIdAry) {
        var i;
        var bHaveBatch = when.defined(pBatchIdAry);
        pPrimitive.SetPtValNum(pPtAry.length, bHaveBatch);//true desc have batch
        for (i = 0; i < pPtAry.length; ++i) {
            pPrimitive.SetPtValVal(i, pPtAry[i]);
        }
        if (bHaveBatch) {
            for (i = 0; i < pBatchIdAry.length; ++i) {
                pPrimitive.SetBatchIdVal(i, pBatchIdAry[i]);
            }
        }

        pPrimitive.InitIndexByPt();//need cvt index structure
    }

    exports.CreatePhysicalArray = CreatePhysicalArray;

});
//# sourceMappingURL=CreatePhysicalArray-d5d894bc.js.map
