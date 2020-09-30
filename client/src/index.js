// JS
import './js/';

// SCSS
import './assets/scss/main.scss';

// CSS (example)
// import './assets/css/main.css'

if (module.hot) {
	module.hot.accept('./js/', function () {
		console.log('Accepting the updated printMe module!');
		printMe();
	});
}
