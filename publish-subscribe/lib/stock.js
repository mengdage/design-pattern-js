'use strict';

var _pubsub = require('./pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrentTime() {
      var now = Date.now();
      var m = now.getMonth() + 1,
          d = now.getDate(),
          y = now.getFullYear(),
          t = now.toLocalTimeString();
      return m + '/' + d + '/' + y + ' ' + t;
}

console.log(getCurrentTime());