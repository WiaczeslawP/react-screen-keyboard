'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyboardButton = require('./KeyboardButton');

var _KeyboardButton2 = _interopRequireDefault(_KeyboardButton);

var _KeyboardLatinConstants = require('./KeyboardLatinConstants');

var _KeyboardLatinConstants2 = _interopRequireDefault(_KeyboardLatinConstants);

var _KeyboardCyrillicConstants = require('./KeyboardCyrillicConstants');

var _KeyboardCyrillicConstants2 = _interopRequireDefault(_KeyboardCyrillicConstants);

var _KeyboardSymbolsConstants = require('./KeyboardSymbolsConstants');

var _KeyboardSymbolsConstants2 = _interopRequireDefault(_KeyboardSymbolsConstants);

var _BackspaceIcon = require('./BackspaceIcon');

var _BackspaceIcon2 = _interopRequireDefault(_BackspaceIcon);

var _LanguageIcon = require('./LanguageIcon');

var _LanguageIcon2 = _interopRequireDefault(_LanguageIcon);

var _ShiftIcon = require('./ShiftIcon');

var _ShiftIcon2 = _interopRequireDefault(_ShiftIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Keyboard = function (_Component) {
	_inherits(Keyboard, _Component);

	function Keyboard(props) {
		_classCallCheck(this, Keyboard);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Keyboard).call(this, props));

		_this.state = { currentLanguage: 'latin', showSymbols: false, uppercase: true };
		_this.handleLetterButtonClick = _this.handleLetterButtonClick.bind(_this);
		_this.handleBackspaceClick = _this.handleBackspaceClick.bind(_this);
		_this.handleLanguageClick = _this.handleLanguageClick.bind(_this);
		_this.handleShiftClick = _this.handleShiftClick.bind(_this);
		_this.handleSymbolsClick = _this.handleSymbolsClick.bind(_this);
		_this.getSymbolsKeyValue = _this.getSymbolsKeyValue.bind(_this);
		_this.getKeys = _this.getKeys.bind(_this);
		return _this;
	}

	_createClass(Keyboard, [{
		key: 'handleLanguageClick',
		value: function handleLanguageClick() {
			this.setState({ currentLanguage: this.state.currentLanguage === 'latin' ? 'cyrrilic' : 'latin' });
		}
	}, {
		key: 'handleShiftClick',
		value: function handleShiftClick() {
			this.setState({ uppercase: !this.state.uppercase });
		}
	}, {
		key: 'handleSymbolsClick',
		value: function handleSymbolsClick() {
			this.setState({ showSymbols: !this.state.showSymbols });
		}
	}, {
		key: 'handleLetterButtonClick',
		value: function handleLetterButtonClick(key) {
			var _this2 = this;

			var _props$inputNode = this.props.inputNode;
			var value = _props$inputNode.value;
			var selectionStart = _props$inputNode.selectionStart;
			var selectionEnd = _props$inputNode.selectionEnd;

			var nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);

			if (this.props.onClick) {
				this.props.onClick(nextValue);
			}
			setTimeout(function () {
				_this2.props.inputNode.focus();
				_this2.props.inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
			}, 0);
			this.setState({ uppercase: false });
			this.refs.input.dispatchEvent(new Event('change'));
		}
	}, {
		key: 'handleBackspaceClick',
		value: function handleBackspaceClick() {
			var _this3 = this;

			var _props$inputNode2 = this.props.inputNode;
			var value = _props$inputNode2.value;
			var selectionStart = _props$inputNode2.selectionStart;
			var selectionEnd = _props$inputNode2.selectionEnd;

			var nextValue = void 0;
			var nextSelectionPosition = void 0;
			if (selectionStart === selectionEnd) {
				nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
				nextSelectionPosition = selectionStart - 1;
			} else {
				nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
				nextSelectionPosition = selectionStart;
			}
			nextSelectionPosition = nextSelectionPosition > 0 ? nextSelectionPosition : 0;

			if (this.props.onClick) {
				this.props.onClick(nextValue);
			}
			setTimeout(function () {
				_this3.props.inputNode.focus();
				_this3.props.inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
			}, 0);
			this.setState({ uppercase: !nextValue.length });
			this.refs.input.dispatchEvent(new Event('change'));
		}
	}, {
		key: 'getKeys',
		value: function getKeys() {
			var keysSet = void 0;
			if (this.state.showSymbols) {
				keysSet = _KeyboardSymbolsConstants2.default;
			} else if (this.state.currentLanguage === 'latin') {
				keysSet = _KeyboardLatinConstants2.default;
			} else {
				keysSet = _KeyboardCyrillicConstants2.default;
			}

			return this.state.uppercase ? keysSet.map(function (keyRow) {
				return keyRow.map(function (key) {
					return key.toUpperCase();
				});
			}) : keysSet;
		}
	}, {
		key: 'getSymbolsKeyValue',
		value: function getSymbolsKeyValue() {
			var symbolsKeyValue = void 0;
			if (!this.state.showSymbols) {
				symbolsKeyValue = '.?!&';
			} else if (this.state.currentLanguage === 'latin') {
				symbolsKeyValue = 'Abc';
			} else {
				symbolsKeyValue = 'Абв';
			}
			return symbolsKeyValue;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _props = this.props;
			var leftButtons = _props.leftButtons;
			var rightButtons = _props.rightButtons;

			var keys = this.getKeys();
			var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
			var symbolsKeyValue = this.getSymbolsKeyValue();

			return _react2.default.createElement(
				'div',
				{ className: 'keyboard' },
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					numbers.map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this4.handleLetterButtonClick,
							classes: "keyboard-numberButton",
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_BackspaceIcon2.default, null),
						onClick: this.handleBackspaceClick
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					keys[0].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this4.handleLetterButtonClick,
							key: button
						});
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					_react2.default.createElement('div', { className: 'keyboard-halfButton' }),
					keys[1].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this4.handleLetterButtonClick,
							key: button
						});
					}),
					_react2.default.createElement('div', { className: 'keyboard-halfButton' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					_react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_ShiftIcon2.default, null),
						onClick: this.handleShiftClick
					}),
					keys[2].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this4.handleLetterButtonClick,
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: symbolsKeyValue,
						onClick: this.handleSymbolsClick
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					leftButtons,
					_react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_LanguageIcon2.default, null),
						onClick: this.handleLanguageClick
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: ' ',
						classes: 'keyboard-space',
						onClick: this.handleLetterButtonClick
					}),
					rightButtons
				)
			);
		}
	}]);

	return Keyboard;
}(_react.Component);

Keyboard.propTypes = {
	leftButtons: _react.PropTypes.arrayOf(_react.PropTypes.node),
	rightButtons: _react.PropTypes.arrayOf(_react.PropTypes.node),
	inputNode: _react.PropTypes.any.isRequired,
	onClick: _react.PropTypes.func
};
Keyboard.defaultProps = {
	leftButtons: [],
	rightButtons: []
};
exports.default = Keyboard;
exports.default = Keyboard;
//# sourceMappingURL=Keyboard.js.map