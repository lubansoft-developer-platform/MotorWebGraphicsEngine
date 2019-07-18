## Classes

<dl>
<dt><a href="#ServiceConfig">ServiceConfig</a></dt>
<dd><p>服务配置对象</p></dd>
<dt><a href="#App">App</a></dt>
<dd><p>应用模块</p></dd>
<dt><a href="#Cartesian2">Cartesian2</a></dt>
<dd><p><p>二维坐标类，参考{@tutorial 坐标转换}</p></p>
</dd>
<dt><a href="#Cartesian3">Cartesian3</a></dt>
<dd><p><p>笛卡尔三维坐标类，参考{@tutorial 坐标转换}</p></p>
</dd>
<dt><a href="#Cartographic">Cartographic</a></dt>
<dd><p><p>经纬度坐标类，参考{@tutorial 坐标转换}</p></p>
</dd>
<dt><a href="#Color">Color</a></dt>
<dd><p>颜色类</p></dd>
<dt><a href="#MouseEventHandler">MouseEventHandler</a></dt>
<dd></dd>
<dt><a href="#GeometryCollection">GeometryCollection</a></dt>
<dd><p><p>几何体集合类，参考{@tutorial 自定义盒子绘制}</p></p>
</dd>
<dt><a href="#MarkerCollection">MarkerCollection</a></dt>
<dd><p><p>标注集合类，参考{@tutorial 添加标注}</p></p>
</dd>
<dt><a href="#DynamicCircle">DynamicCircle</a></dt>
<dd><p><p>动态圈效果类，参考{@tutorial 特效}</p></p>
</dd>
<dt><a href="#VideoProjection">VideoProjection</a></dt>
<dd><p><p>视频投影特效类，参考{@tutorial 特效}</p></p>
</dd>
<dt><a href="#Water">Water</a></dt>
<dd><p><p>水面特效类，参考{@tutorial 特效}</p></p>
</dd>
<dt><a href="#ComponentView">ComponentView</a></dt>
<dd><p>构件视图类</p></dd>
<dt><a href="#MarkerView">MarkerView</a></dt>
<dd><p>标注视图类</p></dd>
<dt><a href="#Viewer">Viewer</a></dt>
<dd><p>Motor视窗，参考{@tutorial 初始化}</p></dd>
<dt><a href="#ProjectView">ProjectView</a></dt>
<dd><p>工程视图模块</p></dd>
<dt><a href="#SceneView">SceneView</a></dt>
<dd><p>场景视图模块</p></dd>
<dt><a href="#VolumeRender">VolumeRender</a></dt>
<dd><p><p>体渲染类，参考{@tutorial 特效}</p></p>
</dd>
<dt><a href="#ArcGISMap">ArcGISMap</a> ⇐ <code><a href="#BaseMap">BaseMap</a></code></dt>
<dd><p>ArcGIS地图服务类，参考{@tutorial 地图服务}</p></dd>
<dt><a href="#BaseMap">BaseMap</a></dt>
<dd><p><p>基础地图类，参考{@tutorial 地图服务}</p></p>
</dd>
<dt><a href="#BingMap">BingMap</a> ⇐ <code><a href="#BaseMap">BaseMap</a></code></dt>
<dd><p>Bing地图服务类，参考{@tutorial 地图服务}</p></dd>
<dt><a href="#TiandituMap">TiandituMap</a> ⇐ <code><a href="#BaseMap">BaseMap</a></code></dt>
<dd><p><p>天地图类，参考{@tutorial 地图服务}</p></p>
</dd>
<dt><a href="#WebMapTileService">WebMapTileService</a> ⇐ <code><a href="#BaseMap">BaseMap</a></code></dt>
<dd><p>WMTS地图服务类，参考{@tutorial 地图服务}</p></dd>
<dt><a href="#MarqueeEditor">MarqueeEditor</a></dt>
<dd><p>框选放大编辑器</p></dd>
<dt><a href="#MeasureEditor">MeasureEditor</a></dt>
<dd><p><p>测量工具类，参考{@tutorial 测量}</p></p>
</dd>
<dt><a href="#AutoRoamManager">AutoRoamManager</a></dt>
<dd><p><p>路径漫游管理器，参考{@tutorial 路径漫游}</p></p>
</dd>
<dt><a href="#OrbitControl">OrbitControl</a></dt>
<dd><p>围绕一个原点旋转的控制器</p></dd>
<dt><a href="#RoamEditor">RoamEditor</a></dt>
<dd><p><p>路径漫游控制器，参考{@tutorial 视角控制}</p></p>
</dd>
<dt><a href="#ClippingPlaneEditor">ClippingPlaneEditor</a></dt>
<dd><p><p>剖切插件，参考{@tutorial 剖切}</p></p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ViewCubeConfig">ViewCubeConfig</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CameraView">CameraView</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Mouse">Mouse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#eventHandler">eventHandler</a> : <code>function</code></dt>
<dd></dd>
<dt><a href="#MeasureResult">MeasureResult</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MeasureResultCallback">MeasureResultCallback</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="ServiceConfig"></a>

## ServiceConfig
<p>服务配置对象</p>

**Kind**: global class  

