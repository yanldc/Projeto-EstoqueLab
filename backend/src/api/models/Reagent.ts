import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ReagentSpec from './ReagentSpec';
import User from './User';

@Entity('reagent')
class Reagent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  userName: string;

  @OneToMany(
    () => ReagentSpec,
    (reagentSpec: ReagentSpec) => reagentSpec.reagent,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  reagentSpec: ReagentSpec[];

  @ManyToOne(() => User, user => user.reagent)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Reagent;
