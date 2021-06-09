const Food = require('../model/Food')

const findAll = async (req, res, next) => {
  try {
    const foods = await Food.find()

    return res.status(200).json(foods)
  } catch(error) {
    next(error)
  }
}

const findById = async (req, res, next) => {
  try {
    if (!req.params.foodId) {
      throw new Error(`The parameter 'foodId' is invalid.`)
    }

    const food = await Food.findById(req.params.foodId)
    if (!food) {
      throw new Error(`The food with id '${req.params.foodId}' was not found.`)
    }

    res.json(food)
  } catch(error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new Error(`The parameter 'name' is invalid.`)
    }
    if (!req.body.calPerGram) {
      throw new Error(`The parameter 'calPerGram' is invalid.`)
    }

    await Food.create({
      name: req.body.name,
      calPerGram: req.body.calPerGram
    })
    return res.status(201).send()
  } catch(error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    if(!req.params.foodId) {
      throw new Error(`The parameter 'foodId' is required.`)
    }
    if (!req.body.name) {
      throw new Error(`The parameter 'name' is invalid.`)
    }
    if (!req.body.calPerGram) {
      throw new Error(`The parameter 'calPerGram' is invalid.`)
    }

    const food = await Food.findById(req.params.foodId)
    if(!food) {
      throw new Error(`The food with id '${req.params.foodId}' was not found.`)
    }

    await Food.findByIdAndUpdate(req.params.foodId, req.body)
    res.status(200).send()
  } catch(error) {
    next(error)
  }
}

module.exports = { findAll, findById, create, update }