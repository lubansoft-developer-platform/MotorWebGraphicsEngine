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

define(['./when-7ef6387a', './createTaskProcessorWorker'], function (when, createTaskProcessorWorker) { 'use strict';

    /* global require */

    var transformModule;
    function gotoTransform(parameters) {
        // var dCenX = parameters.dCenX;
        // var dCenY = parameters.dCenY;
        // var dCenZ = parameters.dCenZ;
        // var dCenX = 121.539794;
        // var dCenY = 31.223272;
        // var dCenZ = 0.0;
        var typedArray = parameters.array;
        var origin = parameters.origin;
        var longitude = origin[0];
        var latitude = origin[1];
        var height = origin[2];

        const numBytes = typedArray.byteLength;
        const ptr = transformModule._malloc(numBytes);
        transformModule.HEAPF64.set(typedArray,ptr / 8);
        var computeFunciton = transformModule.cwrap('compute_rel_utmmat_to_cartesianmat','number',['number','number','number','number']);
        computeFunciton(longitude, latitude, height, ptr);

        var result = {
            matrix : transformModule.HEAPF64.subarray(ptr/8, ptr/8+typedArray.length )
        };
        transformModule._free(ptr);
        return result;
    }

    function initWorker(currentModule) {
        transformModule = currentModule;
        self.onmessage = createTaskProcessorWorker(gotoTransform);
        self.postMessage(true);
    }

    function transformUTM2Cartesian(event) {
        var data = event.data;

        // Expect the first message to be to load a web assembly module
        var wasmConfig = data.webAssemblyConfig;
        if (when.defined(wasmConfig)) {
            // Require and compile WebAssembly module, or use fallback if not supported
            return require([wasmConfig.modulePath], function(transformModule) {
                if (when.defined(wasmConfig.wasmBinaryFile)) {
                    if (!when.defined(transformModule)) {
                        transformModule = self.Module;
                    }
                    transformModule(wasmConfig).then(function (compiledModule) {
                        initWorker(compiledModule);
                    });
                } else {
                    initWorker(transformModule());
                }
            });
        }
    }

    return transformUTM2Cartesian;

});
//# sourceMappingURL=transformUTM2Cartesian.js.map
