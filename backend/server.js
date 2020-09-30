const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
require('dotenv/config');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../client/build/webpack.base.conf');
const compiler = webpack(config);
// ROUTES
const globalConfigs = require('./routes/globalConfigs');
const mainRoute = require('./routes/index');
const postsRoute = require('./routes/posts');
const customers = require('./routes/customer');

const app = express();

app.use(
	webpackDevMiddleware(compiler, {
		publicPath: config.output.publicPath,
	})
);
app.use(webpackHotMiddleware(compiler));
// app.use(webpackHotMiddleware(compiler));
// Body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

// Middlewares
// app.use(cors());

// connet db
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Routes USE
app.use('/api/configs', globalConfigs);
app.use('/api/posts', postsRoute);
app.use('/api/customers', customers);
app.use('/api/', mainRoute);

// app.get('*', (req, res, next) => {
// 	compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
// 		if (err) {
// 			return next(err);
// 		}
// 		res.set('content-type', 'text/html');
// 		res.send(result);
// 		res.end();
// 	});
// });

const PORT = 8081;

app.listen(PORT, () => {
	console.log('server has been started');
});
