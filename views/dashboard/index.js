// HELPER FUNCTIONS
import { searchSingleCard } from "../../js/helper.js";

// VARIABLES FOR DASHBOARD
const cardName = document.querySelector('#card-name');
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    renderCard(searchSingleCard, cardName.value, resultsContainer)

    // renderCard(searchSingleCard, cardName.value, resultsContainer);
    cardName.value = '';
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    renderCard(searchSingleCard, cardName.value, resultsContainer)
    cardName.value = '';
})

async function renderCard(searchFunc, searchedCard, htmlContainer) {
    let card = await searchFunc(searchedCard);
    let cardImage = insert(card.imageUrl, 's', 4);
    let html = `
        <div class="card-info-container">
            <img src="${cardImage}" alt="${card.name}" class="card-image" />
            <ul>
                <li>${card.name}</li>
                <li>${card.manaCost}</li>
            </ul>
        </div>
        <a href="/views/search" id="results-link" class="btn results-link">See All Results</a>
    `;
    htmlContainer.innerHTML = html;

    const resultsLink = document.querySelector('#results-link');
    resultsLink.addEventListener('click', () => {
        console.log('i was clicked');
    })
}

// INSERT THE LETTER 'S' TO MAKE A HTTPS REQUEST FOR IMAGE (ORIGINALLY HTTP)
function insert(mainString, insString, pos) {
    return mainString.slice(0, pos) + insString + mainString.slice(pos);
}