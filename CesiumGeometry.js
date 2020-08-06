(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CesiumGeometry"] = factory();
	else
		root["CesiumGeometry"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RectangularSensorPrimitive = undefined;

var _RectangularSensorVS = __webpack_require__(6);

var _RectangularSensorVS2 = _interopRequireDefault(_RectangularSensorVS);

var _RectangularSensorFS = __webpack_require__(7);

var _RectangularSensorFS2 = _interopRequireDefault(_RectangularSensorFS);

var _RectangularSensor = __webpack_require__(8);

var _RectangularSensor2 = _interopRequireDefault(_RectangularSensor);

var _RectangularSensorScanPlaneFS = __webpack_require__(9);

var _RectangularSensorScanPlaneFS2 = _interopRequireDefault(_RectangularSensorScanPlaneFS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoundingSphere = Cesium.BoundingSphere;
var Cartesian3 = Cesium.Cartesian3;
var Color = Cesium.Color;
var combine = Cesium.combine;
var ComponentDatatype = Cesium.ComponentDatatype;
var defaultValue = Cesium.defaultValue;
var defined = Cesium.defined;
var defineProperties = Object.defineProperties;
var destroyObject = Cesium.destroyObject;
var DeveloperError = Cesium.DeveloperError;
var Matrix4 = Cesium.Matrix4;
var PrimitiveType = Cesium.PrimitiveType;
var Buffer = Cesium.Buffer;
var BufferUsage = Cesium.BufferUsage;
var DrawCommand = Cesium.DrawCommand;
var Pass = Cesium.Pass;
var RenderState = Cesium.RenderState;
var ShaderProgram = Cesium.ShaderProgram;
var ShaderSource = Cesium.ShaderSource;
var VertexArray = Cesium.VertexArray;
var BlendingState = Cesium.BlendingState;
var CullFace = Cesium.CullFace;
var Material = Cesium.Material;
var SceneMode = Cesium.SceneMode;
var VertexFormat = Cesium.VertexFormat;
var CesiumMath = Cesium.Math;
var Matrix3 = Cesium.Matrix3;
var Matrix4 = Cesium.Matrix4;
var JulianDate = Cesium.JulianDate;

var BoxGeometry = Cesium.BoxGeometry;
var EllipsoidGeometry = Cesium.EllipsoidGeometry;

var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var atan = Math.atan;
var asin = Math.asin;

var attributeLocations = {
    position: 0,
    normal: 1
};

function RectangularSensorPrimitive(options) {
    var self = this;

    options = defaultValue(options, defaultValue.EMPTY_OBJECT);

    /**
     * 是否显示
     */
    this.show = defaultValue(options.show, true);

    /**
     * 切分程度
     */
    this.slice = defaultValue(options.slice, 32);

    /**
     * 传感器的模型矩阵
     */
    this.modelMatrix = Matrix4.clone(options.modelMatrix, new Matrix4());
    this._modelMatrix = new Matrix4();
    this._computedModelMatrix = new Matrix4();
    this._computedScanPlaneModelMatrix = new Matrix4();

    /**
     * 传感器的半径
     */
    this.radius = defaultValue(options.radius, Number.POSITIVE_INFINITY);
    this._radius = undefined;

    /**
     * 传感器水平半角
     */
    this.xHalfAngle = defaultValue(options.xHalfAngle, 0);
    this._xHalfAngle = undefined;

    /**
     * 传感器垂直半角
     */
    this.yHalfAngle = defaultValue(options.yHalfAngle, 0);
    this._yHalfAngle = undefined;

    /**
     * 线的颜色
     */
    this.lineColor = defaultValue(options.lineColor, Color.WHITE);

    /**
     * 是否显示扇面的线
     */
    this.showSectorLines = defaultValue(options.showSectorLines, true);

    /**
     * 是否显示扇面和圆顶面连接的线
     */
    this.showSectorSegmentLines = defaultValue(options.showSectorSegmentLines, true);

    /**
     * 是否显示侧面
     */
    this.showLateralSurfaces = defaultValue(options.showLateralSurfaces, true);

    /**
     * 目前用的统一材质
     * @type {Material}
     */
    this.material = defined(options.material) ? options.material : Material.fromType(Material.ColorType);
    this._material = undefined;
    this._translucent = undefined;

    /**
     * 侧面材质
     * @type {Material}
     */
    this.lateralSurfaceMaterial = defined(options.lateralSurfaceMaterial) ? options.lateralSurfaceMaterial : Material.fromType(Material.ColorType);
    this._lateralSurfaceMaterial = undefined;
    this._lateralSurfaceTranslucent = undefined;

    /**
     * 是否显示圆顶表面
     */
    this.showDomeSurfaces = defaultValue(options.showDomeSurfaces, true);

    /**
     * 圆顶表面材质
     * @type {Material}
     */
    this.domeSurfaceMaterial = defined(options.domeSurfaceMaterial) ? options.domeSurfaceMaterial : Material.fromType(Material.ColorType);
    this._domeSurfaceMaterial = undefined;

    /**
     * 是否显示圆顶面线
     */
    this.showDomeLines = defaultValue(options.showDomeLines, true);

    /**
     * 是否显示与地球相交的线
     */
    this.showIntersection = defaultValue(options.showIntersection, true);

    /**
     * 与地球相交的线的颜色
     */
    this.intersectionColor = defaultValue(options.intersectionColor, Color.WHITE);

    /**
     * 与地球相交的线的宽度（像素）
     */
    this.intersectionWidth = defaultValue(options.intersectionWidth, 5.0);

    /**
     * 是否穿过地球
     */
    this.showThroughEllipsoid = defaultValue(options.showThroughEllipsoid, false);
    this._showThroughEllipsoid = undefined;

    /**
     * 是否显示扫描面
     */
    this.showScanPlane = defaultValue(options.showScanPlane, true);

    /**
     * 扫描面颜色
     */
    this.scanPlaneColor = defaultValue(options.scanPlaneColor, Color.WHITE);

    /**
     * 扫描面模式 垂直vertical/水平horizontal
     */
    this.scanPlaneMode = defaultValue(options.scanPlaneMode, 'horizontal');

    /**
     * 扫描速率
     */
    this.scanPlaneRate = defaultValue(options.scanPlaneRate, 10);

    this._scanePlaneXHalfAngle = 0;
    this._scanePlaneYHalfAngle = 0;

    //时间计算的起点
    this._time = JulianDate.now();

    this._boundingSphere = new BoundingSphere();
    this._boundingSphereWC = new BoundingSphere();

    //扇面 sector
    this._sectorFrontCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.TRIANGLES,
        boundingVolume: this._boundingSphereWC
    });
    this._sectorBackCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.TRIANGLES,
        boundingVolume: this._boundingSphereWC
    });
    this._sectorVA = undefined;

    //扇面边线 sectorLine
    this._sectorLineCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.LINES,
        boundingVolume: this._boundingSphereWC
    });
    this._sectorLineVA = undefined;

    //扇面分割线 sectorSegmentLine
    this._sectorSegmentLineCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.LINES,
        boundingVolume: this._boundingSphereWC
    });
    this._sectorSegmentLineVA = undefined;

    //弧面 dome
    this._domeFrontCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.TRIANGLES,
        boundingVolume: this._boundingSphereWC
    });
    this._domeBackCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.TRIANGLES,
        boundingVolume: this._boundingSphereWC
    });
    this._domeVA = undefined;

    //弧面线 domeLine
    this._domeLineCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.LINES,
        boundingVolume: this._boundingSphereWC
    });
    this._domeLineVA = undefined;

    //扫描面 scanPlane/scanRadial
    this._scanPlaneFrontCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.TRIANGLES,
        boundingVolume: this._boundingSphereWC
    });
    this._scanPlaneBackCommand = new DrawCommand({
        owner: this,
        primitiveType: PrimitiveType.TRIANGLES,
        boundingVolume: this._boundingSphereWC
    });

    this._scanRadialCommand = undefined;

    this._colorCommands = [];

    this._frontFaceRS = undefined;
    this._backFaceRS = undefined;
    this._sp = undefined;

    this._uniforms = {
        u_type: function u_type() {
            return 0; //面
        },
        u_xHalfAngle: function u_xHalfAngle() {
            return self.xHalfAngle;
        },
        u_yHalfAngle: function u_yHalfAngle() {
            return self.yHalfAngle;
        },
        u_radius: function u_radius() {
            return self.radius;
        },
        u_showThroughEllipsoid: function u_showThroughEllipsoid() {
            return self.showThroughEllipsoid;
        },
        u_showIntersection: function u_showIntersection() {
            return self.showIntersection;
        },
        u_intersectionColor: function u_intersectionColor() {
            return self.intersectionColor;
        },
        u_intersectionWidth: function u_intersectionWidth() {
            return self.intersectionWidth;
        },
        u_normalDirection: function u_normalDirection() {
            return 1.0;
        },
        u_lineColor: function u_lineColor() {
            return self.lineColor;
        }
    };

    this._scanUniforms = {
        u_xHalfAngle: function u_xHalfAngle() {
            return self._scanePlaneXHalfAngle;
        },
        u_yHalfAngle: function u_yHalfAngle() {
            return self._scanePlaneYHalfAngle;
        },
        u_radius: function u_radius() {
            return self.radius;
        },
        u_color: function u_color() {
            return self.scanPlaneColor;
        },
        u_showThroughEllipsoid: function u_showThroughEllipsoid() {
            return self.showThroughEllipsoid;
        },
        u_showIntersection: function u_showIntersection() {
            return self.showIntersection;
        },
        u_intersectionColor: function u_intersectionColor() {
            return self.intersectionColor;
        },
        u_intersectionWidth: function u_intersectionWidth() {
            return self.intersectionWidth;
        },
        u_normalDirection: function u_normalDirection() {
            return 1.0;
        },
        u_lineColor: function u_lineColor() {
            return self.lineColor;
        }
    };
}

