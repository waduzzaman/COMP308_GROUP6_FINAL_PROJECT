// Load required dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
var UserSchema = new Schema({
	email: {
		type: String,
		required: [true, "Add email"],
		unique: [true, "Email already taken"],
	  },
	  password: {
		type: String,
		required: [true, "Add password"],
	  },
	  firstName: {
		type: String,
		required: [true, "Add first name"],
	  },
	  lastName: {
		type: String,
		required: [true, "Add last name"],
	  },
	  phoneNumber: {
		type: String,
		required: [true, "Add phone number"],
	  },
	  userCategory: {
		type: String,
		enum : ['nurse','patient']
	  }
});

// Convert to json 
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
})
.set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

//Export module
module.exports = mongoose.model('User', UserSchema);

