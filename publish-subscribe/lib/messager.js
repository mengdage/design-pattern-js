'use strict';

var _pubsub = require('./pubsub');

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const pubsub = require('./pubsub');
function messager(topic, data) {
  console.log(topic + ': ' + data);
}

var messageToken = _pubsub2.default.subscribe('inbox/NewMessage', messager);

_pubsub2.default.publish('inbox/NewMessage', 'hello');
_pubsub2.default.publish('inbox/NewMessage', 'world');
_pubsub2.default.publish('inbox/OldMessage', 'world');

_pubsub2.default.unsubscribe(messageToken);
_pubsub2.default.publish('inbox/NewMessage', 'Nope');