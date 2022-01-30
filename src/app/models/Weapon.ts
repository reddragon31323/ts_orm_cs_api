import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable, ChildEntity } from "typeorm";
import Artefact from "./Artefact";//links the Artefact file from the Models folder
import Ammunition from "./Ammunition";//links the Ammunition file from Models folder
import {Type} from './Type';//links the Type file from Models folder

@ChildEntity()
export default class Weapon extends Artefact{
    @Column()
    length_barrel: number;

    @Column({
        type: "enum",
        enum: Type,
    })
    type:Type;

    @ManyToMany(() => Ammunition)
    @JoinTable({name: "tb_weapon_ammunition", joinColumn: {name: "weapon_id", referencedColumnName: "id"}, inverseJoinColumn: {name: "ammunition_id", referencedColumnName: "id"}})
    ammunition: Ammunition[];
}