import { EntityRepository, Repository } from 'typeorm';
import ReagentSpec from '../models/ReagentSpec';

@EntityRepository(ReagentSpec)
class ReagentSpecRepository extends Repository<ReagentSpec> {
  public async findByName(name: string): Promise<ReagentSpec | undefined> {
    return this.findOne({ where: { name } });
  }

  public async findById(id: number): Promise<ReagentSpec | undefined> {
    return this.findOne({ where: { id } });
  }
}

export default ReagentSpecRepository;
