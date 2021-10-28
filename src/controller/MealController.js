const router = require('express').Router()

const CreateMealService = require('../service/meal/CreateMealService')
const FindMealService = require('../service/meal/FindMealService')

router.post('/', CreateMealService.create)
router.get('/', FindMealService.findByUser)

module.exports = app => app.use('/meals', router)