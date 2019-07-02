var parkicon = './assets/images/svg/园林.png';
var gardenicon = './assets/images/svg/公园.png';
var museumicon = './assets/images/svg/british-museum.png';
var governmenticon = './assets/images/svg/政府 非营利机构.png';
var buildingicon = './assets/images/svg/大厦小区地址.png';
var appid = "a56958db79c64abfa62b2a7c03c747a6";
var secret = "98d4c5db9942fb13fbb8e545cb464aa47d2015fe";
Motor.ServiceConfig.server = "http://192.168.2.57:8765";
var mapUrl = 'http://cim.citylinker.com:13381/geoserver/gwc/service/wmts';
// const water_data = data.geometry.coordinates.map();


var list = [
    {
        name: '滨江公园',
        svg: parkicon,
        lon: 121.49253428622272,
        lat: 31.23765357858956,
        color: Motor.Color.fromBytes(255, 255, 222)
    },
    {
        name: '豫园',
        svg: gardenicon,
        lon: 121.4869477629582,
        lat: 31.228575548562407,
        color: Motor.Color.fromBytes(255, 255, 222)
    },
    {
        name: '上海博物馆',
        svg: museumicon,
        lon: 121.47108580415228,
        lat: 31.230277292831513,
        color: Motor.Color.fromBytes(255, 255, 222)
    },
    {
        name: '上海市政府',
        svg: governmenticon,
        lon: 121.46819209918222,
        lat: 31.232877990060466,
        color: Motor.Color.fromBytes(255, 255, 222)
    },
    {
        name: '环球港',
        svg: buildingicon,
        lon: 121.40852896716156,
        lat: 31.23391729705346,
        color: Motor.Color.fromBytes(255, 255, 222)
    }
];

var map = new Motor.WebMapTileService({
    url: mapUrl,
    layer: 'bigdata:darkworld',
    style: 'default',
    tileMatrixSetID: 'EPSG:4326',
    maximumLevel: 15,
    tileMatrixLabels: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10',
        'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15'],
    tilingScheme: Motor.TilingScheme.GeographicTilingScheme
});

var viewer = new Motor.Viewer({
    container: this.container,
    viewerMode: Motor.ViewerMode.CIM,
    appid: appid,
    secret: secret,
    map: map,
    enableBloom:true
});

