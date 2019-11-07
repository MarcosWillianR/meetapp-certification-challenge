import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import multer from 'multer';
import MulterConfigs from './configs/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import OrganizerController from './app/controllers/OrganizerController';
import SubscriptionController from './app/controllers/SubscriptionController';

// Validators Middlewares
import validateUserStore from './app/validators/UserStore';
import validadeUserUpdate from './app/validators/UserUpdate';
import validateMeetupStore from './app/validators/MeetupStore';
import validateMeetupUpdate from './app/validators/MeetupUpdate';
import validateSessionStore from './app/validators/SessionStore';

// Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(MulterConfigs);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/users', validateUserStore, UserController.store);
routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.use(authMiddleware);

routes.put('/users', validadeUserUpdate, UserController.update);

routes.post('/files', uploads.single('file'), FileController.store);

routes.get('/meetup', MeetupController.index);
routes.post('/meetup', validateMeetupStore, MeetupController.store);
routes.put('/meetup/:id', validateMeetupUpdate, MeetupController.update);
routes.delete('/meetup/:id', MeetupController.delete);

routes.get('/organizing', OrganizerController.index);
routes.get('/meetup/subscriptions', SubscriptionController.index);

routes.post('/meetup/:id/subscription', SubscriptionController.store);

export default routes;
