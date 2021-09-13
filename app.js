const express = require('express')
const app = express()
const port = 4000
const router = require('./router/index')
const session = require('express-session')


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))

app.use(router)


app.listen(port, () => {
    console.log('app listening on port', port)
})