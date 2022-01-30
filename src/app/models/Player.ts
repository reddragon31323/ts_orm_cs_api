import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable,OneToMany} from 'typeorm';
import Address from './Address';
import Artefact from './Artefact';
import Patent from './Patent';
import Purchase from './Purchase';

@Entity('tb_player')
class Player{
    @PrimaryColumn('text')
    nickname: string;

    @Column('text')
    password: string;

    @Column('int')
    points: number;

    @Column({ nullable: true, type: 'date' })
    date_register: Date;

    @Column({ nullable: true, type: 'date' })
    date_last_login: Date;

    @ManyToOne(type => Address)
    @JoinColumn({name: "address_id", referencedColumnName: "id"})
    address: Address;

    @ManyToMany(() => Patent)
    @JoinTable({name: "tb_player_patent", joinColumn: {name: "player_nickname", referencedColumnName: "nickname"}, inverseJoinColumn: {name: "patent_id", referencedColumnName: "id"}})
    patents: Patent[];

    @OneToMany(() => Purchase, purchase => purchase.player)
    purchases: Purchase[];

    @ManyToMany(() => Artefact)
    @JoinTable({name: "tb_player_artefact", joinColumn: {name: "player_nickname", referencedColumnName: "nickname"}, inverseJoinColumn: {name: "artefact_id", referencedColumnName: "id"}})
    artefacts: Artefact[];
}
export default Player;