'use strict'

//GLOBAL VARIABLES
const searchLinkNav = document.querySelector('#search-link');


//CLEAR LOCAL STORAGE CARD NAME IF NAVIGATED TO SEARCH PAGE FROM THE NAV MENU
searchLinkNav.addEventListener('click', () => {
    window.localStorage.removeItem('cardName');
});


//NAVIGATION LOGIC FOR MEDIUM AND SMALL SCREENS
const menuButton = document.querySelector('.header figure');
const navContainer = document.querySelector('.nav-container');
menuButton.addEventListener('click', (e) => {
    e.preventDefault();
    navContainer.classList.toggle('slide');
})



