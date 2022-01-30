import { Entity, Column, PrimaryColumn, TableInheritance } from "typeorm";

@Entity('tb_artefact')
@TableInheritance({column:{type: "varchar", name: "type"}})
export default abstract class Artefact{
    @PrimaryColumn('int')
    id: number;

    @Column('text')
    name: string;

    @Column()
    weight: number;

    @Column()
    value: number;
}