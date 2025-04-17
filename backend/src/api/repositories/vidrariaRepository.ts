import { EntityRepository, Like, Repository } from 'typeorm';
import Vidraria from '../models/Vidraria';

@EntityRepository(Vidraria)
class VidrariaRepository extends Repository<Vidraria> {
  public async findByName(name: string): Promise<Vidraria[] | undefined> {
    return this.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  public async findById(id: number): Promise<Vidraria | undefined> {
    return this.findOne({ where: { id } });
  }
}

export default VidrariaRepository;