RectangularSensorPrimitive.prototype.update = function (frameState) {
    var mode = frameState.mode;
    if (!this.show || mode !== SceneMode.SCENE3D) {
        return;
    }
    var createVS = false;
    var createRS = false;
    var createSP = false;

    var xHalfAngle = this.xHalfAngle;
    var yHalfAngle = this.yHalfAngle;

    if (xHalfAngle < 0.0 || yHalfAngle < 0.0) {
        throw new DeveloperError('halfAngle must be greater than or equal to zero.');
    }
    if (xHalfAngle == 0.0 || yHalfAngle == 0.0) {
        return;
    }
    if (this._xHalfAngle !== xHalfAngle || this._yHalfAngle !== yHalfAngle) {
        this._xHalfAngle = xHalfAngle;
        this._yHalfAngle = yHalfAngle;
        createVS = true;
    }

    var radius = this.radius;
    if (radius < 0.0) {
        throw new DeveloperError('this.radius must be greater than or equal to zero.');
    }
    var radiusChanged = false;
    if (this._radius !== radius) {
        radiusChanged = true;
        this._radius = radius;
        this._boundingSphere = new BoundingSphere(Cartesian3.ZERO, this.radius);
    }

    var modelMatrixChanged = !Matrix4.equals(this.modelMatrix, this._modelMatrix);
    if (modelMatrixChanged || radiusChanged) {
        Matrix4.clone(this.modelMatrix, this._modelMatrix);
        Matrix4.multiplyByUniformScale(this.modelMatrix, this.radius, this._computedModelMatrix);
        BoundingSphere.transform(this._boundingSphere, this.modelMatrix, this._boundingSphereWC);
    }

    var showThroughEllipsoid = this.showThroughEllipsoid;
    if (this._showThroughEllipsoid !== this.showThroughEllipsoid) {
        this._showThroughEllipsoid = showThroughEllipsoid;
        createRS = true;
    }

    var material = this.material;
    if (this._material !== material) {
        this._material = material;
        createRS = true;
        createSP = true;
    }
    var translucent = material.isTranslucent();
    if (this._translucent !== translucent) {
        this._translucent = translucent;
        createRS = true;
    }

    if (this.showScanPlane) {
        var time = frameState.time;
        var timeDiff = JulianDate.secondsDifference(time, this._time);
        if (timeDiff < 0) {
            this._time = JulianDate.clone(time, this._time);
        }
        var percentage = Math.max(timeDiff % this.scanPlaneRate / this.scanPlaneRate, 0);
        var angle;

        if (this.scanPlaneMode == 'horizontal') {
            angle = 2 * yHalfAngle * percentage - yHalfAngle;
            var cosYHalfAngle = cos(angle);
            var tanXHalfAngle = tan(xHalfAngle);

            var maxX = atan(cosYHalfAngle * tanXHalfAngle);
            this._scanePlaneXHalfAngle = maxX;
            this._scanePlaneYHalfAngle = angle;
            Cesium.Matrix3.fromRotationX(this._scanePlaneYHalfAngle, matrix3Scratch);
        } else {
            angle = 2 * xHalfAngle * percentage - xHalfAngle;
            var tanYHalfAngle = tan(yHalfAngle);
            var cosXHalfAngle = cos(angle);

            var maxY = atan(cosXHalfAngle * tanYHalfAngle);
            this._scanePlaneXHalfAngle = angle;
            this._scanePlaneYHalfAngle = maxY;
            Cesium.Matrix3.fromRotationY(this._scanePlaneXHalfAngle, matrix3Scratch);
        }

        Cesium.Matrix4.multiplyByMatrix3(this.modelMatrix, matrix3Scratch, this._computedScanPlaneModelMatrix);
        Matrix4.multiplyByUniformScale(this._computedScanPlaneModelMatrix, this.radius, this._computedScanPlaneModelMatrix);
    }

    if (createVS) {
        createVertexArray(this, frameState);
    }
    if (createRS) {
        createRenderState(this, showThroughEllipsoid, translucent);
    }
    if (createSP) {
        createShaderProgram(this, frameState, material);
    }
    if (createRS || createSP) {
        createCommands(this, translucent);
    }

    var commandList = frameState.commandList;
    var passes = frameState.passes;
    var colorCommands = this._colorCommands;
    if (passes.render) {
        for (var i = 0, len = colorCommands.length; i < len; i++) {
            var colorCommand = colorCommands[i];
            commandList.push(colorCommand);
        }
    }
};

var matrix3Scratch = new Matrix3();
var nScratch = new Cartesian3();

//region -- VertexArray --

/**
 * 计算zoy面和zoy面单位扇形位置
 * @param primitive
 * @returns {{zoy: Array, zox: Array}}
 */
function computeUnitPosiiton(primitive, xHalfAngle, yHalfAngle) {
    var slice = primitive.slice;

    //以中心为角度
    var cosYHalfAngle = cos(yHalfAngle);
    var tanYHalfAngle = tan(yHalfAngle);
    var cosXHalfAngle = cos(xHalfAngle);
    var tanXHalfAngle = tan(xHalfAngle);

    var maxY = atan(cosXHalfAngle * tanYHalfAngle);
    var maxX = atan(cosYHalfAngle * tanXHalfAngle);

    //ZOY面单位圆
    var zoy = [];
    for (var i = 0; i < slice; i++) {
        var phi = 2 * maxY * i / (slice - 1) - maxY;
        zoy.push(new Cartesian3(0, sin(phi), cos(phi)));
    }
    //zox面单位圆
    var zox = [];
    for (var i = 0; i < slice; i++) {
        var phi = 2 * maxX * i / (slice - 1) - maxX;
        zox.push(new Cartesian3(sin(phi), 0, cos(phi)));
    }

    return {
        zoy: zoy,
        zox: zox
    };
}

/**
 * 计算扇面的位置
 * @param unitPosition
 * @returns {Array}
 */
function computeSectorPositions(primitive, unitPosition) {
    var xHalfAngle = primitive.xHalfAngle,
        yHalfAngle = primitive.yHalfAngle,
        zoy = unitPosition.zoy,
        zox = unitPosition.zox;
    var positions = [];

    //zoy面沿y轴逆时针转xHalfAngle
    var matrix3 = Matrix3.fromRotationY(xHalfAngle, matrix3Scratch);
    positions.push(zoy.map(function (p) {
        return Matrix3.multiplyByVector(matrix3, p, new Cesium.Cartesian3());
    }));
    //zox面沿x轴顺时针转yHalfAngle
    var matrix3 = Matrix3.fromRotationX(-yHalfAngle, matrix3Scratch);
    positions.push(zox.map(function (p) {
        return Matrix3.multiplyByVector(matrix3, p, new Cesium.Cartesian3());
    }).reverse());
    //zoy面沿y轴顺时针转xHalfAngle
    var matrix3 = Matrix3.fromRotationY(-xHalfAngle, matrix3Scratch);
    positions.push(zoy.map(function (p) {
        return Matrix3.multiplyByVector(matrix3, p, new Cesium.Cartesian3());
    }).reverse());
    //zox面沿x轴逆时针转yHalfAngle
    var matrix3 = Matrix3.fromRotationX(yHalfAngle, matrix3Scratch);
    positions.push(zox.map(function (p) {
        return Matrix3.multiplyByVector(matrix3, p, new Cesium.Cartesian3());
    }));
    return positions;
}

/**
 * 创建扇面顶点
 * @param context
 * @param positions
 * @returns {*}
 */
function createSectorVertexArray(context, positions) {
    var planeLength = Array.prototype.concat.apply([], positions).length - positions.length;
    var vertices = new Float32Array(2 * 3 * 3 * planeLength);

    var k = 0;
    for (var i = 0, len = positions.length; i < len; i++) {
        var planePositions = positions[i];
        var n = Cartesian3.normalize(Cartesian3.cross(planePositions[0], planePositions[planePositions.length - 1], nScratch), nScratch);
        for (var j = 0, planeLength = planePositions.length - 1; j < planeLength; j++) {
            vertices[k++] = 0.0;
            vertices[k++] = 0.0;
            vertices[k++] = 0.0;
            vertices[k++] = -n.x;
            vertices[k++] = -n.y;
            vertices[k++] = -n.z;

            vertices[k++] = planePositions[j].x;
            vertices[k++] = planePositions[j].y;
            vertices[k++] = planePositions[j].z;
            vertices[k++] = -n.x;
            vertices[k++] = -n.y;
            vertices[k++] = -n.z;

            vertices[k++] = planePositions[j + 1].x;
            vertices[k++] = planePositions[j + 1].y;
            vertices[k++] = planePositions[j + 1].z;
            vertices[k++] = -n.x;
            vertices[k++] = -n.y;
            vertices[k++] = -n.z;
        }
    }

    var vertexBuffer = Buffer.createVertexBuffer({
        context: context,
        typedArray: vertices,
        usage: BufferUsage.STATIC_DRAW
    });

    var stride = 2 * 3 * Float32Array.BYTES_PER_ELEMENT;

    var attributes = [{
        index: attributeLocations.position,
        vertexBuffer: vertexBuffer,
        componentsPerAttribute: 3,
        componentDatatype: ComponentDatatype.FLOAT,
        offsetInBytes: 0,
        strideInBytes: stride
    }, {
        index: attributeLocations.normal,
        vertexBuffer: vertexBuffer,
        componentsPerAttribute: 3,
        componentDatatype: ComponentDatatype.FLOAT,
        offsetInBytes: 3 * Float32Array.BYTES_PER_ELEMENT,
        strideInBytes: stride
    }];

    return new VertexArray({
        context: context,
        attributes: attributes
    });
}

/**
 * 创建扇面边线顶点
 * @param context
 * @param positions
 * @returns {*}
 */
function createSectorLineVertexArray(context, positions) {
    var planeLength = positions.length;
    var vertices = new Float32Array(3 * 3 * planeLength);

    var k = 0;
    for (var i = 0, len = positions.length; i < len; i++) {
        var planePositions = positions[i];
        vertices[k++] = 0.0;
        vertices[k++] = 0.0;
        vertices[k++] = 0.0;

        vertices[k++] = planePositions[0].x;
        vertices[k++] = planePositions[0].y;
        vertices[k++] = planePositions[0].z;
    }

    var vertexBuffer = Buffer.createVertexBuffer({
        context: context,
        typedArray: vertices,
        usage: BufferUsage.STATIC_DRAW
    });

    var stride = 3 * Float32Array.BYTES_PER_ELEMENT;

    var attributes = [{
        index: attributeLocations.position,
        vertexBuffer: vertexBuffer,
        componentsPerAttribute: 3,
        componentDatatype: ComponentDatatype.FLOAT,
        offsetInBytes: 0,
        strideInBytes: stride
    }];

    return new VertexArray({
        context: context,
        attributes: attributes
    });
}

/**
 * 创建扇面圆顶面连接线顶点
 * @param context
 * @param positions
 * @returns {*}
 */
function createSectorSegmentLineVertexArray(context, positions) {
    var planeLength = Array.prototype.concat.apply([], positions).length - positions.length;
    var vertices = new Float32Array(3 * 3 * planeLength);

    var k = 0;
    for (var i = 0, len = positions.length; i < len; i++) {
        var planePositions = positions[i];

        for (var j = 0, planeLength = planePositions.length - 1; j < planeLength; j++) {
            vertices[k++] = planePositions[j].x;
            vertices[k++] = planePositions[j].y;
            vertices[k++] = planePositions[j].z;

            vertices[k++] = planePositions[j + 1].x;
            vertices[k++] = planePositions[j + 1].y;
            vertices[k++] = planePositions[j + 1].z;
        }
    }

    var vertexBuffer = Buffer.createVertexBuffer({
        context: context,
        typedArray: vertices,
        usage: BufferUsage.STATIC_DRAW
    });

    var stride = 3 * Float32Array.BYTES_PER_ELEMENT;

    var attributes = [{
        index: attributeLocations.position,
        vertexBuffer: vertexBuffer,
        componentsPerAttribute: 3,
        componentDatatype: ComponentDatatype.FLOAT,
        offsetInBytes: 0,
        strideInBytes: stride
    }];

    return new VertexArray({
        context: context,
        attributes: attributes
    });
}

/**
 * 创建圆顶面顶点
 * @param context
 */
function createDomeVertexArray(context) {
    var geometry = Cesium.EllipsoidGeometry.createGeometry(new Cesium.EllipsoidGeometry({
        vertexFormat: VertexFormat.POSITION_ONLY,
        stackPartitions: 32,
        slicePartitions: 32
    }));

    var vertexArray = VertexArray.fromGeometry({
        context: context,
        geometry: geometry,
        attributeLocations: attributeLocations,
        bufferUsage: BufferUsage.STATIC_DRAW,
        interleave: false
    });
    return vertexArray;
}

/**
 * 创建圆顶面连线顶点
 * @param context
 */
