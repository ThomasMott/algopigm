//declare assets and frequency
const asset = { 
	0 : { "signed" : 2, "unsigned" : 8 },	
	1 : { "plain" : 2, "stripy" : 1, "spotty": 2, "cool" : 2, "lovely": 2, "secure": 1 },
	2 : { "pig" : 3, "reverse_pig": 2, "pregnant_pig": 1, "mutant_pig": 2, "dead_pig": 1, "big_pig": 1},
	3 : { "invisible" : 1, "tasty" : 1, "piggy": 2, "top" : 4, "party" : 2 },
	4 : { "rumbly_tum" : 1, "burger" : 1, "donut": 3, "banana" : 2, "cupcake" : 2, "cocktail" : 1 },
	5 : { "void" : 1, "rain" : 2, "moonlight": 2, "snow" : 1, "hail": 1, "asteroid_belt" : 2, "sunlight" : 1},
}

//choose attributes
function Att(i) 
{

	let AttOpts = [];

	for (const x in  asset[i]) {
		let aa = asset[i];

		for (let j = 0; j <= aa[x]; j++) {
			AttOpts.push(x);
		}
	}

	AttAOpt = AttOpts[Math.floor(Math.random() * AttOpts.length)];
	return AttAOpt;
};

//generate NFT
function genNFT(n) 
{
	let NFTObj = {};
	
	for(i=1; i <= n; i++) {
		let a = Att(0);
		let b = Att(1);
		let c = Att(2);
		let d = Att(3);
		let e = Att(4);
		let f = Att(5);

		NFTObj[i] = [a, b, c, d, e, f];
	}
	if (checkNFT(NFTObj)) {
		printNFT(NFTObj);
	} else {
		console.log("duplicates! Run again");
	}
};

//check for duplicates in the generated NFTs
function checkNFT(obj) 
{
	let dupCount = 0;

	for (const i in obj) {
		let curNFT = obj[i].toString();
		for (const j in obj) {
			if (i != j){
				let cckNFT = obj[j].toString();
				if (curNFT == cckNFT) {
					dupCount++;
				}
			}
		}
	}
	if (dupCount > 0) {
		return false;
	} else {
		return true;
	}
};

//ciphers the array into a string
function cypher(obj) 
{
	const alphabet = [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ];
	const encrypted = obj.toString().replace(/,/g, '-').split('').map(char => encrypt(char)).join('');

	function encrypt(char) {
		const shift = 3;
		if (alphabet.includes(char.toUpperCase())) { 
			const position = alphabet.indexOf(char.toUpperCase());
			const newPosition = (position + shift)%26;
			return alphabet[newPosition];
		}
		else { 
			return char;
		}
	}
	return encrypted;
};

//calculate chance of NFT
function rarity(obj) 
{
	let chance = 1;
	for (let i = 0; i < obj.length; i++) {
		let cat = obj[i];
		const hip = asset[i];

		chance *= (hip[cat]);
	}
	let chanceTotal = Math.floor(1000000 / chance);
	return chanceTotal;
};

//render NFT on screen, made async because screenshots were too slow
async function printNFT(obj) 
{
	for (const i in obj) {
		if(Array.isArray(obj[i])) {
			let arr = obj[i];
			// let dob = Date.now();
			let rare = rarity(arr);
			let no = i;

			// document.getElementById('a1').innerHTML = obj[i][0].toString();
			document.getElementById('a2').innerHTML = obj[i][1].toString().replace(/[^a-zA-Z ]/g, " ");
			document.getElementById('a3').innerHTML = obj[i][2].toString().replace(/[^a-zA-Z ]/g, " ");
			document.getElementById('a4').innerHTML = obj[i][3].toString().replace(/[^a-zA-Z ]/g, " ");
			document.getElementById('a5').innerHTML = obj[i][4].toString().replace(/[^a-zA-Z ]/g, " ");
			document.getElementById('a6').innerHTML = obj[i][5].toString().replace(/[^a-zA-Z ]/g, " ");

			// document.getElementById('do').innerHTML = dob.toString();
			document.getElementById('ra').innerHTML = rare.toString();

			for (let j of document.querySelectorAll('.svg')) {j.style.display = 'none'};
			for (let i = 0; i <= arr.length; i++) {
				if (document.getElementById(arr[i]))
					document.getElementById(arr[i]).style.display = 'block';
			}
		}
	}
};

