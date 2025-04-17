import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from 'api/middlewares/ensureAuthenticated';
import ReagentSpecController from 'api/controllers/reagentSpecController';

const reagentSpecRouter = Router();
const reagentSpecController = new ReagentSpecController();

reagentSpecRouter.use(ensureAuthenticated);
reagentSpecRouter.get('/:reagent_id', reagentSpecController.list);

reagentSpecRouter.post(
  '/:reagent_id',
  celebrate({
    [Segments.PARAMS]: {
      reagent_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      quantity: Joi.number().required(),
      lote: Joi.string().required(),
      price: Joi.number().required(),
      validity: Joi.date().required(),
      dateBuy: Joi.date().required(),
      nf: Joi.string().required(),
      supplier: Joi.string().required(),
    },
  }),
  reagentSpecController.create,
);

reagentSpecRouter.delete('/:reagent_id/:id', reagentSpecController.delete);
reagentSpecRouter.put('/:reagent_id/:id', reagentSpecController.update);

export default reagentSpecRouter;
