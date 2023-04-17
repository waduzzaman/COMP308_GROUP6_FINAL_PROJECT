// Load the module dependencies
const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var UserSchema = new Schema({
	email: {
		type: String,
		required: [true, "Please add an email"],
		unique: [true, "Email must be unique"],
	  },
	  password: {
		type: String,
		required: [true, "Please add a password"],
	  },
	  firstName: {
		type: String,
		required: [true, "Please add a first name"],
	  },
	  lastName: {
		type: String,
		required: [true, "Please add a last name"],
	  },
	  phoneNumber: {
		type: String,
		required: [true, "Please add an phone number"],
	  },
	  userCategory: {
		type: String,
		enum : ['nurse','patient']
	  }
});

// Set the 'fullname' virtual property
UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('User', UserSchema);

