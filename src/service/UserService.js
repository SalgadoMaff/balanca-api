const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/User')
const Food = require('../model/Food')
const Meal = require('../model/Meal')

const findAll = async (req, res, next) => {
  try {
    const users = await User.find()

    return res.status(200).json(users)
  } catch(error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new Error(`The parameter 'name' is invalid.`)
    }
    if (!req.body.username) {
      throw new Error(`The parameter 'username' is invalid.`)
    }
    if (!req.body.password) {
      throw new Error(`The parameter 'password' is invalid.`)
    }
    if (!req.body.role || req.body.role != 'ADMIN' && req.body.role != 'USER') {
      throw new Error(`The parameter 'role' is invalid. The possible values are ADMIN and USER.`)
    }

    const userExists = await User.findOne({ username: req.body.username })
    if (userExists) {
      throw new Error(`The user with username '${req.body.username}' already exists.`)
    }

    const passwordEncrypted = await bcrypt.hash(req.body.password, 11)

    await User.create({
      name: req.body.name,
      username: req.body.username,
      password: passwordEncrypted,
      role: req.body.role
    })
    return res.status(201).send()
  } catch(error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    if (!req.body.username) {
      throw new Error(`The parameter 'username' is required.`)
    }
    if (!req.body.password) {
      throw new Error(`The parameter 'password' is required.`)
    }
    
    const user = await User.findOne({username: req.body.username}).select('+password')
    if (!user) {
      return res.status(404).json({message: 'Invalid user.'})
    }
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
      return res.status(404).json({message: 'Invalid password.'})
    }

    const tokenData = {
      username: user.username,
      role: user.role
    }
    const token = jwt.sign(tokenData, process.env.AUTH_SECRET, {expiresIn: '1d'})
    res.json({accessToken: token})
  } catch(error) {
    next(error)
  }
}

const createMeal = async (req, res, next) => {
  try {
    if (!req.params.userId) {
      throw new Error(`The parameter 'userId' is invalid.`)
    }
    if (req.body.length === undefined || req.body.length < 1) {
      throw new Error(`The parameter 'meals' is invalid.`)
    }

    let user = await User.findById(req.params.userId)
    if (!user) {
      throw new Error(`The user with id '${req.params.userId}' was not found.`)
    }

    for (const meal of req.body) {
      const food = await Food.findById(meal.foodId)
      if (!food) {
        throw new Error(`The food with id '${meal.foodId}' was not found.`)
      }
    }

    const meal = await Meal.create({ plate: req.body })
    await User.updateOne({ _id: req.params.userId }, { $push: { meals: meal._id } }, { new: true })
    res.status(201).send()
  } catch(error) {
    next(error)
  }
}

module.exports = { findAll, create, login, createMeal }