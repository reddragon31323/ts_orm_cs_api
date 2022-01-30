import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import {ResultID} from "./ResultID";
import {Status} from './Status';

import Round from "./Round";
import Objective from "./Objective";

@Entity('tb_result')
export default class Result{
    @Column(() => ResultID)
    id: ResultID;

    @Column({
        type: "enum",
        enum: Status,
    })
    status: Status;
}