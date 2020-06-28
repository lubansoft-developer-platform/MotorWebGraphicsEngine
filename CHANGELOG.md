# 更新日志
## **Motor v2.4.0** 2020年6月28日
#### 增加
* 提升整体渲染效果
* 添加DWG工程支持
* 添加`AvatarRecorder`类，用于自定义模型漫游的录制
* `MotorViewer`
  * 添加`showMoon`传入参数和成员变量，用于控制月亮显示隐藏
  * 添加`allowCameraUnderground`成员变量，支持相机潜入地下
  * 添加`isFlashlight`传入参数和成员变量，支持视角前模型始终面向光源的模式
* `Project`
  * 添加`boundingBoxLocal`成员变量，获取工程在局部坐标系下的包围盒
  * 添加`localCoordinatesToWorld`方法，用于将该工程下的局部坐标转换成世界坐标
  * `open`方法添加`duration`参数，修改飞向工程的时间
  * `close`方法添加`isFlyTo`参数，若为`true`，则飞回父工程
* `Component`
  * 添加`boundingBoxLocal`成员变量，获取构件在局部坐标系下的包围盒
  * 添加`getBIMProject`方法，获取构件所属的BIM工程
* `ClippingPlaneEditor`
  * 添加`clipTerrain`传入参数，支持剖切地形
  * 添加`dragStart`和`dragEnd`事件，监听剖切面拖动和释放
* `GeometryCollection`
  * 添加`addRectangle`方法，绘制沿地球表面的矩形区域
* `AvatarControls`
  * 添加`autoUpdate`传入参数，用于单独使用AvatarControls
  * 添加`avatarModelReady`成员变量，监听avatar模型加载完成的事件
  * 添加`firstPersonControlOffset`传入参数，设置视角相对于模型的位置
  * 添加`offset`成员变量，用于修改视角相对于模型的位置

#### 修改
* `MotorViewer`
  * `getProjectList`方法返回变为promise
* `Project`
  * lazyLoad加载完成的事件也放入`open()`返回的Promise中
* `OrbitControl`
  * BIM模式下不会拾取地面作为旋转中心
* 优化style在传入上千个guid时设置样式的速度
* 优化水面效果
* 在cim场景下直接打开的bim工程可以由cim工程控制样式和隔离
* 倾斜摄影支持剖切
* 相机参数与客户端一致

#### 修复
* 修复未加载完工程时，点击高亮模型时会报错的bug
* 修复键盘控制和人物模型控制切换的报错
* 修复关键字查询不可用的bug
* 修复自定义地图无法显示的bug
* 修复CIM场景只有地形时相机飞行报错的bug
* 修复定位初始化视角后maximumZoomDistance太小，导致BIM模式缩放失效的问题
* 修复lazyLoad加载模型不全的bug

## **Motor v2.3.0** 2020年3月30日

#### 增加
* 添加`AvatarControl`类，用于控制人物的功能
* 添加`KeyboardEventModifier`类，用于键盘与鼠标组合的操作
* `NavigationMode`
  * 添加`NAV_WALK`，用于启用第一人称人物模式
* `Viewer`
  * 添加`initializeAfterGetProjectList`传入参数
* `AnimationPlayer`
  * 添加`stopByName`方法，支持根据动作名称停止动画
  * `play`方法中增加`name`参数，可通过动作名称播放动画
* `ClippingPlaneEditor`
  * 添加`setPlaneVisibility`方法，支持控制切割面板显隐
* `Project`
  * 添加`customMap`变量，用于获取用户自定义的地图服务
  * 添加`setComponentsColorFromTree`方法，方便用户使用构件树控制构件颜色
  * 添加`queryComponentsByBIMGuid`方法，根据bimGuid查询构件
* `Component`
  * `infos`中添加`bimFloor`字段
  
#### 修复
* 加载工程后使用鼠标中键平移，视角会飞走的bug
* 工程中水面无法加载的bug
* 工程默认视角在BIM和CIM模式下不同的bug
* 修复ktx加载不到的报错bug
* 修复viewer.destroy()方法报错的bug
* 修复切换到正交视图渲染出错的bug
* 修复homeView定位到全球不起作用的bug
* 修复工程包围盒计算偏差的bug
* 修复多个专业时，构件树控制模型显隐失败的bug
* 修复没有楼层映射时构件树显示不全的bug
* 修复鼠标拉近后不能旋转的bug
* 修复全部隐藏后无法显示的bug

