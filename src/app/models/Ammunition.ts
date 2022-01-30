import { Entity, Column, PrimaryColumn, ChildEntity } from "typeorm";
import Artefact from "./Artefact";
import {Caliber} from './Caliber';

@ChildEntity()
export default class Ammunition extends Artefact{
    @Column()
    explosive: boolean;
    
    @Column({
        type: "enum",
        enum: Caliber,
    })
    caliber:Caliber;
}