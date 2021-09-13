const router = require('express').Router()
const RestoController = require('../controllers/restoController')
const checkLogin = require('../middlewares/isLogin')
const { uploadRestoImage } = require('../middlewares/upload')


router.get('/', RestoController.getRestoList)
router.get('/add', checkLogin, RestoController.getAddResto)
router.post('/add', uploadRestoImage.single("file"), RestoController.postAddResto)
router.get('/edit/:idresto', checkLogin, RestoController.getEditResto)
router.post('/edit/:idresto',uploadRestoImage.single("file"), RestoController.postEditResto)
router.get('/delete/:idresto', checkLogin, RestoController.deleteResto)


module.exports = router