function createDomeLineVertexArray(context) {
    var geometry = Cesium.EllipsoidOutlineGeometry.createGeometry(new Cesium.EllipsoidOutlineGeometry({
        vertexFormat: VertexFormat.POSITION_ONLY,
        stackPartitions: 32,
        slicePartitions: 32
    }));

    var vertexArray = VertexArray.fromGeometry({
        context: context,
        geometry: geometry,
        attributeLocations: attributeLocations,
        bufferUsage: BufferUsage.STATIC_DRAW,
        interleave: false
    });
    return vertexArray;
}

/**
 * 创建扫描面顶点
 * @param context
 * @param positions
 * @returns {*}
 */
function createScanPlaneVertexArray(context, positions) {
    var planeLength = positions.length - 1;
    var vertices = new Float32Array(3 * 3 * planeLength);

    var k = 0;
    for (var i = 0; i < planeLength; i++) {
        vertices[k++] = 0.0;
        vertices[k++] = 0.0;
        vertices[k++] = 0.0;

        vertices[k++] = positions[i].x;
        vertices[k++] = positions[i].y;
        vertices[k++] = positions[i].z;

        vertices[k++] = positions[i + 1].x;
        vertices[k++] = positions[i + 1].y;
        vertices[k++] = positions[i + 1].z;
    }

    var vertexBuffer = Buffer.createVertexBuffer({
        context: context,
        typedArray: vertices,
        usage: BufferUsage.STATIC_DRAW
    });

    var stride = 3 * Float32Array.BYTES_PER_ELEMENT;

    var attributes = [{
        index: attributeLocations.position,
        vertexBuffer: vertexBuffer,
        componentsPerAttribute: 3,
        componentDatatype: ComponentDatatype.FLOAT,
        offsetInBytes: 0,
        strideInBytes: stride
    }];

    return new VertexArray({
        context: context,
        attributes: attributes
    });
}

function createVertexArray(primitive, frameState) {
    var context = frameState.context;

    var unitSectorPositions = computeUnitPosiiton(primitive, primitive.xHalfAngle, primitive.yHalfAngle);
    var positions = computeSectorPositions(primitive, unitSectorPositions);

    //显示扇面
    if (primitive.showLateralSurfaces) {
        primitive._sectorVA = createSectorVertexArray(context, positions);
    }

    //显示扇面线
    if (primitive.showSectorLines) {
        primitive._sectorLineVA = createSectorLineVertexArray(context, positions);
    }

    //显示扇面圆顶面的交线
    if (primitive.showSectorSegmentLines) {
        primitive._sectorSegmentLineVA = createSectorSegmentLineVertexArray(context, positions);
    }

    //显示弧面
    if (primitive.showDomeSurfaces) {
        primitive._domeVA = createDomeVertexArray(context);
    }

    //显示弧面线
    if (primitive.showDomeLines) {
        primitive._domeLineVA = createDomeLineVertexArray(context);
    }

    //显示扫描面
    if (primitive.showScanPlane) {

        if (primitive.scanPlaneMode == 'horizontal') {
            var unitScanPlanePositions = computeUnitPosiiton(primitive, CesiumMath.PI_OVER_TWO, 0);
            primitive._scanPlaneVA = createScanPlaneVertexArray(context, unitScanPlanePositions.zox);
        } else {
            var unitScanPlanePositions = computeUnitPosiiton(primitive, 0, CesiumMath.PI_OVER_TWO);
            primitive._scanPlaneVA = createScanPlaneVertexArray(context, unitScanPlanePositions.zoy);
        }
    }
}

//endregion

//region -- ShaderProgram --

function createCommonShaderProgram(primitive, frameState, material) {
    var context = frameState.context;

    var vs = _RectangularSensorVS2.default;
    var fs = new ShaderSource({
        sources: [_RectangularSensor2.default, material.shaderSource, _RectangularSensorFS2.default]
    });

    primitive._sp = ShaderProgram.replaceCache({
        context: context,
        shaderProgram: primitive._sp,
        vertexShaderSource: vs,
        fragmentShaderSource: fs,
        attributeLocations: attributeLocations
    });

    var pickFS = new ShaderSource({
        sources: [_RectangularSensor2.default, material.shaderSource, _RectangularSensorFS2.default],
        pickColorQualifier: 'uniform'
    });

    primitive._pickSP = ShaderProgram.replaceCache({
        context: context,
        shaderProgram: primitive._pickSP,
        vertexShaderSource: vs,
        fragmentShaderSource: pickFS,
        attributeLocations: attributeLocations
    });
}

function createScanPlaneShaderProgram(primitive, frameState, material) {
    var context = frameState.context;

    var vs = _RectangularSensorVS2.default;
    var fs = new ShaderSource({
        sources: [_RectangularSensor2.default, material.shaderSource, _RectangularSensorScanPlaneFS2.default]
    });

    primitive._scanePlaneSP = ShaderProgram.replaceCache({
        context: context,
        shaderProgram: primitive._scanePlaneSP,
        vertexShaderSource: vs,
        fragmentShaderSource: fs,
        attributeLocations: attributeLocations
    });
}

function createShaderProgram(primitive, frameState, material) {
    createCommonShaderProgram(primitive, frameState, material);

    if (primitive.showScanPlane) {
        createScanPlaneShaderProgram(primitive, frameState, material);
    }
}

//endregion

//region -- RenderState --

function createRenderState(primitive, showThroughEllipsoid, translucent) {
    if (translucent) {
        primitive._frontFaceRS = RenderState.fromCache({
            depthTest: {
                enabled: !showThroughEllipsoid
            },
            depthMask: false,
            blending: BlendingState.ALPHA_BLEND,
            cull: {
                enabled: true,
                face: CullFace.BACK
            }
        });

        primitive._backFaceRS = RenderState.fromCache({
            depthTest: {
                enabled: !showThroughEllipsoid
            },
            depthMask: false,
            blending: BlendingState.ALPHA_BLEND,
            cull: {
                enabled: true,
                face: CullFace.FRONT
            }
        });

        primitive._pickRS = RenderState.fromCache({
            depthTest: {
                enabled: !showThroughEllipsoid
            },
            depthMask: false,
            blending: BlendingState.ALPHA_BLEND
        });
    } else {
        primitive._frontFaceRS = RenderState.fromCache({
            depthTest: {
                enabled: !showThroughEllipsoid
            },
            depthMask: true
        });

        primitive._pickRS = RenderState.fromCache({
            depthTest: {
                enabled: true
            },
            depthMask: true
        });
    }
}

//endregion

//region -- Command --

function createCommand(primitive, frontCommand, backCommand, frontFaceRS, backFaceRS, sp, va, uniforms, modelMatrix, translucent, pass, isLine) {
    if (translucent && backCommand) {
        backCommand.vertexArray = va;
        backCommand.renderState = backFaceRS;
        backCommand.shaderProgram = sp;
        backCommand.uniformMap = combine(uniforms, primitive._material._uniforms);
        backCommand.uniformMap.u_normalDirection = function () {
            return -1.0;
        };
        backCommand.pass = pass;
        backCommand.modelMatrix = modelMatrix;
        primitive._colorCommands.push(backCommand);
    }

    frontCommand.vertexArray = va;
    frontCommand.renderState = frontFaceRS;
    frontCommand.shaderProgram = sp;
    frontCommand.uniformMap = combine(uniforms, primitive._material._uniforms);
    if (isLine) {
        frontCommand.uniformMap.u_type = function () {
            return 1;
        };
    }
    frontCommand.pass = pass;
    frontCommand.modelMatrix = modelMatrix;
    primitive._colorCommands.push(frontCommand);
}

function createCommands(primitive, translucent) {
    primitive._colorCommands.length = 0;

    var pass = translucent ? Pass.TRANSLUCENT : Pass.OPAQUE;

    //显示扇面
    if (primitive.showLateralSurfaces) {
        createCommand(primitive, primitive._sectorFrontCommand, primitive._sectorBackCommand, primitive._frontFaceRS, primitive._backFaceRS, primitive._sp, primitive._sectorVA, primitive._uniforms, primitive._computedModelMatrix, translucent, pass);
    }
    //显示扇面线
    if (primitive.showSectorLines) {
        createCommand(primitive, primitive._sectorLineCommand, undefined, primitive._frontFaceRS, primitive._backFaceRS, primitive._sp, primitive._sectorLineVA, primitive._uniforms, primitive._computedModelMatrix, translucent, pass, true);
    }
    //显示扇面交接线
    if (primitive.showSectorSegmentLines) {
        createCommand(primitive, primitive._sectorSegmentLineCommand, undefined, primitive._frontFaceRS, primitive._backFaceRS, primitive._sp, primitive._sectorSegmentLineVA, primitive._uniforms, primitive._computedModelMatrix, translucent, pass, true);
    }
    //显示弧面
    if (primitive.showDomeSurfaces) {
        createCommand(primitive, primitive._domeFrontCommand, primitive._domeBackCommand, primitive._frontFaceRS, primitive._backFaceRS, primitive._sp, primitive._domeVA, primitive._uniforms, primitive._computedModelMatrix, translucent, pass);
    }
    //显示弧面线
    if (primitive.showDomeLines) {
        createCommand(primitive, primitive._domeLineCommand, undefined, primitive._frontFaceRS, primitive._backFaceRS, primitive._sp, primitive._domeLineVA, primitive._uniforms, primitive._computedModelMatrix, translucent, pass, true);
    }
    //显示扫描面
    if (primitive.showScanPlane) {
        createCommand(primitive, primitive._scanPlaneFrontCommand, primitive._scanPlaneBackCommand, primitive._frontFaceRS, primitive._backFaceRS, primitive._scanePlaneSP, primitive._scanPlaneVA, primitive._scanUniforms, primitive._computedScanPlaneModelMatrix, translucent, pass);
    }
}

//endregion

exports.RectangularSensorPrimitive = RectangularSensorPrimitive;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var BoundingSphere = Cesium.BoundingSphere,
    Cartesian3 = Cesium.Cartesian3,
    Check = Cesium.Check,
    ComponentDatatype = Cesium.ComponentDatatype,
    defaultValue = Cesium.defaultValue,
    defined = Cesium.defined,
    Geometry = Cesium.Geometry,
    GeometryAttribute = Cesium.GeometryAttribute,
    GeometryAttributes = Cesium.GeometryAttributes,
    PrimitiveType = Cesium.PrimitiveType,
    VertexFormat = Cesium.VertexFormat,
    CesiumMath = Cesium.Math,
    GeometryPipeline = Cesium.GeometryPipeline,
    IndexDatatype = Cesium.IndexDatatype,
    Ellipsoid = Cesium.Ellipsoid;

var cos = Math.cos;
var sin = Math.sin;

function ConicArcSensorGeometry(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);

    var angle = options.angle;
    var radius = options.radius;

    var stackPartitions = Math.round(defaultValue(options.stackPartitions, 12));
    var slicePartitions = Math.round(defaultValue(options.slicePartitions, 64));

    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.number('angle', angle);
    Check.typeOf.number('radius', radius);
    //>>includeEnd('debug');

    var vertexFormat = defaultValue(options.vertexFormat, VertexFormat.DEFAULT);

    this._angle = angle;
    this._radius = radius;
    this._stackPartitions = stackPartitions;
    this._slicePartitions = slicePartitions;
    this._vertexFormat = vertexFormat;
}

