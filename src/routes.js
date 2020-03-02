import { Router } from 'express';
import sessionController from './app/controllers/SessionController';
import recipientsController from './app/controllers/RecipientsController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', sessionController.store);

routes.use(auth);
routes.post('/recipients', recipientsController.store);

export default routes;
