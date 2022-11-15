'use strict';
// HELPER FUNCTIONS IMPORTED FROM OTHER FILE
import { searchSingleCard, insert, showSpinner, hideSpinner } from '../../js/helper.js';
import { loadData } from '../../db/db.js';

// VARIABLES FOR DASHBOARD
const cardName = document.querySelector('#card-name');
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('#search-form');
const resultsContainer = document.querySelector('#results-container');

// EVENT LISTENERS FOR THE DASHBOARD PAGE

// EVENT LISTENER FOR THE SEARCH FORM IN CASE THE USER PRESSES THE ENTER KEY
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // showSpinner();
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
  htmlContainer.innerHTML = showSpinner();
  let card = await searchFunc(searchedCard);
  let singleCard = card.singleCard;
  let cardCount = card.cardCount;
  let cardImage;
  //CHECK IF THERE IS AN IMAGE FROM THE RESULTS
  //IF NOT USE A STOCK IMAGE
  if (!singleCard.imageUrl) {
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
    if (!window.localStorage.getItem('cardName')) {
      window.localStorage.setItem('cardName', searchedCard);
      window.location.href = searchPage;
    } else {
      window.localStorage.removeItem('cardName');
      window.localStorage.setItem('cardName', searchedCard);
      window.location.href = searchPage;
    }
  });
}

//COLOR CHART LOGIC OR PIE CHART

async function createPieChart() {
  const addData = await loadData();
  let whiteCount = 0;
  let blueCount = 0;
  let redCount = 0;
  let blackCount = 0;
  let greenCount = 0;
  let multiColorCount = 0;
  let colorlessCount = 0;

  //FIGURE OUT HOW MANY COLORS IS IN COLLECTION TO DISPLAY IN PIE CHART
  addData.forEach((item) => {
    if (item.colors === 'undefined') {
      colorlessCount++;
    } else if (item.colors.length > 1) {
      multiColorCount++;
    } else if (item.colors == 'W') {
      whiteCount++;
    } else if (item.colors == 'U') {
      blueCount++;
    } else if (item.colors == 'R') {
      redCount++;
    } else if (item.colors == 'B') {
      blackCount++;
    } else if (item.colors == 'G') {
      greenCount++;
    }
  });

  const labels = ['White', 'Blue', 'Red', 'Black', 'Green', 'Multi-Color', 'Colorless'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Amount Of Colors In My Collection',
        backgroundColor: [
          '#ECE6D7', //WHITE
          '#007CBE', //BLUE
          '#E23F26', //RED
          '#231F20', //BLACK
          '#037A43', //GREEN
          '#D7BC7E', //MUTI-COLOR
          '#A8B8BA', //COLORLESS
        ],
        borderColor: '#444444',
        data: [whiteCount, blueCount, redCount, blackCount, greenCount, multiColorCount, colorlessCount],
      },
    ],
  };
  const config = {
    type: 'pie',
    data: data,
    options: {},
  };
  const colorChart = new Chart(document.querySelector('.colors-chart'), config);
}

function createBarChart() {
  console.log('created bar chart for mtg types');
  const barChart = document.querySelector('.bar-chart').getContext('2d');
  const typesChart = new Chart(barChart, {
    type: 'bar',
    data: {
      labels: ['Creatures', 'Enchantments', 'Artifacts', 'Planeswalkers', 'Instants', 'Sorcery', 'Land'],
      datasets: [
        {
          label: '# of Cards For That Type',
          data: [12, 19, 3, 5, 2, 3, 19],
          backgroundColor: [
            '#ECE6D7', //WHITE
            '#007CBE', //BLUE
            '#E23F26', //RED
            '#231F20', //BLACK
            '#037A43', //GREEN
            '#D7BC7E', //MUTI-COLOR
            '#A8B8BA', //COLORLESS
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//RUN ALL THESE FUNCTION ON PAGE LOAD
createPieChart();
createBarChart();
