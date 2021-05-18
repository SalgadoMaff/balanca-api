const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const findAll = async (req, res, next) => {
  try {
    const users = await User.find()

    return res.status(200).json(users)
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    next(error)
  }
}

module.exports = { findAll, create, login }