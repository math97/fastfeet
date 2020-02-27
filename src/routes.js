import { Router } from 'express';
import sessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', sessionController.store);

routes.use(auth);
routes.get('/test', (req, res) => {
  res.json({ message: 'ok' });
});

export default routes;
