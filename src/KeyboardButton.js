import React, {PureComponent, PropTypes} from 'react';

export default class KeyboardButton extends PureComponent {
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
		classes: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		autofocus: PropTypes.bool,
		isDisabled: PropTypes.bool,
	};

	static defaultProps = {
		autofocus: false,
		isDisabled: false,
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.value);
	}

	render() {
		return (
			<button
				type="button"
				className={'keyboard-button' + ' ' + this.props.classes}
				onClick={this.props.isDisabled ? null : this.handleClick}
				autoFocus={this.props.autofocus}
				disabled={this.props.isDisabled}
			>
				{this.props.value}
			</button>
		);
	}
}
