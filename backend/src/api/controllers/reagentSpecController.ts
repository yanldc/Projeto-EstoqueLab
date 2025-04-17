import { Request, Response } from 'express';
import ReagentService from 'api/services/reagentService';
import ReagentSpecService from 'api/services/reagentSpecService';
import { format } from 'date-fns';

export default class reagentSpecController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { quantity, lote, price, validity, dateBuy, nf, supplier } =
      request.body;
    const { reagent_id } = request.params;

    if (!reagent_id) {
      return response.status(400).json({ error: 'Reagent ID is missing' });
    }

    const userId = request.user.id;

    const reagentSpecService = new ReagentSpecService();
    const reagentSpec = await reagentSpecService.create({
      quantity,
      lote,
      price,
      validity,
      dateBuy,
      nf,
      supplier,
      reagentId: reagent_id,
    });

    return response.status(201).json(reagentSpec);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { reagent_id } = request.params;
    const { page = 1, limit = 15, quantityCondition } = request.query;

    const reagentSpecService = new ReagentSpecService();
    const { reagentSpecs, totalItems } = await reagentSpecService.list(
      Number(reagent_id),
      Number(page),
      Number(limit),
      quantityCondition as 'greaterThanZero' | 'equalToZero' | 'all',
    );

    const reagentSpecsFormatted = reagentSpecs.map(item => ({
      ...item,
      dateBuy: format(new Date(item.dateBuy), 'dd-MM-yyyy HH:mm'),
      created_at: format(new Date(item.created_at), 'dd-MM-yyyy HH:mm'),
      updated_at: format(new Date(item.updated_at), 'dd-MM-yyyy HH:mm'),
    }));

    const totalPages = Math.ceil(totalItems / Number(limit));

    return response.json({ reagentSpecs: reagentSpecsFormatted, totalPages });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { reagent_id: reagent_id } = request.params;
    const { id: id } = request.params;
    const { quantity, lote, price, validity, dateBuy, nf, supplier } =
      request.body;
    const userId = request.user.id;

    const reagentService = new ReagentService();
    const reagent = await reagentService.showId({ id: Number(reagent_id) });
    if (!reagent) {
      return response.status(400).json({ error: 'Reagent ID is missing' });
    }

    const reagentSpecService = new ReagentSpecService();
    const reagentSpec = await reagentSpecService.update(
      { quantity, lote, price, validity, dateBuy, nf, supplier },
      { id },
    );

    return response.status(200).json(reagentSpec);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { reagent_id: reagent_id } = request.params;
    const { id: id } = request.params;

    const reagentService = new ReagentService();
    const reagent = await reagentService.showId({ id: Number(reagent_id) });
    if (!reagent) {
      return response.status(400).json({ error: 'Reagent ID is missing' });
    }

    const reagentSpecService = new ReagentSpecService();
    await reagentSpecService.delete({ id });
    return response.status(204).send('Reagent deletada');
  }
}
