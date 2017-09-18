/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _pubsub = __webpack_require__(1);

var _pubsub2 = _interopRequireDefault(_pubsub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Return the current local time to be used in the UI later
function getCurrentTime() {
  var now = new Date();
  var m = now.getMonth() + 1,
      d = now.getDate(),
      y = now.getFullYear(),
      t = now.toLocaleTimeString();
  return m + '/' + d + '/' + y + ' ' + t;
}

// Add a new row of data to the grid component
function addGridRow(data) {
  console.log('Update Grid component with: ' + data.summary);
}

// Update the last updated counter
function updateCounter(data) {
  console.log('data last updated at: ' + getCurrentTime() + ' with data: ' + data.summary);
}

// Update the grid component using the data passed to the subscriber
var gridUpdate = function gridUpdate(topic, data) {
  if (data !== undefined) {
    addGridRow(data);
    updateCounter(data);
  }
};

// Create a subscription to the newDataAvailable event
var subscriber = _pubsub2.default.subscribe('newDataAvailable', gridUpdate);

// Similate data updates in the data layer.
_pubsub2.default.publish('newDataAvailable', {
  summary: 'hello updates'
});

// console.log(getCurrentTime());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ })
/******/ ]);