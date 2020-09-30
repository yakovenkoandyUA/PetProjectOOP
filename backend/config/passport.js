const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { model } = require('mongoose');
const Customer = model('customers');
const getConfigs = require('../config/getConfigs');
const keys = require('./keys.js');

module.exports = async passport => {
	const opts = {};
	const configs = await getConfigs();
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = keys.secretOrKey;

	passport.use(
		'jwt',
		new JwtStrategy(opts, (jwt_payload, done) => {
			Customer.findById(jwt_payload.id)
				.then(customer => {
					if (customer) {
						return done(null, customer);
					}
					return done(null, false);
				})
				.catch(err => console.log(err));
		})
	);
};
