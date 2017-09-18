function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.add = function(obj) {
  this.observerList.push(obj);
}

ObserverList.prototype.count = function() {
  return this.observerList.length;
}

ObserverList.prototype.get = function(idx) {
  return this.observerList[idx];
}

ObserverList.prototype.indexOf = function(obj) {
  for(let i = 0, len = this.observerList.length; i < len; i += 1) {
    if(this.observerList[i] === obj) {
      return i;
    }
  }
  return -1;
}

ObserverList.prototype.removeAt = function(idx) {
  this.observerList.splice(idx, 1);
}

function Subject() {
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function(obs) {
  this.observers.add(obs);
}

Subject.prototype.removeObserver = function(obs) {
  this.observers.removeAt(this.observers.indexOf(obs));
}

Subject.prototype.notify = function(context) {
  for(let i = 0, len = this.observers.count(); i < len; i += 1) {
    this.observers.get(i).update(context);
  }
}

// The Observer
function Observer() {
  this.update = function(){};
}

// Extend an object with an extension
function extend(obj, extension) {
  for(let key in extension) {
    obj[key] = extension[key];
  }
}

// References to the DOM elements
const addBtn = document.getElementById('addBtn'),
      subjectBox = document.getElementById('subjectBox'),
      observersContainer = document.getElementById('observersContainer');

// Concrete subject

// Extend the subjectBox with the Subject class
extend(subjectBox, new Subject());

// Click the subjectBox will triger notifications to its observers
subjectBox.addEventListener('click', () => subjectBox.notify(subjectBox.checked));

addBtn.addEventListener('click', addNewCheckbox);

function addNewCheckbox() {
  // Create a new checkbox to be added
  const newCheckbox = document.createElement('input');
  newCheckbox.type = 'checkbox';

  // Extend the newCheckbox with the Observer class
  extend(newCheckbox, new Observer());

  // Override with custom update behavior
  newCheckbox.update = (val) => newCheckbox.checked = val;

  // Add the new checkbox to the subjectBox's observer list
  subjectBox.addObserver(newCheckbox);

  // Append the new checkbox to the container
  observersContainer.appendChild(newCheckbox);
}
