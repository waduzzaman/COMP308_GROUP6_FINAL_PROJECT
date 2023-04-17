const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VitalSignSchema = new Schema({
  bodyTemperature: {
    type: String,
    required: [true, "Please add bodyTemperature"],
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

module.exports = mongoose.model('VitalSign', VitalSignSchema);
