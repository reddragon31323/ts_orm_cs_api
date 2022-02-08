import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import Local from "./Local";
import Round from "./Round";

@Entity('tb_objective')
export default class Objective{
    @PrimaryColumn('int')
    id: number;

    @Column("varchar", {length: 200})
    description: string;

    @Column()
    points: number;

    @OneToMany(() => Local, local => local.objective)
    locals: Local[];

}