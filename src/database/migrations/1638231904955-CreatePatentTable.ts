import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePatentTable1638231904955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_patent',
            columns: [

            {
                name: 'id',
                type: 'serial',
                isPrimary: true
            },
            {
                name: 'name',
                type: 'varchar(100)',
                isNullable: false
            },
            {
                name: 'color',
                type: 'varchar(100)',
                isNullable: true
            }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_patent')
    }

}
