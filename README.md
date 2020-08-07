# new-CesiumGraph


----------------------------------------------------------------------------------------------------------------------------------------

## cesium-graph 插件改造，支持当前最新版Cesium<br>

 <a><img alt="" height="814" src="https://img-blog.csdnimg.cn/20200806153557422.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDkwMjUyNw==,size_16,color_FFFFFF,t_70" width="1200"></a>&nbsp;


### 使用
###### 在Cesium下面引入 CesiumGeometry.js

###### 示例
```
    let r = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(90),
                Cesium.Math.toRadians(0),
                Cesium.Math.toRadians(0));
    let l = Cesium.Cartesian3.fromDegrees(117.224, 31.819, 128);
    let sensorEntity = viewer.entities.add({
        position: l,
        orientation: Cesium.Transforms.headingPitchRollQuaternion(l, r),
        rectangularSensor: new Cesium.RectangularSensorGraphics({
            radius: 100000,
            xHalfAngle: Cesium.Math.toRadians(45),
            yHalfAngle: Cesium.Math.toRadians(45),
            material: new Cesium.Color(1.0, 0.0, 1.0, 0.4),
            lineColor: new Cesium.Color(1.0, 0.0, 1.0, 1.0),
            showScanPlane: true,
            scanPlaneColor: new Cesium.Color(1.0, 0.0, 1.0, 1.0),
            scanPlaneMode: "vertical",
            scanPlaneRate: 3,
            showThroughEllipsoid: !1
        })
    })
```
