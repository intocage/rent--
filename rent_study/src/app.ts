import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { IDatabaseConnection } from './database/IDatabaseConnection';
import UserRoutes from './routes/UserRoute';

const createApp = (db: IDatabaseConnection): Application => {
  const app = express();

  app.use(bodyParser.json());
  app.use('/users', UserRoutes(db));

  return app;
};

export default createApp;