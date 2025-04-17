import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Vidraria from './Vidraria';
import VidrariaSpec from './VidrariaSpec';
import Reagent from './Reagent';
import ReagentSpec from './ReagentSpec';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Vidraria, vidraria => vidraria.user)
  vidraria: Vidraria[];

  @OneToMany(() => VidrariaSpec, vidrariaSpec => vidrariaSpec.user)
  vidrariaSpec: VidrariaSpec[];

  @OneToMany(() => Reagent, reagent => reagent.user)
  reagent: Reagent[];

  @OneToMany(() => ReagentSpec, reagentSpec => reagentSpec.user)
  reagentSpec: ReagentSpec[];

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default User;
