const router = require('express').Router()
const UserController = require('../controllers/userController')
const checkLogin = require('../middlewares/isLogin')


router.get('/login', UserController.showLoginPage)
router.post('/login', UserController.postLogin)
router.get('/register', checkLogin, UserController.showRegisterPage)
router.post('/register', UserController.postRegister)
router.get('/logout', UserController.logout)


module.exports = router