ConicArcSensorGeometry.fromDimensions = function (options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);
    var angle = options.angle;
    var radius = options.radius;
    var stackPartitions = options.stackPartitions;
    var slicePartitions = options.slicePartitions;

    //>>includeStart('debug', pragmas.debug);
    Check.typeOf.number('angle', angle);
    Check.typeOf.number('radius', radius);
    Check.typeOf.number.greaterThanOrEquals('angle', angle, 0);
    Check.typeOf.number.greaterThanOrEquals('height', height, 0);
    //>>includeEnd('debug');

    return new ConicArcSensorGeometry({
        angle: angle,
        radius: radius,
        stackPartitions: stackPartitions,
        slicePartitions: slicePartitions,
        vertexFormat: options.vertexFormat
    });
};

ConicArcSensorGeometry.createGeometry = function (conicSensorGeometry) {
    console.time('createGeometry');

    var angle = conicSensorGeometry._angle;
    var radius = conicSensorGeometry._radius;
    var stackPartitions = conicSensorGeometry._stackPartitions + 1;
    var slicePartitions = conicSensorGeometry._slicePartitions + 1;
    var vertexFormat = conicSensorGeometry._vertexFormat;

    var attributes = new GeometryAttributes();

    var bottomIndex;

    var numIndices = 3 * (slicePartitions - 1) + 6 * (slicePartitions - 1) * (stackPartitions - 2) + (slicePartitions - 1) * 1 * 3;
    var vertexCount = stackPartitions * slicePartitions;
    var indices = IndexDatatype.createTypedArray(vertexCount, numIndices);
    var positions = new Float64Array(vertexCount * 3 + (slicePartitions - 1) * 3 * 3);

    if (vertexFormat.position) {
        var positionIndex = 0;

        //bottom plat
        var cosTheta = new Array(slicePartitions);
        var sinTheta = new Array(slicePartitions);

        for (var i = 0; i < slicePartitions; i++) {
            var theta = CesiumMath.TWO_PI * i / (slicePartitions - 1);
            cosTheta[i] = cos(theta);
            sinTheta[i] = sin(theta);

            positions[positionIndex++] = 0.0;
            positions[positionIndex++] = 0.0;
            positions[positionIndex++] = -radius;
        }

        for (i = 1; i < stackPartitions; i++) {
            var phi = angle * i / (stackPartitions - 1);
            var sinPhi = sin(phi);

            var xSinPhi = radius * sinPhi;
            var ySinPhi = radius * sinPhi;
            var zCosPhi = radius * cos(phi);

            for (var j = 0; j < slicePartitions; j++) {
                positions[positionIndex++] = cosTheta[j] * xSinPhi;
                positions[positionIndex++] = sinTheta[j] * ySinPhi;
                positions[positionIndex++] = -zCosPhi;
            }
        }

        //side plat
        bottomIndex = positionIndex;
        for (var i = 0; i < slicePartitions - 1; i++) {
            positions[positionIndex++] = 0;
            positions[positionIndex++] = 0;
            positions[positionIndex++] = 0;

            positions[positionIndex++] = positions[bottomIndex - (slicePartitions - i - 1) * 3];
            positions[positionIndex++] = positions[bottomIndex - (slicePartitions - i - 1) * 3 + 1];
            positions[positionIndex++] = positions[bottomIndex - (slicePartitions - i - 1) * 3 + 2];

            positions[positionIndex++] = positions[bottomIndex - (slicePartitions - i) * 3];
            positions[positionIndex++] = positions[bottomIndex - (slicePartitions - i) * 3 + 1];
            positions[positionIndex++] = positions[bottomIndex - (slicePartitions - i) * 3 + 2];
        }

        attributes.position = new GeometryAttribute({
            componentDatatype: ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: positions
        });
    }

    var indicesIndex = 0;

    //bottom plat
    for (var j = 0; j < slicePartitions - 1; j++) {
        indices[indicesIndex++] = slicePartitions + j;
        indices[indicesIndex++] = slicePartitions + j + 1;
        indices[indicesIndex++] = j + 1;
    }

    var topOffset;
    var bottomOffset;
    for (var i = 1; i < stackPartitions - 1; i++) {
        topOffset = i * slicePartitions;
        bottomOffset = (i + 1) * slicePartitions;

        for (j = 0; j < slicePartitions - 1; j++) {
            indices[indicesIndex++] = bottomOffset + j;
            indices[indicesIndex++] = bottomOffset + j + 1;
            indices[indicesIndex++] = topOffset + j + 1;

            indices[indicesIndex++] = bottomOffset + j;
            indices[indicesIndex++] = topOffset + j + 1;
            indices[indicesIndex++] = topOffset + j;
        }
    }

    //side plat
    for (var i = 0, len = (slicePartitions - 1) * 3; i < len; i++) {
        indices[indicesIndex++] = i + bottomIndex / 3;
    }

    var geometry = new Geometry({
        attributes: attributes,
        indices: indices,
        primitiveType: PrimitiveType.TRIANGLES,
        boundingSphere: new BoundingSphere(Cartesian3.ZERO, radius)
    });
    geometry = GeometryPipeline.computeNormal(geometry);
    console.timeEnd('createGeometry');
    return geometry;
};

exports.ConicArcSensorGeometry = ConicArcSensorGeometry;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var BoundingSphere = Cesium.BoundingSphere,
    Cartesian3 = Cesium.Cartesian3,
    ComponentDatatype = Cesium.ComponentDatatype,
    defaultValue = Cesium.defaultValue,
    defined = Cesium.defined,
    DeveloperError = Cesium.DeveloperError,
    Ellipsoid = Cesium.Ellipsoid,
    Geometry = Cesium.Geometry,
    GeometryAttribute = Cesium.GeometryAttribute,
    GeometryAttributes = Cesium.GeometryAttributes,
    IndexDatatype = Cesium.IndexDatatype,
    CesiumMath = Cesium.Math,
    PrimitiveType = Cesium.PrimitiveType;

var defaultRadii = new Cartesian3(1.0, 1.0, 1.0);
var cos = Math.cos;
var sin = Math.sin;

function ConicArcSensorOutlineGeometry(options) {
    options = defaultValue(options, defaultValue.EMPTY_OBJECT);

    var angle = options.angle;
    var radius = options.radius;

    var stackPartitions = Math.round(defaultValue(options.stackPartitions, 10));
    var slicePartitions = Math.round(defaultValue(options.slicePartitions, 8));
    var subdivisions = Math.round(defaultValue(options.subdivisions, 128));

    //>>includeStart('debug', pragmas.debug);
    if (stackPartitions < 1) {
        throw new DeveloperError('options.stackPartitions cannot be less than 1');
    }
    if (slicePartitions < 0) {
        throw new DeveloperError('options.slicePartitions cannot be less than 0');
    }
    if (subdivisions < 0) {
        throw new DeveloperError('options.subdivisions must be greater than or equal to zero.');
    }
    //>>includeEnd('debug');

    this._angle = angle;
    this._radius = radius;
    this._stackPartitions = stackPartitions;
    this._slicePartitions = slicePartitions;
    this._subdivisions = subdivisions;
}

ConicArcSensorOutlineGeometry.createGeometry = function (conicSensorGeometry) {

    var angle = conicSensorGeometry._angle;
    var radius = conicSensorGeometry._radius;

    if (radius <= 0 || angle <= 0) {
        return;
    }

    var stackPartitions = conicSensorGeometry._stackPartitions;
    var slicePartitions = conicSensorGeometry._slicePartitions;
    var subdivisions = conicSensorGeometry._subdivisions;

    var indicesSize = subdivisions * (stackPartitions + slicePartitions - 1);
    var positionSize = indicesSize - slicePartitions + 2;
    var positions = new Float64Array(positionSize * 3);
    var indices = IndexDatatype.createTypedArray(positionSize, indicesSize * 2);

    var i;
    var j;
    var theta;
    var phi;
    var cosPhi;
    var sinPhi;
    var index = 0;

    var cosTheta = new Array(subdivisions);
    var sinTheta = new Array(subdivisions);
    for (i = 0; i < subdivisions; i++) {
        theta = CesiumMath.TWO_PI * i / subdivisions;
        cosTheta[i] = cos(theta);
        sinTheta[i] = sin(theta);
    }

    for (i = 1; i < stackPartitions; i++) {
        phi = angle * i / (stackPartitions - 1);
        cosPhi = cos(phi);
        sinPhi = sin(phi);

        for (j = 0; j < subdivisions; j++) {
            positions[index++] = radius * cosTheta[j] * sinPhi;
            positions[index++] = radius * sinTheta[j] * sinPhi;
            positions[index++] = -radius * cosPhi;
        }
    }

    cosTheta.length = slicePartitions;
    sinTheta.length = slicePartitions;
    for (i = 0; i < slicePartitions; i++) {
        theta = CesiumMath.TWO_PI * i / slicePartitions;
        cosTheta[i] = cos(theta);
        sinTheta[i] = sin(theta);
    }

    positions[index++] = 0;
    positions[index++] = 0;
    positions[index++] = -radius;

    for (i = 1; i < subdivisions; i++) {
        phi = angle * i / subdivisions;
        cosPhi = cos(phi);
        sinPhi = sin(phi);

        for (j = 0; j < slicePartitions; j++) {
            positions[index++] = radius * cosTheta[j] * sinPhi;
            positions[index++] = radius * sinTheta[j] * sinPhi;
            positions[index++] = -radius * cosPhi;
        }
    }

    /*positions[index++] = 0;
     positions[index++] = 0;
     positions[index++] = -radii.z;*/

    index = 0;
    for (i = 0; i < stackPartitions - 1; ++i) {
        var topRowOffset = i * subdivisions;
        for (j = 0; j < subdivisions - 1; ++j) {
            indices[index++] = topRowOffset + j;
            indices[index++] = topRowOffset + j + 1;
        }

        indices[index++] = topRowOffset + subdivisions - 1;
        indices[index++] = topRowOffset;
    }

    var sliceOffset = subdivisions * (stackPartitions - 1);
    for (j = 1; j < slicePartitions + 1; ++j) {
        indices[index++] = sliceOffset;
        indices[index++] = sliceOffset + j;
    }

    for (i = 0; i < subdivisions - 2; ++i) {
        var topOffset = i * slicePartitions + 1 + sliceOffset;
        var bottomOffset = (i + 1) * slicePartitions + 1 + sliceOffset;

        for (j = 0; j < slicePartitions - 1; ++j) {
            indices[index++] = bottomOffset + j;
            indices[index++] = topOffset + j;
        }

        indices[index++] = bottomOffset + slicePartitions - 1;
        indices[index++] = topOffset + slicePartitions - 1;
    }

    /*var lastPosition = positions.length / 3 - 1;
     for (j = lastPosition - 1; j > lastPosition - slicePartitions - 1; --j) {
     indices[index++] = lastPosition;
     indices[index++] = j;
     }*/

    var attributes = new GeometryAttributes({
        position: new GeometryAttribute({
            componentDatatype: ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: positions
        })
    });

    return new Geometry({
        attributes: attributes,
        indices: indices,
        primitiveType: PrimitiveType.LINES,
        boundingSphere: new BoundingSphere(Cartesian3.ZERO, radius)
    });
};

exports.ConicArcSensorOutlineGeometry = ConicArcSensorOutlineGeometry;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultValue = Cesium.defaultValue,
    defined = Cesium.defined,
    defineProperties = Object.defineProperties,
    DeveloperError = Cesium.DeveloperError,
    Event = Cesium.Event,
    createMaterialPropertyDescriptor = Cesium.createMaterialPropertyDescriptor,
    createPropertyDescriptor = Cesium.createPropertyDescriptor;

