import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Reagent from './Reagent';
import { Exclude } from 'class-transformer';
import User from './User';

@Entity('reagentSpec')
class ReagentSpec {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  quantity: number;

  @Column()
  quantityBuy: number;

  @Column()
  lote: string;

  @Column()
  price: number;

  @Column()
  validity: Date;

  @Column()
  dateBuy: Date;

  @Column()
  nf: string;

  @Column()
  userName: string;

  @Column()
  supplier: string;

  @Column()
  reagentId: number;

  @ManyToOne(() => Reagent, reagent => reagent.reagentSpec, {
    eager: true,
  })
  @Exclude()
  reagent: Reagent | undefined;

  @ManyToOne(() => User, user => user.reagentSpec)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ReagentSpec;
