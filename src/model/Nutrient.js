const mongoose = require('mongoose')
const NutrientType = require('./constants/NutrientType')

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(NutrientType)
  }
})

module.exports = mongoose.model('Nutrient', schema)