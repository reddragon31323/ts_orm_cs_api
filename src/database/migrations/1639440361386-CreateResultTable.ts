import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateResultTable1639440361386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_result',
            columns: [
                {
                    name: 'objective_id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'round_id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'status',
                    type: 'text',
                    isNullable: false
                    },
            ]
           }));
           
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_result',
            new TableForeignKey({
                name: 'fk_result_objective',
                columnNames: ['objective_id'],
                referencedTableName: 'tb_objective',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.createForeignKey(
            'tb_result',
            new TableForeignKey({
                name: 'fk_result_round',
                columnNames: ['round_id'],
                referencedTableName: 'tb_round',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_result', "fk_result_objective");
        await queryRunner.dropForeignKey('tb_result', "fk_result_round");
        await queryRunner.dropTable('tb_result');
    }

}
