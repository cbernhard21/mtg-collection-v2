'use strict';

import { searchManyCards, insert, insertAfter, showSpinner, hideSpinner } from '../../js/helper.js';
import { insertData } from '../../db/db.js';

//GLOBAL VARIABLES
let cardName = '';
let resultsHtml = '';
let cardImage = '';
let displayContainer = document.querySelector('#results-container');
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#card-name');
const modal = document.querySelector('.modal');
const modalCardName = document.querySelector('.modal-card-name');
const btnYes = document.querySelector('.btn-yes');
const btnNo = document.querySelector('.btn-no');


//FUNCTION TO HANDLE CONFIRMATION MODAL
function showModal() {
  modal.classList.remove('hidden');
}

function hideModal() {
  modal.classList.add('hidden');
}

//WHEN PAGE LOADS FROM DASHBOARD 'SEE ALL RESULTS' BUTTON
//CHECK IF THERE IS LOCAL STORAGE CARD VALUE
if (window.localStorage.getItem('cardName')) {
  //IF TRUE THEN GET THE VALUE
  cardName = window.localStorage.getItem('cardName');
  //RUN ANOTHER SEARCH TO THE MTG API TO GET ALL THE RESULTS
  displayContainer.innerHTML = showSpinner();
  const allCards = await searchManyCards(cardName);
  //DISPLAY ALL RESULTS
  allCards.forEach((card) => {
    //CHECK IF THERE IS AN IMAGE
    if (card.imageUrl) {
      cardImage = insert(card.imageUrl, 's', 4);
    } else {
      cardImage = '../../images/mtg-back-card.webp';
    }
    let cardHtml = generateCardHtml(cardImage, card);

    resultsHtml += cardHtml;
  });
  displayContainer.innerHTML += resultsHtml;
  hideSpinner();

  //LOGIC FOR THE ADD TO COLLECTION BUTTON
  //WILL CONVERT THIS TO A FUNCTION BECAUSE IT IS BEING USED IN MULITPLE PLACES
  //LOGIC FOR ADD TO COLLECTION BUTTON

  //STORE THAT PARTICULAR CARD'S INFORMATION

  //SEND THAT INFORMATION TO THE DATABASE

  //SHOW THE USER A CONFIRMATION MESSAGE
  const addBtn = document.querySelectorAll('.add');
  addBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const p = document.createElement('p');
      p.innerHTML = 'Your Card Has Been Added To Your Collection';
      p.classList.add('message');
      const container = e.target.parentNode;
      insertAfter(p, container.lastElementChild);

      //STORE THIS CARD'S INFORMATION TO SEND TO DATABASE
      let cardForDatabase = {
        name: container.dataset.cardName,
        image: container.dataset.cardImage,
        set: container.dataset.cardSet,
        type: container.dataset.cardType,
        color: container.dataset.cardColor,
      };

      //SEND THAT INFORMATION TO THE DATABASE

      insertData(cardForDatabase);
    });
  });
}

//LOGIC TO FETCH FROM THE API WHEN SEARCH IS DONE FROM THE SEARCH PAGE
//SEARCH WHEN THE BUTTON IS CLICKED
searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let searchValue = searchInput.value;
  displayContainer.innerHTML = '';
  displayContainer.innerHTML = showSpinner();
  resultsHtml = '';
  renderResults(searchManyCards, searchValue, displayContainer);
  searchInput.value = '';
});

//SEARCH WHEN THE FORM IS SUBMITTED, PRESSING THE ENTER BUTTON
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchValue = searchInput.value;
  displayContainer.innerHTML = '';
  displayContainer.innerHTML = showSpinner();
  resultsHtml = '';
  renderResults(searchManyCards, searchValue, displayContainer);
  searchInput.value = '';
});

//FUNCTION TO DISPLAY DATA FROM THE API RESULTS FROM THE SEARCH PAGE
//NOT FROM THE DASHBOARD SEARCH!!!!
async function renderResults(searchFunc, searchedCard, htmlContainer) {
  let searchResults = await searchFunc(searchedCard);
  console.log(searchResults);
  searchResults.forEach((item) => {
    //CHECK IF THERE IS AN IMAGE
    if (item.imageUrl) {
      cardImage = insert(item.imageUrl, 's', 4);
    } else {
      cardImage = '../../images/mtg-back-card.webp';
    }
    let cardHtml = generateCardHtml(cardImage, item);

    resultsHtml += cardHtml;
  });
  htmlContainer.innerHTML += resultsHtml;
  hideSpinner();

  //LOGIC FOR ADD TO COLLECTION BUTTON
  //SHOW THE USER A CONFIRMATION MESSAGE
  const addBtn = document.querySelectorAll('.add');
  addBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // const p = document.createElement('p');
      // p.innerHTML = 'Your Card Has Been Added To Your Collection';
      // p.classList.add('message');
      const container = e.target.parentNode;
      // insertAfter(p, container.lastElementChild);

      //STORE THIS CARD'S INFORMATION TO SEND TO DATABASE
      let cardForDatabase = {
        name: container.dataset.cardName,
        image: container.dataset.cardImage,
        set: container.dataset.cardSet,
        type: container.dataset.cardType,
        color: container.dataset.cardColor,
      };

      modalCardName.textContent = container.dataset.cardName;


      // SHOW CONFIRMATION MODAL
      showModal();
      //SEND THAT INFORMATION TO THE DATABASE IF YES IS PRESS ON THE MODAL
      btnYes.addEventListener('click', () => {
        insertData(cardForDatabase);
        modal.innerHTML = `<p>Your Card Was Added To Your Collection</p>`;
        setTimeout(function() {
          hideModal();
        }, 2000)
        
      })
      btnNo.addEventListener('click', () => {
        hideModal();
      })
      
    });
  });
}

//FUNCTION FOR CREATING CARD INFORMATION DIV ONCE THE USER HAS SEARCHED FOR A CARD FROM THE API
function generateCardHtml(cardImage, item) {
  let html = `
        <article class="card-info-container" 
          data-card-name="${item.name}" 
          data-card-image="${cardImage}" 
          data-card-set="${item.setName}" 
          data-card-type="${item.type}" 
          data-card-color="${item.colors}" 
        >  
            <img src="${cardImage}" alt="${item.name}" class="card-image" />
            <div class="card-text">
                <h2 class="card-name">${item.name}</h2>
                <p><span class="bold">Set</span> - ${item.setName}</p>
                <p><span class="bold">Type</span> - ${item.type}</p>
                <p><span class="bold">Colors</span> - ${item.colors}</p>
            </div>
            <button class="btn add">Add To Collection</button>   
        </article>
    `;
  return html;
}

