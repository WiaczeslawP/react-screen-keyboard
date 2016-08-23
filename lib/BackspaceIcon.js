'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackspaceIcon = function BackspaceIcon(_ref) {
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
		_react2.default.createElement('path', { d: 'M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z' })
	);
};

exports.default = BackspaceIcon;
//# sourceMappingURL=BackspaceIcon.js.map