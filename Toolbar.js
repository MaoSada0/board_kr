"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("antd/lib/dropdown/style/css");
var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));
var _react = _interopRequireWildcard(require("react"));
var _reactSpring = require("react-spring");
var _reactIntl = require("react-intl");
var _Tool = _interopRequireDefault(require("./enums/Tool"));
var _SelectIcon = _interopRequireDefault(require("./svgs/SelectIcon"));
var _StrokeIcon = _interopRequireDefault(require("./svgs/StrokeIcon"));
var _ShapeIcon = _interopRequireDefault(require("./svgs/ShapeIcon"));
var _TextIcon = _interopRequireDefault(require("./svgs/TextIcon"));
var _ImageIcon = _interopRequireDefault(require("./svgs/ImageIcon"));
var _UndoIcon = _interopRequireDefault(require("./svgs/UndoIcon"));
var _RedoIcon = _interopRequireDefault(require("./svgs/RedoIcon"));
var _ClearIcon = _interopRequireDefault(require("./svgs/ClearIcon"));
var _ZoomIcon = _interopRequireDefault(require("./svgs/ZoomIcon"));
var _SaveIcon = _interopRequireDefault(require("./svgs/SaveIcon"));
var _EraserIcon = _interopRequireDefault(require("./svgs/EraserIcon"));
var _StrokeTool = require("./StrokeTool");
var _ShapeTool = require("./ShapeTool");
var _classnames = _interopRequireDefault(require("classnames"));
require("./Toolbar.css");
var _utils = require("./utils");
var _ConfigContext = _interopRequireDefault(require("./ConfigContext"));
var _EnableSketchPadContext = _interopRequireDefault(require("./contexts/EnableSketchPadContext"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var tools = [{
  label: 'umi.block.sketch.select',
  icon: _SelectIcon.default,
  type: _Tool.default.Select
}, {
  label: 'umi.block.sketch.pencil',
  icon: _StrokeIcon.default,
  type: _Tool.default.Stroke,
  useDropdown: _StrokeTool.useStrokeDropdown
}, {
  label: 'umi.block.sketch.shape',
  icon: _ShapeIcon.default,
  type: _Tool.default.Shape,
  useDropdown: _ShapeTool.useShapeDropdown
}, {
  label: 'umi.block.sketch.text',
  icon: _TextIcon.default,
  type: _Tool.default.Text
}, {
  label: 'umi.block.sketch.image',
  icon: _ImageIcon.default,
  type: _Tool.default.Image
}, {
  label: 'umi.block.sketch.undo',
  icon: _UndoIcon.default,
  type: _Tool.default.Undo,
  style: {
    marginLeft: 'auto'
  }
}, {
  label: 'umi.block.sketch.redo',
  icon: _RedoIcon.default,
  type: _Tool.default.Redo
}, {
  label: 'umi.block.sketch.eraser',
  icon: _EraserIcon.default,
  type: _Tool.default.Eraser
}, {
  label: 'umi.block.sketch.clear',
  icon: _ClearIcon.default,
  type: _Tool.default.Clear,
  style: {
    marginRight: 'auto'
  }
}].concat(_toConsumableArray(!_utils.isMobileDevice ? [{
  label: '100%',
  labelThunk: function labelThunk(props) {
    return "".concat(~~(props.scale * 100), "%");
  },
  icon: _ZoomIcon.default,
  type: _Tool.default.Zoom
}] : []), _toConsumableArray(!_utils.isMobileDevice ? [{
  label: 'umi.block.sketch.save',
  icon: _SaveIcon.default,
  type: _Tool.default.Save
}] : []));
var Toolbar = function Toolbar(props) {
  var currentTool = props.currentTool,
    setCurrentTool = props.setCurrentTool,
    currentToolOption = props.currentToolOption,
    setCurrentToolOption = props.setCurrentToolOption,
    selectImage = props.selectImage,
    undo = props.undo,
    redo = props.redo,
    clear = props.clear,
    save = props.save,
    toolbarPlacement = props.toolbarPlacement;
  var refFileInput = (0, _react.useRef)(null);
  var _useIntl = (0, _reactIntl.useIntl)(),
    formatMessage = _useIntl.formatMessage;
  var _useContext = (0, _react.useContext)(_ConfigContext.default),
    prefixCls = _useContext.prefixCls;
  var enableSketchPadContext = (0, _react.useContext)(_EnableSketchPadContext.default);
  var toolbarPrefixCls = prefixCls + '-toolbar';
  var handleFileChange = function handleFileChange(e) {
    var file = e.target.files && e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        var base64data = reader.result;
        selectImage(base64data);
      };
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(_defineProperty(_defineProperty({}, "".concat(toolbarPrefixCls, "-container"), true), "".concat(toolbarPrefixCls, "-mobile-container"), _utils.isMobileDevice))
  }, tools.map(function (tool) {
    var borderTopStyle = 'none';
    if (_utils.isMobileDevice) {
      if (tool.type === _Tool.default.Stroke && currentToolOption.strokeColor) {
        borderTopStyle = "3px solid ".concat(currentToolOption.strokeColor);
      }
      if (tool.type === _Tool.default.Shape && currentToolOption.shapeBorderColor) {
        borderTopStyle = "3px solid ".concat(currentToolOption.shapeBorderColor);
      }
    }
    var iconAnimateProps = (0, _reactSpring.useSpring)(_objectSpread({
      left: _utils.isMobileDevice && currentTool !== tool.type ? -12 : 0,
      borderTop: borderTopStyle
    }, tool.style || {}));
    var menu = /*#__PURE__*/_react.default.createElement(_reactSpring.animated.div, {
      className: (0, _classnames.default)(_defineProperty(_defineProperty(_defineProperty({}, "".concat(toolbarPrefixCls, "-icon"), true), "".concat(toolbarPrefixCls, "-activeIcon"), currentTool === tool.type && !_utils.isMobileDevice), "".concat(toolbarPrefixCls, "-mobile-icon"), _utils.isMobileDevice)),
      style: iconAnimateProps,
      onClick: function onClick() {
        if (tool.type === _Tool.default.Image && refFileInput.current) {
          refFileInput.current.click();
        } else if (tool.type === _Tool.default.Undo) {
          undo();
        } else if (tool.type === _Tool.default.Redo) {
          redo();
        } else if (tool.type === _Tool.default.Clear) {
          clear();
        } else if (tool.type === _Tool.default.Zoom) {} else if (tool.type === _Tool.default.Save) {
          save();
        } else {
          setCurrentTool(tool.type);
        }
      },
      key: tool.label
    }, /*#__PURE__*/_react.default.createElement(tool.icon, null), !_utils.isMobileDevice ? (/*#__PURE__*/_react.default.createElement("label", {
      className: "".concat(toolbarPrefixCls, "-iconLabel")
    }, tool.labelThunk ? tool.labelThunk(props) : formatMessage({
      id: tool.label
    }))) : null);
    if (tool.useDropdown) {
      var overlay = tool.useDropdown(currentToolOption, setCurrentToolOption, setCurrentTool, prefixCls);
      return /*#__PURE__*/_react.default.createElement(_dropdown.default, {
        key: tool.label,
        overlay: overlay,
        placement: toolbarPlacement === 'top' || toolbarPlacement === 'left' ? 'bottomLeft' : 'bottomRight',
        trigger: [_utils.isMobileDevice ? 'click' : 'hover'],
        onVisibleChange: function onVisibleChange(visible) {
          enableSketchPadContext.setEnable(!visible);
        }
      }, menu);
    } else {
      return menu;
    }
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "file",
    style: {
      display: 'none'
    },
    accept: "image/jpeg, image/png",
    ref: refFileInput,
    onChange: handleFileChange
  }));
};
var _default = exports.default = Toolbar;