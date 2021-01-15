const cardsURL = 'https://deckofcardsapi.com/api/deck';

// 1. draw from a newly shuffled deck, console.log value and suit
async function drawOne() {
	let { data } = await axios.get(`${cardsURL}/new/draw`);
	for (let card of data.cards) {
		console.log(`${card.value} OF ${card.suit}`);
	}
}

drawOne();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.
async function drawTwo() {
	let firstDraw = await axios.get(`${cardsURL}/new/draw`);
	let deckID = firstDraw.data.deck_id;
	let firstCardData = firstDraw.data.cards;
	let secondDraw = await axios.get(`${cardsURL}/${deckID}/draw`);
	let secondCardData = secondDraw.data.cards;
	for (let card of [ firstCardData, secondCardData ]) {
		console.log(`${card[0].value} OF ${card[0].suit}`);
	}
}

drawTwo();

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

async function playCards() {
	let $btn = $('button');
	let $cards = $('#cards');

	let { data: deck } = await axios.get(`${cardsURL}/new/shuffle`);
	let deckID = deck.deck_id;

	$btn.show();
	$btn.on('click', async function() {
		let { data } = await axios.get(`${cardsURL}/${deckID}/draw`);
		let card = data.cards[0];
		// console.log(data.remaining);
		let cardIMG = card.image;
		let cardDispAngle = Math.random() * 90 - 45;
		let cardDispX = Math.random() * 80 - 40;
		let cardDispY = Math.random() * 80 - 40;
		$cards.append(
			`<img src=${cardIMG} style="transform: translate(${cardDispX}px, ${cardDispY}px) rotate(${cardDispAngle}deg)">`
		);
		if (data.remaining === 0) {
			$btn.remove();
		}
	});
}
playCards();
