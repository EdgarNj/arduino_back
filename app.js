import express from 'express';
import path from 'path';
import HttpError from 'http-errors';
import morgan from 'morgan';
import indexRouter from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import EngineController from './controllers/application/engine/Engine.js';
import LightController from './controllers/application/light/Light.js';
const { NODE_HOST, NODE_PORT } = process.env;

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve('public')));
setInterval(() => {
    EngineController.updateEngineWarmUpTime();
    LightController.updateLightDuration();

}, 1000);
app.use(indexRouter);

app.use((req, res, next) => {
    next(HttpError(404));
});

app.use(errorHandler);

app.listen(NODE_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`server started ...  :${NODE_PORT}`);
});
