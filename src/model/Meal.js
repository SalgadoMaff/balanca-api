const mongoose = require('mongoose')
const MeasurementUnit = require("./constants/MeasurementUnit");

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

const Food = {
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  quantity: {
    type: Measurement,
    required: true
  }
}

const schema = mongoose.Schema({
  foods: {
    type: [Food],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = Measurement
module.exports = Food
module.exports = mongoose.model('Meal', schema)