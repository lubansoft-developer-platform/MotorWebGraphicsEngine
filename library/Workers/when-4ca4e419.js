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
define(["exports"],(function(n){"use strict";function r(n){return null!=n}var t=Object.freeze;r(t)||(t=function(n){return n});var e,u,o=t;function i(n,r){return null!=n?n:r}function c(n,r,t,e){return f(n).then(r,t,e)}function f(n){var r,t,e;return n instanceof s?r=n:a(n)?(t=l(),n.then((function(n){t.resolve(n)}),(function(n){t.reject(n)}),(function(n){t.progress(n)})),r=t.promise):(e=n,r=new s((function(n){try{return f(n?n(e):e)}catch(n){return h(n)}}))),r}function s(n){this.then=n}function h(n){return new s((function(r,t){try{return t?f(t(n)):h(n)}catch(n){return h(n)}}))}function l(){var n,r,t,e,u,o;return n=new s(i),r=[],t=[],e=function(n,e,u){var o,i;return o=l(),i="function"==typeof u?function(n){try{o.progress(u(n))}catch(n){o.progress(n)}}:function(n){o.progress(n)},r.push((function(r){r.then(n,e).then(o.resolve,o.reject,i)})),t.push(i),o.promise},u=function(n){return y(t,n),n},o=function(n){return n=f(n),e=n.then,o=f,u=j,y(r,n),t=r=void 0,n},{then:i,resolve:c,reject:a,progress:p,promise:n,resolver:{resolve:c,reject:a,progress:p}};function i(n,r,t){return e(n,r,t)}function c(n){return o(n)}function a(n){return o(h(n))}function p(n){return u(n)}}function a(n){return n&&"function"==typeof n.then}function p(n,r,t,e,u){return d(2,arguments),c(n,(function(n){var o,i,f,s,h,a,p,v,g,y;if(g=n.length>>>0,o=Math.max(0,Math.min(r,g)),f=[],i=g-o+1,s=[],h=l(),o)for(v=h.progress,p=function(n){s.push(n),--i||(a=p=j,h.reject(s))},a=function(n){f.push(n),--o||(a=p=j,h.resolve(f))},y=0;y<g;++y)y in n&&c(n[y],m,d,v);else h.resolve(f);return h.then(t,e,u);function d(n){p(n)}function m(n){a(n)}}))}function v(n,r,t,e){return d(1,arguments),g(n,m).then(r,t,e)}function g(n,r){return c(n,(function(n){var t,e,u,o,i,f;if(u=e=n.length>>>0,t=[],f=l(),u)for(o=function(n,e){c(n,r).then((function(n){t[e]=n,--u||f.resolve(t)}),f.reject)},i=0;i<e;i++)i in n?o(n[i],i):--u;else f.resolve(t);return f.promise}))}function y(n,r){for(var t,e=0;t=n[e++];)t(r)}function d(n,r){for(var t,e=r.length;e>n;)if(null!=(t=r[--e])&&"function"!=typeof t)throw new Error("arg "+e+" must be a function")}function j(){}function m(n){return n}i.EMPTY_OBJECT=o({}),c.defer=l,c.resolve=f,c.reject=function(n){return c(n,h)},c.join=function(){return g(arguments,m)},c.all=v,c.map=g,c.reduce=function(n,r){var t=u.call(arguments,1);return c(n,(function(n){var u;return u=n.length,t[0]=function(n,t,e){return c(n,(function(n){return c(t,(function(t){return r(n,t,e,u)}))}))},e.apply(n,t)}))},c.any=function(n,r,t,e){return p(n,1,(function(n){return r?r(n[0]):n[0]}),t,e)},c.some=p,c.chain=function(n,r,t){var e=arguments.length>2;return c(n,(function(n){return n=e?t:n,r.resolve(n),n}),(function(n){return r.reject(n),h(n)}),r.progress)},c.isPromise=a,s.prototype={always:function(n,r){return this.then(n,n,r)},otherwise:function(n){return this.then(void 0,n)},yield:function(n){return this.then((function(){return n}))},spread:function(n){return this.then((function(r){return v(r,(function(r){return n.apply(void 0,r)}))}))}},u=[].slice,e=[].reduce||function(n){var r,t,e,u,o;if(o=0,u=(r=Object(this)).length>>>0,(t=arguments).length<=1)for(;;){if(o in r){e=r[o++];break}if(++o>=u)throw new TypeError}else e=t[1];for(;o<u;++o)o in r&&(e=n(e,r[o],o,r));return e},n.defaultValue=i,n.defined=r,n.freezeObject=o,n.when=c}));
