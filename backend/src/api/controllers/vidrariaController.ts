import { Request, Response } from 'express';
import VidrariaService from 'api/services/vidrariaService';
import { format } from 'date-fns';

export default class VidrariaController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const userId = request.user.id;

    const vidrariaService = new VidrariaService();
    const vidraria = await vidrariaService.create({
      name,
      userId,
    });

    return response.status(201).json(vidraria);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { page = 1, limit = 15 } = request.query;

    const vidrariaService = new VidrariaService();
    const { vidrarias, totalItems } = await vidrariaService.list(
      Number(page),
      Number(limit),
    );

    const vidrariasFormatted = vidrarias.map(item => ({
      ...item,
      created_at: format(new Date(item.created_at), 'dd-MM-yyyy HH:mm'),
      updated_at: format(new Date(item.updated_at), 'dd-MM-yyyy HH:mm'),
    }));

    return response.json({
      vidrarias: vidrariasFormatted,
      totalPages: Math.ceil(totalItems / Number(limit)),
      currentPage: Number(page),
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name: vidraria_name } = request.params;
    const vidrariaService = new VidrariaService();

    const vidrarias = await vidrariaService.show({
      name: String(vidraria_name),
    });

    const vidrariasFormatted = vidrarias.map(vidraria => ({
      ...vidraria,
      created_at: format(new Date(vidraria.created_at), 'dd-MM-yyyy HH:mm'),
      updated_at: format(new Date(vidraria.updated_at), 'dd-MM-yyyy HH:mm'),
    }));

    return response.status(200).json(vidrariasFormatted);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);
    const { name } = request.body;
    const userId = request.user.id;
    const vidrariaService = new VidrariaService();

    const vidraria = await vidrariaService.update({ name, userId }, { id });

    return response.status(200).json(vidraria);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);

    const vidrariaService = new VidrariaService();
    await vidrariaService.delete({ id });
    return response.status(204).send('Vidraria deletada');
  }
}
