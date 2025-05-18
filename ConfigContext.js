"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DefaultConfig = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var DefaultConfig = exports.DefaultConfig = {
  prefixCls: 'drawing-board'
};
var ConfigContext = /*#__PURE__*/_react.default.createContext(DefaultConfig);
var _default = exports.default = ConfigContext;