"use strict";

const Countries = require('./models/countries.js');
const SelectView = require('./views/select_view.js');
const DisplayView = require('./views/display_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const displayElement = document.querySelector("#country");
  const displayView = new DisplayView(displayElement);
  displayView.bindEvents();

  const selectElement = document.querySelector('#countries');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents()

  const countries = new Countries();
  countries.getData();
});
