const mongoose = require('mongoose')
const MeasurementUnit = require('./constants/MeasurementUnit')

const Measurement = {
  unit: {
    type: String,
    required: true,
    enum: Object.values(MeasurementUnit)
  },
  value: {
    type: Number,
    required: true
  }
}

const NutritionFact = {
  nutrient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nutrient',
    required: true
  },
  amount: {
    type: Measurement,
    required: true
  }
}

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  servingSize: {
    type: Measurement,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  nutritionFacts: {
    type: [NutritionFact],
    required: true
  }
})

module.exports = Measurement
module.exports = NutritionFact
module.exports = mongoose.model('Food', schema)