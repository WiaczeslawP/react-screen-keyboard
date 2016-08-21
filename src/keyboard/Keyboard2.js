import React, {Component, PropTypes} from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import KeyboardButton from './KeyboardButton';
import KeyboardLatinConstants from './KeyboardLatinConstants';
import KeyboardCyrillicConstants from './KeyboardCyrillicConstants';
// import LanguageIcon from 'material-ui/svg-icons/action/language';
// import BackspaceIcon from 'material-ui/svg-icons/content/backspace';
import BackspaceIcon from './BackspaceIcon';
import LanguageIcon from './LanguageIcon';
import styles from './Keyboard.css';

export default class Keyboard extends Component {
	static propTypes = {
		inputNode: PropTypes.any.isRequired,
		onClick: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {currentLanguage: 'latin', uppercase: true};
		this.handleLetterButtonClick = this.handleLetterButtonClick.bind(this);
		this.handleBackspaceClick = this.handleBackspaceClick.bind(this);
		this.handleLanguageClick = this.handleLanguageClick.bind(this);
		this.handleShiftClick = this.handleShiftClick.bind(this);
		this.getKeys = this.getKeys.bind(this);
	}

	handleLanguageClick() {
		this.setState({currentLanguage: this.state.currentLanguage === 'latin' ? 'cyrrilic' : 'latin'});
	}

	handleShiftClick() {
		this.setState({uppercase: !this.state.uppercase});
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
		const keysSet = this.state.currentLanguage === 'latin' ? 
			KeyboardLatinConstants 
			: KeyboardCyrillicConstants;

		return this.state.uppercase ?
			_.map(keysSet, keyRow => _.map(keyRow, key => key.toUpperCase()))
			: keysSet;	
	}

	render() {
		const keys = this.getKeys();
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
		
		return (
			<div className={styles.keyboard}>
				<div className={styles.row}>
					<div className={styles.keysSet}>
						{_.map(numbers, (button) => 
							<KeyboardButton 
								value={button} 
								onClick={this.handleLetterButtonClick}
								classes={styles.numberButton}
								index={button}
							/>
						)}
					</div>
					<KeyboardButton
						value={<BackspaceIcon />}
						classes={styles.utilButton}
						onClick={this.handleBackspaceClick}
					/>
				</div>
				<div className={styles.row}>
					<div className={styles.keysSet}>
						{_.map(keys[0], (button) => 
							<KeyboardButton 
								value={button} 
								onClick={this.handleLetterButtonClick}
								index={button}
							/>
						)}
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.keysSet}>
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
				</div>
				<div className={styles.row}>
					<KeyboardButton
						value="shift"
						classes={styles.utilButton}
						onClick={this.handleShiftClick}
					/>
					<div className={styles.keysSet}>
						{_.map(keys[2], (button) => 
							<KeyboardButton 
								value={button} 
								onClick={this.handleLetterButtonClick}
								index={button}
							/>
						)}
					</div>
					<KeyboardButton
						value={'.?!&'}
						classes={styles.utilButton}
						onClick={this.handleLetterButtonClick}
					/>
				</div>
				<div className={styles.row}>
					<KeyboardButton
						value={<LanguageIcon />}
						classes={styles.utilButton}
						onClick={this.handleLanguageClick}
					/>
					<KeyboardButton
						value={' '}
						classes={styles.space}
						onClick={this.handleLetterButtonClick}
					/>
				</div>
			</div>
		);
	}
}

export default Keyboard;
