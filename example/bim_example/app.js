var selectedColor = Motor.Color.fromCssColorString('#03f3f7').withAlpha(0.5);
// 动态加载数据
function dynamicloadNodes(treeNode) {
    return Motor.Project.getChildNodesFromTree(treeNode);
}

// 重新设置数据
function reSetNodes(zTreeObj) {
    let node = zTreeObj.getNodes();
    let nodes = zTreeObj.transformToArray(node);
    if (nodes.length > 0) {
        for (let i = 0; i < nodes.length; i++) {
            if (!nodes[i].children) {
                if (nodes[i].level === 3) {
                    nodes[i].isParent = true;
                }
                nodes[i].nocheck = true;
                zTreeObj.updateNode(nodes[i]);
            }
        }
    }
}

//环境贴图
var environmentMapURL = '../common/unigine/unigine_ibl.ktx';
var L00  = new Motor.Cartesian3( 0.120797081901399,  0.150419214377520,  0.212205845701475); // L00, irradiance, pre-scaled base
var L1_1 = new Motor.Cartesian3(-0.081039486211921, -0.057899947383160, -0.008679811915144); // L1-1, irradiance, pre-scaled base
var L10  = new Motor.Cartesian3(-0.015657841148450, -0.019063327089972, -0.033514601019016); // L10, irradiance, pre-scaled base
var L11  = new Motor.Cartesian3(-0.000216578200602,  0.000217094384545,  0.001440538741416); // L11, irradiance, pre-scaled base
var L2_2 = new Motor.Cartesian3( 0.000428989650487,  0.000425217669671,  0.000972238339287); // L2-2, irradiance, pre-scaled base
var L2_1 = new Motor.Cartesian3(-0.012129700448552, -0.014305464332188, -0.025692310837078); // L2-1, irradiance, pre-scaled base
var L20  = new Motor.Cartesian3( 0.004320620605355,  0.005430136276266,  0.006445636354119); // L20, irradiance, pre-scaled base
var L21  = new Motor.Cartesian3(-0.001056078839660, -0.001178552008468, -0.001636597666249); // L21, irradiance, pre-scaled base
var L22  = new Motor.Cartesian3( 0.003289950993955,  0.005592105231878,  0.005186393422128);
var coefficients = [L00, L1_1, L10, L11, L2_2, L2_1, L20, L21, L22];
var skyBox = new Motor.SkyBox({
    sphericalHarmonicCoefficients: coefficients,
    specularEnvironmentMaps: environmentMapURL
});

