const Meal = require('../../model/Meal')

const findByUser = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      throw new Error(`The current user is invalid.`)
    }

    const meals = await Meal.find({userId: req.user.id})

    res.json(meals)
  } catch (error) {
    next(error)
  }
}

module.exports = {findByUser}