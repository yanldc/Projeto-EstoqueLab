import { Equal, getCustomRepository, MoreThan } from 'typeorm';
import VidrariaRepository from 'api/repositories/vidrariaRepository';
import AppError from 'api/middlewares/AppError';
import { instanceToInstance } from 'class-transformer';
import UserRepository from 'api/repositories/userRepository';
import VidrariaSpecRepository from 'api/repositories/vidrariaSpecRepository';
import VidrariaSpec from 'api/models/VidrariaSpec';

interface IRequest {
  name: string;
  quantity: number;
  quantityBuy: number;
  price: number;
  dateBuy: Date;
  nf: string;
  supplier: string;
  vidrariaId: number;
  userId: number;
}

interface IReqParam {
  id: number;
  vidraria_id: number;
}

class VidrariaSpecService {
  public async create({
    quantity,
    quantityBuy,
    price,
    dateBuy,
    nf,
    supplier,
    vidrariaId,
    userId,
  }: IRequest): Promise<VidrariaSpec> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }

    if (!vidrariaId) {
      throw new AppError('Vidraria ID is missing.', 'not found', 404);
    }

    const vidrariaSpecRepository = getCustomRepository(VidrariaSpecRepository);
    const vidrariaSpec = vidrariaSpecRepository.create({
      quantity,
      quantityBuy: quantity,
      price,
      dateBuy,
      nf,
      supplier,
      vidrariaId,
      userName: user.name,
    });

    await vidrariaSpecRepository.save(vidrariaSpec);
    return vidrariaSpec;
  }

  public async update(
    { quantity, price, dateBuy, nf, supplier, userId }: IRequest,
    { id, vidraria_id }: IReqParam,
  ): Promise<VidrariaSpec> {
    const vidrariaRepository = getCustomRepository(VidrariaRepository);

    const vidraria = await vidrariaRepository.findOne(vidraria_id);
    if (!vidraria) {
      throw new AppError('Vidraria inexistente.', 'not found', 404);
    }

    const vidrariaSpecRepository = getCustomRepository(VidrariaSpecRepository);
    const vidrariaSpec = await vidrariaSpecRepository.findOne(id);
    if (!vidrariaSpec) {
      throw new AppError('Vidraria inexistente.', 'not found', 404);
    }

    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(userId);
    if (!user) {
      throw new AppError('User not found.', 'not found', 404);
    }
    vidrariaSpec.quantity = quantity;
    vidrariaSpec.price = price;
    vidrariaSpec.dateBuy = dateBuy;
    vidrariaSpec.nf = nf;
    vidrariaSpec.supplier = supplier;
    vidrariaSpec.userName = user.name;

    await vidrariaSpecRepository.save(vidrariaSpec);
    return instanceToInstance(vidrariaSpec);
  }

  public async list(
    vidrariaId: number,
    page: number,
    limit: number,
    quantityCondition?: 'greaterThanZero' | 'equalToZero' | 'all',
  ): Promise<{ vidrariaSpecs: VidrariaSpec[]; totalItems: number }> {
    const vidrariaSpecRepository = getCustomRepository(VidrariaSpecRepository);

    const quantityConditionMap = {
      greaterThanZero: { quantity: MoreThan(0) },
      equalToZero: { quantity: Equal(0) },
      all: {},
    };

    const [vidrariaSpecs, totalItems] =
      await vidrariaSpecRepository.findAndCount({
        where: {
          vidrariaId,
          ...quantityConditionMap[quantityCondition || 'all'],
        },
        order: { dateBuy: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
      });

    return { vidrariaSpecs, totalItems };
  }

  public async delete({ id }: IReqParam): Promise<void> {
    const vidrariaSpecRepository = getCustomRepository(VidrariaSpecRepository);
    const vidrariaSpec = await vidrariaSpecRepository.findOne(id);
    if (!vidrariaSpec) {
      throw new AppError('vidraria não encontrada.', 'not found', 404);
    }

    await vidrariaSpecRepository.remove(vidrariaSpec);
  }
}

export default VidrariaSpecService;
