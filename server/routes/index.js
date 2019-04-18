import Users from '../controllers/user';
import Tasks from '../controllers/task';
import Categories from '../controllers/admin/category';
import Products from '../controllers/admin/product';
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

    // Category handler routes 
    // app.post('/api/admin/create-category', cors(corsConfig), Categories.create);
    // app.post('/api/admin/all-categories', cors(corsConfig), Categories.allCategories);
    // app.post('/api/admin/show-category', cors(corsConfig), Categories.allCategories);
    // app.post('/api/admin/update-category', cors(corsConfig), Categories.update);
    // app.post('/api/admin/delete-category', cors(corsConfig), Categories.delete);

    // Product handler routes 

    // app.post('/api/admin/create-product', cors(corsConfig), Products.create);
    // app.post('/api/admin/all-products', cors(corsConfig), Products.allProducts);
    // app.post('/api/admin/update-product', cors(corsConfig), Products.update);
    // app.post('/api/admin/delete-product', cors(corsConfig), Products.delete);


}