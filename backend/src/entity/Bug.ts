import { Entity, Column } from "typeorm";
import { BaseEntity } from './BaseEntity';

@Entity()
export class Bug extends BaseEntity {
    @Column({ type: 'varchar', length: 500 })
    description: string;
}
