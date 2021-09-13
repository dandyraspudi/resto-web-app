const { Menu, Seat, Visitor, Receipt} = require('../models')
const { Op } = require('sequelize')

class OrderController {
    static formOrder(req, res){
        if (req.query.orderan === undefined){
            res.send('Pilih menu terlebih dahulu')
        }
        let idMenu = req.query.orderan.split(',')
        let dataMenu = []
        Menu.findAll({
            where:{
                id: {
                    [Op.in]: idMenu
                }
            }
        })
        .then(data => {
            dataMenu = data
            return Seat.findAll({
                where: {
                    RestoranId: req.params.idresto,
                    status: false
                }
            })
        })
        .then(dataMeja => {
            res.render('formOrder', {dataMenu, dataMeja, session:req.session})
        })
        .catch(err => {
            console.log(err);
        })
    }

    static postOrder(req,res){
        let {id_meja, name, listId} = req.body
        listId = listId.split(',')
        listId = listId.map(el => +el)
        let visitor = null
        console.log(req.params);
        Visitor.create({
            name:name
        })
        .then(data => {
            visitor = data
            return Seat.update({
                status: true,
                VisitorId: visitor.id
            },{
                where: {
                    id: id_meja,
                    RestoranId: req.params.idresto
                }
            })
        })
        .then(_ => {
            listId.forEach(el => {
                return Receipt.create({
                    VisitorId: visitor.id,
                    MenuId: el
                })
            })
        })
        .then(_ => [
            res.redirect(`/resto/${req.params.idresto}/listorder?idvisitor=${visitor.id}`)
        ])
        .catch(err => {
            res.send(err)
        })
    }

    static listOrder(req, res){
        if(req.query.idvisitor){
            Visitor.findByPk(req.query.idvisitor, {
                include: Menu
            })
            .then(data => {
                res.render('listOrder', {data, session:req.session})
            })
            .catch(err => {
                res.send(err)
            })
        } else {
            Visitor.findAll({
                include: [Menu,Seat]
            })
            .then(data => {
                data = data.filter(el => {
                    if(el.Menus.length > 0 && el.Menus[0].RestoranId === +req.params.idresto){
                        return el
                    }
                })
                console.log(data);
                res.render('listAllOrder', {data, session:req.session})
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
        }
    }


    static finishOrder(req, res){
        let menuId = req.query.receipt.split(',')[0]
        let visId = req.query.receipt.split(',')[1]
        Receipt.update({
            hasCooked:true
        },{
            where:{
                VisitorId:visId,
                MenuId:menuId
            }
        })
        .then(_ => {
            res.redirect(`/resto/${req.params.idresto}/listorder`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static deleteOrder(req,res){
        let menuId = req.query.receipt.split(',')[0]
        let visId = req.query.receipt.split(',')[1]
        Receipt.destroy({
            where:{
                VisitorId:visId,
                MenuId:menuId
            }
        })
        .then(_ =>{
            res.redirect(`/resto/${req.params.idresto}/listorder`)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = OrderController