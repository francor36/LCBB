import express from 'express';
import { envs } from './config/envs.js';

const app = express();

app.set('port', envs.PORT);

export default app;