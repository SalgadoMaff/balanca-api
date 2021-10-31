const Nutrient = require('../../model/Nutrient')

const findAll = async (req, res, next) => {
  try {
    const foods = await Nutrient.find()

    return res.status(200).json(foods)
  } catch(error) {
    next(error)
  }
}

module.exports = { findAll }