//初始化Viewer
var viewer = new Motor.Viewer({
    container: 'container',//viewer所在的div元素id
    viewerMode: Motor.ViewerMode.BIM,//viewer的模式
    appid: appid,
    secret: secret,
    access_token: access_token,
    antialias: true,
    taaEnabled: true,
    backgroundColor: Motor.Color.fromBytes(237, 242, 246),
    fullscreenElement: document.body,
    skyBox: skyBox
});
viewer.initialize().then(function () {
    viewer.sunlightIntensity = 1.0;
    drawProject(projectId, true);
    //开启框选放大
    viewer.enableMarquee = true;
    //框选放大
    $('.selectd').on('click', function () {
        //开始一次框选放大
        viewer.marqueeEditor.startMarquee();
        $('body').css('cursor', 'crosshair');
        $('.selectd').css({ 'background': 'url("../common/lib/static/images/ic_kuangxuanfangda_hover.png") no-repeat center', 'pointerEvents': 'none' })
    })
    //鼠标结束框选
    viewer.marqueeEditor.marqueeStop.addEventListener(function () {
        $('body').css('cursor', 'default');
        $('.selectd').css({ 'background': 'url("../common/lib/static/images/ic_kuangxuanfangda.png") no-repeat center', 'pointerEvents': 'auto' })
    });

    //高亮构件并显示信息框
    function highlightComponent(component, multi = false) {
        //改变构件透明度
        if (multi) {
            selectedComponents.push(component);
        }
        else {
            selectedComponents = [component]
        }
        currentProject.selectComponents(selectedComponents);
        currentSelectedComponent = component;
    }
    //Motor.Color(0.1, 0.2, 0.4, 0.5);或者Motor.Color.fromBytes(255,255,255,125)

    //设置点选后的回调函数
    viewer.addMouseEventListener(Motor.MouseEventType.LEFT_CLICK, function (mouse) {
        if(isMeasuring) return;
        var obj = viewer.pick(mouse.position, currentProject);
        if (obj instanceof Motor.Component) {
            var component = obj;
            highlightComponent(component);
        }
        else {
            currentProject.deselectAllComponents();
            selectedComponents = [];
            currentSelectedComponent = undefined;
        }
        $('#infoBox').hide();
        $('#contextContainer').hide();
    });

    viewer.addMouseEventListener(Motor.MouseEventType.LEFT_CLICK, function (mouse) {
        if(isMeasuring) return;
        var obj = viewer.pick(mouse.position, currentProject);
        if (obj instanceof Motor.Component) {
            var component = obj;
            highlightComponent(component, true);
        }
        else {
            currentProject.deselectAllComponents();
            selectedComponents = [];
            currentSelectedComponent = undefined;
            $('#infoBox').hide();
        }
        $('#contextContainer').hide();
    }, Motor.KeyboardEventModifier.CTRL);
    //双击飞向构件
    viewer.addMouseEventListener(Motor.MouseEventType.LEFT_DOUBLE_CLICK, function (mouse) {
        var obj = viewer.pick(mouse.position, currentProject);
        if (obj instanceof Motor.Component) {
            //飞向构件
            viewer.flyTo(obj);
        }
    })

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
            if (selectedComponents.length > 0) {
                currentProject.deselectAllComponents();
                selectedComponents = [];
                currentSelectedComponent = undefined;
            }
            $('#infoBox').hide();
            $('#contextContainer').hide();
        }
    });

    var contextContainer = document.getElementById('contextContainer');
    var contextmenu = document.getElementById('contextmenu');
    var liCount = 0;
    var infoNames = { 'major': '专业' }
    contextmenu.childNodes.forEach(function (child) {
        // console.log(child.tagName)
        if (child.tagName === "LI") {
            switch (liCount) {
                case 0:
                    child.onclick = function () {
                        console.log("构件详情");
                        currentSelectedComponent.getProperties().then(data => {
                            var tableStr = '';
                            tableStr += `<div class='title'>${data.name ? data.name : data.guid}</div>`
                            tableStr += `<div class="item">
                                                        <span class="itemname">
                                                            <div>GUID</div>
                                                        </span>
                                                        <span class="itemvalue">
                                                            <div>${data.guid}</div>
                                                        </span>
                                                    </div>`;
                            if (currentSelectedComponent.type == Motor.ProjType.TYPE_BIM) {
                                for (var key in infoNames) {
                                    tableStr += `<div class="item">
                                                            <span class="itemname">
                                                                <div>${infoNames[key]}</div>
                                                            </span>
                                                            <span class="itemvalue">
                                                                <div>${data[key] ? data[key] : ''}</div>
                                                            </span>
                                                        </div>`;
                                }
                            }
                            let props = data ? data.props : undefined;
                            if (props && props.length > 0) {
                                var groups = {};
                                props.forEach(function (prop) {
                                    if (prop.group) {
                                        let groupIndex = undefined;
                                        for (let key in groups) {
                                            if (key === prop.group) {
                                                groupIndex = key;
                                                break;
                                            }
                                        }
                                        if (groupIndex) {
                                            groups[groupIndex].push({
                                                name: prop.name,
                                                value: prop.value,
                                                unit: prop.unit
                                            })
                                        }
                                        else {
                                            groups[prop.group] = [{
                                                name: prop.name,
                                                value: prop.value,
                                                unit: prop.unit
                                            }]
                                        }
                                    }
                                    else {
                                        if (groups['属性']) {
                                            groups['属性'].push({
                                                name: prop.name,
                                                value: prop.value,
                                                unit: prop.unit
                                            })
                                        }
                                        else {
                                            groups['属性'] = [{
                                                name: prop.name,
                                                value: prop.value,
                                                unit: prop.unit
                                            }];
                                        }
                                    }
                                })

                                for (let group in groups) {
                                    let temp = '';
                                    groups[group].forEach(item => {
                                        temp += `
                                                    <div class="item">
                                                        <span class="itemname">
                                                            <div>${item.name}</div>
                                                        </span>
                                                        <span class="itemvalue">
                                                            <div>${item.value ? item.value : ""} ${item.unit ? item.unit : ""}</div>
                                                        </span>
                                                    </div>
                                                `;
                                    })
                                    tableStr += `<div>
                                                <div class="group-title">
                                                    <div class="group">${group}</div><div class="group-hr"></div>
                                                </div>
                                                ${temp}
                                            </div>`;
                                }
                            }

                            $('#infoBox').html(tableStr);
                            $('#infoBox').show();
                        });
                        // contextContainer.setAttribute('style','display:none;');
                        $('#contextContainer').hide();
                    }
                    break;
                case 1:
                    child.onclick = function () {
                        // currentProject.reset();
                        if (currentProject.drawEdge) {
                            currentProject.drawEdge = false;
                        }
                        currentProject.setAllComponentsVisibility(true);
                        console.log("隐藏选中构件");
                        hiddenComponents = hiddenComponents.concat(selectedComponents);
                        currentProject.setComponentsVisiblity(false, hiddenComponents);
                        $('#contextContainer').hide();
                    }
                    break;
                case 2:
                    child.onclick = function () {
                        // currentProject.reset();
                        if (currentProject.drawEdge) {
                            currentProject.drawEdge = false;
                        }
                        currentProject.resetDefaultColorForAll();
                        console.log("半透明选中构件");
                        transparentComponents = transparentComponents.concat(selectedComponents);
                        currentProject.setComponentsColor(Motor.Color.WHITE.withAlpha(0.4), transparentComponents);
                        $('#contextContainer').hide();
                    }
                    break;
                case 3:
                    child.onclick = function () {
                        currentProject.reset();
                        if (currentProject.drawEdge) {
                            currentProject.drawEdge = false;
                        }
                        currentProject.clearIsolation();
                        console.log("隔离选中构件");
                        isolatedComponents = isolatedComponents.concat(selectedComponents);
                        currentProject.isolateComponents(isolatedComponents);
                        // isolateComponent = currentSelectedComponent;
                        $('#contextContainer').hide();
                    }
                    break;
                case 4:
                    child.onclick = function () {
                        console.log("还原构件样式");
                        // if(currentProject.drawEdge){
                        //     currentProject.drawEdge=false;
                        // }
                        if(zTreeObj){
                            zTreeObj.checkAllNodes(true);
                        }
                        if (selectedComponents.length > 0 || hiddenComponents.length > 0 || transparentComponents.length > 0 || isolatedComponents.length > 0) {
                            hiddenComponents = [];
                            transparentComponents = [];
                            isolatedComponents = [];
                            currentProject.reset();
                            currentProject.selectComponents(selectedComponents);
                        }
                        $('#contextContainer').hide();
                    }
                    break;
                default:
                    break;
            }
            liCount++;
        }
    })
    viewer.addMouseEventListener(Motor.MouseEventType.RIGHT_CLICK, function (mouse) {
        //根据屏幕坐标coords，获取点选的对象
        if(isMeasuring) return;
        if (selectedComponents.length > 0) {
            let index = 0;
            contextmenu.childNodes.forEach(function (child) {
                if (child.tagName === "LI") {
                    if (index < 4) {
                        if (index === 0 && selectedComponents.length > 1) {
                            child.setAttribute('class', 'li-disable');
                        }
                        else {
                            child.setAttribute('class', 'li');
                        }
                        index++;
                    }
                }
            })
        }
        else {
            let index = 0;
            contextmenu.childNodes.forEach(function (child) {
                if (child.tagName === "LI") {
                    if (index < 4) {
                        child.setAttribute('class', 'li-disable');
                        index++;
                    }
                }
            })
        }
        contextContainer.setAttribute('style', 'display:block;top:' + mouse.position.y + 'px;left:' + mouse.position.x + 'px;')
    })

    //相机复位按钮
    $('.camera_reset').on('click', function () {
        viewer.flyTo(currentProject);
    })

    //背景色切换
    var darkmode = false;
    $('.switchmode').on('click', function () {
        darkmode = !darkmode;
        $('.switchmode').css({ 'background': 'url("../common/lib/static/images/ic_qiehuan' + (darkmode ? '_hover' : '') + '.png") no-repeat center' })
        if (darkmode) {
            viewer.backgroundColor = Motor.Color.fromBytes(7, 12, 23);
        }
        else {
            viewer.backgroundColor = Motor.Color.fromBytes(237, 242, 246);
        }
    })

    //CIM BIM切换
    $('.cim_bim').on('click', function () {
        //切换到CIM-BIM
        viewer.viewerMode = viewer.viewerMode == Motor.ViewerMode.CIM ? Motor.ViewerMode.BIM : Motor.ViewerMode.CIM;
        viewer.viewerMode == Motor.ViewerMode.BIM ? $('.cim_bim').css({ 'background': 'url("../common/lib/static/images/ic_map.png") no-repeat center' }) : $('.cim_bim').css({ 'background': 'url("../common/lib/static/images/ic_map_hover.png") no-repeat center' })
        if (viewer.viewerMode == Motor.ViewerMode.CIM) {
            if (clippingPlaneEditor && !clippingPlaneEditor.isDestroyed()) {
                $('.section_box_container').hide();
                clippingPlaneEditor.destroy();
            }
        }
    })


    //剖切
    var clippingPlaneEditor;
    $('.section').on('click', function () {
        if (clippingPlaneEditor && !clippingPlaneEditor.isDestroyed()) {
            $('.section').css('background', 'url("../common/lib/static/images/ic_pouqie.png") no-repeat center')
            $('.section_box_container').hide();
            clippingPlaneEditor.destroy();
        } else if (viewer.viewerMode != Motor.ViewerMode.CIM && viewer.navigationMode != Motor.NavigationMode.NAV_FREE_KEY) {
            $('.section').css('background', 'url("../common/lib/static/images/ic_pouqie_hover.png") no-repeat center');
            $('.section_box_container').show();
            // $('.section_box_container>li').css({ 'backgroundColor': 'rgb(2, 20, 48)' });
            clippingPlaneEditor = new Motor.ClippingPlaneEditor(currentProject);
            planeVisibility = true;
            clippingPlaneEditor.addClippingPlane($('#section_box').val());
            $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_display.png") no-repeat center' })
        } else {
            var str_1 = [];
            if (viewer.viewerMode == Motor.ViewerMode.CIM) {
                // str_1.push('请切换至BIM模式操作');
                viewer.viewerMode = Motor.ViewerMode.BIM;
            }
            if (viewer.navigationMode == Motor.NavigationMode.NAV_FREE_KEY) {
                $('.roam_box').hide();
                viewer.navigationMode = Motor.NavigationMode.NAV_FREE_MOUSE;
                // str_1.push('请关闭全景漫游');
            }
            $('.section').css('background', 'url("../common/lib/static/images/ic_pouqie_hover.png") no-repeat center');
            $('.section_box_container').show();
            // $('.section_box_container>li').css({ 'backgroundColor': 'rgb(2, 20, 48)' });
            clippingPlaneEditor = new Motor.ClippingPlaneEditor(currentProject);
            planeVisibility = true;
            clippingPlaneEditor.addClippingPlane($('#section_box').val());
            $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_display.png") no-repeat center' })
            viewer.viewerMode == Motor.ViewerMode.BIM ? $('.cim_bim').css({ 'background': 'url("../common/lib/static/images/ic_map.png") no-repeat center' }) : $('.cim_bim').css({ 'background': 'url("../common/lib/static/images/ic_map_hover.png") no-repeat center' })
            // alert(str_1.join(','));
        }
    });
    $('#section_box').on('change', function () {
        // $(this).css({ 'backgroundColor': 'skyblue' }).siblings().css({ 'backgroundColor': 'rgb(2, 20, 48)' });
        // $('.section_box').css('display', 'none');
        clippingPlaneEditor.addClippingPlane($(this).val());
        $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_display.png") no-repeat center' })
    })
    var planeVisibility = true;
    $('#togglePlane').on('click', function () {
        planeVisibility = !planeVisibility;
        clippingPlaneEditor.setPlaneVisibility(planeVisibility);
        // planeVisibility?$('#togglePlane').removeClass('select'):$('#togglePlane').addClass('select');
        if (planeVisibility) {
            $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_display_hover.png") no-repeat center' })
        }
        // else{
        //     $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_hide_hover.png") no-repeat center' })
        // }
    })
    $('#togglePlane').hover(function () {
        if (planeVisibility) {
            $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_display_hover.png") no-repeat center' })
        }
        // else{
        //     $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_hide_hover.png") no-repeat center' })
        // }
    }, function () {
        if (planeVisibility) {
            $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_display.png") no-repeat center' })
        }
        else {
            $('#togglePlane').css({ 'background': 'url("../common/lib/static/images/ic_hide(1).png") no-repeat center' })
        }
    })


    //漫游
    var autoRoamManger
    $('.roam').on('click', function () {
        if (autoRoamManger && !autoRoamManger.isDestroyed()) {
            autoRoamManger.destroy();
            $('.roam').css({ 'background': 'url("../common/lib/static/images/ic_manyou.png") no-repeat center' });
            $('.roam_box').hide();
        }
        else {
            $('.roam').css({ 'background': 'url("../common/lib/static/images/ic_manyou_hover.png") no-repeat center' });
            $('.roam_box').show();
            //初始化路径漫游管理器
            autoRoamManger = new Motor.AutoRoamManager(viewer);//传入Motor.Viewer对象
        }

    });
    //点选按钮
    $('.roam_box li div').on('mousedown', function (ele) {
        $(this).addClass('active')
    });
    $('.roam_box li div').on('mouseup', function (ele) {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        }
    });
    $('.router_file').on('click', function () {
        //从文件中加载路径关键点
        autoRoamManger.createRouteFromFile('../common/lib/static/data/routes.json');
        //从数组对象中读取路径关键点
        // autoRoamManger.createRouteFromArray(array);
    })
    //开启录制, 每隔一秒添加一次相机姿态
    var timer;

    $('.Record').on('click', function () {
        $('.Record>span').css('display', 'inline');
        clearInterval(timer);
        timer = setInterval(function () {
            autoRoamManger.addPose();
        }, 1000);
    })
    //关闭录制
    $('.closeRecord').on('click', function () {
        $('.Record>span').css('display', 'none');
        clearInterval(timer);
    })
    $('.addPose').on('click', function () {
        //将当前相机位置和姿态添加到路径中
        autoRoamManger.addPose();
    })
    $('.playRoam').on('click', function () {
        //播放路径
        autoRoamManger.playRoam();
    })
    $('.stopRoam').on('click', function () {
        //停止路径
        autoRoamManger.stopRoam();
    })
    $('.emptyRoutes').on('click', function () {
        //清空路径
        autoRoamManger.emptyRoutes();
    })
    $('.consoleRoam').on('click', function () {
        //获取路径点，输出的文本就可以直接保存成路径文件
        console.log(JSON.stringify(autoRoamManger.cameraPoses));
    })
    $('.first_person').on('click', function () {
        if (clippingPlaneEditor && !clippingPlaneEditor.isDestroyed()) {
            $('.section').css('background', 'url("../common/lib/static/images/ic_pouqie.png") no-repeat center')
            clippingPlaneEditor.destroy();
        }
        //开启第一人称漫游
        viewer.navigationMode = Motor.NavigationMode.NAV_FREE_KEY;
        if(viewer.roamEditor.isGravitative){
            $('.isGravitative').addClass('checked');
        }
        else{
            $('.isGravitative').removeClass('checked');
        }
    })
    $('.first_person_close').on('click', function () {
        //关闭第一人称漫游
        viewer.navigationMode = Motor.NavigationMode.NAV_FREE_MOUSE;
    })
    $('.speed').on('change', function () {
        //修改漫游速度
        viewer.roamEditor.movementSpeed = $('.speed').val();
    })
    $('.isGravitative').on('click', function () {
        $('.isGravitative').toggleClass('checked');
        //开启/关闭重力
        viewer.roamEditor.isGravitative = viewer.roamEditor.isGravitative == true ? false : true;
    })

    //切换地图服务
    $('.map_serve').on('click', function () {
        if ($('.map_serve_box').css('display') == 'none') {
            $('.map_serve').css({ 'background': 'url("../common/lib/static/images/ic_map_serve_hover.png") no-repeat center' });
            $('.map_serve_box').css({ 'display': 'block' })
        } else {
            $('.map_serve').css({ 'background': 'url("../common/lib/static/images/ic_map_serve.png") no-repeat center' });
            $('.map_serve_box').css({ 'display': 'none' })
        }

    })
    $('.map_serve_box').on('click', 'li', function () {
        $('.map_serve').css({ 'background': 'url("../common/lib/static/images/ic_map_serve.png") no-repeat center' });
        $('.map_serve_box').css('display', 'none');
        if ($(this).attr('title') == '天地图') {
            //切换到天地图
            viewer.mapCollection.removeAll();
            viewer.mapCollection.add(new Motor.TiandituMap({
                token: '2b6bbb88d28124168e36297ab20c6fa0',
                maximumLevel: 17
            }));
        } else if ($(this).attr('title') == 'ArcGIS') {
            //切换到ArcGIS地图服务
            viewer.mapCollection.removeAll();
            viewer.mapCollection.add(new Motor.ArcGISMap({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            }));
        } else if ($(this).attr('title') == 'WMTS') {
            //切换到WMTS地图服务
            viewer.mapCollection.removeAll();
            viewer.mapCollection.add(new Motor.WebMapTileService({
                url: 'http://cim.citylinker.com:13381/geoserver/gwc/service/wmts',
                layer: 'bigdata:darkworld',
                style: '',
                tileMatrixSetID: 'EPSG:4326',
                tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10',
                    'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15'],
                // minimum: 0,
                maximumLevel: 15
            }));
        } else if ($(this).attr('title') == 'Bing') {
            viewer.mapCollection.removeAll();
            viewer.mapCollection.add(new Motor.BingMap({
                url: 'https://dev.virtualearth.net'
            }));
        }
    });

    //开关抗锯齿
    // $('.antialias').on('click', function () {
    //     viewer.taaEnabled = !viewer.taaEnabled;
    //     $('.antialias').css('background', 'url("../common/lib/static/images/'+(viewer.taaEnabled?'ic_kjc_hover':'ic_kjc')+'.png") no-repeat center')
    // })

    //效果设置
    $('.effect').on('click', function () {
        if ($('.effect_box').css('display') == 'none') {
            $('.effect').css({ 'background': 'url("../common/lib/static/images/ic_effect_hover.png") no-repeat center' });
            $('.effect_box').css({ 'display': 'block' })
        } else {
            $('.effect').css({ 'background': 'url("../common/lib/static/images/ic_effect.png") no-repeat center' });
            $('.effect_box').css({ 'display': 'none' })
        }
    })
    $('.effect_box').click(function (e) {
        e.stopImmediatePropagation();
    })
    $('#shadow').click(function (e) {
        viewer.enableShadow = !viewer.enableShadow;
        $('#shadow').toggleClass('checked');
    });
    $('#shadowIntensity').on('input',function (e) {
        viewer.shadowMap.darkness = 1-parseFloat($('#shadowIntensity').val());
    });
    $('#shadowDirection').on('input',function (e) {
        viewer.envDate = new Date(2020,7,20,parseInt($('#shadowDirection').val()));
    });
    $('#sunlightIntensity').on('input',function (e) {
        viewer.sunlightIntensity = parseFloat($('#sunlightIntensity').val());
    });
    $('#ao').click(function (e) {
        viewer.enableAO = !viewer.enableAO;
        $('#ao').toggleClass('checked');
    });
    $('#environmentmap').click(function (e) {
        viewer.enableSkyBox = !viewer.enableSkyBox;
        $('#environmentmap').toggleClass('checked');
    });
    $('#antialias').click(function (e) {
        viewer.taaEnabled = !viewer.taaEnabled;
        $('#antialias').toggleClass('checked');
    });
    //边线显隐
    var edgecheck=true;
    $('#edge').on('click', function () {
        edgecheck=!edgecheck
        viewer.drawEdge = edgecheck;
        $('#edge').toggleClass('checked');
    })

    //测量
    var measureEditor,measureMode = Motor.MeasureMode.POINTDISTANCE,isMeasuring=false;
    $('.measure').on('click', function () {
        if (measureEditor && !measureEditor.isDestroyed()) {
            measureEditor.destroy();
            isMeasuring=false;
            $('.measure').css({ 'background': 'url("../common/lib/static/images/ic_measure.png") no-repeat center' });
            $('.measure_box').hide();
        }
        else {
            $('.measure').css({ 'background': 'url("../common/lib/static/images/ic_measure_hover.png") no-repeat center' });
            $('.measure_box').show();
            //初始化路径漫游管理器
            isMeasuring=true;
            setMeasureEditor(measureMode);
        }
    });
    $('.measure_box').on('click',function(event){
        event.stopPropagation()
    });
    $('.measure_buttons .close_btn').on('click',function(event){
        if (measureEditor && !measureEditor.isDestroyed()) {
            measureEditor.destroy();
            $('.measure').css({ 'background': 'url("../common/lib/static/images/ic_measure.png") no-repeat center' });
            $('.measure_box').hide();
        }
    })
    $('.button.ld').on('click',function(event){
        measureMode = Motor.MeasureMode.POINTDISTANCE;
        setMeasureEditor(measureMode);
        event.stopPropagation()
    });
    $('.button.dd').on('click',function(event){
        measureMode = Motor.MeasureMode.POINTSDISTANCE;
        setMeasureEditor(measureMode);
        event.stopPropagation()
    });
    $('.button.jd').on('click',function(event){
        measureMode = Motor.MeasureMode.ANGLE;
        setMeasureEditor(measureMode);
        event.stopPropagation()
    });

    function setMeasureEditor(mode){
        if (measureEditor && !measureEditor.isDestroyed()) {
            measureEditor.mode = mode;
        }
        else{
            measureEditor = new Motor.MeasureEditor({
                viewer: viewer,
                mode: mode,
                callback: measureCallback
            });
        }
        
        if(measureMode===Motor.MeasureMode.POINTDISTANCE){
            $('.measure_buttons .button').removeClass('active');
            $('.button.ld').addClass('active');
            $('.measure_result').children().hide();
            $('.measure_result').children("[id!='angle']").show();
        }
        else if(measureMode===Motor.MeasureMode.POINTSDISTANCE){
            $('.measure_buttons .button').removeClass('active');
            $('.button.dd').addClass('active');
            $('.measure_result').children().hide();
            $('.measure_result').children("[id='length']").show();
        }
        else if(measureMode===Motor.MeasureMode.ANGLE){
            $('.measure_buttons .button').removeClass('active');
            $('.button.jd').addClass('active');
            $('.measure_result').children().hide();
            $('.measure_result').children("[id='angle']").show();
        }
    }

    function measureCallback(obj){
        console.log(obj)
        for (let key in obj) {
            if(key==="angle"){
                $('#angle .result').text(obj[key].toFixed(2));
            }
            else if(key==="distance"){
                $('#length .result').text(obj[key].toFixed(2));
            }
            else if(key==="x"){
                $('#xlength .result').text(obj[key].toFixed(2));
            }
            else if(key==="y"){
                $('#ylength .result').text(obj[key].toFixed(2));
            }
            else if(key==="z"){
                $('#zlength .result').text(obj[key].toFixed(2));
            }
        }
    }

    //边线颜色
    $('#colorpick').on('input', function (e) {
        // console.log($('#colorpick').val())
        viewer.edgeColor = Motor.Color.fromCssColorString($('#colorpick').val());
    });
})
/**
 * 绘制工程
 */
