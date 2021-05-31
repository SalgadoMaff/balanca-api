const router = require('express').Router()

const UserService = require('../service/UserService')

router.get('/', UserService.findAll) // admin
router.get('/session', UserService.findBySession)
router.post('/', UserService.create) // admin
router.post('/login', UserService.login)
router.post('/:userId/meals', UserService.createMeal)
router.get('/:userId/meals', UserService.findMealByUser)

module.exports = app => app.use('/users', router)