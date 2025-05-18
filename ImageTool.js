"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onImageComplete = exports.drawImage = void 0;
var _Tool = _interopRequireDefault(require("./enums/Tool"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _cacheImgs = {};
var drawImage = exports.drawImage = function drawImage(item, context, pos, id, rerender) {
  if (!_cacheImgs[id]) {
    fetch(item.imageData).then(function (res) {
      return res.blob();
    }).then(function (blob) {
      return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        img.addEventListener('load', function () {
          resolve(this);
        });
        img.src = URL.createObjectURL(blob);
      });
    }).then(function (imageBitmap) {
      _cacheImgs[id] = imageBitmap;
      rerender();
    });
  } else {
    context.drawImage(_cacheImgs[id], pos.x, pos.y, pos.w, pos.h);
  }
};
var onImageComplete = exports.onImageComplete = function onImageComplete(data, canvas, viewMatrix, handleCompleteOperation) {
  var image = new Image();
  image.onload = function () {
    var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
      top = _canvas$getBoundingCl.top,
      left = _canvas$getBoundingCl.left;
    var imageWidth = image.width;
    var imageHeight = image.height;
    var offsetWidth = canvas.offsetWidth;
    var offsetHeight = canvas.offsetHeight;
    var pos = (0, _utils.mapClientToCanvas)({
      clientX: left + (offsetWidth / 2 - imageWidth / 4),
      clientY: top + (offsetHeight / 2 - imageHeight / 4)
    }, canvas, viewMatrix);
    var posEnd = (0, _utils.mapClientToCanvas)({
      clientX: left + (offsetWidth / 2 + imageWidth / 4),
      clientY: top + (offsetHeight / 2 + imageHeight / 4)
    }, canvas, viewMatrix);
    var posInfo = {
      x: pos[0],
      y: pos[1],
      w: posEnd[0] - pos[0],
      h: posEnd[1] - pos[1]
    };
    handleCompleteOperation(_Tool.default.Image, {
      imageData: data
    }, posInfo);
  };
  image.src = data;
};