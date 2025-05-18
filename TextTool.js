"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTextDropdown = exports.onTextMouseDown = exports.onTextComplete = exports.font = exports.drawText = void 0;
var _react = _interopRequireDefault(require("react"));
var _Tool = _interopRequireWildcard(require("./enums/Tool"));
var _utils = require("./utils");
var _Icon = _interopRequireDefault(require("./icons/Icon"));
require("./TextTool.css");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var currentText = '';
var currentColor = '';
var currentSize = _Tool.TextSize.Default;
var textSize = [_Tool.TextSize.Small, _Tool.TextSize.Default, _Tool.TextSize.Large];
var onTextMouseDown = exports.onTextMouseDown = function onTextMouseDown(e, toolOption, scale, refInput, refCanvas, intl) {
  if (!currentText && refInput.current && refCanvas.current) {
    var textarea = refInput.current;
    var canvas = refCanvas.current;
    var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
      top = _canvas$getBoundingCl.top,
      left = _canvas$getBoundingCl.left;
    var x = e.clientX - left;
    var y = e.clientY - top;
    textarea.style.display = 'block';
    textarea.style.left = x + canvas.offsetLeft + 'px';
    textarea.style.top = y + canvas.offsetTop + 'px';
    textarea.style.fontSize = toolOption.textSize * scale + 'px';
    textarea.style.lineHeight = toolOption.textSize * scale + 'px';
    textarea.style.height = toolOption.textSize * scale + 'px';
    textarea.style.color = toolOption.textColor;
    textarea.innerText = typeof toolOption.defaultText === 'string' ? toolOption.defaultText : intl.formatMessage(toolOption.defaultText);
    if (_utils.isMobileDevice) {
      textarea.focus();
    }
    setTimeout(function () {
      if (getSelection && Range) {
        var selection = getSelection();
        if (selection) {
          selection.removeAllRanges();
          var range = new Range();
          range.selectNodeContents(textarea);
          selection.addRange(range);
        }
      }
    }, 0);
    currentText = typeof toolOption.defaultText === 'string' ? toolOption.defaultText : intl.formatMessage(toolOption.defaultText);
    currentColor = toolOption.textColor;
    currentSize = toolOption.textSize;
  }
};
var onTextComplete = exports.onTextComplete = function onTextComplete(refInput, refCanvas, viewMatrix, scale, handleCompleteOperation, setCurrentTool) {
  if (currentText && refInput.current && refCanvas.current) {
    var textarea = refInput.current;
    var text = textarea.innerText;
    var _textarea$getBounding = textarea.getBoundingClientRect(),
      top = _textarea$getBounding.top,
      left = _textarea$getBounding.left,
      width = _textarea$getBounding.width,
      height = _textarea$getBounding.height;
    width = 1 / scale * width;
    var lineHeight = parseInt(textarea.style.lineHeight.replace('px', ''));
    height = 1 / scale * lineHeight * text.split('\n').length;
    var currentPos = (0, _utils.mapClientToCanvas)({
      clientX: left,
      clientY: top
    }, refCanvas.current, viewMatrix);
    textarea.style.display = 'none';
    var pos = {
      x: currentPos[0],
      y: currentPos[1],
      w: width,
      h: height
    };
    handleCompleteOperation(_Tool.default.Text, {
      text: text,
      color: currentColor,
      size: currentSize
    }, pos);
    setCurrentTool(_Tool.default.Select);
    currentText = '';
  }
};
var font = exports.font = "\"PingFang SC\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Helvetica, \"Hiragino Sans GB\", \"Microsoft YaHei\", SimSun, sans-serif, \"localant\"";
var drawText = exports.drawText = function drawText(item, context, pos) {
  context.globalCompositeOperation = 'source-over';
  context.font = "".concat(item.size, "px ").concat(font);
  context.fillStyle = item.color || '#4a4a4a';
  context.textBaseline = 'middle';
  var lines = item.text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    context.fillText(lines[i], pos.x, pos.y + item.size / 2 + i * item.size); // add half line height cause to textBaseline middle
  }
};
var useTextDropdown = exports.useTextDropdown = function useTextDropdown(currentToolOption, setCurrentToolOption, setCurrentTool, intl, prefixCls) {
  prefixCls += '-textTool';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-strokeMenu")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-colorAndSize")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-textSizeSelector")
  }, textSize.map(function (size) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: size,
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textSize: size
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      },
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textSize: size
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      },
      style: {
        color: size === currentToolOption.textSize ? '#666' : '#ccc'
      }
    }, size === _Tool.TextSize.Small ? intl.formatMessage({
      id: 'umi.block.sketch.text.size.small'
    }) : size === _Tool.TextSize.Default ? intl.formatMessage({
      id: 'umi.block.sketch.text.size.default'
    }) : intl.formatMessage({
      id: 'umi.block.sketch.text.size.large'
    }));
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-split")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(prefixCls, "-palette")
  }, _Tool.strokeColor.map(function (color) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-color"),
      key: color,
      onClick: function onClick(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textColor: color
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      },
      onTouchStart: function onTouchStart(evt) {
        evt.stopPropagation();
        setCurrentToolOption(_objectSpread(_objectSpread({}, currentToolOption), {}, {
          textColor: color
        }));
        setCurrentTool && setCurrentTool(_Tool.default.Stroke);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "".concat(prefixCls, "-fill"),
      style: {
        background: color
      }
    }), currentToolOption.textColor === color ? (/*#__PURE__*/_react.default.createElement(_Icon.default, {
      type: "check",
      style: color === '#ffffff' ? {
        color: '#979797'
      } : {
        color: '#fff'
      }
    })) : null);
  }))));
};