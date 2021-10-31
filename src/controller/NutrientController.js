const router = require('express').Router()

const FindNutrientService = require('../service/nutrient/FindNutrientService')
const CreateNutrientService = require('../service/nutrient/CreateNutrientService')

router.get('/', FindNutrientService.findAll)
router.post('/', CreateNutrientService.create)

module.exports = app => app.use('/nutrients', router);