'use strict';

import { loadData, deleteData } from '../../db/db.js';

async function renderHtml() {
  let htmlCollectionContainer = '';
  const resultsContainer = document.querySelector('#results-container');
  const allCollectionCards = await loadData();

  allCollectionCards.forEach((card) => {
    let cardHtml = `
      <article class="card-info-container" 
        data-card-id="${card.id}"
        data-card-name="${card.name}" 
        data-card-image="${card.cardImage}" 
        data-card-set="${card.setName}" 
        data-card-type="${card.type}" 
        data-card-color="${card.colors}" 
      >  
          <img src="${card.cardImage}" alt="${card.name}" class="card-image" />
          <div class="card-text">
              <h2 class="card-name">${card.name}</h2>
              <p><span class="bold">Set</span> - ${card.setName}</p>
              <p><span class="bold">Type</span> - ${card.type}</p>
              <p><span class="bold">Colors</span> - ${card.colors}</p>
          </div>
          <button class="btn delete">Delete From Collection</button>   
      </article>
    `;

    htmlCollectionContainer += cardHtml;
  });
  resultsContainer.innerHTML = htmlCollectionContainer;
}


renderHtml();


