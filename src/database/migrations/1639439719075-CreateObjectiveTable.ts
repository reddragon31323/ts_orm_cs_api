import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateObjectiveTable1639439719075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_objective',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'description',
                    type: 'varchar(200)',
                    isNullable: false
                 },
                 {
                    name: 'points',
                    type: 'int',
                    isNullable: true,
                    default: 0
                 }
                 ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_objective');
    }

}
