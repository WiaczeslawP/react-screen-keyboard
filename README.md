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

`inputNode` prop is required to manipulate input field
