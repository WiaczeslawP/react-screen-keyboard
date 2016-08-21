import React, {Component, PropTypes} from 'react';
import KeyboardButton from './KeyboardButton';

import KeyboardLatinConstants from './KeyboardLatinConstants';
import KeyboardCyrillicConstants from './KeyboardCyrillicConstants';
import KeyboardSymbolsConstants from './KeyboardSymbolsConstants';

import BackspaceIcon from './BackspaceIcon';
import LanguageIcon from './LanguageIcon';
import ShiftIcon from './ShiftIcon';

// import styles from './Keyboard.css';

export default class Keyboard extends Component {
	static propTypes = {
		leftBottomValue: PropTypes.oneOfType([PropTypes.string.isRequired,, PropTypes.node.isRequired]),
		rightBottomValue: PropTypes.oneOfType([PropTypes.string.isRequired,, PropTypes.node.isRequired]),
		handleLeftBottomClick: PropTypes.func.isRequired,
		handleRightBottomClick: PropTypes.func.isRequired,
		inputNode: PropTypes.any.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {currentLanguage: 'latin', showSymbols: false, uppercase: true};
		this.handleLetterButtonClick = this.handleLetterButtonClick.bind(this);
		this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
		this.handleLanguageClick = this.handleLanguageClick.bind(this);
		this.handleShiftClick = this.handleShiftClick.bind(this);
		this.handleSymbolsClick = this.handleSymbolsClick.bind(this);
		this.getSymbolsKeyValue = this.getSymbolsKeyValue.bind(this);
		this.getKeys = this.getKeys.bind(this);
	}

	handleLanguageClick() {
		this.setState({currentLanguage: this.state.currentLanguage === 'latin' ? 'cyrrilic' : 'latin'});
	}

	handleShiftClick() {
		this.setState({uppercase: !this.state.uppercase});
	}

	handleSymbolsClick() {
		this.setState({showSymbols: !this.state.showSymbols});
	}

	handleLetterButtonClick(key) {
		const {value, selectionStart, selectionEnd} = this.props.inputNode;
		const nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);

		this.props.onClick(nextValue);
		setTimeout(() => {
			this.props.inputNode.focus();
			this.props.inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
		}, 0);
		this.setState({uppercase: false});
	}

	handleBackspaceClick() {
		const {value, selectionStart, selectionEnd} = this.props.inputNode;
		let nextValue;
		let nextSelectionPosition;
		if (selectionStart === selectionEnd) {
			nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
			nextSelectionPosition = selectionStart - 1;
		} else {
			nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
			nextSelectionPosition = selectionStart;
		}
		nextSelectionPosition = (nextSelectionPosition > 0) ? nextSelectionPosition : 0;

		this.props.onClick(nextValue);
		setTimeout(() => {
			this.props.inputNode.focus();
			this.props.inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
		}, 0);
		this.setState({uppercase: !nextValue.length});
	}

	getKeys() {
		let keysSet;
		if (this.state.showSymbols) {
			keysSet = KeyboardSymbolsConstants;
		} else if (this.state.currentLanguage === 'latin') {
			keysSet = KeyboardLatinConstants;
		} else {
			keysSet = KeyboardCyrillicConstants;
		}

		return this.state.uppercase ?
			_.map(keysSet, keyRow => _.map(keyRow, key => key.toUpperCase()))
			: keysSet;	
	}

	getSymbolsKeyValue () {
		let symbolsKeyValue;
		if (!this.state.showSymbols) {
			symbolsKeyValue = '.?!&';
		} else if (this.state.currentLanguage === 'latin') {
			symbolsKeyValue = 'Abc';
		} else {
			symbolsKeyValue = 'Абв';
		}
		return symbolsKeyValue;
	}

	render() {
		const {handleLeftBottomClick, handleRightBottomClick, leftBottomValue, rightBottomValue} = this.props;
		const keys = this.getKeys();
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
		const symbolsKeyValue = this.getSymbolsKeyValue();
		const hasLeftBottomButton = handleLeftBottomClick && leftBottomValue;
		const hasRightBottomButton = handleRightBottomClick && rightBottomValue;
		
		return (
			<div className="keyboard">
				<div className="row">
					{_.map(numbers, (button) => 
						<KeyboardButton 
							value={button} 
							onClick={this.handleLetterButtonClick}
							classes={"numberButton"}
							index={button}
						/>
					)}
					<KeyboardButton
						value={<BackspaceIcon />}
						classes={"styles.button"}
						onClick={this.handleBackspaceClick}
					/>
				</div>

				<div className={styles.row}>
					{_.map(keys[0], (button) => 
						<KeyboardButton 
							value={button} 
							onClick={this.handleLetterButtonClick}
							index={button}
						/>
					)}
				</div>

				<div className={styles.row}>
					<div className={styles.halfButton}></div>
					{_.map(keys[1], (button) => 
						<KeyboardButton 
								value={button} 
								onClick={this.handleLetterButtonClick}
								index={button}
							/>
					)}
					<div className={styles.halfButton}></div>
				</div>

				<div className={styles.row}>
					<KeyboardButton
						value={<ShiftIcon />}
						classes={"styles.button"}
						onClick={this.handleShiftClick}
					/>
					{_.map(keys[2], (button) => 
						<KeyboardButton 
							value={button} 
							onClick={this.handleLetterButtonClick}
							index={button}
						/>
					)}
					<KeyboardButton
						value={symbolsKeyValue}
						classes={"styles.button"}
						onClick={this.handleSymbolsClick}
					/>
				</div>

				<div className={styles.row}>
					{hasLeftBottomButton ?
						<KeyboardButton
							value={leftBottomValue}
							classes={"styles.leftBottomButton"}
							onClick={this.handleLeftBottomClick}
						/>
					: null}
					<KeyboardButton
						value={<LanguageIcon />}
						classes={"styles.button"}
						onClick={this.handleLanguageClick}
					/>
					<KeyboardButton
						value={' '}
						classes={"styles.space"}
						onClick={this.handleLetterButtonClick}
					/>
					{hasRightBottomButton ?
						<KeyboardButton
							value={rightBottomValue}
							classes={"styles.rightBottomButton"}
							onClick={this.handleRightBottomClick}
						/>
					: null}
				</div>
			</div>
		);
	}
}

export default Keyboard;
