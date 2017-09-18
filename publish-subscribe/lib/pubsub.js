"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Storage for topics that can be broadcast or listened to
var topics = {};
var subId = 0;

// Subscribe to events of interest with a topic name and callback function,
// to be executed when the topic/event is fired.
function subscribe(topic, func) {

  if (!topics[topic]) {
    topics[topic] = [];
  }

  // A token denotes the callback function.
  var token = subId.toString(10);

  topics[topic].push({
    token: token,
    func: func
  });

  return token;
}

// Publish a topic with arguments to pass along.
function publish(topic, args) {

  if (!topics[topic]) {
    return false;
  }

  var callbacks = topics[topic];

  callbacks.forEach(function (cb) {
    cb.func(topic, args);
  });

  return this;
}

// Unsubscribe from a specific topic based on a token returned
// when subscribing.
function unsubscribe(token) {
  for (var m in topics) {
    if (topics.hasOwnProperty(m) && topics[m] && topics[m].length > 0) {
      var callbacks = topics[m];
      var len = callbacks.length;
      for (var i = 0; i < len; i += 1) {
        if (callbacks[i].token === token) {
          callbacks.splice(i, 1);
          return token;
        }
      }
    }
  }
}

var pubsub = {
  subscribe: subscribe,
  unsubscribe: unsubscribe,
  publish: publish
};

exports.default = pubsub;
// module.exports = pubsub;