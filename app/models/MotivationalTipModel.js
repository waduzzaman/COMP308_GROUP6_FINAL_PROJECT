const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MotivationalTipSchema = new Schema({
  message: {
    type: String,
    required: [true, "Please add any motivational message"],
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('MotivationalTip', MotivationalTipSchema);
