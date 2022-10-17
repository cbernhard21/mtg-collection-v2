'use strict'

//GLOBAL VARIABLES
const searchLinkNav = document.querySelector('#search-link');


//CLEAR LOCAL STORAGE CARD NAME IF NAVIGATED TO SEARCH PAGE FROM THE NAV MENU
searchLinkNav.addEventListener('click', () => {
    window.localStorage.removeItem('cardName');
});




