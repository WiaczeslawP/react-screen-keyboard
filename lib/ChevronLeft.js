'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChevronLeft = function ChevronLeft(_ref) {
	var _ref$viewBox = _ref.viewBox;
	var viewBox = _ref$viewBox === undefined ? '0 0 24 24' : _ref$viewBox;
	var _ref$width = _ref.width;
	var width = _ref$width === undefined ? 24 : _ref$width;
	var _ref$height = _ref.height;
	var height = _ref$height === undefined ? 24 : _ref$height;
	var fill = _ref.fill;
	var classes = _ref.classes;
	return _react2.default.createElement(
		'svg',
		{ width: width, height: height, fill: fill, classes: classes, viewBox: viewBox },
		_react2.default.createElement('path', { xmlns: 'http://www.w3.org/2000/svg', d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' })
	);
};

exports.default = ChevronLeft;
//# sourceMappingURL=ChevronLeft.js.map