const router = require('express').Router()

const UserService = require('../service/UserService')

router.get('/', UserService.findAll)
router.post('/', UserService.create)
router.post('/login', UserService.login)
router.post('/:userId/meals', UserService.createMeal)
router.get('/:userId/meals', UserService.findMealByUser)

module.exports = app => app.use('/users', router)