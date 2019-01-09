"use strict";

const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
}

SelectView.prototype.populate = function(names) {
  names.forEach((name) => {
    this.element.innerHTML += `<option value="${name}">${name}</option>`;
  });
};

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe("Countries:countries-loaded", (event) => {
      const names = event.detail;
      this.populate(names);
    });

    this.element.addEventListener("change", (event) => {
      const name = event.target.value;
      console.log(name);
      PubSub.publish("SelectView:selected-country", name);
    });
}

module.exports = SelectView;