function ConicArcSensorGraphics(options) {
    this._angle = undefined;
    this._angleSubscription = undefined;
    this._radius = undefined;
    this._radiusSubscription = undefined;
    this._stack = undefined;
    this._stackSubscription = undefined;
    this._slice = undefined;
    this._sliceSubscription = undefined;
    this._color = undefined;
    this._colorSubscription = undefined;
    this._show = undefined;
    this._showSubscription = undefined;
    this._fill = undefined;
    this._fillSubscription = undefined;
    this._color = undefined;
    this._colorSubscription = undefined;
    this._material = undefined;
    this._materialSubscription = undefined;
    this._outline = undefined;
    this._outlineSubscription = undefined;
    this._outlineColor = undefined;
    this._outlineColorSubscription = undefined;
    this._outlineWidth = undefined;
    this._outlineWidthSubscription = undefined;
    this._shadows = undefined;
    this._shadowsSubscription = undefined;
    this._distanceDisplayCondition = undefined;
    this._distanceDisplayConditionSubscription = undefined;
    this._definitionChanged = new Event();

    this._gaze = undefined;
    this._gazeSubscription = undefined;

    this.merge(defaultValue(options, defaultValue.EMPTY_OBJECT));
}

defineProperties(ConicArcSensorGraphics.prototype, {
    /**
     * Gets the event that is raised whenever a property or sub-property is changed or modified.
     * @memberof BoxGraphics.prototype
     * @type {Event}
     * @readonly
     */
    definitionChanged: {
        get: function get() {
            return this._definitionChanged;
        }
    },

    /**
     * Gets or sets the boolean Property specifying the visibility of the box.
     * @memberof BoxGraphics.prototype
     * @type {Property}
     * @default true
     */
    show: createPropertyDescriptor('show'),

    angle: createPropertyDescriptor('angle'),

    radius: createPropertyDescriptor('radius'),

    stack: createPropertyDescriptor('stack'),

    slice: createPropertyDescriptor('slice'),

    color: createPropertyDescriptor('color'),

    /**
     * Gets or sets the material used to fill the box.
     * @memberof BoxGraphics.prototype
     * @type {MaterialProperty}
     * @default Color.WHITE
     */
    material: createMaterialPropertyDescriptor('material'),

    /**
     * Gets or sets the boolean Property specifying whether the box is filled with the provided material.
     * @memberof BoxGraphics.prototype
     * @type {Property}
     * @default true
     */
    fill: createPropertyDescriptor('fill'),

    /**
     * Gets or sets the Property specifying whether the box is outlined.
     * @memberof BoxGraphics.prototype
     * @type {Property}
     * @default false
     */
    outline: createPropertyDescriptor('outline'),

    /**
     * Gets or sets the Property specifying the {@link Color} of the outline.
     * @memberof BoxGraphics.prototype
     * @type {Property}
     * @default Color.BLACK
     */
    outlineColor: createPropertyDescriptor('outlineColor'),

    /**
     * Gets or sets the numeric Property specifying the width of the outline.
     * @memberof BoxGraphics.prototype
     * @type {Property}
     * @default 1.0
     */
    outlineWidth: createPropertyDescriptor('outlineWidth'),

    /**
     * Get or sets the enum Property specifying whether the box
     * casts or receives shadows from each light source.
     * @memberof BoxGraphics.prototype
     * @type {Property}
     * @default ShadowMode.DISABLED
     */
    shadows: createPropertyDescriptor('shadows'),

    /**
     * Gets or sets the {@link DistanceDisplayCondition} Property specifying at what distance from the camera that this box will be displayed.
     * @memberof BoxGraphics.prototype
     * @type {Property}
     */
    distanceDisplayCondition: createPropertyDescriptor('distanceDisplayCondition')
});

ConicArcSensorGraphics.prototype.clone = function (result) {
    if (!defined(result)) {
        return new ConicArcSensorGraphics(this);
    }
    result.angle = this.angle;
    result.radius = this.radius;
    result.stack = this.stack;
    result.slice = this.slice;
    result.show = this.show;
    result.material = this.material;
    result.color = this.color;
    result.fill = this.fill;
    result.outline = this.outline;
    result.outlineColor = this.outlineColor;
    result.outlineWidth = this.outlineWidth;
    result.shadows = this.shadows;
    result.distanceDisplayCondition = this.distanceDisplayCondition;
    result.gaze = this.gaze;
    return result;
};

ConicArcSensorGraphics.prototype.merge = function (source) {
    //>>includeStart('debug', pragmas.debug);
    if (!defined(source)) {
        throw new DeveloperError('source is required.');
    }
    //>>includeEnd('debug');

    this.angle = defaultValue(this.angle, source.angle);
    this.radius = defaultValue(this.radius, source.radius);
    this.stack = defaultValue(this.stack, source.stack);
    this.slice = defaultValue(this.slice, source.slice);
    this.show = defaultValue(this.show, source.show);
    this.color = defaultValue(this.color, source.color);
    this.material = defaultValue(this.material, source.material);
    this.fill = defaultValue(this.fill, source.fill);
    this.outline = defaultValue(this.outline, source.outline);
    this.outlineColor = defaultValue(this.outlineColor, source.outlineColor);
    this.outlineWidth = defaultValue(this.outlineWidth, source.outlineWidth);
    this.shadows = defaultValue(this.shadows, source.shadows);
    this.distanceDisplayCondition = defaultValue(this.distanceDisplayCondition, source.distanceDisplayCondition);
    this.gaze = defaultValue(this.gaze, source.gaze);
};

exports.ConicArcSensorGraphics = ConicArcSensorGraphics;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(5);

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _RectangularSensorPrimitive = __webpack_require__(0);

var _RectangularSensorGraphics = __webpack_require__(10);

var _RectangularSensorVisualizer = __webpack_require__(11);

var _ConicArcSensorGeometry = __webpack_require__(1);

var _ConicArcSensorOutlineGeometry = __webpack_require__(2);

var _ConicArcSensorGraphics = __webpack_require__(3);

var _ConicArcSensorCollection = __webpack_require__(12);

//rectangularSensor


//conicSensor
Cesium.RectangularSensorPrimitive = _RectangularSensorPrimitive.RectangularSensorPrimitive;
Cesium.RectangularSensorGraphics = _RectangularSensorGraphics.RectangularSensorGraphics;
Cesium.RectangularSensorVisualizer = _RectangularSensorVisualizer.RectangularSensorVisualizer;

//conicSensor
Cesium.ConicArcSensorGeometry = _ConicArcSensorGeometry.ConicArcSensorGeometry;
Cesium.ConicArcSensorOutlineGeometry = _ConicArcSensorOutlineGeometry.ConicArcSensorOutlineGeometry;
Cesium.ConicArcSensorGraphics = _ConicArcSensorGraphics.ConicArcSensorGraphics;
Cesium.ConicArcSensorCollection = _ConicArcSensorCollection.ConicArcSensorCollection;

