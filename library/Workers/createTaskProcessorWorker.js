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
define(["./when-4ca4e419"],(function(e){"use strict";return function(r){var n;return function(t){var s=t.data,a=[],i={id:s.id,result:void 0,error:void 0};return e.when(function(r,n,t){try{return r(n,t)}catch(r){return e.when.reject(r)}}(r,s.parameters,a)).then((function(e){i.result=e})).otherwise((function(e){e instanceof Error?i.error={name:e.name,message:e.message,stack:e.stack}:i.error=e})).always((function(){e.defined(n)||(n=e.defaultValue(self.webkitPostMessage,self.postMessage)),s.canTransferArrayBuffer||(a.length=0);try{n(i,a)}catch(r){i.result=void 0,i.error="postMessage failed with error: "+function(r){var n,t=r.name,s=r.message;n=e.defined(t)&&e.defined(s)?t+": "+s:r.toString();var a=r.stack;return e.defined(a)&&(n+="\n"+a),n}(r)+"\n  with responseMessage: "+JSON.stringify(i),n(i)}}))}}}));
