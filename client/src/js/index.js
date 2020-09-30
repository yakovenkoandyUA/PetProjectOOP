// Main js file
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#import-js-files
console.log('its work');

const name = (a, b) => a + b;
console.log(name(2, 3));

const req = () => {
	fetch('/api/customers')
		.then(res => res.json())
		.then(data => console.log(data));
};

req();

console.log('works');

const asyncronium = async () => {
	const res = await fetch('/api/posts');
	const data = await res.json();
	console.log(data);
};

asyncronium();
