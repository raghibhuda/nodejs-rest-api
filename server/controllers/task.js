import model from '../models';
import passport from 'passport';
import jwt from 'jsonwebtoken';
require('../config/passport')(passport);

const { Task } = model;
const getToken = (headers) => {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

class Tasks {
    static create(req, res) {
        const { name } = req.body;
        let token = getToken(req.headers);
        if (token) {
            const getCurrentUser = jwt.decode(token);
            let userId = getCurrentUser.id;
            return Task
                .create({
                    name,
                    userId
                })
                .then((task) => {
                    return res.status(201).send({
                        success: true,
                        task: task,
                        message: 'Task created successfully ',
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

    static allTask(req, res) {
        let token = getToken(req.headers);
        if (token) {
            const getCurrentUser = jwt.decode(token);
            let userId = getCurrentUser.id;
            return Task
                .findAll({
                    where: {
                        userId: userId,
                    }
                })
                .then((tasks) => {
                    return res.status(201).send({
                        success: true,
                        tasks: tasks,
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
        // const { taskID, name } = req.body
        if (token) {
            return Task
                .findOne({
                    where: {
                        id: req.body.id
                    }
                })
                .then((task) => {
                    console.log(task, "==============");
                    task.update({
                        name: req.body.name
                    })
                        .then((task) => {
                            return res.status(201).send({
                                success: true,
                                task: task,
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
            return Task
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

export default Tasks;