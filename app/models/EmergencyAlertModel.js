// Energency Alert model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Energency Alert schema
const EmergencyAlertSchema = new Schema({
  alertMessage: {
    type: String,
    required: [true, "Add body Temperature"],
  },
  patient:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Export module
module.exports = mongoose.model('EmergencyAlert', EmergencyAlertSchema);

