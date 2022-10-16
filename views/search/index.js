'use strict'

import { searchManyCards, insert } from "../../js/helper.js";

//GLOBAL VARIABLES
let cardName = '';
let resultsHtml = '';
let cardImage = '';
const displayContainer = document.querySelector('#results-container');

//CHECK IF THERE IS LOCAL STORAGE CARD VALUE
if(window.localStorage.getItem('cardName')){
    //IF TRUE THEN GET THE VALUE
    cardName = window.localStorage.getItem('cardName');

    //RUN ANOTHER SEARCH TO THE MTG API TO GET ALL THE RESULTS
    const allCards = await searchManyCards(cardName);
    console.log(allCards);
    //DISPLAY ALL RESULTS
    allCards.forEach(card => {
        //CHECK IF THERE IS AN IMAGE
        if(card.imageUrl) {
            cardImage = insert(card.imageUrl, 's', 4)
        } else {
            cardImage = '../../images/no-image.png';
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