var DataSourceDisplay = Cesium.DataSourceDisplay;
var originalDefaultVisualizersCallback = DataSourceDisplay.defaultVisualizersCallback;
DataSourceDisplay.defaultVisualizersCallback = function (scene, entityCluster, dataSource) {
    var entities = dataSource.entities;
    var array = originalDefaultVisualizersCallback(scene, entityCluster, dataSource);
    return array.concat([new _RectangularSensorVisualizer.RectangularSensorVisualizer(scene, entities)]);
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "attribute vec4 position;\r\nattribute vec3 normal;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvoid main()\r\n{\r\n    gl_Position = czm_modelViewProjection * position;\r\n    v_position = vec3(position);\r\n    v_positionWC = (czm_model * position).xyz;\r\n    v_positionEC = (czm_modelView * position).xyz;\r\n    v_normalEC = czm_normal * normal;\r\n}"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "#ifdef GL_OES_standard_derivatives\r\n#extension GL_OES_standard_derivatives : enable\r\n#endif\r\n\r\nuniform bool u_showIntersection;\r\nuniform bool u_showThroughEllipsoid;\r\n\r\nuniform float u_radius;\r\nuniform float u_xHalfAngle;\r\nuniform float u_yHalfAngle;\r\nuniform float u_normalDirection;\r\nuniform float u_type;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvec4 getColor(float sensorRadius, vec3 pointEC)\r\n{\r\n    czm_materialInput materialInput;\r\n\r\n    vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\r\n    materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\r\n    materialInput.str = pointMC / sensorRadius;\r\n\r\n    vec3 positionToEyeEC = -v_positionEC;\r\n    materialInput.positionToEyeEC = positionToEyeEC;\r\n\r\n    vec3 normalEC = normalize(v_normalEC);\r\n    materialInput.normalEC = u_normalDirection * normalEC;\r\n\r\n    czm_material material = czm_getMaterial(materialInput);\r\n\r\n    return mix(czm_phong(normalize(positionToEyeEC), material,czm_lightDirectionEC), vec4(material.diffuse, material.alpha), 0.4);\r\n\r\n}\r\n\r\nbool isOnBoundary(float value, float epsilon)\r\n{\r\n    float width = getIntersectionWidth();\r\n    float tolerance = width * epsilon;\r\n\r\n#ifdef GL_OES_standard_derivatives\r\n    float delta = max(abs(dFdx(value)), abs(dFdy(value)));\r\n    float pixels = width * delta;\r\n    float temp = abs(value);\r\n    // There are a couple things going on here.\r\n    // First we test the value at the current fragment to see if it is within the tolerance.\r\n    // We also want to check if the value of an adjacent pixel is within the tolerance,\r\n    // but we don't want to admit points that are obviously not on the surface.\r\n    // For example, if we are looking for \"value\" to be close to 0, but value is 1 and the adjacent value is 2,\r\n    // then the delta would be 1 and \"temp - delta\" would be \"1 - 1\" which is zero even though neither of\r\n    // the points is close to zero.\r\n    return temp < tolerance && temp < pixels || (delta < 10.0 * tolerance && temp - delta < tolerance && temp < pixels);\r\n#else\r\n    return abs(value) < tolerance;\r\n#endif\r\n}\r\n\r\nvec4 shade(bool isOnBoundary)\r\n{\r\n    if (u_showIntersection && isOnBoundary)\r\n    {\r\n        return getIntersectionColor();\r\n    }\r\n    if(u_type == 1.0){\r\n        return getLineColor();\r\n    }\r\n    return getColor(u_radius, v_positionEC);\r\n}\r\n\r\nfloat ellipsoidSurfaceFunction(vec3 point)\r\n{\r\n    vec3 scaled = czm_ellipsoidInverseRadii * point;\r\n    return dot(scaled, scaled) - 1.0;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec3 sensorVertexWC = czm_model[3].xyz;      // (0.0, 0.0, 0.0) in model coordinates\r\n    vec3 sensorVertexEC = czm_modelView[3].xyz;  // (0.0, 0.0, 0.0) in model coordinates\r\n\r\n    //vec3 pixDir = normalize(v_position);\r\n    float positionX = v_position.x;\r\n    float positionY = v_position.y;\r\n    float positionZ = v_position.z;\r\n\r\n    vec3 zDir = vec3(0.0, 0.0, 1.0);\r\n    vec3 lineX = vec3(positionX, 0 ,positionZ);\r\n    vec3 lineY = vec3(0, positionY, positionZ);\r\n    float resX = dot(normalize(lineX), zDir);\r\n    if(resX < cos(u_xHalfAngle)-0.00001){\r\n        discard;\r\n    }\r\n    float resY = dot(normalize(lineY), zDir);\r\n    if(resY < cos(u_yHalfAngle)-0.00001){\r\n        discard;\r\n    }\r\n\r\n    float ellipsoidValue = ellipsoidSurfaceFunction(v_positionWC);\r\n\r\n    // Occluded by the ellipsoid?\r\n\tif (!u_showThroughEllipsoid)\r\n\t{\r\n\t    // Discard if in the ellipsoid\r\n\t    // PERFORMANCE_IDEA: A coarse check for ellipsoid intersection could be done on the CPU first.\r\n\t    if (ellipsoidValue < 0.0)\r\n\t    {\r\n            discard;\r\n\t    }\r\n\r\n\t    // Discard if in the sensor's shadow\r\n\t    if (inSensorShadow(sensorVertexWC, v_positionWC))\r\n\t    {\r\n\t        discard;\r\n\t    }\r\n    }\r\n\r\n    // Notes: Each surface functions should have an associated tolerance based on the floating point error.\r\n    bool isOnEllipsoid = isOnBoundary(ellipsoidValue, czm_epsilon3);\r\n    //isOnEllipsoid = false;\r\n    //if((resX >= 0.8 && resX <= 0.81)||(resY >= 0.8 && resY <= 0.81)){\r\n    /*if(false){\r\n        gl_FragColor = vec4(1.0,0.0,0.0,1.0);\r\n    }else{\r\n        gl_FragColor = shade(isOnEllipsoid);\r\n    }\r\n*/\r\n    gl_FragColor = shade(isOnEllipsoid);\r\n\r\n}"

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "uniform vec4 u_intersectionColor;\nuniform float u_intersectionWidth;\nuniform vec4 u_lineColor;\n\nbool inSensorShadow(vec3 coneVertexWC, vec3 pointWC)\n{\n    // Diagonal matrix from the unscaled ellipsoid space to the scaled space.    \n    vec3 D = czm_ellipsoidInverseRadii;\n\n    // Sensor vertex in the scaled ellipsoid space\n    vec3 q = D * coneVertexWC;\n    float qMagnitudeSquared = dot(q, q);\n    float test = qMagnitudeSquared - 1.0;\n    \n    // Sensor vertex to fragment vector in the ellipsoid's scaled space\n    vec3 temp = D * pointWC - q;\n    float d = dot(temp, q);\n    \n    // Behind silhouette plane and inside silhouette cone\n    return (d < -test) && (d / length(temp) < -sqrt(test));\n}\n\n///////////////////////////////////////////////////////////////////////////////\n\nvec4 getLineColor()\n{\n    return u_lineColor;\n}\n\nvec4 getIntersectionColor()\n{\n    return u_intersectionColor;\n}\n\nfloat getIntersectionWidth()\n{\n    return u_intersectionWidth;\n}\n\nvec2 sensor2dTextureCoordinates(float sensorRadius, vec3 pointMC)\n{\n    // (s, t) both in the range [0, 1]\n    float t = pointMC.z / sensorRadius;\n    float s = 1.0 + (atan(pointMC.y, pointMC.x) / czm_twoPi);\n    s = s - floor(s);\n    \n    return vec2(s, t);\n}\n"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "#ifdef GL_OES_standard_derivatives\r\n#extension GL_OES_standard_derivatives : enable\r\n#endif\r\n\r\nuniform bool u_showIntersection;\r\nuniform bool u_showThroughEllipsoid;\r\n\r\nuniform float u_radius;\r\nuniform float u_xHalfAngle;\r\nuniform float u_yHalfAngle;\r\nuniform float u_normalDirection;\r\nuniform vec4 u_color;\r\n\r\nvarying vec3 v_position;\r\nvarying vec3 v_positionWC;\r\nvarying vec3 v_positionEC;\r\nvarying vec3 v_normalEC;\r\n\r\nvec4 getColor(float sensorRadius, vec3 pointEC)\r\n{\r\n    czm_materialInput materialInput;\r\n\r\n    vec3 pointMC = (czm_inverseModelView * vec4(pointEC, 1.0)).xyz;\r\n    materialInput.st = sensor2dTextureCoordinates(sensorRadius, pointMC);\r\n    materialInput.str = pointMC / sensorRadius;\r\n\r\n    vec3 positionToEyeEC = -v_positionEC;\r\n    materialInput.positionToEyeEC = positionToEyeEC;\r\n\r\n    vec3 normalEC = normalize(v_normalEC);\r\n    materialInput.normalEC = u_normalDirection * normalEC;\r\n\r\n    czm_material material = czm_getMaterial(materialInput);\r\n\r\n    material.diffuse = u_color.rgb;\r\n    material.alpha = u_color.a;\r\n\r\n    return mix(czm_phong(normalize(positionToEyeEC), material,czm_lightDirectionEC), vec4(material.diffuse, material.alpha), 0.4);\r\n\r\n}\r\n\r\nbool isOnBoundary(float value, float epsilon)\r\n{\r\n    float width = getIntersectionWidth();\r\n    float tolerance = width * epsilon;\r\n\r\n#ifdef GL_OES_standard_derivatives\r\n    float delta = max(abs(dFdx(value)), abs(dFdy(value)));\r\n    float pixels = width * delta;\r\n    float temp = abs(value);\r\n    // There are a couple things going on here.\r\n    // First we test the value at the current fragment to see if it is within the tolerance.\r\n    // We also want to check if the value of an adjacent pixel is within the tolerance,\r\n    // but we don't want to admit points that are obviously not on the surface.\r\n    // For example, if we are looking for \"value\" to be close to 0, but value is 1 and the adjacent value is 2,\r\n    // then the delta would be 1 and \"temp - delta\" would be \"1 - 1\" which is zero even though neither of\r\n    // the points is close to zero.\r\n    return temp < tolerance && temp < pixels || (delta < 10.0 * tolerance && temp - delta < tolerance && temp < pixels);\r\n#else\r\n    return abs(value) < tolerance;\r\n#endif\r\n}\r\n\r\nvec4 shade(bool isOnBoundary)\r\n{\r\n    if (u_showIntersection && isOnBoundary)\r\n    {\r\n        return getIntersectionColor();\r\n    }\r\n    return getColor(u_radius, v_positionEC);\r\n}\r\n\r\nfloat ellipsoidSurfaceFunction(vec3 point)\r\n{\r\n    vec3 scaled = czm_ellipsoidInverseRadii * point;\r\n    return dot(scaled, scaled) - 1.0;\r\n}\r\n\r\nvoid main()\r\n{\r\n    vec3 sensorVertexWC = czm_model[3].xyz;      // (0.0, 0.0, 0.0) in model coordinates\r\n    vec3 sensorVertexEC = czm_modelView[3].xyz;  // (0.0, 0.0, 0.0) in model coordinates\r\n\r\n    //vec3 pixDir = normalize(v_position);\r\n    float positionX = v_position.x;\r\n    float positionY = v_position.y;\r\n    float positionZ = v_position.z;\r\n\r\n    vec3 zDir = vec3(0.0, 0.0, 1.0);\r\n    vec3 lineX = vec3(positionX, 0 ,positionZ);\r\n    vec3 lineY = vec3(0, positionY, positionZ);\r\n    float resX = dot(normalize(lineX), zDir);\r\n    if(resX < cos(u_xHalfAngle) - 0.0001){\r\n        discard;\r\n    }\r\n    float resY = dot(normalize(lineY), zDir);\r\n    if(resY < cos(u_yHalfAngle)- 0.0001){\r\n        discard;\r\n    }\r\n\r\n    float ellipsoidValue = ellipsoidSurfaceFunction(v_positionWC);\r\n\r\n    // Occluded by the ellipsoid?\r\n\tif (!u_showThroughEllipsoid)\r\n\t{\r\n\t    // Discard if in the ellipsoid\r\n\t    // PERFORMANCE_IDEA: A coarse check for ellipsoid intersection could be done on the CPU first.\r\n\t    if (ellipsoidValue < 0.0)\r\n\t    {\r\n            discard;\r\n\t    }\r\n\r\n\t    // Discard if in the sensor's shadow\r\n\t    if (inSensorShadow(sensorVertexWC, v_positionWC))\r\n\t    {\r\n\t        discard;\r\n\t    }\r\n    }\r\n\r\n    // Notes: Each surface functions should have an associated tolerance based on the floating point error.\r\n    bool isOnEllipsoid = isOnBoundary(ellipsoidValue, czm_epsilon3);\r\n    gl_FragColor = shade(isOnEllipsoid);\r\n\r\n}"

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultValue = Cesium.defaultValue;
var defined = Cesium.defined;
var defineProperties = Object.defineProperties;
var DeveloperError = Cesium.DeveloperError;
var Event = Cesium.Event;
var createMaterialPropertyDescriptor = Cesium.createMaterialPropertyDescriptor;
var createPropertyDescriptor = Cesium.createPropertyDescriptor;

function RectangularSensorGraphics(options) {
    this._show = undefined;
    this._radius = undefined;
    this._xHalfAngle = undefined;
    this._yHalfAngle = undefined;
    this._lineColor = undefined;
    this._showSectorLines = undefined;
    this._showSectorSegmentLines = undefined;
    this._showLateralSurfaces = undefined;
    this._material = undefined;
    this._showDomeSurfaces = undefined;
    this._showDomeLines = undefined;
    this._showIntersection = undefined;
    this._intersectionColor = undefined;
    this._intersectionWidth = undefined;
    this._showThroughEllipsoid = undefined;
    this._gaze = undefined;
    this._showScanPlane = undefined;
    this._scanPlaneColor = undefined;
    this._scanPlaneMode = undefined;
    this._scanPlaneRate = undefined;
    this._definitionChanged = new Event();
    this.merge(defaultValue(options, defaultValue.EMPTY_OBJECT));
}

defineProperties(RectangularSensorGraphics.prototype, {
    definitionChanged: {
        get: function get() {
            return this._definitionChanged;
        }
    },

    show: createPropertyDescriptor('show'),
    radius: createPropertyDescriptor('radius'),
    xHalfAngle: createPropertyDescriptor('xHalfAngle'),
    yHalfAngle: createPropertyDescriptor('yHalfAngle'),
    lineColor: createPropertyDescriptor('lineColor'),
    showSectorLines: createPropertyDescriptor('showSectorLines'),
    showSectorSegmentLines: createPropertyDescriptor('showSectorSegmentLines'),
    showLateralSurfaces: createPropertyDescriptor('showLateralSurfaces'),
    material: createMaterialPropertyDescriptor('material'),
    showDomeSurfaces: createPropertyDescriptor('showDomeSurfaces'),
    showDomeLines: createPropertyDescriptor('showDomeLines '),
    showIntersection: createPropertyDescriptor('showIntersection'),
    intersectionColor: createPropertyDescriptor('intersectionColor'),
    intersectionWidth: createPropertyDescriptor('intersectionWidth'),
    showThroughEllipsoid: createPropertyDescriptor('showThroughEllipsoid'),
    gaze: createPropertyDescriptor('gaze'),
    showScanPlane: createPropertyDescriptor('showScanPlane'),
    scanPlaneColor: createPropertyDescriptor('scanPlaneColor'),
    scanPlaneMode: createPropertyDescriptor('scanPlaneMode'),
    scanPlaneRate: createPropertyDescriptor('scanPlaneRate')
});

RectangularSensorGraphics.prototype.clone = function (result) {
    if (!defined(result)) {
        result = new RectangularSensorGraphics();
    }

    result.show = this.show;
    result.radius = this.radius;
    result.xHalfAngle = this.xHalfAngle;
    result.yHalfAngle = this.yHalfAngle;
    result.lineColor = this.lineColor;
    result.showSectorLines = this.showSectorLines;
    result.showSectorSegmentLines = this.showSectorSegmentLines;
    result.showLateralSurfaces = this.showLateralSurfaces;
    result.material = this.material;
    result.showDomeSurfaces = this.showDomeSurfaces;
    result.showDomeLines = this.showDomeLines;
    result.showIntersection = this.showIntersection;
    result.intersectionColor = this.intersectionColor;
    result.intersectionWidth = this.intersectionWidth;
    result.showThroughEllipsoid = this.showThroughEllipsoid;
    result.gaze = this.gaze;
    result.showScanPlane = this.showScanPlane;
    result.scanPlaneColor = this.scanPlaneColor;
    result.scanPlaneMode = this.scanPlaneMode;
    result.scanPlaneRate = this.scanPlaneRate;

    return result;
};

RectangularSensorGraphics.prototype.merge = function (source) {
    if (!defined(source)) {
        throw new DeveloperError('source is required.');
    }

    this.show = defaultValue(this.show, source.show);
    this.radius = defaultValue(this.radius, source.radius);
    this.xHalfAngle = defaultValue(this.xHalfAngle, source.xHalfAngle);
    this.yHalfAngle = defaultValue(this.yHalfAngle, source.yHalfAngle);
    this.lineColor = defaultValue(this.lineColor, source.lineColor);
    this.showSectorLines = defaultValue(this.showSectorLines, source.showSectorLines);
    this.showSectorSegmentLines = defaultValue(this.showSectorSegmentLines, source.showSectorSegmentLines);
    this.showLateralSurfaces = defaultValue(this.showLateralSurfaces, source.showLateralSurfaces);
    this.material = defaultValue(this.material, source.material);
    this.showDomeSurfaces = defaultValue(this.showDomeSurfaces, source.showDomeSurfaces);
    this.showDomeLines = defaultValue(this.showDomeLines, source.showDomeLines);
    this.showIntersection = defaultValue(this.showIntersection, source.showIntersection);
    this.intersectionColor = defaultValue(this.intersectionColor, source.intersectionColor);
    this.intersectionWidth = defaultValue(this.intersectionWidth, source.intersectionWidth);
    this.showThroughEllipsoid = defaultValue(this.showThroughEllipsoid, source.showThroughEllipsoid);
    this.gaze = defaultValue(this.gaze, source.gaze);
    this.showScanPlane = defaultValue(this.showScanPlane, source.showScanPlane);
    this.scanPlaneColor = defaultValue(this.scanPlaneColor, source.scanPlaneColor);
    this.scanPlaneMode = defaultValue(this.scanPlaneMode, source.scanPlaneMode);
    this.scanPlaneRate = defaultValue(this.scanPlaneRate, source.scanPlaneRate);
};

exports.RectangularSensorGraphics = RectangularSensorGraphics;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RectangularSensorVisualizer = undefined;

var _RectangularSensorPrimitive = __webpack_require__(0);

var AssociativeArray = Cesium.AssociativeArray;
var Cartesian3 = Cesium.Cartesian3;
var Color = Cesium.Color;
var defined = Cesium.defined;
var destroyObject = Cesium.destroyObject;
var DeveloperError = Cesium.DeveloperError;
var Matrix3 = Cesium.Matrix3;
var Matrix4 = Cesium.Matrix4;
var Quaternion = Cesium.Quaternion;
var MaterialProperty = Cesium.MaterialProperty;
var Property = Cesium.Property;

var matrix3Scratch = new Matrix3();
var matrix4Scratch = new Matrix4();
var cachedPosition = new Cartesian3();
var cachedGazePosition = new Cartesian3();
var cachedOrientation = new Quaternion();
var diffVectorScratch = new Cartesian3();
var orientationScratch = new Quaternion();

function removePrimitive(entity, hash, primitives) {
    var data = hash[entity.id];
    if (defined(data)) {
        var primitive = data.primitive;
        primitives.remove(primitive);
        if (!primitive.isDestroyed()) {
            primitive.destroy();
        }
        delete hash[entity.id];
    }
};

var RectangularSensorVisualizer = function RectangularSensorVisualizer(scene, entityCollection) {
    // >>includeStart('debug', pragmas.debug);
    if (!defined(scene)) {
        throw new DeveloperError('scene is required.');
    }
    if (!defined(entityCollection)) {
        throw new DeveloperError('entityCollection is required.');
    }
    // >>includeEnd('debug');

    entityCollection.collectionChanged.addEventListener(RectangularSensorVisualizer.prototype._onCollectionChanged, this);

    this._scene = scene;
    this._primitives = scene.primitives;
    this._entityCollection = entityCollection;
    this._hash = {};
    this._entitiesToVisualize = new AssociativeArray();

    this._onCollectionChanged(entityCollection, entityCollection.values, [], []);
};

/**
 * Updates the primitives created by this visualizer to match their
 * Entity counterpart at the given time.
 *
 * @param {JulianDate} time The time to update to.
 * @returns {Boolean} This function always returns true.
 */
RectangularSensorVisualizer.prototype.update = function (time) {
    // >>includeStart('debug', pragmas.debug);
    if (!defined(time)) {
        throw new DeveloperError('time is required.');
    }
    // >>includeEnd('debug');

    var entities = this._entitiesToVisualize.values;
    var hash = this._hash;
    var primitives = this._primitives;

    for (var i = 0, len = entities.length; i < len; i++) {
        var entity = entities[i];
        var rectangularSensorGraphics = entity._rectangularSensor;

        var position;
        var orientation;
        var radius;
        var xHalfAngle;
        var yHalfAngle;
        var data = hash[entity.id];
        var show = entity.isShowing && entity.isAvailable(time) && Property.getValueOrDefault(rectangularSensorGraphics._show, time, true);

        if (show) {
            position = Property.getValueOrUndefined(entity._position, time, cachedPosition);
            orientation = Property.getValueOrUndefined(entity._orientation, time, cachedOrientation);
            radius = Property.getValueOrUndefined(rectangularSensorGraphics._radius, time);
            xHalfAngle = Property.getValueOrUndefined(rectangularSensorGraphics._xHalfAngle, time);
            yHalfAngle = Property.getValueOrUndefined(rectangularSensorGraphics._yHalfAngle, time);
            show = defined(position) && defined(xHalfAngle) && defined(yHalfAngle);
        }

        if (!show) {
            // don't bother creating or updating anything else
            if (defined(data)) {
                data.primitive.show = false;
            }
            continue;
        }

        var primitive = defined(data) ? data.primitive : undefined;
        if (!defined(primitive)) {
            primitive = new _RectangularSensorPrimitive.RectangularSensorPrimitive();
            primitive.id = entity;
            primitives.add(primitive);

            data = {
                primitive: primitive,
                position: undefined,
                orientation: undefined
            };
            hash[entity.id] = data;
        }

        var gaze = Property.getValueOrUndefined(rectangularSensorGraphics._gaze, time);
        if (defined(gaze)) {

            var targetPosition = Property.getValueOrUndefined(gaze._position, time, cachedGazePosition);

            if (!defined(position) || !defined(targetPosition)) {
                continue;
            }

            var diffVector = Cartesian3.subtract(position, targetPosition, diffVectorScratch);
            var rotate = Cartesian3.angleBetween(Cesium.Cartesian3.UNIT_Z, diffVector);
            var cross = Cartesian3.cross(Cesium.Cartesian3.UNIT_Z, diffVector, diffVectorScratch);
            var orientation = Quaternion.fromAxisAngle(cross, rotate - Math.PI, orientationScratch);

            //replace original radius
            radius = Cartesian3.distance(position, targetPosition);
            primitive.modelMatrix = Matrix4.fromRotationTranslation(Matrix3.fromQuaternion(orientation, matrix3Scratch), position, primitive.modelMatrix);
        } else {
            if (!Cartesian3.equals(position, data.position) || !Quaternion.equals(orientation, data.orientation)) {
                if (defined(orientation)) {
                    primitive.modelMatrix = Matrix4.fromRotationTranslation(Matrix3.fromQuaternion(orientation, matrix3Scratch), position, primitive.modelMatrix);
                    data.position = Cartesian3.clone(position, data.position);
                    data.orientation = Quaternion.clone(orientation, data.orientation);
                } else {
                    primitive.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                    data.position = Cartesian3.clone(position, data.position);
                }
            }
        }

        primitive.show = true;
        primitive.gaze = gaze;
        primitive.radius = radius;
        primitive.xHalfAngle = xHalfAngle;
        primitive.yHalfAngle = yHalfAngle;
        primitive.lineColor = Property.getValueOrDefault(rectangularSensorGraphics._lineColor, time, Color.WHITE);
        primitive.showSectorLines = Property.getValueOrDefault(rectangularSensorGraphics._showSectorLines, time, true);
        primitive.showSectorSegmentLines = Property.getValueOrDefault(rectangularSensorGraphics._showSectorSegmentLines, time, true);
        primitive.showLateralSurfaces = Property.getValueOrDefault(rectangularSensorGraphics._showLateralSurfaces, time, true);
        primitive.material = MaterialProperty.getValue(time, rectangularSensorGraphics._material, primitive.material);
        primitive.showDomeSurfaces = Property.getValueOrDefault(rectangularSensorGraphics._showDomeSurfaces, time, true);
        primitive.showDomeLines = Property.getValueOrDefault(rectangularSensorGraphics._showDomeLines, time, true);
        primitive.showIntersection = Property.getValueOrDefault(rectangularSensorGraphics._showIntersection, time, true);
        primitive.intersectionColor = Property.getValueOrDefault(rectangularSensorGraphics._intersectionColor, time, Color.WHITE);
        primitive.intersectionWidth = Property.getValueOrDefault(rectangularSensorGraphics._intersectionWidth, time, 1);
        primitive.showThroughEllipsoid = Property.getValueOrDefault(rectangularSensorGraphics._showThroughEllipsoid, time, true);
        primitive.scanPlaneMode = Property.getValueOrDefault(rectangularSensorGraphics._scanPlaneMode, time);
        primitive.scanPlaneColor = Property.getValueOrDefault(rectangularSensorGraphics._scanPlaneColor, time, Color.WHITE);
        primitive.showScanPlane = Property.getValueOrDefault(rectangularSensorGraphics._showScanPlane, time, true);
        primitive.scanPlaneRate = Property.getValueOrDefault(rectangularSensorGraphics._scanPlaneRate, time, 1);
    }
    return true;
};

/**
 * Returns true if this object was destroyed; otherwise, false.
 *
 * @returns {Boolean} True if this object was destroyed; otherwise, false.
 */
RectangularSensorVisualizer.prototype.isDestroyed = function () {
    return false;
};

/**
 * Removes and destroys all primitives created by this instance.
 */
RectangularSensorVisualizer.prototype.destroy = function () {
    var entities = this._entitiesToVisualize.values;
    var hash = this._hash;
    var primitives = this._primitives;
    for (var i = entities.length - 1; i > -1; i--) {
        removePrimitive(entities[i], hash, primitives);
    }
    return destroyObject(this);
};

/**
 * @private
 */
RectangularSensorVisualizer.prototype._onCollectionChanged = function (entityCollection, added, removed, changed) {
    var i;
    var entity;
    var entities = this._entitiesToVisualize;
    var hash = this._hash;
    var primitives = this._primitives;

    for (i = added.length - 1; i > -1; i--) {
        entity = added[i];
        if (defined(entity._rectangularSensor) && defined(entity._position)) {
            entities.set(entity.id, entity);
        }
    }

    for (i = changed.length - 1; i > -1; i--) {
        entity = changed[i];
        if (defined(entity._rectangularSensor) && defined(entity._position)) {
            entities.set(entity.id, entity);
        } else {
            removePrimitive(entity, hash, primitives);
            entities.remove(entity.id);
        }
    }

    for (i = removed.length - 1; i > -1; i--) {
        entity = removed[i];
        removePrimitive(entity, hash, primitives);
        entities.remove(entity.id);
    }
};

exports.RectangularSensorVisualizer = RectangularSensorVisualizer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConicArcSensorCollection = undefined;

var _ConicArcSensorGeometry = __webpack_require__(1);

var _ConicArcSensorOutlineGeometry = __webpack_require__(2);

var _ConicArcSensor = __webpack_require__(13);

var defaultValue = Cesium.defaultValue;
var defined = Cesium.defined;
var Viewer = Cesium.Viewer;
var Transforms = Cesium.Transforms;
var DeveloperError = Cesium.DeveloperError;
var ColorGeometryInstanceAttribute = Cesium.ColorGeometryInstanceAttribute;
var Color = Cesium.Color;
var Primitive = Cesium.Primitive;
var PerInstanceColorAppearance = Cesium.PerInstanceColorAppearance;
var Cartesian3 = Cesium.Cartesian3;
var VertexFormat = Cesium.VertexFormat;
var Quaternion = Cesium.Quaternion;
var Matrix3 = Cesium.Matrix3;
var Matrix4 = Cesium.Matrix4;
var Property = Cesium.Property;
var Event = Cesium.Event;
var DistanceDisplayCondition = Cesium.DistanceDisplayCondition;
var DistanceDisplayConditionGeometryInstanceAttribute = Cesium.DistanceDisplayConditionGeometryInstanceAttribute;

function ConicArcSensorCollection(viewer) {
    var self = this;
    if (!defined(viewer)) {
        throw new DeveloperError('viewer is required.');
    }

    this._viewer = viewer;

    var scene = viewer.scene;
    this._scene = scene;

    var clock = viewer.clock;
    this._clock = clock;

    this._primitives = scene.primitives;
    this._primitive = undefined;
    this._outlinePrimitive = undefined;

    this._conicArcSensorCollection = [];

    clock.onTick.addEventListener(function () {
        self.update();
    });
}

var matrix3Scratch = new Matrix3();
var matrix4Scratch = new Matrix4();
var positionScratch = new Cartesian3();
var targetPositionScratch = new Cartesian3();
var diffVectorScratch = new Cartesian3();
var orientationScratch = new Quaternion();

ConicArcSensorCollection.prototype.add = function (conicArcSensor) {

    if (!(conicArcSensor instanceof _ConicArcSensor.ConicArcSensor)) {
        conicArcSensor = new _ConicArcSensor.ConicArcSensor(conicArcSensor);
    }

    this._conicArcSensorCollection.push(conicArcSensor);

    return conicArcSensor;
};

ConicArcSensorCollection.prototype.remove = function (conicArcSensor) {
    var index = this._conicArcSensorCollection.indexOf(conicArcSensor);
    if (index !== -1) {
        this._conicArcSensorCollection.splice(index, 1);
    }
};

ConicArcSensorCollection.prototype.removeAll = function () {
    this._conicArcSensorCollection.length = 0;
};

ConicArcSensorCollection.prototype.update = function () {
    var time = this._clock.currentTime;

    var conicArcSensorCollection = this._conicArcSensorCollection;
    var primitives = this._primitives;
    var primitive = this._primitive;
    var outlinePrimitive = this._outlinePrimitive;
    var instances = [];
    var outlineInstances = [];

    if (defined(primitive)) {
        primitives.removeAndDestroy(primitive);
    }
    if (defined(outlinePrimitive)) {
        primitives.removeAndDestroy(outlinePrimitive);
    }

    for (var i = 0, len = conicArcSensorCollection.length; i < len; i++) {
        var entity = conicArcSensorCollection[i];
        var conicArcSensor = entity._conicArcSensor;

        if (!Property.getValueOrDefault(conicArcSensor.show, time, true)) {
            continue;
        }

        var angle = conicArcSensor.angle;
        var radius = conicArcSensor.radius;
        var stack = conicArcSensor.stack;
        var slice = conicArcSensor.slice;

        if (!defined(angle)) {
            continue;
        }

        var show = Property.getValueOrDefault(entity.show, time, true);
        if (!show) {
            continue;
        }

        var position = Property.getValueOrUndefined(entity.position, time, positionScratch);

        if (!defined(position)) {
            continue;
        }

        var modelMatrix;
        var gaze = conicArcSensor.gaze;
        if (defined(gaze)) {
            //ignore original orientation
            var targetPosition = Property.getValueOrUndefined(gaze.position, time, targetPositionScratch);

            if (!defined(position) || !defined(targetPosition)) {
                continue;
            }

            var diffVector = Cartesian3.subtract(position, targetPosition, diffVectorScratch);
            var rotate = Cartesian3.angleBetween(Cesium.Cartesian3.UNIT_Z, diffVector);
            var cross = Cartesian3.cross(Cesium.Cartesian3.UNIT_Z, diffVector, diffVectorScratch);
            //朝上
            //var orientation = Quaternion.fromAxisAngle(cross, (rotate - Math.PI), orientationScratch);
            var orientation = Quaternion.fromAxisAngle(cross, rotate, orientationScratch);

            //replace original dimensions
            var distance = Cartesian3.distance(position, targetPosition);

            radius = 1;
            modelMatrix = Matrix4.fromRotationTranslation(Cesium.Matrix3.multiplyByScalar(Matrix3.fromQuaternion(orientation, matrix3Scratch), distance, matrix3Scratch), position, matrix4Scratch);
        } else {
            var orientation = Property.getValueOrUndefined(entity.orientation, time, orientationScratch);
            if (!defined(orientation)) {
                modelMatrix = Transforms.eastNorthUpToFixedFrame(position, undefined, matrix4Scratch);
            } else {
                modelMatrix = Matrix4.fromRotationTranslation(Matrix3.fromQuaternion(orientation, matrix3Scratch), position, matrix4Scratch);
            }
        }

        if (!defined(modelMatrix)) {
            continue;
        }

        var geometry = entity._geometry;
        if (!defined(geometry)) {
            var conic;
            conic = new _ConicArcSensorGeometry.ConicArcSensorGeometry({
                vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL,
                angle: angle,
                radius: radius,
                stackPartitions: stack,
                slicePartitions: slice
            });
            entity._geometry = _ConicArcSensorGeometry.ConicArcSensorGeometry.createGeometry(conic);
            geometry = entity._geometry;
        }

        //var distanceDisplayCondition = Property.getValueOrDefault(conicArcSensor.distanceDisplayCondition, time, entity._distanceDisplayCondition);
        //var distanceDisplayConditionAttribute = DistanceDisplayConditionGeometryInstanceAttribute.fromDistanceDisplayCondition(distanceDisplayCondition);
        //var shadows = Property.getValueOrDefault(conicArcSensor.shadows, time, ShadowMode.DISABLED);
        var color = conicArcSensor.color;
        var outline = conicArcSensor.outline;
        var outlineWidth = conicArcSensor.outlineWidth;
        if (!defined(outlineWidth)) {
            outlineWidth = 1;
        }
        var outlineColor = conicArcSensor.outlineColor;
        if (!defined(outlineColor)) {
            outlineColor = Color.WHITE;
        }

        var instance = new Cesium.GeometryInstance({
            geometry: geometry,
            modelMatrix: modelMatrix,
            attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(color)
                //distanceDisplayCondition: distanceDisplayConditionAttribute
            }
        });
        instances.push(instance);

        if (outline) {
            var outlineGeometry = entity._outlineGeometry;
            if (!defined(outlineGeometry)) {
                var conicOutline;
                conicOutline = new _ConicArcSensorOutlineGeometry.ConicArcSensorOutlineGeometry({
                    vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
                    angle: angle,
                    radius: radius
                });
                entity._outlineGeometry = _ConicArcSensorOutlineGeometry.ConicArcSensorOutlineGeometry.createGeometry(conicOutline);
                outlineGeometry = entity._outlineGeometry;
            }

            var instance = new Cesium.GeometryInstance({
                geometry: outlineGeometry,
                modelMatrix: modelMatrix,
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(outlineColor)
                    //distanceDisplayCondition: distanceDisplayConditionAttribute
                }
            });
            outlineInstances.push(instance);
        }
    }

    if (instances.length > 0) {
        this._primitive = this._primitives.add(new Primitive({
            asynchronous: false,
            geometryInstances: instances,
            appearance: new PerInstanceColorAppearance({
                flat: false,
                translucent: true,
                closed: true
            })
        }));
    }

    if (outlineInstances.length > 0) {
        this._outlinePrimitive = this._primitives.add(new Primitive({
            asynchronous: false,
            geometryInstances: outlineInstances,
            appearance: new PerInstanceColorAppearance({
                flat: true,
                translucent: true,
                renderState: {
                    lineWidth: this._scene.clampLineWidth(outlineWidth)
                }
            })
        }));
    }
};

