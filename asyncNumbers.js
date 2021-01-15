let baseURL = 'http://numbersapi.com';

let favNum = 15;
const luckyNums = [ 52, 21, 16 ];
// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

async function numFact() {
	let response = await axios.get(`${baseURL}/${favNum}?json`);
	console.log(response.data.text);
}
numFact();

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

async function multipleNums() {
	let response = await axios.get(`${baseURL}/${luckyNums}?json`);
	$('body').append('<p>Part 2.</p>');
	for (let num in response.data) {
		$('body').append(`<p>${response.data[num]}</p>`);
	}
	$('body').append('<hr>');
}
multipleNums();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

let numPromises = [];
for (let i = 0; i < 4; i++) {
	numPromises.push(axios.get(`${baseURL}/${favNum}?json`));
}

async function multipleFacts() {
	let facts = await Promise.all(numPromises);
	$('body').append('<p>Part 3.</p>');
	console.log(facts);
	for (let fact of facts) {
		$('body').append(`<p>${fact.data.text}</p>`);
	}
}

multipleFacts();
