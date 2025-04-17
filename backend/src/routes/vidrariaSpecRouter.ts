import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from 'api/middlewares/ensureAuthenticated';
import VidrariaSpecController from 'api/controllers/vidrariaEspecController';

const vidrariaSpecRouter = Router();
const vidrariaSpecController = new VidrariaSpecController();

vidrariaSpecRouter.use(ensureAuthenticated);
vidrariaSpecRouter.get('/:vidraria_id', vidrariaSpecController.list);

vidrariaSpecRouter.post(
  '/:vidraria_id',
  celebrate({
    [Segments.PARAMS]: {
      vidraria_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      dateBuy: Joi.date().required(),
      nf: Joi.string().required(),
      supplier: Joi.string().required(),
    },
  }),
  vidrariaSpecController.create,
);

vidrariaSpecRouter.delete('/:vidraria_id/:id', vidrariaSpecController.delete);
vidrariaSpecRouter.put('/:vidraria_id/:id', vidrariaSpecController.update);

export default vidrariaSpecRouter;
