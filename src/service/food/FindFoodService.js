const Food = require('../../model/Food')

const findAll = async (req, res, next) => {
  try {
    const {name} = req.query
    const query = {}

    if (name) {
      query.name = {
        $regex: new RegExp(`.*${name}.*`, 'i')
      }
    }

    const foods = await Food.find(query).populate('nutritionFacts.nutrient')

    return res.status(200).json(foods)
  } catch (error) {
    next(error)
  }
}

module.exports = {findAll}