const { Restaurant, Seat } = require('../models')
const getImage = require('../helper/getImage');
const getTotalSeat = require('../helper/getTotalSeat');

class RestoController {
    static getRestoList(req, res) {
        Restaurant.findAll({
            include: Seat
        })
            .then(data => {
                data.forEach(resto => {
                    resto.jumlah = getTotalSeat(resto.Seats)
                });
                res.render('resto', { data, getImage, session: req.session })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getAddResto(req, res) {
        let error = []
        if(req.query.error){
            error = req.query.error.split(',')
        }
        res.render('addResto', { session: req.session, err: error })
    }

    static postAddResto(req, res) {
        let imagePath = null
        if (req.file !== undefined) {
            imagePath = req.file.path
        }
        Restaurant.create({
            name: req.body.name,
            alamat: req.body.alamat,
            image_path: imagePath
        })
            .then(_ => {
                res.redirect('/resto')
            })
            .catch(err => {
                let errors = err.errors.map(el => {
                    return el.message
                })
                res.redirect(`/resto/add?error=${errors}`)
            });
    }

    static getEditResto(req, res) {
        Restaurant.findByPk(req.params.idresto)
            .then(data => {
                res.render('editresto', { data, getImage, session: req.session })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static postEditResto(req, res) {
        let path = req.body.image_path
        if (req.file !== undefined) {
            path = req.file.path
        }
        Restaurant.update({
            name: req.body.name,
            alamat: req.body.alamat,
            image_path: path
        }, {
            where: {
                id: req.params.idresto
            }
        })
            .then(_ => {
                res.redirect('/resto')
            })
            .catch(err => {

                let errors = err.errors.map(el => {
                    return el.message
                })
                res.send(errors)
            });
    }

    static deleteResto(req, res) {
        Restaurant.destroy({
            where: {
                id: req.params.idresto
            }
        })
            .then(_ => {
                res.redirect('/resto')
            })
            .catch(err => {
                res.send(err)
            });
    }
}

module.exports = RestoController