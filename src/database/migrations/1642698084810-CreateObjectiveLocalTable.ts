import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateObjectiveLocalTable1642698084810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_objective_local',
            columns:[
                {
                    name: 'objective_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'local_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_objective_local',
            new TableForeignKey({
                name: 'fk_objective_local_o',
                columnNames: ['objective_id'],
                referencedTableName: 'tb_objective',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.createForeignKey(
            'tb_objective_local',
            new TableForeignKey({
                name: 'fk_objective_local_l',
                columnNames: ['local_id'],
                referencedTableName: 'tb_local',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_objective_local', "fk_objective_local_o");
        await queryRunner.dropForeignKey('tb_objective_local', "fk_objective_local_l");
        await queryRunner.dropTable('tb_objective_local');
    }

}
