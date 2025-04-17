import { EntityRepository, Repository } from 'typeorm';
import VidrariaSpec from '../models/VidrariaSpec';

@EntityRepository(VidrariaSpec)
class VidrariaSpecRepository extends Repository<VidrariaSpec> {
  public async findByName(name: string): Promise<VidrariaSpec | undefined> {
    return this.findOne({ where: { name } });
  }

  public async findById(id: number): Promise<VidrariaSpec | undefined> {
    return this.findOne({ where: { id } });
  }
}

export default VidrariaSpecRepository;
