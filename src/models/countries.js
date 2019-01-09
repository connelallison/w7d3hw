"use strict";

const PubSub = require('../helpers/pub_sub.js');

const Countries = function(){
  this.countries = [];
}

Countries.prototype.bindEvents = function(){
  const names = this.countries.map((country) => {
    return country.name;
  })
  PubSub.publish("Countries:countries-loaded", names);
  console.log("Countries loaded from API and names published to Countries:countries-loaded");

  PubSub.subscribe("SelectView:selected-country", (event) => {
      const name = event.detail;
      const chosenCountry = this.countries.find((type) => {
        return type.name === name;
      });
      console.log(chosenCountry);
      PubSub.publish("Countries:chosen-country", chosenCountry);
    });
}

Countries.prototype.getData = function(){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", (event) => {
    if (xhr.status === 200) {
    this.countries = JSON.parse(xhr.responseText);
    this.bindEvents();
    }});
  xhr.open("GET", "https://restcountries.eu/rest/v2/all");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send();
}

module.exports = Countries;
