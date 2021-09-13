const { Visitor, Menu } = require('../models')

class Controller {
    static getHome(req, res){
        console.log(req.session);
        res.render('home', {session:req.session})
    }

    static search(req, res){
        Visitor.findByPk(+req.body.id, {
            include: Menu
        })
        .then(data => {
            if(data){
                if(data.Menus.length > 0){
                    let idresto = data.Menus[0].RestoranId
                    res.redirect(`resto/${idresto}/listorder?idvisitor=${req.body.id}`)
                } else {
                    res.render('listOrder', {data, session:req.session})
                }
            } else {
                res.render('listOrder', {data:null, session:req.session})
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
}


module.exports = Controller