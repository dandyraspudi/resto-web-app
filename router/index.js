const router = require('express').Router()
const Controller = require('../controllers/controller')
const userRoute = require('./user')
const restoranRoute = require('./restoran')
const menuRoute = require('./menu')
const orderRoute = require('./order')
const tableRoute = require('./table')


router.get('/', Controller.getHome)
router.post('/searchorder', Controller.search)
router.use('/user', userRoute)
router.use('/resto', restoranRoute)
router.use('/resto', menuRoute)
router.use('/resto', tableRoute)
router.use('/resto', orderRoute)


module.exports = router