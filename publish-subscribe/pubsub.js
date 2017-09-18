const pubsub = (function(){
  // Storage for topics that can be broadcast or listened to
  const topics = {};
  let subId = 0;

  // Subscribe to events of interest with a topic name and callback function,
  // to be executed when the topic/event is fired.
  function subscribe(topic, func){

    if(!topics[topic]) {
      topics[topic] = [];
    }

    // A token denotes the callback function.
    let token = subId.toString(10);

    topics[topic].push({
      token,
      func
    });

    return token;
  }

  // Publish a topic with arguments to pass along.
  function publish(topic, args) {

    if(!topics[topic]) {
      return false;
    }

    const callbacks = topics[topic];

    callbacks.forEach(cb => {
      cb.func(topic, args);
    });

    return this;
  }

  // Unsubscribe from a specific topic based on a token returned
  // when subscribing.
  function unsubscribe(token) {
    for( let m in topics) {
      if(topics.hasOwnProperty(m) && topics[m] && topics[m].length > 0) {
        const callbacks = topics[m];
        const len = callbacks.length;
        for(let i = 0; i < len; i += 1) {
          if(callbacks[i].token === token) {
            callbacks.splice(i, 1);
            return token;
          }
        }
      }
    }
  }

  return {
    subscribe,
    unsubscribe,
    publish
  };
})();
