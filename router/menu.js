const router = require('express').Router()
const MenuController = require('../controllers/menuController')
const checkLogin = require('../middlewares/isLogin')
const { uploadRestoImage } = require('../middlewares/upload')


router.get('/:idresto/menu', MenuController.getMenuList)
router.get('/:idresto/menu/add', checkLogin, MenuController.getAddMenu)
router.post('/:idresto/menu/add', uploadRestoImage.single("file"), MenuController.postAddMenu)
router.get('/:idresto/menu/edit/:idmenu', checkLogin, MenuController.getEditMenu)
router.post('/:idresto/menu/edit/:idmenu', uploadRestoImage.single("file"), MenuController.postEditMenu)
router.get('/:idresto/menu/delete/:idmenu', MenuController.deleteMenu)


module.exports = router