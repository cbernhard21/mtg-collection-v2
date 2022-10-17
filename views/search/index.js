'use strict'

import { searchManyCards, insert, insertAfter } from "../../js/helper.js";

//GLOBAL VARIABLES
let cardName = '';
let resultsHtml = '';
let cardImage = '';
let displayContainer = document.querySelector('#results-container');
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#card-name');


//WHEN PAGE LOADS FROM DASHBOARD 'SEE ALL RESULTS' BUTTON
//CHECK IF THERE IS LOCAL STORAGE CARD VALUE
if(window.localStorage.getItem('cardName')){
    //IF TRUE THEN GET THE VALUE
    cardName = window.localStorage.getItem('cardName');
    //RUN ANOTHER SEARCH TO THE MTG API TO GET ALL THE RESULTS
    const allCards = await searchManyCards(cardName);
    //DISPLAY ALL RESULTS
    allCards.forEach(card => {
        //CHECK IF THERE IS AN IMAGE
        if(card.imageUrl) {
            cardImage = insert(card.imageUrl, 's', 4)
        } else {
            cardImage = '../../images/mtg-back-card.webp';
        }
        let cardHtml = `
            <article class="card-info-container">
                <h2>${card.name}</h2>    
                <img src="${cardImage}" alt="${card.name}" class="card-image" />
            </article>
        `;
        resultsHtml += cardHtml;
    });
    displayContainer.innerHTML = resultsHtml;
}

//LOGIC TO FETCH FROM THE API WHEN SEARCH IS DONE FROM THE SEARCH PAGE
//SEARCH WHEN THE BUTTON IS CLICKED
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let searchValue = searchInput.value;
    displayContainer.innerHTML = '';
    resultsHtml = '';
    renderResults(searchManyCards, searchValue, displayContainer);
    searchInput.value = '';
});

//SEARCH WHEN THE FORM IS SUBMITTED, PRESSING THE ENTER BUTTON
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchValue = searchInput.value;
    displayContainer.innerHTML = '';
    resultsHtml = '';
    renderResults(searchManyCards, searchValue, displayContainer);
    searchInput.value = '';
});



//FUNCTION TO DISPLAY DATA FROM THE API RESULTS
async function renderResults(searchFunc, searchedCard, htmlContainer) {
    let searchResults = await searchFunc(searchedCard);
    console.log(searchResults);
    searchResults.forEach(item => {
        //CHECK IF THERE IS AN IMAGE
        if(item.imageUrl) {
            cardImage = insert(item.imageUrl, 's', 4)
        } else {
            cardImage = '../../images/mtg-back-card.webp';
        };
        let cardHtml = `
            <article class="card-info-container">  
                <img src="${cardImage}" alt="${item.name}" class="card-image" />
                <div class="card-text">
                    <h2 class="card-name">${item.name}</h2>
                    <p><span class="bold">Set</span> - ${item.setName}</p>
                    <p><span class="bold">Type</span> - ${item.type}</p>
                    <p><span class="bold">Colors</span> - ${item.colors}</p>
                </div>
                <div class="button-container card-text">
                    <button class="btn add">Add To Collection</button>
                    
                </div>
                
            </article>
        `;
        resultsHtml += cardHtml;
    });
    htmlContainer.innerHTML = resultsHtml;


    //LOGIC FOR ADD TO COLLECTION BUTTON

    //STORE THAT PARTICULAR CARD'S INFORMATION

    //SEND THAT INFORMATION TO THE DATABASE

    //SHOW THE USER A CONFIRMATION MESSAGE
    const addBtn = document.querySelectorAll('.add');
    addBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const p = document.createElement('p');
            p.innerHTML = 'i hope this works';
            const container = e.target.parentNode;
            insertAfter(p, container.lastElementChild);
        })
    })

};










