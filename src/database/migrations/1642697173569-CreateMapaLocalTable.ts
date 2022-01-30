import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMapaLocalTable1642697173569 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_map_local',
            columns: [
                {
                    name: 'local_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'map_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_map_local',
            new TableForeignKey({
                name: 'fk_map_local_m',
                columnNames: ['map_id'],
                referencedTableName: 'tb_map',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.createForeignKey(
            'tb_map_local',
            new TableForeignKey({
                name: 'fk_map_local_l',
                columnNames: ['local_id'],
                referencedTableName: 'tb_local',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_map_local', "fk_map_local_m");
        await queryRunner.dropForeignKey('tb_map_local', "fk_map_local_l");
        await queryRunner.dropTable('tb_map_local')
    }

}
