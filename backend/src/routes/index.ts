import { Router } from 'express';
import authRouter from './authRouter';
import vidrariaRouter from './vidrariaRouter';
import vidrariaSpecRouter from './vidrariaSpecRouter';
import reagentRouter from './reagentRouter';
import reagentSpecRouter from './reagentSpecRouter';

const routes = Router();

routes.use('/auth', authRouter);

routes.use('/vidraria', vidrariaRouter);
routes.use('/vidrariaSpec', vidrariaSpecRouter);

routes.use('/reagent', reagentRouter);
routes.use('/reagentSpec', reagentSpecRouter);

export default routes;
