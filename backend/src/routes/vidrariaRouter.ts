import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import VidrariaController from 'api/controllers/vidrariaController';
import ensureAuthenticated from 'api/middlewares/ensureAuthenticated';

const vidrariaRouter = Router();
const vidrariaController = new VidrariaController();

vidrariaRouter.use(ensureAuthenticated);
vidrariaRouter.get('/', vidrariaController.list);

vidrariaRouter.get(
  '/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  vidrariaController.show,
);

vidrariaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  vidrariaController.create,
);

vidrariaRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  vidrariaController.update,
);

vidrariaRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  vidrariaController.delete,
);

export default vidrariaRouter;
