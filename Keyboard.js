var Keyboard = require('./lib/Keyboard');
var Keyboard = require('./lib/KeyboardButton');

module.exports = Keyboard.default || Keyboard;
module.exports.KeyboardButton = KeyboardButton.default || KeyboardButton;
