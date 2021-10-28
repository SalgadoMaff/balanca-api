const User = require('../../model/User')
const Food = require('../../model/Food')
const Meal = require('../../model/Meal')

const create = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      throw new Error(`The current user is invalid.`)
    }
    if (req.body.length === undefined || req.body.length < 1) {
      throw new Error(`The parameter 'meals' is invalid.`)
    }

    let user = await User.findById(req.user.id)
    if (!user) {
      throw new Error(`The user with id '${req.user.id}' was not found.`)
    }

    for (const meal of req.body) {
      const food = await Food.findById(meal.foodId)

      if (!food) {
        throw new Error(`The food with id '${meal.foodId}' was not found.`)
      }
    }

    await Meal.create({
      foods: req.body,
      userId: req.user.id
    })

    res.status(201).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {create}