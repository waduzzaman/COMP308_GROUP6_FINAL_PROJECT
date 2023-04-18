var config = require('./config'),
    mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports = function () {
    // Connection to MongoDB
    const db = mongoose.connect(config.db, 
    {
      useUnifiedTopology: true,
      useNewUrlParser: true, useCreateIndex: true 
		})
    .then(() => console.log('DB Connected!')) // When connection instablised
		.catch(err => { console.log('Error'); // Error when got some problem
		});

    require('../app/models/UserModel');
    require('../app/models/VitalSignModel');
    require('../app/models/EmergencyAlertModel');
    require('../app/models/MotivationalTipModel');
    return db;
};