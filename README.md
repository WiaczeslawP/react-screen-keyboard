# react-screen-keyboard

![alt tag](https://raw.githubusercontent.com/WiaczeslawP/react-screen-keyboard/master/keyboard.png)

## Quick start

**Installing via npm**

```
npm install react-screen-keyboard
```

### Example

```js
import React from 'react';
import Keyboard, {KeyboardButton} from 'react-screen-keyboard';

const MyComponent = ({inputNode, goBack, submit}) =>
  <Keyboard
    inputNode={inputNode}
    leftButtons={[
      <KeyboardButton
        onClick={goBack}
        value="Back"
      />
    ]}
    rightButtons={[
      <KeyboardButton
        onClick={submit}
        value="Submit"
        classes="keyboard-submit-button"
      />
    ]}
  />

export default MyComponent;
```

`inputNode` prop is required to manipulate input field. It must be a value from ref attribute of the Input component, and it can be passed to the Keyboard component using Redux, for example.

**Example of input component**

```js
import React, {Component, PropTypes} from 'react';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    onFocus: null,
  };

  componentDidMount() {
    this.refs.input.addEventListener('input', this.handleChange);
  }

  componentWillUnmount() {
    this.refs.input.removeEventListener('input', this.handleChange);
  }

  handleChange = (event) => this.props.onChange(event.target.value)

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus(this.refs.input);
      // the `this.refs.input` value should be passed to the Keyboard component as inputNode prop
    }
  }

  render() {
    const {value} = this.props;

    return (
      <input
        value={value}
        onFocus={this.handleFocus}
        ref="input"
      />
    );
  }
}
```
