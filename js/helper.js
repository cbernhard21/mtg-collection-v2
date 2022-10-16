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
