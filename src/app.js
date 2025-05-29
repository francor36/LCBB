import express from 'express';
import { envs } from './config/envs.js';
import { usersController } from './controllers/user.Controller.js';

const app = express();

app.set('port', envs.PORT);

app.get('/users', usersController.getUsers)

export default app;