#### 修改
* 优化BIM模式下视角控制的逻辑
* 在后台请求用户工程列表
* 优化根据多个`QueryBIMCompOption`控制样式的逻辑
* `Project`
  * `isolate`相关方法屏蔽构件后，还可以设置构件颜色
* `Component`
  * CIM工程构件的`getProperties`方法，返回类型从`CompProperty[]`变成`CIMProperty`
* `Viewer`
  * `addMouseEventListener`方法添加第三个参数`modifier`，提供按键和鼠标配合使用的接口

## **Motor v2.2.0** 2019年12月31日

#### 增加
* `MotorViewer`
  * 添加`queryProject`查询工程
  * 添加`mapCollection`变量，用于管理地图图层
  * 添加`enableTouchControl`参数，用于开启触屏控制
  * 添加`enableAO`变量，用于开关AO
  * 添加`ambientOcclusion`变量，用于控制AO强度
* `MapCollection`类，用于管理地图图层
* `VideoProjection`
  * 支持m3u8格式的视频，需要配合videojs使用
* `ParticleSystem`
  * 添加`sizeInMeters`参数，优化例子系统显示效果
* 新增`Component`类，替换`ComponentView`
  * 添加`flatten`属性，用于控制压平
* 新增`Project`类，替换`SceneView`和`ProjectView`
  * 使用`open`和`close`方法，打开或者关闭工程
* 支持倾斜摄影模型的压平和掩膜
* 支持金字塔工程加载

#### 修改
* 接口全部更新，与JS SDK统一，请参考接口文档
* `MotorViewer`
  * `taaEnabled`参数变为`antialias`

#### 弃用
* `SceneView`, `ProjectView`, `ComponentView`全部弃用
`Component.PropertiesTreeStructur`静态方法改为`project.getTreeStructure`方法

## **Motor v2.1.0** 2019年11月19日

#### 修复

* 工程模型材质丢失的bug
* 多个Viewer加载同一工程报错的bug

## **Motor v1.1.1** 2019年10月22日

#### 弃用

* `Component`类将在近期版本中不可用，获取构件树的方法从`Component.PropertiesTreeStructur`静态方法改为`SceneView.getTreeStructure`方法

#### 增加

* `MotorViewer`
  * 添加`enableTouchControl`传入参数，用于开启触屏模式
* `SceneView`类
  * 添加`getTreeStructure`，用于获取场景构件树

#### 修改

* 调整AO和阴影默认参数

#### 修复

* 优化lazyLoad逻辑，同时限制一次性请求的模型资源和贴图资源
* 修复BIM工程最大缩放距离太短的问题
* 修复移动端触屏操作无法平移的bug


## **Motor v1.1.0** 2019年10月16日

#### 增加

* 默认使用鼠标焦点作为缩放中心
* 默认锐化场景，优化视觉效果
* `AutoRoamManager`的`addPose`添加`listen`和`listenId`传入参数，用于插入监听点的接口
* `MarkerCollection`增加`update`方法，用于更新已有`marker`的属性
* `OrbitControl`类
  * 添加`maximumPitch`和`minimumPitch`，限制视角的俯仰角
  * 添加`zoomIn`和`zoomOut`控制视口缩放
* `SceneView`类
  * 添加`setHighlightComponentsFromGuids`和`setHighlightComponentsFromTypes`，用于根据ID或者类型高亮构件
  * 添加`setColorFromGuids`方法，该方法区别于`fadeOutComponentsFromGuids`类的方法，设置颜色后保留上次设置的颜色
  * 添加`fadeOutComponentsFromGuids`和`fadeInComponentsFromGuids`方法，用于构件渐隐渐现
  * 添加`isolateComponentsFromGuids`和`isolateComponentsFromTypes`，用于根据ID或者类型屏蔽或隔离构件
  * 添加`hideComponentsFromGuids`、`showComponentsFromGuids`、`hideComponentsFromTypes`、`showComponentsFromTypes`，用于根据ID或者类型显示隐藏构件
  * 添加`findComponentsByBIMProperties`，用于查询构件
