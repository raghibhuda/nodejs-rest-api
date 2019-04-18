import model from '../../models';
import getToken from '../../config/tokenChecker';
import passport from 'passport';
require('../../config/passport')(passport);

const { Category } = model;
class Categories {
    static create(req, res) {
        const { name } = req.body;
        let token = getToken(req.headers);
        if (token) {
            return Category
                .create({
                    name
                })
                .then((category) => {
                    return res.status(201).send({
                        success: true,
                        category: category,
                        message: 'Catgeroy created successfully ',
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
    
    static allCategories(req, res) {
        let token = getToken(req.headers);
        if (token) {
            return Category
                .findAll()
                .then((categories) => {
                    return res.status(201).send({
                        success: true,
                        categories: categories,
                        message: 'All tasks here'
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

    static update(req, res) {
        let token = getToken(req.headers);
        if (token) {
            return Category
                .findOne({
                    where: {
                        id: req.body.id
                    }
                })
                .then((category) => {
                    console.log(task, "==============");
                    category.update({
                        name: req.body.name
                    })
                        .then((task) => {
                            return res.status(201).send({
                                success: true,
                                category: category,
                                message: 'Task Edited '
                            })
                        })
                        .catch((error) => res.status(400).send(error))
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
        let token = getToken(req.headers);
        if (token) {
            return Category
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
            });
        }
    }
}