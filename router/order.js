const router = require('express').Router()
const OrderController = require('../controllers/orderController')


router.get('/:idresto/listorder', OrderController.listOrder)
router.get('/:idresto/menu/order', OrderController.formOrder)
router.post('/:idresto/menu/order', OrderController.postOrder)
router.get('/:idresto/finished', OrderController.finishOrder)
router.get('/:idresto/delete', OrderController.deleteOrder)


module.exports = router