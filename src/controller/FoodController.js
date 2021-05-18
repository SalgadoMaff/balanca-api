const router = require('express').Router()

const FoodService = require('../service/FoodService')

router.get('/', FoodService.findAll)
router.get('/:foodId', FoodService.findById)
router.post('/', FoodService.create)
router.delete('/:foodId', FoodService.remove)

module.exports = app => app.use('/foods', router);