var currentProject, zTreeObj, currentSelectedTreeNode,titleName;
var optionTemplate = ["floor", "main_type", "sub_type", "name"];
function drawProject(projectId, isInSubScene) {
    currentProject = viewer.queryProject(projectId, {
        forceCenter: [121, 31]
    });
    currentProject.open({
        drawEdge: false
    }).then(function () {
        if(!titleName){
            titleName = currentProject.name
            $('title').text(currentProject.name);
        }
        $('#loading').hide();
        if (isInSubScene) {
            currentProject.getTreeStructure().then(data => {
                var pTree = data;
                if (pTree) {
                    let setting = {
                        data: {
                            key: {
                                checked: "isChecked"
                            }
                        },
                        view: {
                            showLine: false,
                            fontCss: {/*color:"#7d7d80""rgb(117,121,135)",*/height: '31px' }
                        },
                        check: {
                            enable: true,       //设置是否显示checkbox复选框
                        },
                        callback: {
                            onCheck: function (e, id, treeNode) {
                                if (currentProject.drawEdge) {
                                    currentProject.drawEdge = false;
                                }
                                currentProject.setVisiblityFromTree(treeNode);
                                let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                                let nodes = treeObj.getCheckedNodes();
                                let designIds = [];
                                $.each(nodes, function (i, item) {
                                    designIds.push(item.id);
                                    item.checkedOld = item.checked;
                                })
                            },
                            // onClick: function (e, id, treeNode) {
                            //     if(currentSelectedTreeNode===treeNode){
                            //         currentProject.setComponentsColorFromTree(treeNode,Motor.Color.WHITE);
                            //         currentSelectedTreeNode=undefined;
                            //     }
                            //     else{
                            //         currentProject.setComponentsColorFromTree(treeNode,Motor.Color.CYAN);
                            //         currentSelectedTreeNode = treeNode;
                            //     }
                            //     $('#infobox').hide();
                            // },
                            onDblClick: function (e, id, treeNode) {
                                if (!treeNode.isParent) {
                                    let component = currentProject.getComponentFromTree(treeNode);
                                    let innerHTML = '';
                                    for (var key in component.infos) {
                                        innerHTML += '<div title=' + component.infos[key] + '>' + key + ': ' + component.infos[key] + '</div>';
                                    }
                                    $('#infobox').html('<div title=' + component.guid + '>' + component.guid + '</div>' + innerHTML);
                                    $('#infobox').show();
                                    viewer.flyTo(component);
                                }
                                else {
                                    $('#infobox').hide();
                                }
                            },
                            onExpand: function (event, treeId, treeNode) {
                                if (treeNode.isParent && (!treeNode.children||treeNode.children.length===0)) {
                                    dynamicloadNodes(treeNode).then(function (data) {
                                        treeNode.children = [];
                                        zTreeObj.addNodes(treeNode, data)
                                        reSetNodes(zTreeObj)
                                    })
                                }
                            }
                        },
                    };
                    zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, pTree);
                    zTreeObj.checkAllNodes(true);
                    reSetNodes(zTreeObj);
                    $('.tree-background').show();
                }
            });

        }
    });
}