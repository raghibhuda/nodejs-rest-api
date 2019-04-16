import Users from '../controllers/user';
import Tasks from '../controllers/task';
import cors from 'cors';
import passport from 'passport';

require('../config/passport')(passport);

export default (app) => {

    let corsOptions = {
        // Your front-end app domain, can be more than one
        origin: 'http://localhost:3001',
        optionsSuccessStatus: 200
    };



    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the REST API Boilerplate!',
    }));

    // -------------------------- User Authentication Routes -------------------------------

    app.post('/api/sign-up', cors(corsOptions), Users.signUp);
    app.post('/api/sign-in', cors(corsOptions), Users.signIn);
    app.post('/api/create-task', cors(corsOptions), Tasks.create);
    app.post('/api/all-task', cors(corsOptions), Tasks.allTask);
    app.post('/api/update-task', cors(corsOptions), Tasks.update);
    app.post('/api/delete-task', cors(corsOptions), Tasks.delete);
    
}