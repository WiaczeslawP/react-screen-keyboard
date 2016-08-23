var Keyboard = require('./lib/Keyboard');
var KeyboardButton = require('./lib/KeyboardButton');

module.exports = Keyboard.default || Keyboard;
module.exports.KeyboardButton = KeyboardButton.default || KeyboardButton;
