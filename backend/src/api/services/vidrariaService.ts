import { getCustomRepository } from 'typeorm';
import Vidraria from '../models/Vidraria';
import VidrariaRepository from 'api/repositories/vidrariaRepository';
import AppError from 'api/middlewares/AppError';
import { instanceToInstance } from 'class-transformer';
import UserRepository from 'api/repositories/userRepository';
import VidrariaSpecRepository from 'api/repositories/vidrariaSpecRepository';

interface IRequest {
  name: string;
  userId: number;
}

interface IReqParam {
  id: number;
}

interface IReqNameParam {
  name: string;
}

class VidrariaService {
  public async create({ name, userId }: IRequest): Promise<Vidraria> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }

    const vidrariaRepository = getCustomRepository(VidrariaRepository);

    const vidraria = vidrariaRepository.create({
      name,
      userName: user.name,
    });

    await vidrariaRepository.save(vidraria);
    return vidraria;
  }

  public async update(
    { name, userId }: IRequest,
    { id }: IReqParam,
  ): Promise<Vidraria> {
    const vidrariaRepository = getCustomRepository(VidrariaRepository);

    const vidraria = await vidrariaRepository.findOne(id);
    if (!vidraria) {
      throw new AppError('Vidraria inexistente.', 'not found', 404);
    }

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }

    vidraria.name = name;
    vidraria.userName = user.name;

    await vidrariaRepository.save(vidraria);
    return vidraria;
  }

  public async list(
    page: number,
    limit: number,
  ): Promise<{ vidrarias: Vidraria[]; totalItems: number }> {
    const vidrariaRepository = getCustomRepository(VidrariaRepository);

    const [vidrarias, totalItems] = await vidrariaRepository.findAndCount({
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { vidrarias, totalItems };
  }

  public async show({ name }: IReqNameParam): Promise<any> {
    const vidrariaRepository = getCustomRepository(VidrariaRepository);

    const vidrarias = await vidrariaRepository.findByName(name);

    if (!vidrarias || vidrarias.length === 0) {
      throw new AppError('Vidraria não encontrada.', 'not found', 404);
    }

    return instanceToInstance(vidrarias);
  }

  public async showId({ id }: IReqParam): Promise<any> {
    const vidrariaRepository = getCustomRepository(VidrariaRepository);

    const vidraria = await vidrariaRepository.findById(id);

    if (!vidraria) {
      throw new AppError('vidraria não encontrada.', 'not found', 404);
    }

    return instanceToInstance(vidraria);
  }

  public async delete({ id }: IReqParam): Promise<void> {
    const vidrariaRepository = getCustomRepository(VidrariaRepository);
    const vidrariaSpecRepository = getCustomRepository(VidrariaSpecRepository);

    const vidraria = await vidrariaRepository.findOne(id, {
      relations: ['vidrariaSpec'],
    });
    if (!vidraria) {
      throw new AppError('Vidraria não encontrada.', 'not found', 404);
    }

    await vidrariaSpecRepository.delete({ vidrariaId: vidraria.id });
    await vidrariaRepository.remove(vidraria);
  }
}

export default VidrariaService;
