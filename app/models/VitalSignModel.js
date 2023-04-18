// Load required dependency
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Vital sign schema
const VitalSignSchema = new Schema({
  bodyTemperature: {
    type: String,
    required: [true, "Add body Temperature"],
  },
  heartRate: {
    type: String
  },
  bloodPressure: {
    type: String
  },
  respiratoryRate: {
    type: String
  },
  weight: {
    type: String
  },
  patient:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  },
  {
    timestamps: true,
  }
);

// Export module
module.exports = mongoose.model('VitalSign', VitalSignSchema);
