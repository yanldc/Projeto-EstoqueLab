import { getCustomRepository } from 'typeorm';
import Reagent from '../models/Reagent';
import ReagentRepository from 'api/repositories/reagentRepository';
import AppError from 'api/middlewares/AppError';
import { instanceToInstance } from 'class-transformer';
import UserRepository from 'api/repositories/userRepository';
import ReagentSpecRepository from 'api/repositories/reagentSpecRepository';

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

class reagentService {
  public async create({ name, userId }: IRequest): Promise<Reagent> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }

    const reagentRepository = getCustomRepository(ReagentRepository);

    const reagent = reagentRepository.create({
      name,
      userName: user.name,
    });

    await reagentRepository.save(reagent);
    return reagent;
  }

  public async update(
    { name, userId }: IRequest,
    { id }: IReqParam,
  ): Promise<Reagent> {
    const reagentRepository = getCustomRepository(ReagentRepository);

    const reagent = await reagentRepository.findOne(id);
    if (!reagent) {
      throw new AppError('Reagente inexistente.', 'not found', 404);
    }

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }

    reagent.name = name;
    reagent.userName = user.name;

    await reagentRepository.save(reagent);
    return reagent;
  }

  public async list(
    page: number,
    limit: number,
  ): Promise<{ reagents: Reagent[]; totalItems: number }> {
    const reagentRepository = getCustomRepository(ReagentRepository);

    const [reagents, totalItems] = await reagentRepository.findAndCount({
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { reagents, totalItems };
  }

  public async show({ name }: IReqNameParam): Promise<any> {
    const reagentRepository = getCustomRepository(ReagentRepository);

    const reagents = await reagentRepository.findByName(name);

    if (!reagents || reagents.length === 0) {
      throw new AppError('Vidraria não encontrada.', 'not found', 404);
    }

    return instanceToInstance(reagents);
  }

  public async showId({ id }: IReqParam): Promise<any> {
    const reagentRepository = getCustomRepository(ReagentRepository);

    const reagent = await reagentRepository.findById(id);

    if (!reagent) {
      throw new AppError('vidraria não encontrada.', 'not found', 404);
    }

    return instanceToInstance(reagent);
  }

  public async delete({ id }: IReqParam): Promise<void> {
    const reagentRepository = getCustomRepository(ReagentRepository);
    const reagentSpecRepository = getCustomRepository(ReagentSpecRepository);

    const reagent = await reagentRepository.findOne(id, {
      relations: ['reagentSpec'],
    });
    if (!reagent) {
      throw new AppError('Reagente não encontrado.', 'not found', 404);
    }

    await reagentSpecRepository.delete({ reagentId: reagent.id });
    await reagentRepository.remove(reagent);
  }
}

export default reagentService;
