'use strict';

import { loadData, deleteData } from '../../db/db.js';

//GLOBAL VARIABLES
const modal = document.querySelector('.modal');

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

  //ADD DELETE FUNCTIONALITY TO DELETE BUTTONS
  resultsContainer.innerHTML = htmlCollectionContainer;
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      let card = e.target.parentNode;
      let cardId = card.getAttribute('data-card-id');
      let cardName = card.getAttribute('data-card-name');

      showModal();
      const btnYes = document.querySelector('.btn-yes');
      const btnNo = document.querySelector('.btn-no');
      const modalCardName = document.querySelector('.modal-card-name');
      let modalText = document.querySelector('.modal-text');
      const modalButtons = document.querySelector('.modal-buttons-container');

      modalCardName.textContent = cardName;

      btnYes.addEventListener('click', () => {
        console.log('deleted');
        deleteData(cardId);
        modalText.innerHTML = `<p><span class="modal-card-name">${cardName}</span> Was Deleted From Your Collection</p>`;
        modalButtons.classList.add('hidden');
        setTimeout(function () {
          hideModal();
        }, 1000);
        //RELOAD THE PAGE AFTER A DELETE
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });

      btnNo.addEventListener('click', () => {
        hideModal();
      });

      //RELOAD THE PAGE AFTER A DELETE
      // setTimeout(() => {
      //   window.location.reload();
      // }, 500);
    });
  });
}

renderHtml();

function showModal() {
  //CREATE AN ARE YOU SURE MODAL

  modal.classList.remove('hidden');
  modal.innerHTML = `
    <p class="modal-text">Are you sure you want to delete <span class="modal-card-name"></span> from your collection</p>
    <div class="modal-buttons-container">
      <div class="modal-buttons">
        <button class="btn btn-yes">Yes</button>
        <button class="btn btn-no">No</button>
      </div>
    </div>
  `;
}

function hideModal() {
  modal.classList.add('hidden');
  modal.innerHTML = '';
}
