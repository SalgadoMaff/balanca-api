const Nutrient = require('../../model/Nutrient')
const NutrientType = require('../../model/constants/NutrientType')

const create = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new Error(`The parameter 'name' is invalid.`)
    }
    if (!req.body.type) {
      throw new Error(`The parameter 'type' is invalid.`)
    }
    const nutrientValuesList = Object.values(NutrientType)
    if (!nutrientValuesList.includes(req.body.type)) {
      throw new Error(`The parameter 'type' is invalid, possible values are ${nutrientValuesList}.`)
    }

    await Nutrient.create({
      name: req.body.name,
      type: req.body.type
    })

    return res.status(201).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {create}