exports.ConicArcSensorCollection = ConicArcSensorCollection;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConicArcSensor = undefined;

var _ConicArcSensorGraphics = __webpack_require__(3);

var Entity = Cesium.Entity;
var Event = Cesium.Event;
var ConstantPositionProperty = Cesium.ConstantPositionProperty;
var createPropertyDescriptor = Cesium.createPropertyDescriptor;
var DistanceDisplayCondition = Cesium.DistanceDisplayCondition;
var DistanceDisplayConditionGeometryInstanceAttribute = Cesium.DistanceDisplayConditionGeometryInstanceAttribute;

function createConstantPositionProperty(value) {
    return new ConstantPositionProperty(value);
}

function createPositionPropertyDescriptor(name) {
    return createPropertyDescriptor(name, undefined, createConstantPositionProperty);
}

function ConicArcSensor(options) {
    options = options || {};

    this._position = undefined;
    this._orientation = undefined;
    this._show = undefined;

    var conicArcSensor = options.conicArcSensor;
    if (!(conicArcSensor instanceof _ConicArcSensorGraphics.ConicArcSensorGraphics)) {
        conicArcSensor = new _ConicArcSensorGraphics.ConicArcSensorGraphics(conicArcSensor);
    }
    this._conicArcSensor = conicArcSensor;

    this._distanceDisplayCondition = new DistanceDisplayCondition();
    this._geometry = undefined;
    this._outlineGeometry = undefined;

    this._definitionChanged = new Event();

    this.merge(options);
}

Object.defineProperties(ConicArcSensor.prototype, {
    position: createPositionPropertyDescriptor('position'),
    orientation: createPropertyDescriptor('orientation'),
    show: createPropertyDescriptor('show')
});

ConicArcSensor.prototype.merge = function (options) {
    this.position = options.position;
    this.orientation = options.orientation;
    this.show = options.show;
};

ConicArcSensor.prototype.gazeAt = function (entity) {
    if (entity instanceof Entity) {
        this._conicArcSensor.gaze = entity;
    }
};

exports.ConicArcSensor = ConicArcSensor;

/***/ })
/******/ ]);
});