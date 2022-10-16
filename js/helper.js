export async function searchSingleCard(card) {
    console.log(card);
    const url = 'https://api.magicthegathering.io/v1/cards?name=';

    try {
        const res = await fetch(`${url}${card}`);
        const data = await res.json();
        const singleCard = data.cards[0];
        console.log(singleCard);
        return singleCard

    } catch (error) {
        console.log(error)
    }
}
