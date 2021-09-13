const { Restaurant } = require('../models')


function getRestoName(id){
    Restaurant.findByPk(+id)
    .then(data => {
        console.log(data.name, 'ok');
        return (data.name)
    })
    .catch(err =>{
        return 'not found'
    })
}


module.exports = getRestoName