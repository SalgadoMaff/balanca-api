const router = require('express').Router()

const FoodService = require('../service/FoodService')

router.get('/', FoodService.findAll) // admin
router.get('/:foodId', FoodService.findById)
router.post('/', FoodService.create) // admin
router.put('/:foodId', FoodService.update) // admin

module.exports = app => app.use('/foods', router);