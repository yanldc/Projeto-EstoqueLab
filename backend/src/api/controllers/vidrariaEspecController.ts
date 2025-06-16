import { Request, Response } from 'express';
import VidrariaService from 'api/services/vidrariaService';
import VidrariaSpecService from 'api/services/vidrariaSpecService';
import { format } from 'date-fns';

export default class VidrariaSpecController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { quantity, price, dateBuy, nf, supplier } = request.body;
    const { vidraria_id } = request.params;

    if (!vidraria_id) {
      return response.status(400).json({ error: 'Vidraria ID is missing' });
    }

    const userId = request.user.id;

    const vidrariaSpecService = new VidrariaSpecService();
    const vidrariaSpec = await vidrariaSpecService.create({
      quantity,
      price,
      dateBuy,
      userId,
      nf,
      supplier,
      vidrariaId: vidraria_id,
    });

    return response.status(201).json(vidrariaSpec);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { vidraria_id } = request.params;
    const { page = 1, limit = 15, quantityCondition } = request.query;

    const vidrariaSpecService = new VidrariaSpecService();
    const { vidrariaSpecs, totalItems } = await vidrariaSpecService.list(
      Number(vidraria_id),
      Number(page),
      Number(limit),
      quantityCondition as 'greaterThanZero' | 'equalToZero' | 'all',
    );

    const vidrariaSpecsFormatted = vidrariaSpecs.map(item => ({
      ...item,
      dateBuy: format(new Date(item.dateBuy), 'dd-MM-yyyy'),
      created_at: format(new Date(item.created_at), 'dd-MM-yyyy HH:mm'),
      updated_at: format(new Date(item.updated_at), 'dd-MM-yyyy HH:mm'),
    }));

    const totalPages = Math.ceil(totalItems / Number(limit));

    return response.json({ vidrariaSpecs: vidrariaSpecsFormatted, totalPages });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { vidraria_id: vidraria_id } = request.params;
    const { id: id } = request.params;
    const { quantity, price, dateBuy, nf, supplier } = request.body;
    const userId = request.user.id;

    const vidrariaService = new VidrariaService();
    const vidraria = await vidrariaService.showId({ id: Number(vidraria_id) });
    if (!vidraria) {
      return response.status(400).json({ error: 'Vidraria ID is missing' });
    }

    const vidrariaSpecService = new VidrariaSpecService();
    const vidrariaSpec = await vidrariaSpecService.update(
      { quantity, price, dateBuy, nf, supplier, userId },
      { id },
    );

    return response.status(200).json(vidrariaSpec);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { vidraria_id: vidraria_id } = request.params;
    const { id: id } = request.params;

    const vidrariaService = new VidrariaService();
    const vidraria = await vidrariaService.showId({ id: Number(vidraria_id) });
    if (!vidraria) {
      return response.status(400).json({ error: 'Vidraria ID is missing' });
    }

    const vidrariaSpecService = new VidrariaSpecService();
    await vidrariaSpecService.delete({ id });
    return response.status(204).send('Vidraria deletada');
  }
}
