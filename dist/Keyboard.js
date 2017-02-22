var Keyboard =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Keyboard = __webpack_require__(1);
	var KeyboardButton = __webpack_require__(3);
	
	module.exports = Keyboard.default || Keyboard;
	module.exports.KeyboardButton = KeyboardButton.default || KeyboardButton;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _KeyboardButton = __webpack_require__(3);
	
	var _KeyboardButton2 = _interopRequireDefault(_KeyboardButton);
	
	var _LatinLayout = __webpack_require__(4);
	
	var _LatinLayout2 = _interopRequireDefault(_LatinLayout);
	
	var _CyrillicLayout = __webpack_require__(5);
	
	var _CyrillicLayout2 = _interopRequireDefault(_CyrillicLayout);
	
	var _SymbolsLayout = __webpack_require__(6);
	
	var _SymbolsLayout2 = _interopRequireDefault(_SymbolsLayout);
	
	var _BackspaceIcon = __webpack_require__(7);
	
	var _BackspaceIcon2 = _interopRequireDefault(_BackspaceIcon);
	
	var _LanguageIcon = __webpack_require__(8);
	
	var _LanguageIcon2 = _interopRequireDefault(_LanguageIcon);
	
	var _ShiftIcon = __webpack_require__(9);
	
	var _ShiftIcon2 = _interopRequireDefault(_ShiftIcon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Keyboard = function (_PureComponent) {
		_inherits(Keyboard, _PureComponent);
	
		function Keyboard(props) {
			_classCallCheck(this, Keyboard);
	
			var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, props));
	
			_this.handleLetterButtonClick = _this.handleLetterButtonClick.bind(_this);
			_this.handleBackspaceClick = _this.handleBackspaceClick.bind(_this);
			_this.handleLanguageClick = _this.handleLanguageClick.bind(_this);
			_this.handleShiftClick = _this.handleShiftClick.bind(_this);
			_this.handleSymbolsClick = _this.handleSymbolsClick.bind(_this);
	
			_this.state = {
				currentLanguage: props.defaultLanguage,
				showSymbols: false,
				uppercase: _this.isUppercase()
			};
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
				var inputNode = this.props.inputNode;
				var value = inputNode.value,
				    selectionStart = inputNode.selectionStart,
				    selectionEnd = inputNode.selectionEnd;
	
				var nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);
	
				inputNode.value = nextValue;
				if (this.props.onClick) {
					this.props.onClick(nextValue);
				}
				setTimeout(function () {
					inputNode.focus();
					inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
				}, 0);
				this.setState({ uppercase: this.isUppercase() });
				inputNode.dispatchEvent(new Event('input'));
			}
		}, {
			key: 'isUppercase',
			value: function isUppercase() {
				var _props = this.props,
				    inputNode = _props.inputNode,
				    isFirstLetterUppercase = _props.isFirstLetterUppercase;
	
				return inputNode.type !== 'password' && inputNode.dataset.type !== 'email' && !inputNode.value.length && isFirstLetterUppercase;
			}
		}, {
			key: 'handleBackspaceClick',
			value: function handleBackspaceClick() {
				var inputNode = this.props.inputNode;
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
				if (this.props.onClick) {
					this.props.onClick(nextValue);
				}
				setTimeout(function () {
					inputNode.focus();
					inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
				}, 0);
				this.setState({ uppercase: this.isUppercase() });
				inputNode.dispatchEvent(new Event('input'));
			}
		}, {
			key: 'getKeys',
			value: function getKeys() {
				var keysSet = void 0;
				if (this.state.showSymbols) {
					keysSet = _SymbolsLayout2.default;
				} else if (this.state.currentLanguage === 'latin') {
					keysSet = _LatinLayout2.default;
				} else {
					keysSet = _CyrillicLayout2.default;
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
				var _this2 = this;
	
				var _props2 = this.props,
				    leftButtons = _props2.leftButtons,
				    rightButtons = _props2.rightButtons,
				    inputNode = _props2.inputNode;
	
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
								onClick: _this2.handleLetterButtonClick,
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
								onClick: _this2.handleLetterButtonClick,
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
								onClick: _this2.handleLetterButtonClick,
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
								onClick: _this2.handleLetterButtonClick,
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
						inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
							value: '@',
							onClick: this.handleLetterButtonClick
						}) : null,
						_react2.default.createElement(_KeyboardButton2.default, {
							value: ' ',
							classes: 'keyboard-space',
							onClick: this.handleLetterButtonClick
						}),
						inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
							value: '.',
							onClick: this.handleLetterButtonClick
						}) : null,
						rightButtons
					)
				);
			}
		}]);
	
		return Keyboard;
	}(_react.PureComponent);
	
	Keyboard.propTypes = {
		leftButtons: _react.PropTypes.arrayOf(_react.PropTypes.node),
		rightButtons: _react.PropTypes.arrayOf(_react.PropTypes.node),
		inputNode: _react.PropTypes.any.isRequired,
		onClick: _react.PropTypes.func,
		isFirstLetterUppercase: _react.PropTypes.bool,
		defaultLanguage: _react.PropTypes.string
	};
	Keyboard.defaultProps = {
		leftButtons: [],
		rightButtons: [],
		isFirstLetterUppercase: false,
		defaultLanguage: 'cyrrilic'
	};
	exports.default = Keyboard;
	//# sourceMappingURL=Keyboard.js.map

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
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
						type: 'button',
						className: 'keyboard-button' + ' ' + this.props.classes,
						onClick: this.props.isDisabled ? null : this.handleClick,
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
		value: _react.PropTypes.oneOfType([_react.PropTypes.string.isRequired, _react.PropTypes.node.isRequired]),
		classes: _react.PropTypes.string,
		onClick: _react.PropTypes.func.isRequired,
		autofocus: _react.PropTypes.bool,
		isDisabled: _react.PropTypes.bool
	};
	KeyboardButton.defaultProps = {
		autofocus: false,
		isDisabled: false
	};
	exports.default = KeyboardButton;
	//# sourceMappingURL=KeyboardButton.js.map

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['z', 'x', 'c', 'v', 'b', 'n', 'm']];
	
	// export default {
	// 	0: [{
	// 		code: 81,
	// 		value: 'q',
	// 	}, {
	// 		code: 87,
	// 		value: 'w',
	// 	}, {
	// 		code: 69,
	// 		value: 'e',
	// 	}, {
	// 		code: 82,
	// 		value: 'r',
	// 	}, {
	// 		code: 84,
	// 		value: 't',
	// 	}, {
	// 		code: 89,
	// 		value: 'y',
	// 	}]
	// };
	//# sourceMappingURL=LatinLayout.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = [['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'], ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'], ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю']];
	//# sourceMappingURL=CyrillicLayout.js.map

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = [['=', '+', '%', '*', '[', ']', '{', '}', '<', '>'], ['@', ':', ';', '_', '-', '#', '(', ')', '/', '\\'], ['.', ',', '?', '!', '\'', '"', '^']];
	//# sourceMappingURL=SymbolsLayout.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var BackspaceIcon = function BackspaceIcon(_ref) {
		var _ref$viewBox = _ref.viewBox,
		    viewBox = _ref$viewBox === undefined ? '0 0 24 24' : _ref$viewBox,
		    _ref$width = _ref.width,
		    width = _ref$width === undefined ? 24 : _ref$width,
		    _ref$height = _ref.height,
		    height = _ref$height === undefined ? 24 : _ref$height,
		    fill = _ref.fill;
		return _react2.default.createElement(
			'svg',
			{ width: width, height: height, fill: fill, viewBox: viewBox },
			_react2.default.createElement('path', { d: 'M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z' })
		);
	};
	
	exports.default = BackspaceIcon;
	//# sourceMappingURL=BackspaceIcon.js.map

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LanguageIcon = function LanguageIcon(_ref) {
		var _ref$viewBox = _ref.viewBox,
		    viewBox = _ref$viewBox === undefined ? '0 0 24 24' : _ref$viewBox,
		    _ref$width = _ref.width,
		    width = _ref$width === undefined ? 24 : _ref$width,
		    _ref$height = _ref.height,
		    height = _ref$height === undefined ? 24 : _ref$height,
		    fill = _ref.fill;
		return _react2.default.createElement(
			'svg',
			{ width: width, height: height, fill: fill, viewBox: viewBox },
			_react2.default.createElement('path', { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z' })
		);
	};
	
	exports.default = LanguageIcon;
	//# sourceMappingURL=LanguageIcon.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ShiftIcon = function ShiftIcon(_ref) {
		var _ref$viewBox = _ref.viewBox,
		    viewBox = _ref$viewBox === undefined ? '0 0 32 32' : _ref$viewBox,
		    _ref$width = _ref.width,
		    width = _ref$width === undefined ? 24 : _ref$width,
		    _ref$height = _ref.height,
		    height = _ref$height === undefined ? 24 : _ref$height,
		    fill = _ref.fill;
		return _react2.default.createElement(
			'svg',
			{ width: width, height: height, fill: fill, viewBox: viewBox },
			_react2.default.createElement('path', { d: 'M21 28h-10c-0.552 0-1-0.448-1-1v-11h-4c-0.404 0-0.769-0.244-0.924-0.617s-0.069-0.804 0.217-1.090l10-10c0.391-0.39 1.024-0.39 1.414 0l10 10c0.286 0.286 0.372 0.716 0.217 1.090s-0.519 0.617-0.924 0.617h-4v11c0 0.552-0.448 1-1 1zM12 26h8v-11c0-0.552 0.448-1 1-1h2.586l-7.586-7.586-7.586 7.586h2.586c0.552 0 1 0.448 1 1v11z' })
		);
	};
	
	exports.default = ShiftIcon;
	//# sourceMappingURL=ShiftIcon.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=Keyboard.js.map