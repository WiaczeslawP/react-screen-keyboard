'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _KeyboardButton = require('./KeyboardButton');

var _KeyboardButton2 = _interopRequireDefault(_KeyboardButton);

var _LatinLayout = require('./layouts/LatinLayout');

var _LatinLayout2 = _interopRequireDefault(_LatinLayout);

var _CyrillicLayout = require('./layouts/CyrillicLayout');

var _CyrillicLayout2 = _interopRequireDefault(_CyrillicLayout);

var _SymbolsLayout = require('./layouts/SymbolsLayout');

var _SymbolsLayout2 = _interopRequireDefault(_SymbolsLayout);

var _NumericLayout = require('./layouts/NumericLayout');

var _NumericLayout2 = _interopRequireDefault(_NumericLayout);

var _BackspaceIcon = require('./icons/BackspaceIcon');

var _BackspaceIcon2 = _interopRequireDefault(_BackspaceIcon);

var _LanguageIcon = require('./icons/LanguageIcon');

var _LanguageIcon2 = _interopRequireDefault(_LanguageIcon);

var _ShiftIcon = require('./icons/ShiftIcon');

var _ShiftIcon2 = _interopRequireDefault(_ShiftIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

var Keyboard = function (_PureComponent) {
	_inherits(Keyboard, _PureComponent);

	function Keyboard() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Keyboard);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			currentLayout: 0,
			showSymbols: false,
			uppercase: _this.isUppercase()
		}, _this.handleLanguageClick = function () {
			_this.setState({
				currentLayout: (_this.state.currentLayout + 1) % _this.props.layouts.length,
				showSymbols: false
			});

			_this.props.inputNode.focus();
		}, _this.handleShiftClick = function () {
			_this.setState({ uppercase: !_this.state.uppercase });

			_this.props.inputNode.focus();
		}, _this.handleSymbolsClick = function () {
			_this.setState({ showSymbols: !_this.state.showSymbols });

			_this.props.inputNode.focus();
		}, _this.handleLetterButtonClick = function (key) {
			var inputNode = _this.props.inputNode;
			var value = inputNode.value,
			    selectionStart = inputNode.selectionStart,
			    selectionEnd = inputNode.selectionEnd;

			var nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);

			inputNode.value = nextValue;
			if (_this.props.onClick) {
				_this.props.onClick(nextValue);
			}
			setTimeout(function () {
				inputNode.focus();
				inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
			}, 0);
			_this.setState({ uppercase: _this.isUppercase() });
			inputNode.dispatchEvent(new Event('input', { bubbles: true }));
		}, _this.handleBackspaceClick = function () {
			var inputNode = _this.props.inputNode;
			var value = inputNode.value,
			    selectionStart = inputNode.selectionStart,
			    selectionEnd = inputNode.selectionEnd;

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

			inputNode.value = nextValue;
			if (_this.props.onClick) {
				_this.props.onClick(nextValue);
			}
			setTimeout(function () {
				inputNode.focus();
				inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
			}, 0);
			_this.setState({ uppercase: _this.isUppercase() });
			inputNode.dispatchEvent(new Event('input', { bubbles: true }));
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Keyboard, [{
		key: 'isUppercase',
		value: function isUppercase() {
			var _props = this.props,
			    inputNode = _props.inputNode,
			    isFirstLetterUppercase = _props.isFirstLetterUppercase;

			return inputNode.type !== 'password' && inputNode.dataset.type !== 'email' && !inputNode.value.length && isFirstLetterUppercase;
		}
	}, {
		key: 'getKeys',
		value: function getKeys() {
			var keysSet = void 0;
			if (this.state.showSymbols) {
				keysSet = _SymbolsLayout2.default.layout;
			} else {
				keysSet = this.props.layouts[this.state.currentLayout].layout;
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
			if (this.state.showSymbols) {
				return this.props.layouts[this.state.currentLayout].symbolsKeyValue;
			}
			return _SymbolsLayout2.default.symbolsKeyValue;
		}
	}, {
		key: 'renderKeyRows',
		value: function renderKeyRows() {
			var _this2 = this;

			var keys = this.getKeys();
			return keys.map(function (row, i) {
				return _react2.default.createElement(
					'div',
					{ className: 'keyboard-row', key: 'row-' + i },
					i === keys.length - 1 && _react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_ShiftIcon2.default, null),
						classes: 'keyboard-shiftButton',
						onClick: _this2.handleShiftClick
					}),
					row.map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							key: button
						});
					}),
					i === keys.length - 1 && _react2.default.createElement(_KeyboardButton2.default, {
						value: _this2.getSymbolsKeyValue(),
						classes: 'keyboard-symbolButton',
						onClick: _this2.handleSymbolsClick
					})
				);
			});
		}
	}, {
		key: 'renderNumeric',
		value: function renderNumeric() {
			var _this3 = this;

			var keys = _NumericLayout2.default.layout;
			var _props2 = this.props,
			    leftButtons = _props2.leftButtons,
			    rightButtons = _props2.rightButtons;

			return _react2.default.createElement(
				'div',
				{ className: 'keyboard numeric-keyboard' },
				keys.map(function (row, i) {
					return _react2.default.createElement(
						'div',
						{ className: 'keyboard-row', key: 'row-' + i },
						row.map(function (button) {
							return _react2.default.createElement(_KeyboardButton2.default, {
								value: button,
								onClick: _this3.handleLetterButtonClick,
								key: button
							});
						}),
						i === keys.length - 1 && _react2.default.createElement(_KeyboardButton2.default, {
							value: _react2.default.createElement(_BackspaceIcon2.default, null),
							classes: 'keyboard-backspaceButton',
							onClick: _this3.handleBackspaceClick
						})
					);
				}),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					leftButtons,
					rightButtons
				)
			);
		}
	}, {
		key: 'renderAlphanumeric',
		value: function renderAlphanumeric() {
			var _this4 = this;

			var _props3 = this.props,
			    leftButtons = _props3.leftButtons,
			    rightButtons = _props3.rightButtons,
			    inputNode = _props3.inputNode;

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
							classes: 'keyboard-numberButton',
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_BackspaceIcon2.default, null),
						classes: 'keyboard-backspaceButton',
						onClick: this.handleBackspaceClick
					})
				),
				this.renderKeyRows(),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					leftButtons,
					this.props.layouts.length > 1 ? _react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_LanguageIcon2.default, null),
						classes: 'keyboard-languageButton',
						onClick: this.handleLanguageClick
					}) : null,
					inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
						value: '@',
						classes: 'keyboard-atButton',
						onClick: this.handleLetterButtonClick
					}) : null,
					_react2.default.createElement(_KeyboardButton2.default, {
						value: ' ',
						classes: 'keyboard-spaceButton',
						onClick: this.handleLetterButtonClick
					}),
					inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
						value: '.',
						classes: 'keyboard-fullstopButton',
						onClick: this.handleLetterButtonClick
					}) : null,
					rightButtons
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			if (!this.props.inputNode) {
				return null;
			}
			return this.props.isNumeric ? this.renderNumeric() : this.renderAlphanumeric();
		}
	}]);

	return Keyboard;
}(_react.PureComponent);

Keyboard.propTypes = {
	leftButtons: _propTypes2.default.arrayOf(_propTypes2.default.node),
	rightButtons: _propTypes2.default.arrayOf(_propTypes2.default.node),
	inputNode: _propTypes2.default.any.isRequired,
	onClick: _propTypes2.default.func,
	isFirstLetterUppercase: _propTypes2.default.bool,
	isNumeric: _propTypes2.default.bool,
	layouts: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		symbolsKeyValue: _propTypes2.default.string,
		layout: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.string))
	}))
};
Keyboard.defaultProps = {
	leftButtons: [],
	rightButtons: [],
	isFirstLetterUppercase: false,
	isNumeric: false,
	layouts: [_CyrillicLayout2.default, _LatinLayout2.default]
};
exports.default = Keyboard;
//# sourceMappingURL=Keyboard.js.map