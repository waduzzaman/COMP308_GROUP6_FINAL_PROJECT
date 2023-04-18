// Motivational tip modle
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Motivational tip schema
const MotivationalTipSchema = new Schema({
  message: {
    type: String,
    required: [true, "Add motivational message"],
  }
  },
  {
    timestamps: true,
  });

//Export module
module.exports = mongoose.model('MotivationalTip', MotivationalTipSchema);
