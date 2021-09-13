const { Menu, Restaurant } = require('../models')
const getImage = require('../helper/getImage');
const currency = require('../helper/currency');

class MenuControler {
    static getMenuList(req, res) {
        let nameResto = null
        Restaurant.findByPk(req.params.idresto)
            .then(data => {
                nameResto = data.name
                return Menu.findAll({
                    where: {
                        RestoranId: req.params.idresto
                    },
                    include: Restaurant
                })
            })
            .then(data => {
                let resto = {
                    id: req.params.idresto,
                    name: nameResto
                }
                res.render('menu', { data, resto, session: req.session, getImage, currency })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getAddMenu(req, res) {
        let error = []
        if(req.query.error){
            error = req.query.error.split(',')
        }
        res.render('addMenu', { idResto: req.params.idresto, session: req.session, err:error })
    }

    static postAddMenu(req, res) {
        let imagePath = null
        if (req.file !== undefined) {
            imagePath = req.file.path
        }
        Menu.create({
            name: req.body.name,
            detail: req.body.detail,
            price: req.body.price,
            quantity: req.body.quantity,
            available: req.body.available,
            image_path: imagePath,
            RestoranId: req.params.idresto
        })
            .then(_ => {
                res.redirect(`/resto/${req.params.idresto}/menu`)
            })
            .catch(err => {

                let errors = err.errors.map(el => {
                    return el.message
                })
                res.redirect(`/resto/${req.params.idresto}/menu/add?error=${errors}`)
            });
    }

    static getEditMenu(req, res) {
        let error = []
        if(req.query.error){
            error = req.query.error.split(',')
        }
        Menu.findByPk(req.params.idmenu)
            .then(data => {
                res.render('editMenu', { data, idResto: req.params.idresto, session: req.session, getImage, err:error })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEditMenu(req, res) {
        let path = req.body.image_path
        if (req.file !== undefined) {
            path = req.file.path
        }
        Menu.update({
            name: req.body.name,
            detail: req.body.detail,
            price: req.body.price,
            quantity: req.body.quantity,
            available: req.body.available,
            image_path: path
        }, {
            where: {
                id: req.params.idmenu
            }
        })
            .then(_ => {
                res.redirect(`/resto/${req.params.idresto}/menu`)
            })
            .catch(err => {

                let errors = err.errors.map(el => {
                    return el.message
                })
                res.redirect(`/resto/${req.params.idresto}/menu/edit/${req.params.idmenu}?error=${errors}`)
            });
    }

    static deleteMenu(req, res) {
        Menu.destroy({
            where: {
                id: req.params.idmenu
            }
        })
            .then(_ => {
                res.redirect(`/resto/${req.params.idresto}/menu`)
            })
            .catch(err => {
                res.send(err)
            });
    }
}

module.exports = MenuControler