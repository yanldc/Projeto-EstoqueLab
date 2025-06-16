import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from 'api/middlewares/ensureAuthenticated';
import ReagentController from 'api/controllers/reagentController';

const reagentRouter = Router();
const reagentController = new ReagentController();

reagentRouter.use(ensureAuthenticated);
reagentRouter.get('/', reagentController.list);

reagentRouter.get(
  '/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  reagentController.show,
);

reagentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  reagentController.create,
);

reagentRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  reagentController.update,
);

reagentRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  reagentController.delete,
);

export default reagentRouter;
