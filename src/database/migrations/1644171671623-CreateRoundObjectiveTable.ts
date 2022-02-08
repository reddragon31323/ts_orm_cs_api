import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateRoundObjectiveTable1644171671623 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_round_objective',
            columns:[
                {
                    name: 'round_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'objective_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_round_objective',
            new TableForeignKey({
                name: 'fk_round_objective_r',
                columnNames: ['round_id'],
                referencedTableName: 'tb_round',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.createForeignKey(
            'tb_round_objective',
            new TableForeignKey({
                name: 'fk_round_objective_o',
                columnNames: ['objective_id'],
                referencedTableName: 'tb_objective',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_round_objective', "fk_round_objective_r");
        await queryRunner.dropForeignKey('tb_round_objective', "fk_round_objective_o");
        await queryRunner.dropTable('tb_round_objective');


    }

}
