// HELPER FUNCTIONS
import { searchCards } from "../../js/helper.js";

// VARIABLES FOR DASHBOARD
const cardName = document.querySelector('#card-name');
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    searchCards(cardName.value);
    

    cardName.value = '';
})