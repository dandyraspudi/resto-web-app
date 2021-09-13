const { checkPassword } = require('../helper/bcrypt')
const { Restaurant, User } = require('../models')

class UserController {
    static showLoginPage(req,res){
        let error = null
        if(req.query.err){
            error = req.query.err
        }
        res.render('users/login', {session:req.session, err:error})
    }

    static postLogin(req,res){
        User.findOne({
            where: {
                name:req.body.name
            }
        })
        .then(data => {
            if(data){
                if(checkPassword(req.body.password, data.password)){
                    req.session.isLogin = true
                    req.session.name = data.name
                    req.session.role = data.role
                    req.session.restoranId = data.RestoranId
                    if (data.role === 'SU'){
                        res.redirect(`/resto/`)
                    } else {
                        res.redirect(`/resto/${req.session.restoranId}/menu`)
                    }
                } else {
                    res.redirect(`/user/login?err=password wrong`)
                }
            } else {
                res.redirect(`/user/login?err=User not found`)
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static showRegisterPage(req,res){
        Restaurant.findAll()
        .then(data => {
            res.render('users/register', {data, session:req.session})
        })
        .catch(err => res.send(err))
    }

    static postRegister(req,res){
        let {name, password, role, RestoranId} = req.body
        console.log(name, password, role, RestoranId);
        User.create({
            name: name, 
            password: password, 
            role: role,
            RestoranId: RestoranId
        })
        .then(_ => res.redirect('/user/login'))
        .catch(err => {
            let errors = err.errors.map(el => {
                return el.message
            })
            res.send(errors)
        })
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/resto')
    }
}


module.exports = UserController