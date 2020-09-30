const { Schema, model } = require('mongoose');

const PostSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		require: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = model('Posts', PostSchema);
