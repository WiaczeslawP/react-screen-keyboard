'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardButton = function (_PureComponent) {
	_inherits(KeyboardButton, _PureComponent);

	function KeyboardButton(props) {
		_classCallCheck(this, KeyboardButton);

		var _this = _possibleConstructorReturn(this, (KeyboardButton.__proto__ || Object.getPrototypeOf(KeyboardButton)).call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(KeyboardButton, [{
		key: 'handleClick',
		value: function handleClick() {
			this.props.onClick(this.props.value);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'button',
				{
					className: 'keyboard-button' + ' ' + this.props.classes,
					onClick: this.handleClick,
					autoFocus: this.props.autofocus
				},
				this.props.value
			);
		}
	}]);

	return KeyboardButton;
}(_react.PureComponent);

KeyboardButton.propTypes = {
	value: _react.PropTypes.oneOfType([_react.PropTypes.string.isRequired, _react.PropTypes.node.isRequired]),
	classes: _react.PropTypes.string,
	onClick: _react.PropTypes.func.isRequired,
	autofocus: _react.PropTypes.bool
};
KeyboardButton.defaultProps = {
	autofocus: false
};
exports.default = KeyboardButton;
//# sourceMappingURL=KeyboardButton.js.map