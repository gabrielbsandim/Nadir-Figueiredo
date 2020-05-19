import { Entity, Column } from "typeorm";
import { BaseEntity } from './BaseEntity';

@Entity()
export class Machine extends BaseEntity {
    @Column({ type: 'varchar', length: 100 })
    nameMachine: string;

    @Column({ type: 'varchar', length: 100 })
    machineVelocity: string;
}
