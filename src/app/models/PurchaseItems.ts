import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import Artefact from "./Artefact";
import Purchase from "./Purchase";

@Entity('tb_purchase_items')
export default class Purchaseitems{
    @PrimaryColumn('int')
    id: number;

    @Column()
    quantity: number;

    @Column()
    value: number;

    @OneToOne(() => Artefact)
    @JoinColumn()
    artefact: Artefact;


    @ManyToOne(type => Purchase)
    @JoinColumn({name: "purchase_id", referencedColumnName: "id"})
    purchase: Purchase;
}