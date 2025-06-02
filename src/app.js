import express from 'express';
import { envs } from './config/envs.js';
import { usersController } from './controllers/user.Controller.js';
import { productController } from './controllers/prodc.Controller.js';
import { movController } from './controllers/mov.Controller.js';
import { cateController } from './controllers/cate.Controller.js';

const app = express();

app.set('port', envs.PORT);

app.get('/users', usersController.getUsers)
app.get('/product', productController.getProduct)
app.get('/mov', movController.getMov)
app.get('/categoria', cateController.getCate)

export default app;