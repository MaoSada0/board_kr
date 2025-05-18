"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShapeDropdown = exports.onShapeMouseUp = exports.onShapeMouseMove = exports.onShapeMouseDown = exports.drawRectangle = void 0;
var _Tool = _interopRequireWildcard(require("./enums/Tool"));
var _react = _interopRequireDefault(require("react"));
var _Icon = _interopRequireDefault(require("./icons/Icon"));
require("./ShapeTool.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var shape = null;
var onShapeMouseDown = exports.onShapeMouseDown = function onShapeMouseDown(x, y, toolOption) {
  shape = {
    type: toolOption.shapeType,
    color: toolOption.shapeBorderColor,
    size: toolOption.shapeBorderSize,
    start: {
      x: x,
      y: y
    },
    end: null
  };
  return [shape];
};
var draw = function draw(item, mouseX, mouseY, context, hover) {
  var startX = mouseX < item.start.x ? mouseX : item.start.x;
  var startY = mouseY < item.start.y ? mouseY : item.start.y;
  var widthX = Math.abs(item.start.x - mouseX);
  var widthY = Math.abs(item.start.y - mouseY);
  if (item.type === _Tool.ShapeType.Rectangle) {
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    context.rect(startX, startY, widthX, widthY);
    context.stroke();
    context.closePath();
    if (hover) {
      context.beginPath();
      context.strokeStyle = '#3AB1FE';
      context.lineWidth = item.size / 2;
      context.rect(startX - item.size / 2, startY - item.size / 2, widthX + item.size, widthY + item.size);
      context.stroke();
      context.closePath();
    }
  } else if (item.type === _Tool.ShapeType.Oval) {
    var endX = mouseX >= item.start.x ? mouseX : item.start.x;
    var endY = mouseY >= item.start.y ? mouseY : item.start.y;
    var radiusX = (endX - startX) * 0.5;
    var radiusY = (endY - startY) * 0.5;
    var centerX = startX + radiusX;
    var centerY = startY + radiusY;
    context.beginPath();
    context.lineWidth = item.size;
    context.strokeStyle = item.color;
    if (typeof context.ellipse === 'function') {
      context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    } else {
      var xPos;
      var yPos;
      var i = 0;
      for (i; i < 2 * Math.PI; i += 0.01) {
        xPos = centerX - radiusY * Math.sin(i) * Math.sin(0) + radiusX * Math.cos(i) * Math.cos(0);
        yPos = centerY + radiusX * Math.cos(i) * Math.sin(0) + radiusY * Math.sin(i) * Math.cos(0);
        if (i === 0) {
          context.moveTo(xPos, yPos);
        } else {
          context.lineTo(xPos, yPos);
        }
      }
    }
    context.stroke();
    context.closePath();
    if (hover) {
      context.beginPath();
      context.strokeStyle = '#3AB1FE';
      context.lineWidth = item.size / 2;
      if (typeof context.ellipse === 'function') {
        context.ellipse(centerX, centerY, radiusX + item.size / 2, radiusY + item.size / 2, 0, 0, 2 * Math.PI);
      } else {
        var _xPos;
        var _yPos;
        var _i = 0;
        for (_i; _i < 2 * Math.PI; _i += 0.01) {
          _xPos = centerX - (radiusY + item.size / 2) * Math.sin(_i) * Math.sin(0) + (radiusX + item.size / 2) * Math.cos(_i) * Math.cos(0);
          _yPos = centerY + (radiusX + item.size / 2) * Math.cos(_i) * Math.sin(0) + (radiusY + item.size / 2) * Math.sin(_i) * Math.cos(0);
          if (_i === 0) {
            context.moveTo(_xPos, _yPos);
          } else {
            context.lineTo(_xPos, _yPos);
          }
        }
      }
      context.stroke();
      context.closePath();
    }
  }
};
var onShapeMouseUp = exports.onShapeMouseUp = function onShapeMouseUp(x, y, setCurrentTool, handleCompleteOperation) {
  if (!shape) return;
  var item = shape;
  shape = null;
  item.end = {
    x: x,
    y: y
  };
  // avoid touch by mistake.
  if (Math.abs(item.start.x - item.end.x) + Math.abs(item.start.x - item.end.x) < 6) {
    return;
  }
  handleCompleteOperation(_Tool.default.Shape, item, {
    x: Math.min(item.start.x, item.end.x),
    y: Math.min(item.start.y, item.end.y),
    w: Math.abs(item.end.x - item.start.x),
    h: Math.abs(item.end.y - item.start.y)
  });
  setCurrentTool(_Tool.default.Select);
  return [item];
};
var onShapeMouseMove = exports.onShapeMouseMove = function onShapeMouseMove(x, y, context) {
  if (!shape) return;
  draw(shape, x, y, context, false);
};
var drawRectangle = exports.drawRectangle = function drawRectangle(rect, context, hover) {
  if (!rect.end) return null;
  draw(rect, rect.end.x, rect.end.y, context, hover);
};
var useShapeDropdown = exports.useShapeDropdown = function useShapeDropdown(currentToolOption, setCurrentToolOption, setCurrentTool, prefixCls) {
  prefixCls = prefixCls += '-shapeTool';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeMenu")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-shape")
  }, /*#__PURE__*/_react.default.createElement("div", {
    onClick: function onClick(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Rectangle
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    onTouchStart: function onTouchStart(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Rectangle
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    className: "".concat(prefixCls, "-shapeItem"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Rectangle ? {
      background: 'rgba(238, 238, 238, 1)'
    } : {}
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-rect"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Rectangle ? {
      borderColor: currentToolOption.shapeBorderColor
    } : {}
  })), /*#__PURE__*/_react.default.createElement("div", {
    onTouchStart: function onTouchStart(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Oval
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    onClick: function onClick(evt) {
      evt.stopPropagation();
      setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
        shapeType: _Tool.ShapeType.Oval
      }));
      setCurrentTool(_Tool.default.Shape);
    },
    className: "".concat(prefixCls, "-shapeItem"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Oval ? {
      background: 'rgba(238, 238, 238, 1)'
    } : {}
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-circle"),
    style: currentToolOption.shapeType === _Tool.ShapeType.Oval ? {
      borderColor: currentToolOption.shapeBorderColor
    } : {}
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-colorAndSize")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeSelector")
  }, _Tool.strokeSize.map(function (size) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: size,
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderSize: size
        }));
        setCurrentTool(_Tool.default.Shape);
      },
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderSize: size
        }));
        setCurrentTool(_Tool.default.Shape);
      },
      style: {
        width: size + 4,
        height: size + 4,
        background: size === currentToolOption.shapeBorderSize ? '#666666' : '#EEEEEE'
      }
    });
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-split")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-palette")
  }, _Tool.strokeColor.map(function (color) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-color"),
      key: color,
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderColor: color
        }));
        setCurrentTool(_Tool.default.Shape);
      },
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          shapeBorderColor: color
        }));
        setCurrentTool(_Tool.default.Shape);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-fill"),
      style: {
        background: color
      }
    }), currentToolOption.shapeBorderColor === color ? (/*#__PURE__*/_react.default.createElement(_Icon.default, {
      type: "check",
      style: color === '#ffffff' ? {
        color: '#979797'
      } : {
        color: '#fff'
      }
    })) : null);
  }))));
};