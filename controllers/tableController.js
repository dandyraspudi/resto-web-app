const { Seat } = require('../models')

class TableController {
    static listTable(req, res){
        if(req.query.no_meja !== undefined){
            Seat.create({
                no_meja:req.query.no_meja,
                RestoranId:req.params.idresto
            })
            .then(_=>{
                res.redirect(`/resto/${req.params.idresto}/listtable`)
            })
            .catch(err => {
                res.send(err)
            })
        } else {
            Seat.findAll({
                where: {
                    RestoranId: req.params.idresto
                }
            })
            .then(data => {
                res.render('seat', {data, session:req.session})
            })
            .catch(err => {
                res.send(err)
            })
        }
    }

    static addTable(req, res){
        console.log('ok');
    }

    static changeStatus(req, res){
        Seat.findByPk(+(req.params.idseat))
        .then(data => {
            let change = true
            if(data.status){
                change = false
            }
            return Seat.update({
                status: change
            },{
                where: {
                    id:req.params.idseat
                }
            })
        })
        .then(_ => {
            res.redirect(`/resto/${req.params.idresto}/listtable`)
        })
        .catch(err => {
            res.send(err)
        })
    }


    static deletaTable(req, res){
        Seat.destroy({
            where:{
                id:req.params.idseat
            }
        })
        .then(_ => {
            res.redirect(`/resto/${req.params.idresto}/listtable`)
        })
        .catch(err => {
            res.send(err)
        })

    }
}

module.exports = TableController