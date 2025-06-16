import { Equal, getCustomRepository, MoreThan } from 'typeorm';
import ReagentRepository from 'api/repositories/reagentRepository';
import AppError from 'api/middlewares/AppError';
import { instanceToInstance } from 'class-transformer';
import UserRepository from 'api/repositories/userRepository';
import ReagentSpecRepository from 'api/repositories/reagentSpecRepository';
import ReagentSpec from 'api/models/ReagentSpec';

interface IRequest {
  name: string;
  quantity: number;
  quantityBuy: number;
  lote: string;
  price: number;
  validity: Date;
  dateBuy: Date;
  nf: string;
  supplier: string;
  reagentId: number;
  userId: number;
}

interface IReqParam {
  id: number;
  reagent_id: number;
}

class reagentSpecService {
  public async create({
    quantity,
    quantityBuy,
    lote,
    price,
    validity,
    dateBuy,
    nf,
    supplier,
    reagentId,
    userId,
  }: IRequest): Promise<ReagentSpec> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }

    if (!reagentId) {
      throw new AppError('Reagent ID is missing.', 'not found', 404);
    }

    const reagentSpecRepository = getCustomRepository(ReagentSpecRepository);
    const reagentSpec = reagentSpecRepository.create({
      quantity,
      quantityBuy: quantity,
      lote,
      price,
      validity,
      dateBuy,
      nf,
      supplier,
      reagentId,
      userName: user.name,
    });

    await reagentSpecRepository.save(reagentSpec);
    return reagentSpec;
  }

  public async update(
    {
      quantity,
      lote,
      price,
      validity,
      dateBuy,
      nf,
      supplier,
      userId,
    }: IRequest,
    { id, reagent_id }: IReqParam,
  ): Promise<ReagentSpec> {
    const reagentRepository = getCustomRepository(ReagentRepository);

    const reagent = await reagentRepository.findOne(reagent_id);
    if (!reagent) {
      throw new AppError('Reagent inexistente.', 'not found', 404);
    }

    const reagentSpecRepository = getCustomRepository(ReagentSpecRepository);
    const reagentSpec = await reagentSpecRepository.findOne(id);
    if (!reagentSpec) {
      throw new AppError('Reagent inexistente.', 'not found', 404);
    }

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }
    reagentSpec.quantity = quantity;
    reagentSpec.lote = lote;
    reagentSpec.price = price;
    reagentSpec.validity = validity;
    reagentSpec.dateBuy = dateBuy;
    reagentSpec.nf = nf;
    reagentSpec.supplier = supplier;
    reagentSpec.userName = user.name;

    await reagentSpecRepository.save(reagentSpec);
    return instanceToInstance(reagentSpec);
  }

  public async list(
    reagentId: number,
    page: number,
    limit: number,
    quantityCondition?: 'greaterThanZero' | 'equalToZero' | 'all',
  ): Promise<{ reagentSpecs: ReagentSpec[]; totalItems: number }> {
    const reagentSpecRepository = getCustomRepository(ReagentSpecRepository);

    const quantityConditionMap = {
      greaterThanZero: { quantity: MoreThan(0) },
      equalToZero: { quantity: Equal(0) },
      all: {},
    };

    const [reagentSpecs, totalItems] = await reagentSpecRepository.findAndCount(
      {
        where: {
          reagentId,
          ...quantityConditionMap[quantityCondition || 'all'],
        },
        order: { dateBuy: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      },
    );

    return { reagentSpecs, totalItems };
  }

  public async delete({ id }: IReqParam): Promise<void> {
    const reagentSpecRepository = getCustomRepository(ReagentSpecRepository);
    const reagentSpec = await reagentSpecRepository.findOne(id);
    if (!reagentSpec) {
      throw new AppError('Reagent não encontrada.', 'not found', 404);
    }

    await reagentSpecRepository.remove(reagentSpec);
  }
}

export default reagentSpecService;
