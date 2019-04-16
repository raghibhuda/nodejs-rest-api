import Users from '../controllers/user';
import Tasks from '../controllers/task';
import cors from 'cors';
import passport from 'passport';
require('../config/passport')(passport);

export default (app) => {

    let corsConfig = {
        origin: 'http://localhost:3001',
        optionsSuccessStatus: 200
    };

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the REST API Boilerplate!',
    }));
    
    app.post('/api/sign-up', cors(corsConfig), Users.signUp);
    app.post('/api/sign-in', cors(corsConfig), Users.signIn);
    
    // Routes for CRUD Operation on task
    app.post('/api/create-task', cors(corsConfig), Tasks.create);
    app.post('/api/all-task', cors(corsConfig), Tasks.allTask);
    app.post('/api/update-task', cors(corsConfig), Tasks.update);
    app.post('/api/delete-task', cors(corsConfig), Tasks.delete);
    
}