* `MotorViewer`类
  * 添加`taaEnabled`传入参数，支持TAA抗锯齿，优化视觉效果
  * 添加`enableVignetteMode`传入参数，用于设置渐变背景色
  * 添加`backgroundImageCss`传入参数，用于设置背景图片
  * 添加`switchToPerspective`和`switchToOrthographic`方法，切换视角正交视图和透视视图
  * 添加`logarithmicDepthBuffer`属性，用于开启和关闭对数深度
* 添加`AnimationPlayer`类，用于模型动画播放
* 添加`SkyBox`类，用于初始化天空盒和环境贴图
* 添加`BloomState`类，用于控制场景泛光
* 添加`ParticleSystem`类和多种`Emitter`类，用于粒子效果
* 添加`CommentEditor`类和多种二维图形类用于模型批注
* `Cartesian3`添加`fromRadians`方法，用于将弧度制经纬度转成笛卡尔三维坐标

#### 修改
* 简化工程加载逻辑，支持`SubCIM`关联静态模型的直接加载
* `MotorViewer.loadSubProject`方法
  * 添加`zoomToAtOnce`和`zoomToAtOnceCallback`传入参数，支持立刻飞向工程位置，无需等待加载完成
  * 添加`lazyLoad`和`lazyLoadBlockSize`传入参数，支持分批加载和设置分批加载的最大模型数目，避免一次性请求过多
  * 修复视频投影投射穿透的问题
  * BIM模式下支持使用预设视角


## **Motor v1.0.0** 2019年7月18日

#### 主要功能和接口

* `MotorViewer`类，初始化场景
  * `viewerMode`属性，切换地球/无地球场景
  * `loadSubproject`方法，加载工程
  * `setMap`方法，切换地图服务
  * `loadTileset`方法，加载3d-Tiles（倾斜摄影或者白模）
     * `useGradual`属性，开启或关闭渐变色
     * `shouldAnimate`属性，开启或关闭建筑物上升动画
     * `planView`属性，开启或关闭俯视压平特效
  * `addMouseEventListener`方法，添加点选回调
  * `pickPosition`方法，获取鼠标位置坐标
  * `pick`方法，获取鼠标位置的构件
  * `createVolumeRender`方法，添加体渲染
  * `addWater`方法，添加水面多边形
  * `addVideoProject`方法，添加视频投影
  * `marqueeEditor`变量，控制框选放大
  * `navigationMode`变量，切换动态观察/第一人称漫游
  * `roamEditor`变量，控制漫游模式
* `TiandituMap`类，`BingMap`类，`ArcGISMap`类和`WebMapTileService`类，支持多种地图服务格式加载
* `ClippingPlaneEditor`类，支持剖切操作
* `MeasureEditor`类，支持测量模式
* `Component`类，获取构件服务
  * `PropertiesTreeStructur`方法，获取构件树
* `ComponentView`类，操作构件视图
  * `infos`属性，获取构件基本信息
  * `setColor`方法，设置构件高亮颜色
  * `getBIMProperties`方法，获取BIM属性
* `ProjectView`类，操作工程视图
* `SceneView`类，控制场景视图
  * `drawEdge`属性，控制边线绘制
  * `edgeColor`属性，控制边线颜色
  * `setBlinkComponentsFromGuids`，用于根据ID闪烁构件
* `GeometryCollection`类，绘制几何体
  * `addBox`方法，绘制自定义盒子
* `MarkerCollection`类，绘制点状、线状、文字、动态图形和时间动态模型等标注的绘制
* `DynamicCircle`类，在tileset上添加动态圈
* `VolumeRender`类，体渲染对象类
* `VideoProjection`类，视频投影类
* `MarqueeEditor`类，框选放大编辑器
* `OrbitControl`类，无地图场景下视角控制器
* `RoamEditor`类，控制第一人称漫游模式
* `CameraView`类，控制相机姿态和位置，以及相机飞行
* `AutoRoamManager`类，路径漫游管理器，用于录制漫游动画
