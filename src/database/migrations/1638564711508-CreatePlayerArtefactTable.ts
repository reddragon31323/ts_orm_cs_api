import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePlayerArtefactTable1638564711508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_player_artefact',
            columns: [
                {
                    name: 'player_nickname',
                    type: 'varchar(10)',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'artefact_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_player_artefact',
            new TableForeignKey({
                name: 'fk_player_artefact_j',
                columnNames: ['player_nickname'],
                referencedTableName: 'tb_player',
                referencedColumnNames: ['nickname']
            })
        );
        await queryRunner.createForeignKey(
            'tb_player_artefact',
            new TableForeignKey({
                name: 'fk_player_artefact_a',
                columnNames: ['artefact_id'],
                referencedTableName: 'tb_artefact',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_player_artefact', "fk_player_artefact_j");
        await queryRunner.dropForeignKey('tb_player_artefact', "fk_player_artefact_a");
        await queryRunner.dropTable('tb_player_artefact');
    }

}