viewer.readyPromise.then(() => {

    //加载3d-tiles模型
    //eslint-disable-next-line  
    let tileset_0 = this.viewer.loadTileset({
        url: 'http://cim.citylinker.com:13381/sh3dtiles/shanghai_tiles_lujiazui/tileset.json',
        gradualOptions: {
            startColor: new Motor.Cartesian3(0, 0, 1),//起始色
            endColor: new Motor.Cartesian3(1, 1, 1),//终止色
            gradualOffset: 500//渐变终止的最大高度
        },
        useGradual: true,
        planView: true,
        shouldAnimate: true,
        zoomTo: false
    });
    //eslint-disable-next-line  
    let tileset_1 = this.viewer.loadTileset({
        url: 'http://cim.citylinker.com:13381/sh3dtiles/shanghai_tiles_nolujiazui/tileset.json',
        gradualOptions: {
            startColor: new Motor.Cartesian3(0, 0, 1),//起始色
            endColor: new Motor.Cartesian3(1, 1, 1),//终止色
            gradualOffset: 150//渐变终止的最大高度
        },
        useGradual: true,
        planView: true,
        shouldAnimate: true,
        zoomTo: false
    });

    let markers = new Motor.MarkerCollection({
        viewer: this.viewer,//Motor.Viewer实例
        animated: true,//是否开启动画
        interval: "2019-08-04T16:00:00Z/2019-08-04T16:00:04Z",//动画时间
        loop: true//循环播放
    })
    list.map((ele, index) => {
        let arr = computeVertex(121.48620, 31.24755, ele.lon, ele.lat, 100, 0, 1);
        // console.log(arr);
        markers.add([{
            id: 'position1' + index,
            position: {
                cartographicDegrees: [ele.lon, ele.lat, 50]
            },
            plane: {
                dimensions: {
                    cartesian2: [1000, 1000]
                },
                material: {
                    diffusionRing: {
                        color: {
                            rgba: [255, 255, 255, 255]
                        }
                    }
                }
            }
        }, {
            id: "position2" + index,
            position: {
                epoch: "2019-08-04T16:00:00Z",
                cartographicDegrees: index % 2 === 0 ? [
                    0, ele.lon, ele.lat, 1000, //从起始时间开始第0秒的位置
                    2, ele.lon, ele.lat, 500, //从起始时间开始第1秒的位置
                    4, ele.lon, ele.lat, 1000 //从起始时间开始第2秒的位置
                ] : [
                        0, ele.lon, ele.lat, 500, //从起始时间开始第0秒的位置
                        2, ele.lon, ele.lat, 1000, //从起始时间开始第1秒的位置
                        4, ele.lon, ele.lat, 500 //从起始时间开始第2秒的位置
                    ]
            },
        }, {
            //标注id
            id: "marker1" + index,
            //标注位置
            position: {
                reference: "position2" + index + "#position"
            },
            //标注文字内容
            label: {
                text: ele.name,
                pixelOffset: { cartesian2: [0, -100] },
                font: "18px 微软雅黑",
                showBackground: true,
                backgroundColor: {
                    rgba: [0, 255, 0, 125]
                },
                distanceDisplayCondition: { distanceDisplayCondition: [0, 20000] }
            },
            billboard: {
                image: ele.svg,//图片地址
                verticalOrigin: 'BOTTOM',
                horizontalOrigin: 'CENTER',
                pixelOffset: { cartesian2: [0, -20] },
                scale: 0.25,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,//标注始终在最前
                distanceDisplayCondition: { distanceDisplayCondition: [0, 20000] }
            },
            polyline: {
                positions: {
                    references: [
                        "position1" + index + "#position",
                        "position2" + index + "#position"
                    ]
                    // cartographicDegrees:[
                    //     lon,lat,0,
                    //     lon,lat,500
                    // ]
                },
                width: 2,
                material: {
                    stripe: {
                        evenColor: {
                            rgba: [255, 255, 255, 255]
                        },
                        oddColor: {
                            rgba: [255, 255, 255, 0]
                        },
                        repeat: 1,
                        offset: 0.5,
                        orientation: {
                            stripeOrientation: 'VERTICAL'
                        }
                    }
                }
            },
        },
        {
            id: 'gif' + index,
            position: {
                reference: "position2" + index + "#position"
            },
            billboard: {
                image: './assets/images/circle.gif',//图片地址 
                // scale: 0.6,
                pixelOffset: { cartesian2: [0, -40] },
                distanceDisplayCondition: { distanceDisplayCondition: [0, 20000] },
            },
            polyline: {
                positions: {
                    cartographicDegrees: arr
                },
                material: {
                    polylineDashDynamic: {
                        color: {
                            rgba: [255, 0, 0, 255]
                        },
                        oddColor: {
                            rgba: [0,255,0,255]
                        }
                    }
                },
                width: 4
            }
        }
        ])
    })
    $.getJSON("./data.json", "", function (data) {
        data.geometry.coordinates.forEach((ele) => {
            var lonlats = ele[0];
            var waterPositions = [];
            lonlats.forEach(lonlat=>{
                var position = Motor.Cartesian3.fromDegrees(lonlat[0], lonlat[1]);
                waterPositions.push(position);
            });
            viewer.addWater(waterPositions);
        })
    
    });
});


changeView = () => {
    // console.log(this.viewer.currentView)
    this.viewer.currentView = {
        position: new Motor.Cartesian3(-2852726.408799274, 4656509.279496767, 3288785.3865226605),
        heading: 325.03985227174337,
        pitch: -85,
        roll: 358.77912114745027,
        callback:()=>{
            setTimeout(()=>{
                this.viewer.currentView = {
                    position: new Motor.Cartesian3(-2852522.696043213, 4656705.0549966, 3288343.7270516744),
                    heading: 14.252768365538435,
                    pitch: -50.06079591133133,
                    roll: 0.06555448028932681
                }
            },1000)
            
        }
    }
}

function computeVertex(startx, starty, endx, endy, startz, endz, arcFactor = 0) {
    const coordinates = [];
    const sect = 50;
    const start = Motor.Cartesian3.fromDegrees(startx, starty, startz);
    const end = Motor.Cartesian3.fromDegrees(endx, endy, endz);
    const distance = Motor.Cartesian3.distance(start, end);
    // console.log(distance);
    const d = distance / sect;
    const dx = (endx - startx) / sect;
    const dy = (endy - starty) / sect;
    // const a = -0.01;
    const a = -1 / distance * (arcFactor + 0.1);
    const b = (startz - endz + (a * distance * distance)) / (-distance);
    const c = startz;
    for (let i = 0; i < sect; i++) {
        coordinates.push(startx + i * dx);
        coordinates.push(starty + i * dy);
        coordinates.push(a * d * i * d * i + b * d * i + c);
    }
    coordinates.push(endx);
    coordinates.push(endy);
    coordinates.push(endz);
    return coordinates;
}