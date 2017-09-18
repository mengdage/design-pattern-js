import pubsub from './pubsub';
// const pubsub = require('./pubsub');
function messager(topic, data) {
  console.log(`${topic}: ${data}`);
}

const messageToken = pubsub.subscribe('inbox/NewMessage', messager);

pubsub.publish('inbox/NewMessage', 'hello');
pubsub.publish('inbox/NewMessage', 'world');
pubsub.publish('inbox/OldMessage', 'world');

pubsub.unsubscribe(messageToken);
pubsub.publish('inbox/NewMessage', 'Nope');
