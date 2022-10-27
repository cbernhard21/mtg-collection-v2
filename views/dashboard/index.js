'use strict'
// HELPER FUNCTIONS IMPORTED FROM OTHER FILE
import { searchSingleCard, insert, showSpinner, hideSpinner } from '../../js/helper.js';

// VARIABLES FOR DASHBOARD
const cardName = document.querySelector('#card-name');
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');

// EVENT LISTENERS FOR THE DASHBOARD PAGE

// EVENT LISTENER FOR THE SEARCH FORM IN CASE THE USER PRESSES THE ENTER KEY
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showSpinner();
  renderCard(searchSingleCard, cardName.value, resultsContainer);
  cardName.value = '';
});

// EVENT LISTENER FOR THE SEARCH BUTTON
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  renderCard(searchSingleCard, cardName.value, resultsContainer);
  cardName.value = '';
});

// FUNCTIONS
async function renderCard(searchFunc, searchedCard, htmlContainer) {
  htmlContainer.innerHTML = '';
  let card = await searchFunc(searchedCard);
  let singleCard = card.singleCard;
  let cardCount = card.cardCount;
  let cardImage;
  // showSpinner();
  //CHECK IF THERE IS AN IMAGE FROM THE RESULTS
  //IF NOT USE A STOCK IMAGE
  if(!singleCard.imageUrl) {
    cardImage = '../../images/mtg-back-card.webp';
  } else {
    cardImage = insert(singleCard.imageUrl, 's', 4);
  }
  
  let searchResultHtml = `
 
        <img src="${cardImage}" alt="${singleCard.name}" class="card-image" />
        <!-- <ul> 
            <li>${singleCard.name}</li>
            <li>${singleCard.manaCost}</li>
        </ul> -->

        <p class="search-card-text">There are ${cardCount} different ${searchedCard} card(s).</p>
        <button href="/views/search" id="results-link" class="btn results-link">See All Results</button>
    `;

  

    htmlContainer.innerHTML += searchResultHtml;
    hideSpinner();

  // LOGIC TO PASS SEARCH VALUE TO LOCAL STORAGE THEN TO THE SEARCH PAGE
  const resultsLink = document.querySelector('#results-link');
  const searchPage = '/views/search';
  resultsLink.addEventListener('click', () => {
    if(!window.localStorage.getItem('cardName')){
      window.localStorage.setItem('cardName', searchedCard);
      window.location.href = searchPage;
    } else {
      window.localStorage.removeItem('cardName');
      window.localStorage.setItem('cardName', searchedCard);
      window.location.href = searchPage;
    }
  });
}

