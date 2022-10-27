'use strict'

//FUNCTION TO SEARCH MTG API AND WILL RETURN 1 CARD FOR THE DASHBOARD PAGE
export async function searchSingleCard(card) {
  const url = 'https://api.magicthegathering.io/v1/cards?name=';
  try {
    const res = await fetch(`${url}${card}`);
    const data = await res.json();
    const singleCard = data.cards[0];
    const cardCount = data.cards.length;
    return { singleCard, cardCount };
  } catch (error) {
    console.log(error);
  }
}

//FUNCTION TO SEARCH ALL CARDS FROM THE MTG API TO RETURN ALL CARDS FOR THE SEARCH PAGE
export async function searchManyCards(card) {
  const url = 'https://api.magicthegathering.io/v1/cards?name=';
  try {
    const res = await fetch(`${url}${card}`);
    const data = await res.json();
    const allCards = data.cards;
    return allCards;
  } catch (error) {
    console.log(error)
  }
}


// INSERT THE LETTER 'S' TO MAKE A HTTPS REQUEST FOR IMAGE (ORIGINALLY HTTP)\
// USED WHEN GETTING DATA BACK FROM THE MTG API
export function insert(mainString, insString, pos) {
  return mainString.slice(0, pos) + insString + mainString.slice(pos);
}


//FUNCTION TO INSERT A NODE ELEMENT AFTER A SELECT ELEMENT IN A LOOP 
export function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

//FUNCTION TO SHOW THE LOADING SPINNER
export function showSpinner() {
  document.querySelector('.loader-wrapper').classList.remove('hidden');
}

//FUNCTION TO HIDE THE LOADING SPINNER
export function hideSpinner() {
  document.querySelector('.loader-wrapper').classList.add('hidden');
}
