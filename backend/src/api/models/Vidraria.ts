import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import VidrariaSpec from './VidrariaSpec';
import User from './User';

@Entity('vidraria')
class Vidraria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  userName: string;

  @OneToMany(
    () => VidrariaSpec,
    (vidrariaSpec: VidrariaSpec) => vidrariaSpec.vidraria,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  vidrariaSpec: VidrariaSpec[];

  @ManyToOne(() => User, user => user.vidraria)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Vidraria;
