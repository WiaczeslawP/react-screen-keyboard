import React, {PropTypes} from 'react';
// import 'app/commonComponents/Input/Input.scss';

export default React.createClass({
	displayName: 'Input',
	propTypes: {
		value:       PropTypes.string,
		onChange:    PropTypes.func.isRequired,
		onFocus:    PropTypes.func,
		onBlur:    PropTypes.func,
	},

	getDefaultProps: () => ({
		value:       '',
	}),

	handleChange(event) {
		this.props.onChange(event.currentTarget.value, event);
	},

	render() {
		const {width, value, } = this.props;

		return (
			<input
				value={value}
				type="text"
				onChange={this.handleChange}
				onFocus={this.props.onFocus}
				onBlur={this.props.onBlur}
			/>
		);
	},
});