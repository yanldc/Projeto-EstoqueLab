import { Request, Response } from 'express';
import ReagentService from 'api/services/reagentService';
import { format } from 'date-fns';

export default class reagentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const userId = request.user.id;

    const reagentService = new ReagentService();
    const reagent = await reagentService.create({
      name,
      userId,
    });

    return response.status(201).json(reagent);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 15 } = request.query;

    const reagentService = new ReagentService();
    const { reagents, totalItems } = await reagentService.list(
      Number(page),
      Number(limit),
    );

    const reagentsFormatted = reagents.map(item => ({
      ...item,
      created_at: format(new Date(item.created_at), 'dd-MM-yyyy HH:mm'),
      updated_at: format(new Date(item.updated_at), 'dd-MM-yyyy HH:mm'),
    }));

    return response.json({
      reagents: reagentsFormatted,
      totalPages: Math.ceil(totalItems / Number(limit)),
      currentPage: Number(page),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name: reagent_name } = request.params;
    const reagentService = new ReagentService();

    const reagents = await reagentService.show({
      name: String(reagent_name),
    });

    const reagentsFormatted = reagents.map(reagent => ({
      ...reagent,
      created_at: format(new Date(reagent.created_at), 'dd-MM-yyyy HH:mm'),
      updated_at: format(new Date(reagent.updated_at), 'dd-MM-yyyy HH:mm'),
    }));

    return response.status(200).json(reagentsFormatted);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { name } = request.body;
    const userId = request.user.id;
    const reagentService = new ReagentService();

    const reagent = await reagentService.update({ name, userId }, { id });

    return response.status(200).json(reagent);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const reagentService = new ReagentService();

    await reagentService.delete({ id });
    return response.status(204).send('reagente deletado');
  }
}
