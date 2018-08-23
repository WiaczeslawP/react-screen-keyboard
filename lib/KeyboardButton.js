'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardButton = function (_PureComponent) {
	_inherits(KeyboardButton, _PureComponent);

	function KeyboardButton() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, KeyboardButton);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = KeyboardButton.__proto__ || Object.getPrototypeOf(KeyboardButton)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
			e.preventDefault();
			_this.props.onClick(_this.props.value);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(KeyboardButton, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'button',
				{
					type: 'button',
					className: 'keyboard-button ' + this.props.classes,
					onMouseDown: this.props.isDisabled ? null : this.handleClick,
					autoFocus: this.props.autofocus,
					disabled: this.props.isDisabled
				},
				this.props.value
			);
		}
	}]);

	return KeyboardButton;
}(_react.PureComponent);

KeyboardButton.propTypes = {
	value: _propTypes2.default.oneOfType([_propTypes2.default.string.isRequired, _propTypes2.default.node.isRequired]),
	classes: _propTypes2.default.string,
	onClick: _propTypes2.default.func.isRequired,
	autofocus: _propTypes2.default.bool,
	isDisabled: _propTypes2.default.bool
};
KeyboardButton.defaultProps = {
	classes: '',
	autofocus: false,
	isDisabled: false
};
exports.default = KeyboardButton;
//# sourceMappingURL=KeyboardButton.js.map