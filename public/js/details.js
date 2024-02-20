import { processCountryClick } from '../modules/globals.js';

const returnToList = document.querySelector('.return');
const ddMenu = document.querySelector('.selector');
const caret = document.querySelector('.caret');
const userSelection = document.getElementById('user-selection');
const menuValue = document.querySelector('.menu-value');
const menuItems = Array.from(document.querySelectorAll('.item'));
let storage = null;

returnToList.addEventListener('click', returnToCountriesList);
ddMenu.addEventListener('click', ddClickHandler);

function returnToCountriesList() {
  window.location.assign('/');
}

// DROPDOWN MENU CLICK HANDLER
function ddClickHandler() {
  caret.classList.toggle('rotate-caret');
  menuValue.classList.toggle('dd-visibility');
}

// DROPDOWN MENU HANDLER
function menuItemHandler(i, e) {
  userSelection.innerText = e.target.innerText;
  const parsedStorage = JSON.parse(storage);
  processCountryClick(i, parsedStorage);
  ddClickHandler();
}

// DROPDOWN MENU EVENTS
(() => {
  storage = localStorage.getItem('nationData');
  console.log(storage);
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function (ev) {
      menuItemHandler(i, ev);
    });
  }
})();
