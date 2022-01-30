import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateArtefactTable1638564058563 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_artefact',
            columns:[
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
                    name: 'weigth',
                    type: 'numeric(7,2)',
                    isNullable: true,
                    default: 0
                },
                {
                    name: 'value',
                    type: 'numeric(7,2)',
                    isNullable: true,
                    default: 0
                },
                {
                    name: 'explosive',
                    type: 'boolean',
                    isNullable: true,
                },
                {
                    name: 'caliber',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'length_barrel',
                    type: 'numeric(7,2)',
                    isNullable: true
                },
                {
                    name: 'tipo',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'type',
                    type: 'varchar',
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_artefact')
    }

}
