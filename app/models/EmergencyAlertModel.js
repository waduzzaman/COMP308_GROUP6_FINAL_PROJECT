const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmergencyAlertSchema = new Schema({
  alertMessage: {
    type: String,
    required: [true, "Please add bodyTempreature"],
  },
  patient:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model('EmergencyAlert', EmergencyAlertSchema);
