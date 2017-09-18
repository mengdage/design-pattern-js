import pubsub from './pubsub';

// Return the current local time to be used in the UI later
function getCurrentTime() {
  const now = new Date();
  const m = now.getMonth() + 1,
        d = now.getDate(),
        y = now.getFullYear(),
        t = now.toLocaleTimeString();
  return `${m}/${d}/${y} ${t}`;
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
const gridUpdate = function(topic, data) {
  if(data !== undefined) {
    addGridRow(data);
    updateCounter(data);
  }
};

// Create a subscription to the newDataAvailable event
const subscriber = pubsub.subscribe('newDataAvailable', gridUpdate);

// Similate data updates in the data layer.
pubsub.publish('newDataAvailable', {
  summary: 'hello updates'
});

// console.log(getCurrentTime());
