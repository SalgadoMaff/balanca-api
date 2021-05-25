require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {name, version} = require('../package.json')
const PORT = process.env.PORT || 3333
const DB_URL = process.env.DB_URL

const connectToDatabase = async () => {
  console.log('Connecting to database...')
  await mongoose.connect(
    `${DB_URL}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
  console.log('Connected!')
}

const startServer = async () => {
  console.log('Starting server...')
  const app = express()

  app.use(express.urlencoded({extended: true}))
  app.use(cors())
  app.use(express.json())

  startAuthMiddleware(app)
  registerRoutes(app)
  errorHandlerMiddleware(app)

  app.listen(PORT, () => {
    console.log(`API running at port ${PORT}`)
  })
}

const startAuthMiddleware = app => {
  app.use((req, res, next) => {
    if (!req.url.match(/^\/$/) && !req.url.match(/^\/users\/login/)) {
      let token = req.headers['authorization']

      if (!token) {
        return res.status(401).json({message: 'Token não encontrado'})
      }
      if (!token.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Token com formato invalido'})
      }

      token = token.split(' ')[1]
      try {
        req.user = jwt.verify(token, process.env.AUTH_SECRET)
        return next()
      } catch (error) {
        return res.status(401).json({message: "Token invalido!"})
      }
    }
    next()
  })
}

const registerRoutes = app => {
  app.get('/', (req, res) => {
    res.json({
      application: name,
      version: version
    })
  })
  require('./controller/UserController')(app)
  require('./controller/FoodController')(app)
}

const errorHandlerMiddleware = app => {
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({message: err.message})
  })
}

const init = (async () => {
  await connectToDatabase()
  await startServer()
})()