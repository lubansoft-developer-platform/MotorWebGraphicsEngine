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
define(["exports","./defineProperties-163ddb68"],(function(r,e){"use strict";var t={computePositions:function(r,t,i,n,o){var a,s=.5*r,u=-s,c=n+n,d=new Float64Array(3*(o?2*c:c)),f=0,y=0,h=o?3*c:0,m=o?3*(c+n):3*n;for(a=0;a<n;a++){var p=a/n*e.CesiumMath.TWO_PI,v=Math.cos(p),M=Math.sin(p),P=v*i,b=M*i,l=v*t,C=M*t;d[y+h]=P,d[y+h+1]=b,d[y+h+2]=u,d[y+m]=l,d[y+m+1]=C,d[y+m+2]=s,y+=3,o&&(d[f++]=P,d[f++]=b,d[f++]=u,d[f++]=l,d[f++]=C,d[f++]=s)}return d}};r.CylinderGeometryLibrary=t}));
