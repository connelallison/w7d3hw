"use strict";

const PubSub = require('../helpers/pub_sub.js');

const DisplayView = function(element){
  this.element = element;
}

DisplayView.prototype.render = function(chosenCountry) {
  this.element.innerHTML = "";
  const name = document.createElement('h2');
  name.textContent = chosenCountry.name;
  const region = document.createElement("p");
  region.textContent = `Region: ${chosenCountry.region}`;
  const languagesIntro = document.createElement("p");
  languagesIntro.textContent = "Languages spoken:";
  const languages = document.createElement('ul');
  chosenCountry.languages.forEach((language) => {
    const li = document.createElement('li');
    li.textContent = language.name;
    languages.appendChild(li);
  });
  this.element.appendChild(name);
  this.element.innerHTML += `<img src="${chosenCountry.flag}" alt="Flag of ${chosenCountry.name}" height="90">`;
  this.element.appendChild(region);
  this.element.appendChild(languagesIntro);
  this.element.appendChild(languages);
};

DisplayView.prototype.bindEvents = function(){
  PubSub.subscribe("Countries:chosen-country", (event) => {
      const chosenCountry = event.detail;
      this.render(chosenCountry);
    });
}

module.exports = DisplayView;
