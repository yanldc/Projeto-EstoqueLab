import { EntityRepository, Like, Repository } from 'typeorm';
import Reagent from '../models/Reagent';

@EntityRepository(Reagent)
class ReagentRepository extends Repository<Reagent> {
  public async findByName(name: string): Promise<Reagent[] | undefined> {
    return this.find({
      where: {
        name: Like(`%${name}%`),
      },
    });
  }

  public async findById(id: number): Promise<Reagent | undefined> {
    return this.findOne({ where: { id } });
  }
}

export default ReagentRepository;