* [ServiceConfig](#ServiceConfig)
    * [.server](#ServiceConfig.server) : <code>string</code>
    * [.version](#ServiceConfig.version) : <code>string</code>
    * [.token](#ServiceConfig.token) : <code>string</code>
    * [.findProject](#ServiceConfig.findProject) : <code>string</code>
    * [.listAssembly](#ServiceConfig.listAssembly) : <code>string</code>
    * [.renderAssembly](#ServiceConfig.renderAssembly) : <code>string</code>
    * [.listStaticModByProjectId](#ServiceConfig.listStaticModByProjectId) : <code>string</code>
    * [.componentPropertiesTree](#ServiceConfig.componentPropertiesTree) : <code>string</code>
    * [.componentPropertiesTreeStructure](#ServiceConfig.componentPropertiesTreeStructure) : <code>string</code>
    * [.componentPropertiesTreeDetail](#ServiceConfig.componentPropertiesTreeDetail) : <code>string</code>
    * [.getStaticModByProjIdAndAssemblyId](#ServiceConfig.getStaticModByProjIdAndAssemblyId) : <code>string</code>
    * [.getComponentBimPropByIdAndProjId](#ServiceConfig.getComponentBimPropByIdAndProjId) : <code>string</code>
    * [.getComponentConfigByProjId](#ServiceConfig.getComponentConfigByProjId) : <code>string</code>
    * [.readResource](#ServiceConfig.readResource) : <code>string</code>

<a name="ServiceConfig.server"></a>

### ServiceConfig.server : <code>string</code>
<p>远程服务器</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.version"></a>

### ServiceConfig.version : <code>string</code>
<p>Rest Api 版本号</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.token"></a>

### ServiceConfig.token : <code>string</code>
<p>获取token接口</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.findProject"></a>

### ServiceConfig.findProject : <code>string</code>
<p>查询工程接口</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.listAssembly"></a>

### ServiceConfig.listAssembly : <code>string</code>
<p>查询组件列表</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.renderAssembly"></a>

### ServiceConfig.renderAssembly : <code>string</code>
<p>查询需要渲染的组件列表</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.listStaticModByProjectId"></a>

### ServiceConfig.listStaticModByProjectId : <code>string</code>
<p>根据工程id,查询工程静态模型组件列表</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.componentPropertiesTree"></a>

### ServiceConfig.componentPropertiesTree : <code>string</code>
<p>根据工程Id查询组件</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.componentPropertiesTreeStructure"></a>

### ServiceConfig.componentPropertiesTreeStructure : <code>string</code>
<p>根据工程id获取构件树结构</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.componentPropertiesTreeDetail"></a>

### ServiceConfig.componentPropertiesTreeDetail : <code>string</code>
<p>根据工程大小类获取构件列表</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.getStaticModByProjIdAndAssemblyId"></a>

### ServiceConfig.getStaticModByProjIdAndAssemblyId : <code>string</code>
<p>根据工程ID和模型Id查询构件的静态工程Id</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.getComponentBimPropByIdAndProjId"></a>

### ServiceConfig.getComponentBimPropByIdAndProjId : <code>string</code>
<p>根据工程ID和模型Id查询构件的静态工程Id</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.getComponentConfigByProjId"></a>

### ServiceConfig.getComponentConfigByProjId : <code>string</code>
<p>根据工程ID查询构件的配置信息</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="ServiceConfig.readResource"></a>

### ServiceConfig.readResource : <code>string</code>
<p>读取资源</p>

**Kind**: static property of [<code>ServiceConfig</code>](#ServiceConfig)  
<a name="App"></a>

## App
<p>应用模块</p>

**Kind**: global class  

* [App](#App)
    * [.Token(appid, secret)](#App.Token) ⇒ <code>Promise</code>
    * [.ValidateToken(token)](#App.ValidateToken) ⇒ <code>Promise</code>

<a name="App.Token"></a>

### App.Token(appid, secret) ⇒ <code>Promise</code>
<p>根据appid和secret获取Token</p>

**Kind**: static method of [<code>App</code>](#App)  
**Returns**: <code>Promise</code> - <p>包含tonken信息的Promise</p>  

| Param | Description |
| --- | --- |
| appid | <p>用户应用Id</p> |
| secret | <p>用户应用secret</p> |

<a name="App.ValidateToken"></a>

### App.ValidateToken(token) ⇒ <code>Promise</code>
<p>校验Token的有效性</p>

**Kind**: static method of [<code>App</code>](#App)  
**Returns**: <code>Promise</code> - <p>包含true|false的Promise</p>  

| Param | Description |
| --- | --- |
| token | <p>用户应用Id</p> |

<a name="Cartesian2"></a>

## Cartesian2
<p>二维坐标类，参考{@tutorial 坐标转换}</p>

**Kind**: global class  
<a name="new_Cartesian2_new"></a>

### new Cartesian2(x, y)

| Param | Type | Description |
| --- | --- | --- |
| x | <code>Number</code> | <p>x坐标</p> |
| y | <code>Number</code> | <p>y坐标</p> |

<a name="Cartesian3"></a>

## Cartesian3
<p>笛卡尔三维坐标类，参考{@tutorial 坐标转换}</p>

**Kind**: global class  

* [Cartesian3](#Cartesian3)
    * [.getProjectVectorLength(a, b)](#Cartesian3.getProjectVectorLength) ⇒ <code>number</code>
    * [.fromDegrees(longitude, latitude, height)](#Cartesian3.fromDegrees)

<a name="Cartesian3.getProjectVectorLength"></a>

### Cartesian3.getProjectVectorLength(a, b) ⇒ <code>number</code>
<p>投影向量a到向量b</p>

**Kind**: static method of [<code>Cartesian3</code>](#Cartesian3)  

| Param | Type |
| --- | --- |
| a | [<code>Cartesian3</code>](#Cartesian3) | 
| b | [<code>Cartesian3</code>](#Cartesian3) | 

<a name="Cartesian3.fromDegrees"></a>

### Cartesian3.fromDegrees(longitude, latitude, height)
<p>将经纬度转成三维坐标</p>

**Kind**: static method of [<code>Cartesian3</code>](#Cartesian3)  

| Param | Type | Description |
| --- | --- | --- |
| longitude | <code>Number</code> | <p>经度</p> |
| latitude | <code>Number</code> | <p>纬度</p> |
| height | <code>Number</code> | <p>高度</p> |

**Example**  
```js
var cartesian = Motor.Cartesian3.fromDegrees(121,31,5);
```
<a name="Cartographic"></a>

## Cartographic
<p>经纬度坐标类，参考{@tutorial 坐标转换}</p>

**Kind**: global class  

* [Cartographic](#Cartographic)
    * [new Cartographic(longitude, latitude, height)](#new_Cartographic_new)
    * [.fromCartesian(cartesian)](#Cartographic.fromCartesian) ⇒ [<code>Cartographic</code>](#Cartographic)
    * [.toCartesian(cartographic)](#Cartographic.toCartesian) ⇒ [<code>Cartesian3</code>](#Cartesian3)

<a name="new_Cartographic_new"></a>

### new Cartographic(longitude, latitude, height)

| Param | Type | Description |
| --- | --- | --- |
| longitude | <code>Number</code> | <p>经度(弧度制)</p> |
| latitude | <code>Number</code> | <p>纬度(弧度制)</p> |
| height | <code>Number</code> | <p>高度</p> |

<a name="Cartographic.fromCartesian"></a>

### Cartographic.fromCartesian(cartesian) ⇒ [<code>Cartographic</code>](#Cartographic)
<p>将三维笛卡尔坐标转换成经纬度坐标</p>

**Kind**: static method of [<code>Cartographic</code>](#Cartographic)  

| Param | Type | Description |
| --- | --- | --- |
| cartesian | [<code>Cartesian3</code>](#Cartesian3) | <p>三维坐标</p> |

<a name="Cartographic.toCartesian"></a>

### Cartographic.toCartesian(cartographic) ⇒ [<code>Cartesian3</code>](#Cartesian3)
<p>将经纬度坐标转换成三维笛卡尔坐标</p>

**Kind**: static method of [<code>Cartographic</code>](#Cartographic)  

| Param | Type | Description |
| --- | --- | --- |
| cartographic | [<code>Cartographic</code>](#Cartographic) | <p>经纬度坐标</p> |

<a name="Color"></a>

## Color
<p>颜色类</p>

**Kind**: global class  

* [Color](#Color)
    * [new Color(red, green, blue, alpha)](#new_Color_new)
    * [.fromCssColorString(color)](#Color+fromCssColorString) ⇒ [<code>Color</code>](#Color)

<a name="new_Color_new"></a>

### new Color(red, green, blue, alpha)

| Param | Type | Description |
| --- | --- | --- |
| red | <code>Number</code> | <p>0-1</p> |
| green | <code>Number</code> | <p>0-1</p> |
| blue | <code>Number</code> | <p>0-1</p> |
| alpha | <code>Number</code> | <p>0-1</p> |

<a name="Color+fromCssColorString"></a>

### color.fromCssColorString(color) ⇒ [<code>Color</code>](#Color)
<p>根据CSS颜色字符串生成颜色</p>

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| color | <code>String</code> | <p>CSS颜色字符串 #rgb, #rrggbb, rgb(), rgba(), hsl(), 或者 hsla() 格式.</p> |

**Example**  
```js
var color1 = Motor.Color.fromCssColorString('#67ADDF');var green = Motor.Color.fromCssColorString('green');
```
<a name="MouseEventHandler"></a>

## MouseEventHandler
**Kind**: global class  
<a name="new_MouseEventHandler_new"></a>

### new MouseEventHandler(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.projectId | <code>String</code> | <p>工程Id</p> |

<a name="GeometryCollection"></a>

## GeometryCollection
<p>几何体集合类，参考{@tutorial 自定义盒子绘制}</p>

**Kind**: global class  

* [GeometryCollection](#GeometryCollection)
    * [new GeometryCollection(options)](#new_GeometryCollection_new)
    * [.addBox(options)](#GeometryCollection+addBox)
    * [.removeById(id)](#GeometryCollection+removeById)
    * [.getPropertiesById(id)](#GeometryCollection+getPropertiesById)

<a name="new_GeometryCollection_new"></a>

### new GeometryCollection(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.viewer | [<code>Viewer</code>](#Viewer) | <p>Motor.Viewer实例化对象</p> |

<a name="GeometryCollection+addBox"></a>

### geometryCollection.addBox(options)
<p>添加盒子几何体</p>

**Kind**: instance method of [<code>GeometryCollection</code>](#GeometryCollection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.dimensions | [<code>Cartesian3</code>](#Cartesian3) | <p>盒子的长宽高</p> |
| options.center | [<code>Cartesian3</code>](#Cartesian3) | <p>盒子的中心点坐标</p> |
| [options.id] | <code>String</code> | <p>几何体的id</p> |
| [options.fillColor] | [<code>Color</code>](#Color) | <p>几何体的填充色</p> |
| [options.outline] | <code>Boolean</code> | <p>几何体的是否绘制边框线</p> |
| [options.outlineColor] | [<code>Color</code>](#Color) | <p>几何体边框线颜色</p> |
| [options.depthTest] | <code>Boolean</code> | <p>几何体是否进行深度检测</p> |

<a name="GeometryCollection+removeById"></a>

### geometryCollection.removeById(id)
<p>根据id删除几何体</p>

**Kind**: instance method of [<code>GeometryCollection</code>](#GeometryCollection)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | <p>几何体id</p> |

<a name="GeometryCollection+getPropertiesById"></a>

### geometryCollection.getPropertiesById(id)
<p>根据id获取几何体的属性</p>

**Kind**: instance method of [<code>GeometryCollection</code>](#GeometryCollection)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>Sring</code> | <p>几何体id</p> |

<a name="MarkerCollection"></a>

## MarkerCollection
<p>标注集合类，参考{@tutorial 添加标注}</p>

**Kind**: global class  

* [MarkerCollection](#MarkerCollection)
    * [new MarkerCollection(options)](#new_MarkerCollection_new)
    * [.length](#MarkerCollection+length) ⇒ <code>Number</code>
    * [.add(packets)](#MarkerCollection+add) ⇒ <code>Promise</code>
    * [.removeById(id)](#MarkerCollection+removeById)
    * [.removeAll()](#MarkerCollection+removeAll)

<a name="new_MarkerCollection_new"></a>

### new MarkerCollection(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.viewer | [<code>Viewer</code>](#Viewer) | <p>Motor.Viewer实例化对象</p> |
| [options.animated] | <code>Boolean</code> | <p>标注集内是否带有动画</p> |
| [options.interval] | <code>String</code> | <p>动画起止点，遵循ISO 8601时间格式标准，如&quot;2019-08-04T16:00:00Z/2019-08-04T16:00:05Z&quot;</p> |
| [options.loop] | <code>Boolean</code> | <p>是否循环播放动画</p> |

<a name="MarkerCollection+length"></a>

### markerCollection.length ⇒ <code>Number</code>
<p>获取标注数量</p>

**Kind**: instance property of [<code>MarkerCollection</code>](#MarkerCollection)  
**Read only**: true  
<a name="MarkerCollection+add"></a>

### markerCollection.add(packets) ⇒ <code>Promise</code>
<p>添加标注</p>

**Kind**: instance method of [<code>MarkerCollection</code>](#MarkerCollection)  

| Param | Type | Description |
| --- | --- | --- |
| packets | <code>Object</code> \| <code>Array.&lt;Object&gt;</code> | <p>标注的描述对象或对象数组</p> |

**Example**  
```js
markers.add({
    //标注id
    id:"marker1",
    //标注位置
    position: {
        epoch:"2019-08-04T16:00:00Z",//标注动画起始时间
        cartographicDegrees : [
            0, 121, 31, 5, //从起始时间开始第0秒的位置
            1, 121, 31, 10, //从起始时间开始第1秒的位置
            2, 121, 31, 5, //从起始时间开始第2秒的位置
        ]
    },
    //标注文字内容
    label: {
        text: "文字内容",
        font: "12px 微软雅黑",
        style: "FILL_AND_OUTLINE",//文字样式
        fillColor:{
            rgba : [255, 255, 255, 255]
        },
        outlineColor:{
            rgba : [0, 0, 0, 255]
        },
        outlineWidth:2,
        showBackground: true,
        backgroundColor: {
            rgba : [255, 0, 0, 255]
        },
        verticalOrigin: 'CENTER', //垂直原点
        horizontalOrigin: 'CENTER',//水平原点
        pixelOffset:{
            cartesian2:[-10,-30]//左移10个像素，上移30个像素
        },
    },
    //添加始终面向用户的图片标注
    billboard:{
        image: 'path/to/image',//图片地址
        verticalOrigin: 'BOTTOM',
        horizontalOrigin: 'LEFT',
        scale:2,//缩放比例
        pixelOffset:{
            cartesian2:[-10,-30]
        },
        rotation: 0.1//逆时针旋转角度(弧度制)
    },
    //添加点
    point:{
        pixelSize:5, //点的像素大小
        color:{
            rgba:[255,0,0,255]
        },
        outlineWidth:2,
        outlineColor:{
            rgba:[255,255,0,255]
        }
    },
    //自定义属性，用于点击标注时的返回值
    properties:{
        "名称":"标注1",
        "类型":"图标",
        "关联构建id":"guid",
        "经度":121,
        "纬度":31,
        "高度":5,
    }
});
```
<a name="MarkerCollection+removeById"></a>

### markerCollection.removeById(id)
<p>根据id移除标注</p>

**Kind**: instance method of [<code>MarkerCollection</code>](#MarkerCollection)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | <p>marker的id</p> |

<a name="MarkerCollection+removeAll"></a>

### markerCollection.removeAll()
<p>移除MarkerCollection中的所有标注</p>

**Kind**: instance method of [<code>MarkerCollection</code>](#MarkerCollection)  
<a name="DynamicCircle"></a>

## DynamicCircle
<p>动态圈效果类，参考{@tutorial 特效}</p>

**Kind**: global class  
<a name="new_DynamicCircle_new"></a>

### new DynamicCircle(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.position | [<code>Cartesian3</code>](#Cartesian3) |  | <p>扩散中心三维坐标</p> |
| [options.color] | [<code>Color</code>](#Color) | <code>new Color(1,1,1,1)</code> | <p>颜色</p> |
| [options.radius] | <code>Number</code> | <code>100</code> | <p>半径</p> |
| [options.width] | <code>Number</code> | <code>10</code> | <p>宽度</p> |

<a name="VideoProjection"></a>

## VideoProjection
<p>视频投影特效类，参考{@tutorial 特效}</p>

**Kind**: global class  

* [VideoProjection](#VideoProjection)
    * [new VideoProjection(options)](#new_VideoProjection_new)
    * [.heading](#VideoProjection+heading) : <code>Number</code>
    * [.pitch](#VideoProjection+pitch) : <code>Number</code>
    * [.roll](#VideoProjection+roll) : <code>Number</code>
    * [.viewerPosition](#VideoProjection+viewerPosition) : [<code>Cartesian3</code>](#Cartesian3)
    * [.targetPosition](#VideoProjection+targetPosition) : [<code>Cartesian3</code>](#Cartesian3)

<a name="new_VideoProjection_new"></a>

### new VideoProjection(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.viewer | [<code>Viewer</code>](#Viewer) |  | <p>Motor.Viewer实例化对象</p> |
| options.videoUrl | <code>String</code> |  | <p>视频地址，必须是HTML5支持的视频格式</p> |
| [options.near] | <code>Number</code> | <code>1</code> | <p>投影近截面</p> |
| [options.far] | <code>Number</code> | <code>100</code> | <p>投影近截面</p> |
| [options.viewerPosition] | [<code>Cartesian3</code>](#Cartesian3) | <code>new Motor.Cartesian3(0,0,0)</code> | <p>投影原点</p> |
| [options.targetPosition] | [<code>Cartesian3</code>](#Cartesian3) | <code>new Motor.Cartesian3(0,0,0)</code> | <p>投影目标点</p> |
| [options.heading] | <code>Number</code> |  | <p>投影方向</p> |
| [options.pitch] | <code>Number</code> |  | <p>投影方向上的俯仰角</p> |
| [options.roll] | <code>Number</code> |  | <p>绕投影方向的旋转角</p> |

<a name="VideoProjection+heading"></a>

### videoProjection.heading : <code>Number</code>
<p>获取或设置投影方向，单位为度</p>

**Kind**: instance property of [<code>VideoProjection</code>](#VideoProjection)  
<a name="VideoProjection+pitch"></a>

### videoProjection.pitch : <code>Number</code>
<p>获取或设置投影方向上的俯仰角，单位为度</p>

**Kind**: instance property of [<code>VideoProjection</code>](#VideoProjection)  
<a name="VideoProjection+roll"></a>

### videoProjection.roll : <code>Number</code>
<p>获取或设置绕投影方向的旋转角，单位为度</p>

**Kind**: instance property of [<code>VideoProjection</code>](#VideoProjection)  
<a name="VideoProjection+viewerPosition"></a>

### videoProjection.viewerPosition : [<code>Cartesian3</code>](#Cartesian3)
<p>获取或设置投影原点</p>

**Kind**: instance property of [<code>VideoProjection</code>](#VideoProjection)  
<a name="VideoProjection+targetPosition"></a>

### videoProjection.targetPosition : [<code>Cartesian3</code>](#Cartesian3)
<p>获取或设置投影目标点</p>

**Kind**: instance property of [<code>VideoProjection</code>](#VideoProjection)  
<a name="Water"></a>

## Water
<p>水面特效类，参考{@tutorial 特效}</p>

**Kind**: global class  
<a name="new_Water_new"></a>

### new Water(positions, [options])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| positions | [<code>Array.&lt;Cartesian3&gt;</code>](#Cartesian3) |  | <p>水面多边形顶点数组</p> |
| [options] | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| [options.flowAngle] | <code>Number</code> | <code>0</code> | <p>水流方向</p> |
| [options.reflectFactor] | <code>Number</code> | <code>0.5</code> | <p>反射系数</p> |
| [options.speed] | <code>Number</code> | <code>0.05</code> | <p>水流速度</p> |
| [options.waterColor] | <code>Number</code> | <code>new Motor.Color(0, 0.5, 0.5)</code> | <p>颜色</p> |

<a name="ComponentView"></a>

## ComponentView
<p>构件视图类</p>

**Kind**: global class  

* [ComponentView](#ComponentView)
    * [new ComponentView(options)](#new_ComponentView_new)
    * [.guid](#ComponentView+guid) : <code>String</code>
    * [.subProjectIds](#ComponentView+subProjectIds) : <code>String</code>
    * [.infos](#ComponentView+infos) : <code>Array.&lt;String&gt;</code>
    * [.project](#ComponentView+project) : [<code>ProjectView</code>](#ProjectView)
    * [.setColor(color)](#ComponentView+setColor)
    * [.setDefaultColor()](#ComponentView+setDefaultColor)
    * [.getSubprojectId()](#ComponentView+getSubprojectId) ⇒ <code>Promise</code>
    * [.getBIMProperties()](#ComponentView+getBIMProperties) ⇒ <code>Promise</code>

<a name="new_ComponentView_new"></a>

### new ComponentView(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.guid | <code>String</code> | <p>构件的GUID</p> |
| options.project | [<code>ProjectView</code>](#ProjectView) | <p>构件所属的工程视图</p> |
| [options.infos] | <code>Object</code> | <p>构件内保存的元数据</p> |

<a name="ComponentView+guid"></a>

### componentView.guid : <code>String</code>
<p>获取构件GUID</p>

**Kind**: instance property of [<code>ComponentView</code>](#ComponentView)  
**Read only**: true  
<a name="ComponentView+subProjectIds"></a>

### componentView.subProjectIds : <code>String</code>
<p>获取构件GUID</p>

**Kind**: instance property of [<code>ComponentView</code>](#ComponentView)  
**Read only**: true  
<a name="ComponentView+infos"></a>

### componentView.infos : <code>Array.&lt;String&gt;</code>
<p>获取构件内置属性</p>

**Kind**: instance property of [<code>ComponentView</code>](#ComponentView)  
**Read only**: true  
<a name="ComponentView+project"></a>

### componentView.project : [<code>ProjectView</code>](#ProjectView)
<p>获取所属工程视图</p>

**Kind**: instance property of [<code>ComponentView</code>](#ComponentView)  
**Read only**: true  
<a name="ComponentView+setColor"></a>

### componentView.setColor(color)
<p>设置构件颜色，参考{@tutorial 点选操作}</p>

**Kind**: instance method of [<code>ComponentView</code>](#ComponentView)  

| Param | Type | Description |
| --- | --- | --- |
| color | [<code>Color</code>](#Color) | <p>颜色值</p> |

<a name="ComponentView+setDefaultColor"></a>

### componentView.setDefaultColor()
<p>还原构件颜色</p>

**Kind**: instance method of [<code>ComponentView</code>](#ComponentView)  
<a name="ComponentView+getSubprojectId"></a>

### componentView.getSubprojectId() ⇒ <code>Promise</code>
<p>获取构件的子工程id</p>

**Kind**: instance method of [<code>ComponentView</code>](#ComponentView)  
**Returns**: <code>Promise</code> - <p>返回子工程id数组</p>  
<a name="ComponentView+getBIMProperties"></a>

### componentView.getBIMProperties() ⇒ <code>Promise</code>
<p>获取构件的BIM属性</p>

**Kind**: instance method of [<code>ComponentView</code>](#ComponentView)  
**Returns**: <code>Promise</code> - <p>返回子工程id数组</p>  
<a name="MarkerView"></a>

## MarkerView
<p>标注视图类</p>

**Kind**: global class  

* [MarkerView](#MarkerView)
    * [new MarkerView(options)](#new_MarkerView_new)
    * [.id](#MarkerView+id) : <code>String</code>
    * [.properties](#MarkerView+properties) : <code>Object</code>

<a name="new_MarkerView_new"></a>

### new MarkerView(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.entity | <code>Object</code> | <p>标注的图形对象</p> |

<a name="MarkerView+id"></a>

### markerView.id : <code>String</code>
<p>获取标注ID</p>

**Kind**: instance property of [<code>MarkerView</code>](#MarkerView)  
**Read only**: true  
<a name="MarkerView+properties"></a>

### markerView.properties : <code>Object</code>
<p>获取标注的自定义属性</p>

**Kind**: instance property of [<code>MarkerView</code>](#MarkerView)  
**Read only**: true  
<a name="Viewer"></a>

## Viewer
<p>Motor视窗，参考{@tutorial 初始化}</p>

**Kind**: global class  

* [Viewer](#Viewer)
    * [new Viewer(options)](#new_Viewer_new)
    * [.currentScene](#Viewer+currentScene) : [<code>SceneView</code>](#SceneView)
    * [.roamEditor](#Viewer+roamEditor) : [<code>RoamEditor</code>](#RoamEditor)
    * [.cameraMoveStart](#Viewer+cameraMoveStart) : <code>Event</code>
    * [.cameraMoveEnd](#Viewer+cameraMoveEnd) : <code>Event</code>
    * [.animatedSpeed](#Viewer+animatedSpeed)
    * [.navigationMode](#Viewer+navigationMode) : [<code>NavigationMode</code>](#NavigationMode)
    * [.enableMarquee](#Viewer+enableMarquee) : <code>Boolean</code>
    * [.cimControlMode](#Viewer+cimControlMode) : [<code>CIMControlMode</code>](#CIMControlMode)
    * [.viewerMode](#Viewer+viewerMode) : [<code>ViewerMode</code>](#ViewerMode)
    * [.currentView](#Viewer+currentView) : [<code>CameraView</code>](#CameraView)
    * [.loadModel(options)](#Viewer+loadModel) ⇒ <code>Object</code>
    * [.loadTileset(options)](#Viewer+loadTileset) ⇒ <code>Object</code>
    * [.remove(primitive)](#Viewer+remove)
    * [.loadSubProject(options)](#Viewer+loadSubProject) ⇒ <code>Promise</code>
    * [.removeScene(sceneView, [options])](#Viewer+removeScene)
    * [.gotoDefaultProjectView()](#Viewer+gotoDefaultProjectView)
    * [.pick(cartesian2)](#Viewer+pick) ⇒ [<code>ComponentView</code>](#ComponentView) \| [<code>MarkerView</code>](#MarkerView)
    * [.pickPosition(cartesian2)](#Viewer+pickPosition) ⇒ [<code>Cartesian3</code>](#Cartesian3)
    * [.addMouseEventListener(eventType, eventHandler)](#Viewer+addMouseEventListener)
    * [.removeMouseEventListener(eventType)](#Viewer+removeMouseEventListener)
    * [.zoomToComponent(componentView, [callback])](#Viewer+zoomToComponent)
    * [.setLookAtCenter([cartesian2])](#Viewer+setLookAtCenter)
    * [.homeView()](#Viewer+homeView)
    * [.setMap(map)](#Viewer+setMap)
    * [.addWater(positions, [options])](#Viewer+addWater)
    * [.removeWater(水面特效类的实例化对象)](#Viewer+removeWater)
    * [.createVolumeRender(options)](#Viewer+createVolumeRender) ⇒ [<code>VolumeRender</code>](#VolumeRender)
    * [.removeVolumeRender()](#Viewer+removeVolumeRender)
    * [.updateVolumeRender(image)](#Viewer+updateVolumeRender)
    * [.isDestroyed()](#Viewer+isDestroyed) ⇒ <code>Boolean</code>
    * [.destroy()](#Viewer+destroy) ⇒ <code>Object</code>
    * [.addVideoProject(options)](#Viewer+addVideoProject) ⇒ [<code>VideoProjection</code>](#VideoProjection)
    * [.removeVideoProjection(videoProjection)](#Viewer+removeVideoProjection)
    * [.setCurrentTime(date)](#Viewer+setCurrentTime)

<a name="new_Viewer_new"></a>

### new Viewer(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的Object对象</p> |
| options.container | <code>Element</code> \| <code>String</code> |  | <p>包含视窗的DOM元素或者ID</p> |
| options.appid | <code>String</code> |  | <p>用户appid</p> |
| options.secret | <code>String</code> |  | <p>用户secret</p> |
| [options.viewerMode] | <code>viewerMode</code> | <code>ViewerMode.CIM</code> | <p>默认视窗模式</p> |
| [options.navigationMode] | [<code>NavigationMode</code>](#NavigationMode) | <code>NavigationMode.DYNAMIC</code> | <p>默认导航模式</p> |
| [options.access_token] | <code>String</code> |  | <p>默认的access_token</p> |
| [options.map] | [<code>BaseMap</code>](#BaseMap) | <code>new Motor.TiandituMap()</code> | <p>默认的地图底图</p> |
| [options.enableBloom] | <code>Boolean</code> | <code>false</code> | <p>是否开启辉光</p> |
| [options.enableAO] | <code>Boolean</code> | <code>false</code> | <p>是否开启环境光遮蔽</p> |
| [options.enableShadow] | <code>Boolean</code> | <code>false</code> | <p>是否开启阴影</p> |
| [options.enableFixedFrameRate] | <code>Boolean</code> | <code>false</code> | <p>是否开启固定帧率</p> |
| [options.enableBIMViewCube] | <code>Boolean</code> | <code>true</code> | <p>是否开启导航方块，默认开启，移动端不开启</p> |
| [options.viewCubeConfig] | [<code>ViewCubeConfig</code>](#ViewCubeConfig) |  | <p>导航方块参数</p> |
| [options.cimControlMode] | [<code>CIMControlMode</code>](#CIMControlMode) | <code>Motor.CIMControlMode.MOTOR</code> | <p>CIM模式下的鼠标控制逻辑</p> |
| [options.backgroundColor] | [<code>Color</code>](#Color) | <code>new Motor.Color(0.98, 0.98,, 0.95)</code> | <p>背景颜色，仅适用于BIM模式</p> |

**Example**  
```js
var viewer = new Motor.Viewer({  container: 'container',  viewerMode: Motor.ViewerMode.BIM,  server: server,  access_token: access_token});
```
<a name="Viewer+currentScene"></a>

### viewer.currentScene : [<code>SceneView</code>](#SceneView)
<p>当前场景对象</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+roamEditor"></a>

### viewer.roamEditor : [<code>RoamEditor</code>](#RoamEditor)
<p>第一人称视角控制器</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+cameraMoveStart"></a>

### viewer.cameraMoveStart : <code>Event</code>
<p>相机开始移动的事件</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+cameraMoveEnd"></a>

### viewer.cameraMoveEnd : <code>Event</code>
<p>相机结束移动的事件</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+animatedSpeed"></a>

### viewer.animatedSpeed
<p>获取或设置3D-Tiles建筑物拔地而起的动画速率，参考{@tutorial 特效}</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+navigationMode"></a>

### viewer.navigationMode : [<code>NavigationMode</code>](#NavigationMode)
<p>获取或设置导航模式，参考{@tutorial 视角控制}</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+enableMarquee"></a>

### viewer.enableMarquee : <code>Boolean</code>
<p>是否开启框选放大，参考{@tutorial 视角控制}</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+cimControlMode"></a>

### viewer.cimControlMode : [<code>CIMControlMode</code>](#CIMControlMode)
<p>获取或设置CIM场景下的鼠标控制模式，参考{@tutorial 模式切换}</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+viewerMode"></a>

### viewer.viewerMode : [<code>ViewerMode</code>](#ViewerMode)
<p>获取或设置当前视窗模式（BIM/CIM），参考{@tutorial 模式切换}</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+currentView"></a>

### viewer.currentView : [<code>CameraView</code>](#CameraView)
<p>获取或设置当前相机视角参数</p>

**Kind**: instance property of [<code>Viewer</code>](#Viewer)  
**Example**  
```js
//使用中心点viewer.currentView={ center:Motor.Cartesian3.fromDegrees(121,31,0), //相机观察中心 heading: 90, //90°朝向 pitch: -40, //向下40°俯角 range: 100 //相机距离中心点100米}//使用相机位置viewer.currentView={ position: Motor.Cartesian3.fromDegrees(121,31,100), //相机位置 heading: 90, //90°朝向 pitch: -40, //向下40°俯角 roll: 10 //顺时针方向绕相机朝向向量旋转10°}
```
<a name="Viewer+loadModel"></a>

### viewer.loadModel(options) ⇒ <code>Object</code>
<p>加载gltf模型，参考{@tutorial 加载数据}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
**Returns**: <code>Object</code> - <p>返回模型对象</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的Object对象</p> |
| options.url | <code>String</code> |  | <p>模型路径</p> |
| options.origin | [<code>Cartesian3</code>](#Cartesian3) |  | <p>放置模型的原点坐标</p> |
| [options.translation] | [<code>Cartesian3</code>](#Cartesian3) | <code>new Cartesian3(0,0,0)</code> | <p>XYZ轴的平移量</p> |
| [options.rotationZ] | <code>Number</code> | <code>0</code> | <p>Z轴旋转量</p> |
| [options.zoomTo] | <code>Boolean</code> | <code>true</code> | <p>镜头是否移动到模型</p> |
| [options.luminanceAtZenith] | <code>Number</code> | <code>0.5</code> | <p>模型亮度,[0-1]</p> |

**Example**  
```js
var model = viewer.loadModel({ url:'path/to/model.gltf', origin:Motor.Cartesian3.fromDegrees(121,31,0)})
```
<a name="Viewer+loadTileset"></a>

### viewer.loadTileset(options) ⇒ <code>Object</code>
<p>添加3d-tiles数据，参考{@tutorial 加载数据}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
**Returns**: <code>Object</code> - <p>tileset对象</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.url | <code>String</code> |  | <p>数据地址</p> |
| [options.useGradual] | <code>Boolean</code> | <code>false</code> | <p>是否开启渐变特效</p> |
| [options.planView] | <code>Boolean</code> | <code>false</code> | <p>是否开启俯视压平特效</p> |
| [options.shouldAnimate] | <code>Boolean</code> | <code>false</code> | <p>是否开启建筑上升动画特效</p> |
| [options.gradualOptions] | <code>Object</code> |  | <p>渐变特效参数</p> |
| [options.gradualOptions.startColor] | <code>Object</code> |  | <p>渐变起始颜色</p> |
| [options.gradualOptions.endColor] | <code>Object</code> |  | <p>渐变结束颜色</p> |
| [options.gradualOptions.gradualOffset] | <code>Object</code> |  | <p>渐变结束高度</p> |
| [options.luminanceAtZenith] | <code>Number</code> | <code>0.5</code> | <p>模型亮度,[0-1]</p> |

<a name="Viewer+remove"></a>

### viewer.remove(primitive)
<p>删除模型或者3d-tiles数据</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| primitive | <code>Object</code> | <p>模型或者3d-tiles对象</p> |

<a name="Viewer+loadSubProject"></a>

### viewer.loadSubProject(options) ⇒ <code>Promise</code>
<p>加载子工程，加载静态模型工程，参考{@tutorial 加载数据}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
**Returns**: <code>Promise</code> - <p>加载完成的Promise</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| [options.projectId] | <code>String</code> \| <code>Array.&lt;String&gt;</code> |  | <p>工程id或工程id数组</p> |
| [options.parentComponent] | [<code>ComponentView</code>](#ComponentView) |  | <p>父工程中对应构件</p> |
| [options.drawEdge] | <code>Boolean</code> | <code>false</code> | <p>是否绘制边线</p> |
| [options.luminanceAtZenith] | <code>Number</code> | <code>0.5</code> | <p>模型亮度, [0-1]</p> |

**Example**  
```js
viewer.loadSubProject({ projectId: projectId, drawEdge: true})
```
<a name="Viewer+removeScene"></a>

### viewer.removeScene(sceneView, [options])
<p>移除场景</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| sceneView | [<code>SceneView</code>](#SceneView) | <p>场景对象</p> |
| [options] | <code>Object</code> | <p>包含以下参数的对象</p> |
| [options.parentComponent] | [<code>ComponentView</code>](#ComponentView) | <p>删除子工程时需要的父构件</p> |

<a name="Viewer+gotoDefaultProjectView"></a>

### viewer.gotoDefaultProjectView()
<p>返回当前工程的默认视角，参考{@tutorial 视角控制}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+pick"></a>

### viewer.pick(cartesian2) ⇒ [<code>ComponentView</code>](#ComponentView) \| [<code>MarkerView</code>](#MarkerView)
<p>根据屏幕坐标获取场景对象，参考{@tutorial 点选操作}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| cartesian2 | [<code>Cartesian2</code>](#Cartesian2) | <p>屏幕坐标</p> |

<a name="Viewer+pickPosition"></a>

### viewer.pickPosition(cartesian2) ⇒ [<code>Cartesian3</code>](#Cartesian3)
<p>根据屏幕坐标获取三维空间坐标，参考{@tutorial 点选操作}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| cartesian2 | [<code>Cartesian2</code>](#Cartesian2) | <p>屏幕坐标</p> |

<a name="Viewer+addMouseEventListener"></a>

### viewer.addMouseEventListener(eventType, eventHandler)
<p>添加鼠标事件，参考{@tutorial 点选操作}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| eventType | [<code>MouseEventType</code>](#MouseEventType) | <p>事件类型</p> |
| eventHandler | [<code>eventHandler</code>](#eventHandler) | <p>回调函数</p> |

<a name="Viewer+removeMouseEventListener"></a>

### viewer.removeMouseEventListener(eventType)
<p>移除鼠标事件，参考{@tutorial 点选操作}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| eventType | [<code>MouseEventType</code>](#MouseEventType) | <p>事件类型</p> |

<a name="Viewer+zoomToComponent"></a>

### viewer.zoomToComponent(componentView, [callback])
<p>镜头移动到构件，参考{@tutorial 视角控制}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| componentView | [<code>ComponentView</code>](#ComponentView) | <p>构件视图对象</p> |
| [callback] | <code>function</code> | <p>飞行结束的回调函数</p> |

**Example**  
```js
//传入ComponentView对象viewer.zoomToComponent(componentView);
```
<a name="Viewer+setLookAtCenter"></a>

### viewer.setLookAtCenter([cartesian2])
<p>设置相机旋转中心，只在viewerMode为DYNAMIC时有效</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| [cartesian2] | [<code>Cartesian2</code>](#Cartesian2) | <p>屏幕坐标, 不提供则直接使用当前屏幕中心坐标</p> |

<a name="Viewer+homeView"></a>

### viewer.homeView()
<p>CIM模式下，视角定位到全球</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+setMap"></a>

### viewer.setMap(map)
<p>设置地图服务，参考{@tutorial 地图服务}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| map | [<code>BaseMap</code>](#BaseMap) | <p>地图服务类</p> |

<a name="Viewer+addWater"></a>

### viewer.addWater(positions, [options])
<p>添加水面，参考{@tutorial 特效}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| positions | [<code>Array.&lt;Cartesian3&gt;</code>](#Cartesian3) |  | <p>水面多边形顶点数组</p> |
| [options] | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| [options.flowAngle] | <code>Number</code> | <code>0</code> | <p>水流方向</p> |
| [options.reflectFactor] | <code>Number</code> | <code>0.5</code> | <p>反射系数</p> |
| [options.speed] | <code>Number</code> | <code>0.05</code> | <p>水流速度</p> |
| [options.waterColor] | <code>Number</code> | <code>new Motor.Color(0, 0.5, 0.5)</code> | <p>颜色</p> |

<a name="Viewer+removeWater"></a>

### viewer.removeWater(水面特效类的实例化对象)
<p>删除水面，参考{@tutorial 特效}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type |
| --- | --- |
| 水面特效类的实例化对象 | [<code>Water</code>](#Water) | 

<a name="Viewer+createVolumeRender"></a>

### viewer.createVolumeRender(options) ⇒ [<code>VolumeRender</code>](#VolumeRender)
<p>添加体渲染，参考{@tutorial 特效}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.dimensions | <code>Array.&lt;Number&gt;</code> |  | <p>体渲染包围盒长宽高</p> |
| options.center | [<code>Cartesian3</code>](#Cartesian3) |  | <p>包围盒中心三维坐标</p> |
| options.image | <code>String</code> |  | <p>体渲染数据图片</p> |
| [options.isRGB] | <code>Boolean</code> | <code>true</code> | <p>是否按照图片颜色显示</p> |
| [options.colorScheme] | <code>Array.&lt;Object&gt;</code> |  | <p>自定义色表</p> |
| [options.alphaCorrection] | <code>Number</code> | <code>0.5</code> | <p>透明度修正指数</p> |

**Example**  
```js
var volumeRender = viewer.createVolumeRender({
    center: Motor.Cartesian3.fromDegrees(121,31,300),
    dimensions: [15520.3208, 12046.920233, 600],
    image: 'path/to/volume/image',
    isRGB: false,
    alphaCorrection: 0.1,
    colorScheme: [
        {stop: 0.1, color: 'rgba(0, 0, 255, 0.6)'},
        {stop: 0.2, color: 'rgba(162, 180, 189, 1)'},
        {stop: 0.4, color: 'rgba(255, 255, 0, 1)'},
        {stop: 0.6, color: 'rgba(245, 152, 105, 1)'},
        {stop: 0.8, color: 'rgba(255, 10, 10, 1)'},
        {stop: 1.0, color: 'rgba(255, 0, 0, 1)'},
    ]
});
```
<a name="Viewer+removeVolumeRender"></a>

### viewer.removeVolumeRender()
<p>删除体渲染，参考{@tutorial 特效}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+updateVolumeRender"></a>

### viewer.updateVolumeRender(image)
<p>更新体渲染数据，参考{@tutorial 特效}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| image | <code>String</code> | <p>图片url</p> |

<a name="Viewer+isDestroyed"></a>

### viewer.isDestroyed() ⇒ <code>Boolean</code>
<p>Viewer是否销毁</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
<a name="Viewer+destroy"></a>

### viewer.destroy() ⇒ <code>Object</code>
<p>销毁Viewer</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  
**Returns**: <code>Object</code> - <p>销毁后的对象</p>  
<a name="Viewer+addVideoProject"></a>

### viewer.addVideoProject(options) ⇒ [<code>VideoProjection</code>](#VideoProjection)
<p>添加视频投影，参考{@tutorial 特效}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.videoUrl | <code>String</code> |  | <p>视频地址，必须是HTML5支持的视频格式</p> |
| [options.near] | <code>Number</code> | <code>1</code> | <p>投影近截面</p> |
| [options.far] | <code>Number</code> | <code>100</code> | <p>投影近截面</p> |
| [options.viewerPosition] | [<code>Cartesian3</code>](#Cartesian3) | <code>new Motor.Cartesian3(0,0,0)</code> | <p>投影原点</p> |
| [options.targetPosition] | [<code>Cartesian3</code>](#Cartesian3) | <code>new Motor.Cartesian3(0,0,0)</code> | <p>投影目标点</p> |
| [options.heading] | <code>Number</code> |  | <p>投影方向</p> |
| [options.pitch] | <code>Number</code> |  | <p>投影方向上的俯仰角</p> |
| [options.roll] | <code>Number</code> |  | <p>绕投影方向的旋转角</p> |

<a name="Viewer+removeVideoProjection"></a>

### viewer.removeVideoProjection(videoProjection)
<p>删除视频投影，参考{@tutorial 特效}</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| videoProjection | [<code>VideoProjection</code>](#VideoProjection) | <p>视频投影特效实例化对象</p> |

<a name="Viewer+setCurrentTime"></a>

### viewer.setCurrentTime(date)
<p>设置场景时间</p>

**Kind**: instance method of [<code>Viewer</code>](#Viewer)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>Date</code> | <p>javascript的Date对象</p> |

<a name="ProjectView"></a>

## ProjectView
<p>工程视图模块</p>

**Kind**: global class  

* [ProjectView](#ProjectView)
    * [new ProjectView(options)](#new_ProjectView_new)
    * [.isReady](#ProjectView+isReady) : <code>Boolean</code>
    * [.projectId](#ProjectView+projectId) : <code>String</code>
    * [.name](#ProjectView+name) : <code>String</code>
    * [.components](#ProjectView+components) : [<code>Array.&lt;ComponentView&gt;</code>](#ComponentView)
    * [.drawEdge](#ProjectView+drawEdge) : <code>Boolean</code>
    * [.setVisiblityFromTree(treeObjects)](#ProjectView+setVisiblityFromTree)

<a name="new_ProjectView_new"></a>

### new ProjectView(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.projectId | <code>String</code> |  | <p>工程Id</p> |
| options.access_token | <code>String</code> |  | <p>access_token</p> |
| [options.name] | <code>String</code> |  | <p>工程名称</p> |
| [options.modelCollection] | <code>Object</code> |  | <p>模型集合</p> |
| [options.origin] | [<code>Cartesian3</code>](#Cartesian3) |  | <p>场景原点</p> |
| [options.drawEdge] | <code>Boolean</code> | <code>false</code> | <p>是否绘制边线</p> |
| [options.assemblies] | <code>Array.&lt;Object&gt;</code> |  | <p>工程包含的组件</p> |
| [options.maxSearchTreeDepth] | <code>Number</code> |  | <p>构件树搜索深度</p> |

<a name="ProjectView+isReady"></a>

### projectView.isReady : <code>Boolean</code>
<p>工程是否加载完毕</p>

**Kind**: instance property of [<code>ProjectView</code>](#ProjectView)  
<a name="ProjectView+projectId"></a>

### projectView.projectId : <code>String</code>
<p>获取工程ID</p>

**Kind**: instance property of [<code>ProjectView</code>](#ProjectView)  
<a name="ProjectView+name"></a>

### projectView.name : <code>String</code>
<p>获取工程名称</p>

**Kind**: instance property of [<code>ProjectView</code>](#ProjectView)  
<a name="ProjectView+components"></a>

### projectView.components : [<code>Array.&lt;ComponentView&gt;</code>](#ComponentView)
<p>获取工程中的构件列表，只适用于场景工程</p>

**Kind**: instance property of [<code>ProjectView</code>](#ProjectView)  
<a name="ProjectView+drawEdge"></a>

### projectView.drawEdge : <code>Boolean</code>
<p>是否绘制边线</p>

**Kind**: instance property of [<code>ProjectView</code>](#ProjectView)  
<a name="ProjectView+setVisiblityFromTree"></a>

### projectView.setVisiblityFromTree(treeObjects)
<p>根据构件树控制显示隐藏</p>

**Kind**: instance method of [<code>ProjectView</code>](#ProjectView)  

| Param | Type | Description |
| --- | --- | --- |
| treeObjects | <code>Object</code> | <p>构件树对象</p> |

<a name="SceneView"></a>

## SceneView
<p>场景视图模块</p>

**Kind**: global class  

* [SceneView](#SceneView)
    * [new SceneView(options)](#new_SceneView_new)
    * [.isReady](#SceneView+isReady) : <code>Boolean</code>
    * [.id](#SceneView+id) : <code>String</code>
    * [.parentSceneId](#SceneView+parentSceneId)
    * [.name](#SceneView+name) : <code>String</code>
    * [.drawEdge](#SceneView+drawEdge) : <code>Boolean</code>
    * [.edgeColor](#SceneView+edgeColor) : <code>Boolean</code>
    * [.projectList](#SceneView+projectList) : [<code>Array.&lt;ProjectView&gt;</code>](#ProjectView)
    * [.addProject(projectView)](#SceneView+addProject)
    * [.setVisiblityFromTree(treeNode)](#SceneView+setVisiblityFromTree)
    * [.hideFromGuids([projectId], guids)](#SceneView+hideFromGuids)
    * [.showFromGuids([projectId], guids)](#SceneView+showFromGuids)
    * ~~[.setHighlightComponentsFromTree([projectId], [ruleString], [guid], color)](#SceneView+setHighlightComponentsFromTree)~~
    * [.setHighlightComponentsFromTypes(projectId, [ruleString], [guid], color)](#SceneView+setHighlightComponentsFromTypes)
    * [.hideComponentsFromTypes([projectId], [ruleString], [guid])](#SceneView+hideComponentsFromTypes)
    * [.showComponentsFromTypes([projectId], [ruleString], [guid])](#SceneView+showComponentsFromTypes)
    * [.setHighlightComponentsFromGuids(guids, color, [projectId])](#SceneView+setHighlightComponentsFromGuids)
    * [.setBlinkComponentsFromGuids(guids, color, [interval], [projectId])](#SceneView+setBlinkComponentsFromGuids)
    * [.clearBlinkComponentsFromGuids(guids, [projectId])](#SceneView+clearBlinkComponentsFromGuids)
    * [.clearHighlightComponents()](#SceneView+clearHighlightComponents)
    * [.getComponentFromTree(projectId, treeNode)](#SceneView+getComponentFromTree) ⇒ [<code>ComponentView</code>](#ComponentView)
    * [.setColorForAll(color)](#SceneView+setColorForAll)

<a name="new_SceneView_new"></a>

### new SceneView(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.id | <code>String</code> |  | <p>场景Id</p> |
| [options.name] | <code>String</code> |  | <p>场景名称</p> |
| [options.origin] | [<code>Cartesian3</code>](#Cartesian3) |  | <p>场景原点</p> |
| [options.drawEdge] | <code>Boolean</code> | <code>false</code> | <p>是否绘制边线</p> |
| [options.maxSearchTreeDepth] | <code>Number</code> | <code>3</code> | <p>构件树搜索深度</p> |

<a name="SceneView+isReady"></a>

### sceneView.isReady : <code>Boolean</code>
<p>工程是否加载完毕</p>

**Kind**: instance property of [<code>SceneView</code>](#SceneView)  
<a name="SceneView+id"></a>

### sceneView.id : <code>String</code>
<p>获取ID</p>

**Kind**: instance property of [<code>SceneView</code>](#SceneView)  
<a name="SceneView+parentSceneId"></a>

### sceneView.parentSceneId
<p>获取父场景ID</p>

**Kind**: instance property of [<code>SceneView</code>](#SceneView)  
<a name="SceneView+name"></a>

### sceneView.name : <code>String</code>
<p>获取名称</p>

**Kind**: instance property of [<code>SceneView</code>](#SceneView)  
<a name="SceneView+drawEdge"></a>

### sceneView.drawEdge : <code>Boolean</code>
<p>是否绘制边线</p>

**Kind**: instance property of [<code>SceneView</code>](#SceneView)  
<a name="SceneView+edgeColor"></a>

### sceneView.edgeColor : <code>Boolean</code>
<p>获取或设置边线颜色</p>

**Kind**: instance property of [<code>SceneView</code>](#SceneView)  
<a name="SceneView+projectList"></a>

### sceneView.projectList : [<code>Array.&lt;ProjectView&gt;</code>](#ProjectView)
<p>获取场景内工程视图列表</p>

**Kind**: instance property of [<code>SceneView</code>](#SceneView)  
**Read only**: true  
<a name="SceneView+addProject"></a>

### sceneView.addProject(projectView)
<p>添加工程视图到场景视图中</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| projectView | [<code>ProjectView</code>](#ProjectView) | <p>工程ProjectView</p> |

<a name="SceneView+setVisiblityFromTree"></a>

### sceneView.setVisiblityFromTree(treeNode)
<p>根据构件树控制显示隐藏，仅用于BIM工程，参考{@tutorial 构件树}</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| treeNode | <code>Object</code> | <p>构件树节点</p> |

<a name="SceneView+hideFromGuids"></a>

### sceneView.hideFromGuids([projectId], guids)
<p>根据构件id控制隐藏</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| [projectId] | <code>String</code> | <p>工程id</p> |
| guids | <code>Array.&lt;String&gt;</code> | <p>构件id数组</p> |

<a name="SceneView+showFromGuids"></a>

### sceneView.showFromGuids([projectId], guids)
<p>根据构件id控制显示</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| [projectId] | <code>String</code> | <p>工程id</p> |
| guids | <code>Array.&lt;String&gt;</code> | <p>构件id数组</p> |

<a name="SceneView+setHighlightComponentsFromTree"></a>

### ~~sceneView.setHighlightComponentsFromTree([projectId], [ruleString], [guid], color)~~
***Deprecated***

<p>根据构件树控制某种类型的构件高亮，只适用于BIM工程，参考{@tutorial 构件树}</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| [projectId] | <code>String</code> | <p>工程id</p> |
| [ruleString] | <code>String</code> | <p>规则字符串，构件id为空时必填</p> |
| [guid] | <code>String</code> | <p>构件id，规则字符串为空时必填</p> |
| color | [<code>Color</code>](#Color) | <p>高亮颜色</p> |

<a name="SceneView+setHighlightComponentsFromTypes"></a>

### sceneView.setHighlightComponentsFromTypes(projectId, [ruleString], [guid], color)
<p>根据属性控制某种类型的构件高亮，只适用于BIM工程</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>String</code> | <p>工程id</p> |
| [ruleString] | <code>String</code> | <p>规则字符串，构件id为空时必填</p> |
| [guid] | <code>String</code> | <p>构件id，规则字符串为空时必填</p> |
| color | [<code>Color</code>](#Color) | <p>高亮颜色</p> |

<a name="SceneView+hideComponentsFromTypes"></a>

### sceneView.hideComponentsFromTypes([projectId], [ruleString], [guid])
<p>根据属性控制某种类型的构件隐藏，只适用于BIM工程</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| [projectId] | <code>String</code> | <p>工程id</p> |
| [ruleString] | <code>String</code> | <p>规则字符串，构件id为空时必填</p> |
| [guid] | <code>String</code> | <p>构件id，规则字符串为空时必填</p> |

<a name="SceneView+showComponentsFromTypes"></a>

### sceneView.showComponentsFromTypes([projectId], [ruleString], [guid])
<p>根据属性控制某种类型的构件显示，只适用于BIM工程</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| [projectId] | <code>String</code> | <p>工程id</p> |
| [ruleString] | <code>String</code> | <p>规则字符串，构件id为空时必填</p> |
| [guid] | <code>String</code> | <p>构件id，规则字符串为空时必填</p> |

<a name="SceneView+setHighlightComponentsFromGuids"></a>

### sceneView.setHighlightComponentsFromGuids(guids, color, [projectId])
<p>根据guid控制构件高亮</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| guids | <code>String</code> | <p>构件id数组</p> |
| color | [<code>Color</code>](#Color) | <p>高亮颜色</p> |
| [projectId] | <code>String</code> | <p>子工程id</p> |

<a name="SceneView+setBlinkComponentsFromGuids"></a>

### sceneView.setBlinkComponentsFromGuids(guids, color, [interval], [projectId])
<p>根据guid控制构件闪烁</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| guids | <code>String</code> |  | <p>构件id数组</p> |
| color | [<code>Color</code>](#Color) |  | <p>闪烁颜色</p> |
| [interval] | <code>Number</code> | <code>1000</code> | <p>闪烁间隔时长，毫秒</p> |
| [projectId] | <code>String</code> |  | <p>子工程id</p> |

<a name="SceneView+clearBlinkComponentsFromGuids"></a>

### sceneView.clearBlinkComponentsFromGuids(guids, [projectId])
<p>根据guid清除构件闪烁</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type | Description |
| --- | --- | --- |
| guids | <code>String</code> | <p>构件id数组</p> |
| [projectId] | <code>String</code> | <p>子工程id</p> |

<a name="SceneView+clearHighlightComponents"></a>

### sceneView.clearHighlightComponents()
<p>清除构件高亮</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  
<a name="SceneView+getComponentFromTree"></a>

### sceneView.getComponentFromTree(projectId, treeNode) ⇒ [<code>ComponentView</code>](#ComponentView)
<p>根据构件树节点返回构件，只适用于BIM工程，参考{@tutorial 构件树}</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  
**Returns**: [<code>ComponentView</code>](#ComponentView) - <p>该节点对应的构件视图</p>  

| Param | Type | Description |
| --- | --- | --- |
| projectId | <code>String</code> | <p>工程id</p> |
| treeNode | <code>Object</code> | <p>构件树节点</p> |

<a name="SceneView+setColorForAll"></a>

### sceneView.setColorForAll(color)
<p>设置场景内所有构件的颜色</p>

**Kind**: instance method of [<code>SceneView</code>](#SceneView)  

| Param | Type |
| --- | --- |
| color | [<code>Color</code>](#Color) | 

<a name="VolumeRender"></a>

## VolumeRender
<p>体渲染类，参考{@tutorial 特效}</p>

**Kind**: global class  
<a name="VolumeRender+alphaCorrection"></a>

### volumeRender.alphaCorrection
<p>获取或设置透明度校正</p>

**Kind**: instance property of [<code>VolumeRender</code>](#VolumeRender)  
<a name="ArcGISMap"></a>

## ArcGISMap ⇐ [<code>BaseMap</code>](#BaseMap)
<p>ArcGIS地图服务类，参考{@tutorial 地图服务}</p>

**Kind**: global class  
**Extends**: [<code>BaseMap</code>](#BaseMap)  
<a name="new_ArcGISMap_new"></a>

### new ArcGISMap(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.url | <code>String</code> |  | <p>地图服务地址</p> |
| [options.enablePickFeatures] | <code>Boolean</code> | <code>false</code> | <p>是否开启点击</p> |
| [options.tilingScheme] | [<code>TilingScheme</code>](#TilingScheme) | <code>GeographicTilingScheme</code> | <p>地图切片方案</p> |
| [options.maximumLevel] | <code>Number</code> |  | <p>显示地图的最大层级</p> |

<a name="BaseMap"></a>

## BaseMap
<p>基础地图类，参考{@tutorial 地图服务}</p>

**Kind**: global class  
**See**

- WebMapTileService
- TiandituMap
- ArcGISMap
- BingMap

<a name="new_BaseMap_new"></a>

### new BaseMap(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| [options.tilingScheme] | [<code>TilingScheme</code>](#TilingScheme) | <code>GeographicTilingScheme</code> | <p>地图切片方案</p> |
| [options.maximumLevel] | <code>Number</code> |  | <p>显示地图的最大层级</p> |

<a name="BingMap"></a>

## BingMap ⇐ [<code>BaseMap</code>](#BaseMap)
<p>Bing地图服务类，参考{@tutorial 地图服务}</p>

**Kind**: global class  
**Extends**: [<code>BaseMap</code>](#BaseMap)  
<a name="new_BingMap_new"></a>

### new BingMap(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.url | <code>String</code> |  | <p>Bing地图服务地址</p> |
| [options.key] | <code>String</code> |  | <p>Bing地图服务密钥</p> |
| [options.mapStyle] | [<code>BingMapStyle</code>](#BingMapStyle) | <code>BingMapStyle.AERIAL</code> | <p>地图样式</p> |
| [options.tilingScheme] | [<code>TilingScheme</code>](#TilingScheme) | <code>GeographicTilingScheme</code> | <p>地图切片方案</p> |
| [options.maximumLevel] | <code>Number</code> |  | <p>显示地图的最大层级</p> |

<a name="TiandituMap"></a>

## TiandituMap ⇐ [<code>BaseMap</code>](#BaseMap)
<p>天地图类，参考{@tutorial 地图服务}</p>

**Kind**: global class  
**Extends**: [<code>BaseMap</code>](#BaseMap)  
<a name="new_TiandituMap_new"></a>

### new TiandituMap(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.token | <code>String</code> |  | <p>天地图服务token</p> |
| [options.mapStyle] | [<code>TiandituMapStyle</code>](#TiandituMapStyle) | <code>TiandituMapStyle.IMAGE</code> | <p>天地图样式</p> |
| [options.tilingScheme] | [<code>TilingScheme</code>](#TilingScheme) | <code>GeographicTilingScheme</code> | <p>地图切片方案</p> |
| [options.maximumLevel] | <code>Number</code> |  | <p>显示地图的最大层级</p> |

<a name="WebMapTileService"></a>

## WebMapTileService ⇐ [<code>BaseMap</code>](#BaseMap)
<p>WMTS地图服务类，参考{@tutorial 地图服务}</p>

**Kind**: global class  
**Extends**: [<code>BaseMap</code>](#BaseMap)  
<a name="new_WebMapTileService_new"></a>

### new WebMapTileService(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.url | <code>String</code> |  | <p>地图服务地址</p> |
| options.layer | <code>String</code> |  | <p>图层名</p> |
| options.style | <code>String</code> |  | <p>图层样式名</p> |
| options.tileMatrixSetID | <code>String</code> |  | <p>TileMatrixSet名称</p> |
| [options.tileMatrixLabels] | <code>String</code> |  | <p>tileMatrixLabels</p> |
| [options.tilingScheme] | [<code>TilingScheme</code>](#TilingScheme) | <code>GeographicTilingScheme</code> | <p>地图切片方案</p> |
| [options.maximumLevel] | <code>Number</code> |  | <p>显示地图的最大层级</p> |

<a name="MarqueeEditor"></a>

## MarqueeEditor
<p>框选放大编辑器</p>

**Kind**: global class  

* [MarqueeEditor](#MarqueeEditor)
    * [new MarqueeEditor(options)](#new_MarqueeEditor_new)
    * [.marqueeStart](#MarqueeEditor+marqueeStart) : <code>Event</code>
    * [.marqueeStop](#MarqueeEditor+marqueeStop) : <code>Event</code>
    * [.startMarquee()](#MarqueeEditor+startMarquee)
    * [.destroy()](#MarqueeEditor+destroy)

<a name="new_MarqueeEditor_new"></a>

### new MarqueeEditor(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.viewer | [<code>Viewer</code>](#Viewer) |  | <p>Motor.Viewer实例化对象</p> |
| [options.isLookAtCenter] | <code>Boolean</code> | <code>true</code> | <p>放大后是否将旋转中心锁定到屏幕中心的模型上</p> |

<a name="MarqueeEditor+marqueeStart"></a>

### marqueeEditor.marqueeStart : <code>Event</code>
<p>框选点击开始事件</p>

**Kind**: instance property of [<code>MarqueeEditor</code>](#MarqueeEditor)  
**Example**  
```js
viewer.marqueeEditor.marqueeStart.addEventListener(()=>{  console.log('marquee start');});
```
<a name="MarqueeEditor+marqueeStop"></a>

### marqueeEditor.marqueeStop : <code>Event</code>
<p>框选点击结束事件</p>

**Kind**: instance property of [<code>MarqueeEditor</code>](#MarqueeEditor)  
**Example**  
```js
viewer.marqueeEditor.marqueeStop.addEventListener(()=>{  console.log('marquee stop');});
```
<a name="MarqueeEditor+startMarquee"></a>

### marqueeEditor.startMarquee()
<p>开启一次框选放大</p>

**Kind**: instance method of [<code>MarqueeEditor</code>](#MarqueeEditor)  
<a name="MarqueeEditor+destroy"></a>

### marqueeEditor.destroy()
<p>销毁MarqueeEditor</p>

**Kind**: instance method of [<code>MarqueeEditor</code>](#MarqueeEditor)  
<a name="MeasureEditor"></a>

## MeasureEditor
<p>测量工具类，参考{@tutorial 测量}</p>

**Kind**: global class  

* [MeasureEditor](#MeasureEditor)
    * [new MeasureEditor(options)](#new_MeasureEditor_new)
    * [.mode](#MeasureEditor+mode) : [<code>MeasureMode</code>](#MeasureMode)

<a name="new_MeasureEditor_new"></a>

### new MeasureEditor(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.viewer | [<code>Viewer</code>](#Viewer) |  | <p>Motor.Viewer实例化对象</p> |
| [options.callback] | [<code>MeasureResultCallback</code>](#MeasureResultCallback) |  | <p>测量结果回调函数，返回距离或者角度值</p> |
| [options.mode] | [<code>MeasureMode</code>](#MeasureMode) | <code>MeasureMode.ANGLE</code> | <p>测量模式</p> |

<a name="MeasureEditor+mode"></a>

### measureEditor.mode : [<code>MeasureMode</code>](#MeasureMode)
<p>获取或设置测量模式</p>

**Kind**: instance property of [<code>MeasureEditor</code>](#MeasureEditor)  
<a name="AutoRoamManager"></a>

## AutoRoamManager
<p>路径漫游管理器，参考{@tutorial 路径漫游}</p>

**Kind**: global class  

* [AutoRoamManager](#AutoRoamManager)
    * [new AutoRoamManager(viewer)](#new_AutoRoamManager_new)
    * [.cameraPoses](#AutoRoamManager+cameraPoses) : <code>Array.&lt;Object&gt;</code>
    * [.createRouteFromFile(url)](#AutoRoamManager+createRouteFromFile)
    * [.createRouteFromArray(arr)](#AutoRoamManager+createRouteFromArray)
    * [.addPose(options)](#AutoRoamManager+addPose)
    * [.playRoam()](#AutoRoamManager+playRoam)
    * [.pauseRoam()](#AutoRoamManager+pauseRoam)
    * [.stopRoam()](#AutoRoamManager+stopRoam)
    * [.emptyRoutes()](#AutoRoamManager+emptyRoutes)
    * [.destroy()](#AutoRoamManager+destroy)

<a name="new_AutoRoamManager_new"></a>

### new AutoRoamManager(viewer)

| Param | Type | Description |
| --- | --- | --- |
| viewer | [<code>Viewer</code>](#Viewer) | <p>Motor.Viewer的实例</p> |

<a name="AutoRoamManager+cameraPoses"></a>

### autoRoamManager.cameraPoses : <code>Array.&lt;Object&gt;</code>
<p>获取或设置路径中相机姿态列表</p>

**Kind**: instance property of [<code>AutoRoamManager</code>](#AutoRoamManager)  
<a name="AutoRoamManager+createRouteFromFile"></a>

### autoRoamManager.createRouteFromFile(url)
<p>从配置文件中读取路径</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | <p>文件路径</p> |

<a name="AutoRoamManager+createRouteFromArray"></a>

### autoRoamManager.createRouteFromArray(arr)
<p>从数组中读取路径</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array.&lt;Object&gt;</code> | <p>路径对象数组</p> |

<a name="AutoRoamManager+addPose"></a>

### autoRoamManager.addPose(options)
<p>将当前相机位置和姿态添加到路径中</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| [options.duration] | <code>duration</code> | <code>1</code> | <p>从上一个位置到该位置的时长</p> |
| [options.delay] | <code>delay</code> | <code>0</code> | <p>开始这段动画的延时</p> |

<a name="AutoRoamManager+playRoam"></a>

### autoRoamManager.playRoam()
<p>播放路径动画</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  
<a name="AutoRoamManager+pauseRoam"></a>

### autoRoamManager.pauseRoam()
<p>暂停路径动画</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  
<a name="AutoRoamManager+stopRoam"></a>

### autoRoamManager.stopRoam()
<p>停止路径动画</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  
<a name="AutoRoamManager+emptyRoutes"></a>

### autoRoamManager.emptyRoutes()
<p>清空路径关键点</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  
<a name="AutoRoamManager+destroy"></a>

### autoRoamManager.destroy()
<p>销毁路径漫游管理器</p>

**Kind**: instance method of [<code>AutoRoamManager</code>](#AutoRoamManager)  
<a name="OrbitControl"></a>

## OrbitControl
<p>围绕一个原点旋转的控制器</p>

**Kind**: global class  

* [OrbitControl](#OrbitControl)
    * [new OrbitControl(options)](#new_OrbitControl_new)
    * [.origin](#OrbitControl+origin) : [<code>Cartesian3</code>](#Cartesian3)
    * [.model](#OrbitControl+model) : <code>Object</code>
    * [.enableInputs](#OrbitControl+enableInputs) : <code>Boolean</code>
    * [.resetCamera()](#OrbitControl+resetCamera)
    * [.setMotion(motion)](#OrbitControl+setMotion)
    * [.removeMotion(motion)](#OrbitControl+removeMotion)
    * [.invertZoom()](#OrbitControl+invertZoom)

<a name="new_OrbitControl_new"></a>

### new OrbitControl(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | <p>包含以下参数的对象</p> |
| options.scene | <code>Scene</code> |  | <p>Cesium Viewer的Scene对象</p> |
| options.clock | <code>Clock</code> |  | <p>Cesium Viewer的Clock对象</p> |
| [options.origin] | [<code>Cartesian3</code>](#Cartesian3) |  | <p>原点的三维世界坐标</p> |
| [options.globalMatrix] | <code>Matrix4</code> |  | <p>原点的三维世界坐标矩阵</p> |
| [options.model] | <code>Object</code> |  | <p>围绕模型旋转，该模型可以是Model或者Tileset</p> |
| [options.maximumZoomDistance] | <code>Number</code> | <code>100</code> | <p>相机拉远的最大距离</p> |
| [options.defaultHeading] | <code>Number</code> | <code>10</code> | <p>相机拉远的最大距离</p> |
| [options.defaultPitch] | <code>Number</code> | <code>-15</code> | <p>相机初始化的默认俯仰角</p> |
| [options.defaultRange] | <code>Number</code> | <code>100</code> | <p>相机初始化时，距离原点的默认距离</p> |
| [options.alwaysAroundSceneCenter] | <code>Boolean</code> | <code>false</code> | <p>是否之中围绕场景的中心旋转</p> |
| [options.debug] | <code>Boolean</code> | <code>false</code> | <p>是否开启debug模式, 相机围绕的原点会显示出来</p> |

<a name="OrbitControl+origin"></a>

### orbitControl.origin : [<code>Cartesian3</code>](#Cartesian3)
<p>获取或设置围绕的原点</p>

**Kind**: instance property of [<code>OrbitControl</code>](#OrbitControl)  
<a name="OrbitControl+model"></a>

### orbitControl.model : <code>Object</code>
<p>获取或设置围绕的模型，可以是Model或者Tileset</p>

**Kind**: instance property of [<code>OrbitControl</code>](#OrbitControl)  
<a name="OrbitControl+enableInputs"></a>

### orbitControl.enableInputs : <code>Boolean</code>
<p>获取或设置鼠标控制是否启用</p>

**Kind**: instance property of [<code>OrbitControl</code>](#OrbitControl)  
<a name="OrbitControl+resetCamera"></a>

### orbitControl.resetCamera()
<p>设置相机位置回到初始位置</p>

**Kind**: instance method of [<code>OrbitControl</code>](#OrbitControl)  
<a name="OrbitControl+setMotion"></a>

### orbitControl.setMotion(motion)
<p>驱动相机</p>

**Kind**: instance method of [<code>OrbitControl</code>](#OrbitControl)  

| Param | Type | Description |
| --- | --- | --- |
| motion | [<code>CameraMotionInputs</code>](#CameraMotionInputs) | <p>相机运动事件</p> |

<a name="OrbitControl+removeMotion"></a>

### orbitControl.removeMotion(motion)
<p>停止相机运动</p>

**Kind**: instance method of [<code>OrbitControl</code>](#OrbitControl)  

| Param | Type | Description |
| --- | --- | --- |
| motion | [<code>CameraMotionInputs</code>](#CameraMotionInputs) | <p>相机运动事件</p> |

<a name="OrbitControl+invertZoom"></a>

### orbitControl.invertZoom()
<p>反转缩放方向</p>

**Kind**: instance method of [<code>OrbitControl</code>](#OrbitControl)  
<a name="RoamEditor"></a>

## RoamEditor
<p>路径漫游控制器，参考{@tutorial 视角控制}</p>

**Kind**: global class  

* [RoamEditor](#RoamEditor)
    * [new RoamEditor(options)](#new_RoamEditor_new)
    * [.enabled](#RoamEditor+enabled) : <code>Boolean</code>
    * [.movementSpeed](#RoamEditor+movementSpeed) : <code>Number</code>
    * [.isGravitative](#RoamEditor+isGravitative) : <code>Boolean</code>
    * [.isCollision](#RoamEditor+isCollision) : <code>Boolean</code>
    * [.destroy()](#RoamEditor+destroy)

<a name="new_RoamEditor_new"></a>

### new RoamEditor(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.viewer | [<code>Viewer</code>](#Viewer) | <p>Motor.Viewer实例化对象</p> |

<a name="RoamEditor+enabled"></a>

### roamEditor.enabled : <code>Boolean</code>
<p>获取或设置路径漫游是否开启</p>

**Kind**: instance property of [<code>RoamEditor</code>](#RoamEditor)  
<a name="RoamEditor+movementSpeed"></a>

### roamEditor.movementSpeed : <code>Number</code>
<p>获取或设置相机移动速度</p>

**Kind**: instance property of [<code>RoamEditor</code>](#RoamEditor)  
<a name="RoamEditor+isGravitative"></a>

### roamEditor.isGravitative : <code>Boolean</code>
<p>获取或设置重力开启状态</p>

**Kind**: instance property of [<code>RoamEditor</code>](#RoamEditor)  
<a name="RoamEditor+isCollision"></a>

### roamEditor.isCollision : <code>Boolean</code>
<p>获取或开启碰撞开启状态</p>

**Kind**: instance property of [<code>RoamEditor</code>](#RoamEditor)  
<a name="RoamEditor+destroy"></a>

### roamEditor.destroy()
<p>销毁roamEditor</p>

**Kind**: instance method of [<code>RoamEditor</code>](#RoamEditor)  
<a name="ClippingPlaneEditor"></a>

## ClippingPlaneEditor
<p>剖切插件，参考{@tutorial 剖切}</p>

**Kind**: global class  

* [ClippingPlaneEditor](#ClippingPlaneEditor)
    * [new ClippingPlaneEditor(options)](#new_ClippingPlaneEditor_new)
    * [.addClippingPlane(type)](#ClippingPlaneEditor+addClippingPlane)
    * [.destroy()](#ClippingPlaneEditor+destroy)

<a name="new_ClippingPlaneEditor_new"></a>

### new ClippingPlaneEditor(options)

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | <p>包含以下参数的对象</p> |
| options.viewer | [<code>Viewer</code>](#Viewer) | <p>Motor.Viewer实例化对象</p> |
| options.scene | [<code>SceneView</code>](#SceneView) | <p>需要剖切的场景</p> |

<a name="ClippingPlaneEditor+addClippingPlane"></a>

### clippingPlaneEditor.addClippingPlane(type)
<p>添加剖切面，比如X,Y,Z,XYZ</p>

**Kind**: instance method of [<code>ClippingPlaneEditor</code>](#ClippingPlaneEditor)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | <p>&quot;X&quot;,&quot;Y&quot;,&quot;Z&quot;,&quot;XYZ&quot;(剖切盒)</p> |

<a name="ClippingPlaneEditor+destroy"></a>

### clippingPlaneEditor.destroy()
<p>销毁clippingPlaneEditor</p>

**Kind**: instance method of [<code>ClippingPlaneEditor</code>](#ClippingPlaneEditor)  
<a name="InfoField"></a>

## InfoField : <code>enum</code>
<p>构件属性字段枚举类</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| BIMID | <code>number</code> | <code>0</code> | 
| "楼层" | <code>number</code> | <code>1</code> | 
| "大类名称" | <code>number</code> | <code>2</code> | 
| "小类名称" | <code>number</code> | <code>3</code> | 
| "属性名称" | <code>number</code> | <code>4</code> | 
| "范围" | <code>number</code> | <code>5</code> | 

<a name="MouseEventType"></a>

## MouseEventType
<p>鼠标事件类型</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| LEFT_DOWN | <code>Number</code> | <code>0</code> | <p>左键按下</p> |
| LEFT_UP | <code>Number</code> | <code>1</code> | <p>左键抬起</p> |
| LEFT_CLICK | <code>Number</code> | <code>2</code> | <p>左键点击</p> |
| LEFT_DOUBLE_CLICK | <code>Number</code> | <code>3</code> | <p>左键双击</p> |
| RIGHT_DOWN | <code>Number</code> | <code>5</code> | <p>右键按下</p> |
| RIGHT_UP | <code>Number</code> | <code>6</code> | <p>右键抬起</p> |
| RIGHT_CLICK | <code>Number</code> | <code>7</code> | <p>右键点击</p> |
| MIDDLE_DOWN | <code>Number</code> | <code>10</code> | <p>中键按下</p> |
| MIDDLE_UP | <code>Number</code> | <code>11</code> | <p>中键抬起</p> |
| MIDDLE_CLICK | <code>Number</code> | <code>12</code> | <p>中键点击</p> |
| MOUSE_MOVE | <code>Number</code> | <code>15</code> | <p>鼠标移动</p> |
| WHEEL | <code>Number</code> | <code>16</code> | <p>滚轮滚动</p> |
| PINCH_START | <code>Number</code> | <code>17</code> | <p>两指触摸开始</p> |
| PINCH_END | <code>Number</code> | <code>18</code> | <p>两指触摸结束</p> |
| PINCH_MOVE | <code>Number</code> | <code>19</code> | <p>两指触摸变化</p> |

<a name="BingMapStyle"></a>

## BingMapStyle : <code>enum</code>
<p>Bing地图样式枚举类，参考{@tutorial 地图服务}</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| AERIAL | <code>String</code> | <code>Aerial</code> | <p>遥感影像</p> |
| AERIAL_WITH_LABELS | <code>String</code> | <code>AerialWithLabels</code> | <p>路网叠加遥感影像</p> |
| ROAD | <code>String</code> | <code>Road</code> | <p>路网</p> |
| CANVAS_DARK | <code>String</code> | <code>CanvasDark</code> | <p>暗色调路网</p> |
| CANVAS_LIGHT | <code>String</code> | <code>CanvasLight</code> | <p>亮色调路网</p> |
| CANVAS_GRAY | <code>String</code> | <code>CanvasGray</code> | <p>灰度路网</p> |
| COLLINS_BART | <code>String</code> | <code>CollinsBart</code> | <p>Collins Bart影像.</p> |

**Example**  
```js
包含AERIAL,ROAD,AERIAL_WITH_LABELS等样式
```
<a name="TiandituMapStyle"></a>

## TiandituMapStyle : <code>enum</code>
<p>天地图样式枚举类，参考{@tutorial 地图服务}</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| IMAGE | <code>String</code> | <code>IMAGE</code> | <p>遥感影像</p> |
| VECTOR | <code>String</code> | <code>VECTOR</code> | <p>矢量地图</p> |
| TERRAIN | <code>String</code> | <code>TERRAIN</code> | <p>地形图</p> |
| IMAGE_WITH_LABELS | <code>String</code> | <code>IMAGE_WITH_LABELS</code> | <p>影像带注记</p> |
| VECTOR_WITH_LABELS | <code>String</code> | <code>VECTOR_WITH_LABELS</code> | <p>矢量地图带注记</p> |
| TERRAIN_WITH_LABELS | <code>String</code> | <code>TERRAIN_WITH_LABELS</code> | <p>地形图带注记</p> |

**Example**  
```js
包含IMAGE, VECTOR, TERRAIN, IMAGE_WITH_LABELS, VECTOR_WITH_LABELS, TERRAIN_WITH_LABELS
```
<a name="TilingScheme"></a>

## TilingScheme : <code>enum</code>
<p>地图切片方案枚举类，参考{@tutorial 地图服务}</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| GeographicTilingScheme | <code>number</code> | <code>0</code> | <p>GeographicTilingScheme</p> |
| WebMercatorTilingScheme | <code>number</code> | <code>1</code> | <p>WebMercatorTilingScheme</p> |

<a name="MeasureMode"></a>

## MeasureMode : <code>enum</code>
<p>测量模式枚举类</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| POINTDISTANCE | <code>number</code> | <code>0</code> | <p>两点之间长度</p> |
| POINTSDISTANCE | <code>number</code> | <code>1</code> | <p>多点之间长度</p> |
| ANGLE | <code>number</code> | <code>2</code> | <p>角度</p> |

<a name="CIMControlMode"></a>

## CIMControlMode : <code>enum</code>
<p>CIM模式下鼠标控制逻辑枚举类</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| CLASSIC | <code>number</code> | <code>0</code> | <p>鼠标左键拖拽平移，中键拖拽旋转和倾斜</p> |
| MOTOR | <code>number</code> | <code>1</code> | <p>鼠标中键拖拽平移，右键键拖拽旋转和倾斜</p> |

<a name="NavigationMode"></a>

## NavigationMode : <code>enum</code>
<p>导航模式枚举类</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| DYNAMIC | <code>number</code> | <code>0</code> | <p>Dynamic模式</p> |
| ROAM | <code>number</code> | <code>1</code> | <p>ROAM模式</p> |

<a name="ViewerMode"></a>

## ViewerMode : <code>enum</code>
<p>视窗模式枚举类</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| CIM | <code>number</code> | <code>0</code> | <p>CIM模式</p> |
| BIM | <code>number</code> | <code>1</code> | <p>BIM模式</p> |

<a name="CameraMotionInputs"></a>

## CameraMotionInputs : <code>enum</code>
<p>相机运动事件枚举类</p>

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| rotateLeft | <code>String</code> | <code>rotateLeft</code> | <p>相机左转</p> |
| rotateRight | <code>String</code> | <code>rotateRight</code> | <p>相机右转</p> |
| rotateUp | <code>String</code> | <code>rotateUp</code> | <p>相机上转</p> |
| rotateDown | <code>String</code> | <code>rotateDown</code> | <p>相机下转</p> |

<a name="ViewCubeConfig"></a>

## ViewCubeConfig : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [width] | <code>Number</code> | <code>200</code> | <p>画布宽度</p> |
| [height] | <code>Number</code> | <code>200</code> | <p>画布高度</p> |
| [containerStyle] | <code>String</code> | <code>&quot;position:absolute;right:0;bottom:0;&quot;</code> | <p>画布容器CSS Style</p> |

<a name="CameraView"></a>

## CameraView : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [center] | [<code>Cartesian3</code>](#Cartesian3) | <p>相机观察中心</p> |
| [position] | [<code>Cartesian3</code>](#Cartesian3) | <p>相机位置</p> |
| [heading] | <code>Number</code> | <p>相机朝向，单位弧度</p> |
| [pitch] | <code>Number</code> | <p>相机俯仰角</p> |
| [range] | <code>Number</code> | <p>相机与中心点距离</p> |
| [roll] | <code>Number</code> | <p>相机的旋转角</p> |
| [duration] | <code>Number</code> | <p>飞行时间，单位秒</p> |
| [callback] | <code>function</code> | <p>相机飞行结束的回调函数</p> |

<a name="Mouse"></a>

## Mouse : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [position] | [<code>Cartesian2</code>](#Cartesian2) | <p>鼠标点击处屏幕坐标,只在点击事件中返回值</p> |
| [endPosition] | [<code>Cartesian2</code>](#Cartesian2) | <p>鼠标当前悬停处屏幕坐标，只在鼠标移动事件中返回值</p> |

<a name="eventHandler"></a>

## eventHandler : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| mouse | [<code>Mouse</code>](#Mouse) | <p>鼠标事件对象</p> |

<a name="MeasureResult"></a>

## MeasureResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [angle] | <code>Number</code> | <p>角度值</p> |
| [distance] | <code>Number</code> | <p>长度值</p> |

<a name="MeasureResultCallback"></a>

## MeasureResultCallback : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| result | [<code>MeasureResult</code>](#MeasureResult) | <p>鼠标事件对象</p> |

