function checkLogin(req, res, next){
    if(req.session.isLogin === undefined){
        res.redirect('/user/login')
    } else {
        next()
    }
}

module.exports = checkLogin