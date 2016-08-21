import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Keyboard from './keyboard/Keyboard';
import ChevronLeft from './keyboard/ChevronLeft';
import Input from './Input';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {inputValue: '', showKeyboard: false};
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
	}

  componentDidMount() {
    this.inputNode = ReactDOM.findDOMNode(this.input);
  }

	handleKeyDown(value) {
		this.setState({inputValue: value});
	}

  handleFocus() {
    this.setState({showKeyboard: true});
  }

  handleBlur() {
    this.setState({showKeyboard: false});
  }

  render() {
    return (
    	<div>
      		<h1>Hello, world.</h1>
      		<Input 
            ref={(input) => this.input = input} 
            value={this.state.inputValue} 
            onChange={this.handleKeyDown} 
            onFocus={this.handleFocus} 
            onBlur={this.handleFocus} 
          />
          {this.state.showKeyboard ?
      		  <Keyboard 
              inputNode={this.inputNode} 
              onClick={this.handleKeyDown} 
              leftBottomValue="Назад"
              handleLeftBottomClick={() => console.log('Назад')}
              rightBottomValue="Искать"
              handleRightBottomClick={() => console.log('Искать')}
            />
          : null}
      </div>
    );
  }
}
