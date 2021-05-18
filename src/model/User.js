const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    required: true
  },
  meals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Meal',
    default: []
  }
})

module.exports = mongoose.model('User', userSchema)