const router = require('express').Router()
const TableController = require('../controllers/tableController')


router.get('/:idresto/listtable', TableController.listTable)
router.get('/:idresto/addtable', TableController.addTable)
router.get('/:idresto/deletetable/:idseat', TableController.deletaTable)
router.get('/:idresto/changeStatus/:idseat', TableController.changeStatus)


module.exports = router