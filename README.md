# react-screen-keyboard

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/react-screen-keyboard.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-screen-keyboard
[download-image]: https://img.shields.io/npm/dm/react-screen-keyboard.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-screen-keyboard

![alt tag](https://raw.githubusercontent.com/WiaczeslawP/react-screen-keyboard/master/keyboard.png)

## Quick start

**Installing via npm**

```
npm install react-screen-keyboard
```

### Example

```js
import React from 'react';
import Keyboard, {KeyboardButton, LatinLayout} from 'react-screen-keyboard';

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
    layouts={[LatinLayout]}
  />

export default MyComponent;
```

### Props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>inputNode</td>
          <td></td>
          <td></td>
          <td>It is required to manipulate input field. It must be a value from ref attribute of the Input component, and it can be passed to the Keyboard component using Redux, for example. See below the example of input component</td>
        </tr>
        <tr>
          <td>leftButtons</td>
          <td>[]</td>
          <td>null</td>
          <td>Buttons to be rendered on the left from space button</td>
        </tr>
        <tr>
          <td>rightButtons</td>
          <td>[]</td>
          <td>null</td>
          <td>Buttons to be rendered on the right from space button</td>
        </tr>
        <tr>
          <td>onClick</td>
          <td>function</td>
          <td>null</td>
          <td>Function to be inboked when any button is clicked</td>
        </tr>
        <tr>
          <td>isFirstLetterUppercase</td>
          <td>boolean</td>
          <td>false</td>
          <td>is the first letter in the input node should be uppercased</td>
        </tr>
        <tr>
          <td>layouts</td>
          <td>[]</td>
          <td>[CyrillicLayout, LatinLayout]</td>
          <td>Layouts. You can use layouts from the package or define your own</td>
        </tr>
    </tbody>
  </table>

**Example of input component**

```js
import React, {Component, PropTypes} from 'react';
import Keyboard, {KeyboardButton} from 'react-screen-keyboard';

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    onFocus: null,
  }

  state = {
    inputNode: null,
  }

  handleInput = (event) => this.props.onChange(event.target.value)

  handleFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus(this.input);
      this.setState({inputNode: this.input});
      // the `this.refs.input` value should be passed to the Keyboard component as inputNode prop
    }
  }

  render() {
    const {value} = this.props;
    const {inputNode} = this.state;

    return (
      <div>
        <input
          onInput={this.handleInput}
          value={value}
          onFocus={this.handleFocus}
          ref={(input) => { this.input = input; }}
        />
        <Keyboard
          inputNode={inputNode}
          rightButtons={[
            <ClickOnKeyPressWrap key="enter">
              <KeyboardButton
                onClick={this.handleLoginUser}
                value="Войти"
                classes="keyboard-submit-button"
              />
            </ClickOnKeyPressWrap>
          ]}
        />
      </div>
    );
  }
}
```
