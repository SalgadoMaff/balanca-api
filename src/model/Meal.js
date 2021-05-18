const mongoose = require('mongoose')

const mealSchema = mongoose.Schema({
  plate: {
    type: [{
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Meal', mealSchema)