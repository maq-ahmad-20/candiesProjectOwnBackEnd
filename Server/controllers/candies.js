

const Candies = require('../models/candies');


module.exports.getAllCandies = (req, res, next) => {

    Candies.findAll().then((candies) => {


        return res.json({ alldata: candies })

    }).catch(err => console.log(err))

}

module.exports.getSingelCandy = (req, res, next) => {

    let id = req.params.candyId;
    Candies.findByPk(id).then((candy) => {
        return res.json({ singleCandy: candy })
    })
}




module.exports.postCandies = (req, res, next) => {

    const { name, description, price, quantity } = req.body
    console.log(req.body)

    Candies.create({
        name: name,
        description: description,
        price: price,
        quantity: quantity

    }).then((response) => {
        let data = response['dataValues'];

        return res.json({ InsertedData: { data } })
    })

}


exports.deleteCandy = (req, res, next) => {
    let id = +req.params.candyId
    console.log(req.params)
    Candies.findByPk(id)
        .then((response) => {
            return response.destroy();
        }).then((result) => {


            res.json({ success: true })
        })

}

exports.editCandy = (req, res, next) => {


    const { id, name, description, price, quantity } = req.body
    console.log(req.body)
    Candies.findByPk(id)
        .then((record) => {
            record.update({
                name: name,
                description: description,
                price: price,
                quantity: quantity
            }).then((response) => {
                res.json({ updatedData: response })
            })
        })

} 