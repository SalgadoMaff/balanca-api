const router = require('express').Router()

const FindFoodService = require('../service/food/FindFoodService')
const CreateFoodService = require('../service/food/CreateFoodService')
const UpdateFoodService = require('../service/food/UpdateFoodService')

router.get('/', FindFoodService.findAll)
router.post('/', CreateFoodService.create)
router.put('/:foodId', UpdateFoodService.update)

module.exports = app => app.use('/foods', router);