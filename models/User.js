const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		require: [true, "It is required"]
	},
	username: { 
		type: String,
		require: [true, "It is required"]
	},
	password: {
		type: String,
		require: [true, "It is required"]
	}

});

module.exports = mongoose.model("User", userSchema)