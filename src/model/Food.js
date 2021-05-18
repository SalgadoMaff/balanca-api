const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  calPerGram: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Food', foodSchema)