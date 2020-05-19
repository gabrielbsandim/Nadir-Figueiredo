import { Entity, Column, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from "typeorm";
import { User } from "./User";
import { Bug } from "./Bug";
import { Machine } from "./Machine";
import { type } from "os";

@Entity()
export class Inspection {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    identity: string;

    @Column({ type: 'varchar', length: 100 })
    article: string;

    @Column({ type: 'varchar', length: 100 })
    tag: string;

    @Column()
    palconstLength: number;

    @Column()
    amountSamples: number;
    
    @Column({ default: true})
    status: string;

    @ManyToOne( () => User, { eager: true })
    user: User;

    @ManyToOne( () => Machine, { eager: true })
    machine: Machine;

    @ManyToMany(type => Bug)
    @JoinTable({
        name: "inspection_bugs"
    })
    fk: Bug[];

    @Column()
    amountOfParts: number;

    // Base
    @Column({ default: true})
    active: boolean;

    @Column({ default: false})
    deleted: boolean;

    @CreateDateColumn({ type: "timestamp" })
    createAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;
}

