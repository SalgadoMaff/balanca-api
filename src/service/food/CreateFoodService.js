const Nutrient = require('../../model/Nutrient')
const Food = require('../../model/Food')
const MeasurementUnit = require('../../model/constants/MeasurementUnit')

const create = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new Error(`The parameter 'name' is invalid.`)
    }
    if (!req.body.servingSize || !req.body.servingSize.hasOwnProperty('unit')
      || !req.body.servingSize.hasOwnProperty('value')) {
      throw new Error(`The parameter 'servingSize' is invalid.`)
    }
    const measurementUnitList = Object.values(MeasurementUnit)
    if (!measurementUnitList.includes(req.body.servingSize.unit)) {
      throw new Error(`The parameter 'servingSize' is invalid, possible values to 'unit' are ${measurementUnitList}.`)
    }
    if (!req.body.calories) {
      throw new Error(`The parameter 'calories' is invalid.`)
    }
    if (!req.body.nutritionFacts || !Array.isArray(req.body.nutritionFacts) || req.body.nutritionFacts.length < 1) {
      throw new Error(`The parameter 'nutritionFacts' is invalid.`)
    }
    if (req.body.nutritionFacts.filter(nf => !nf.hasOwnProperty('nutrient') || !nf.hasOwnProperty('amount')).length > 0) {
      throw new Error(`Some item in the parameter 'nutritionFacts' is invalid, should have 'nutrient' and 'amount' properties.`)
    }
    if (req.body.nutritionFacts.filter(nf => !nf.amount.hasOwnProperty('value')).length > 0) {
      throw new Error(`Some item in the parameter 'nutritionFacts' has 'amount' property invalid.`)
    }
    if (req.body.nutritionFacts.filter(nf => !nf.amount.hasOwnProperty('unit') || !measurementUnitList.includes(nf.amount.unit)).length > 0) {
      throw new Error(`Some item in the parameter 'nutritionFacts' has the 'unit' property invalid.`)
    }

    const food = await Food.findOne({name: req.body.name})
    if (food) {
      throw new Error(`The food with name '${req.body.name}' already exists.`)
    }

    req.body.nutritionFacts.map(async nutritionFact => {
      const nutrient = await Nutrient.findById(nutritionFact.nutrient)

      if (!nutrient) {
        throw new Error(`The nutrient with id '${nutritionFact.nutrient}' was not found.`)
      }
    })

    await Food.create({
      name: req.body.name,
      servingSize: req.body.servingSize,
      calories: req.body.calories,
      nutritionFacts: req.body.nutritionFacts
    })

    return res.status(201).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {create}