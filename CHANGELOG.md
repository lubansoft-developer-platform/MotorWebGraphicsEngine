## 更新日志

### **Motor v2.1.0** 2019年11月19日

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
* 工程模型材质丢失的bug
* 多个Viewer加载同一工程报错的bug

### **Motor v2.0** 2019年10月17日

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

#### 修改
* 简化工程加载逻辑，支持`SubCIM`关联静态模型的直接加载
* `MotorViewer.loadSubProject`方法
  * 添加`zoomToAtOnce`和`zoomToAtOnceCallback`传入参数，支持立刻飞向工程位置，无需等待加载完成
  * 添加`lazyLoad`和`lazyLoadBlockSize`传入参数，支持分批加载和设置分批加载的最大模型数目，避免一次性请求过多
  * 修复视频投影投射穿透的问题
  * BIM模式下支持使用预设视角


### **Motor v1.0** 2019年07月18日

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
