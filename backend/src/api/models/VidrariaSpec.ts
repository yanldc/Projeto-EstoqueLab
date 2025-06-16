import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Vidraria from './Vidraria';
import { Exclude } from 'class-transformer';
import User from './User';

@Entity('vidrariaSpec')
class VidrariaSpec {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  @Column()
  quantityBuy: number;

  @Column()
  price: number;

  @Column()
  dateBuy: Date;

  @Column()
  nf: string;

  @Column()
  userName: string;

  @Column()
  supplier: string;

  @Column()
  vidrariaId: number;

  @ManyToOne(() => Vidraria, vidraria => vidraria.vidrariaSpec, {
    eager: true,
  })
  @Exclude()
  vidraria: Vidraria | undefined;

  @ManyToOne(() => User, user => user.vidrariaSpec)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default VidrariaSpec;
