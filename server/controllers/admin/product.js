import model from '../../models';
import getToken from '../../config/tokenChecker';
import passport from 'passport';
require('../../config/passport')(passport);

const { Product } = model

class Products {
    static create(req, res) {
        const { name, price, quantity, categoryID } = req.body
        let token = getToken(req.headers);
        if (token) {
            return Product
                .create({
                    name,
                    price,
                    quantity,
                    categoryID
                })
                .then((product) => {
                    return res.status(201).send({
                        success: true,
                        product: product,
                        message: 'Product added succesfully'
                    })
                })
                .catch((error) => res.status(400).send(error));
        } else {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized'
            })
        }

    }
    static update(req, res) {
        let token = getToken(req.headers);
        if (token) {
            return Product
                .findOne({
                    where: {
                        id: req.body.id
                    }
                })
                .then((product) => {
                    console.log(product, '========= For Update Product =======');
                    product.update({
                        name: req.body.name,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        categoryID: req.body.categoryID
                    })
                        .then((response) => {
                            return res.status(201).send({
                                success: true,
                                response: response,
                                message: 'Produc updated succesfully'
                            })
                                .catch((error) => res.status(400).send(error));
                        })
                })
                .catch((error) => res.status(400).send(error));

        } else {
            return res.status(403).send({
                success: false,
                message: "Unauthorized"
            });
        }
    }

    static delete(req, res) {
        let token = getToken(req.headers)

        if (token) {
            return Product
                .destroy({
                    where: {
                        id: req.body.id
                    }
                })
                .then((response) => {
                    return res.status(201).send({
                        success: true,
                        response: response,
                        message: 'All tasks here'
                    })
                })
                .catch((error) => res.status(400).send(error));
        } else {
            return res.status(403).send({
                success: false,
                message: "Unauthorized"
            })
        }
    }
}