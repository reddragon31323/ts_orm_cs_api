import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePlayersPatentTable1638232303836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_player_patent',
            columns:[
                {
                    name: 'player_nickname',
                    type: 'varchar(10)',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'patent_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_player_patent',
            new TableForeignKey({
                name: 'fk_player_patent_p',
                columnNames: ['patent_id'],
                referencedTableName: 'tb_patent',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.createForeignKey(
            'tb_player_patent',
            new TableForeignKey({
                name: 'fk_player_patent_j',
                columnNames: ['player_nickname'],
                referencedTableName: 'tb_player',
                referencedColumnNames: ['nickname']
            })
        );
        await queryRunner.dropForeignKey('tb_player_patent', "fk_player_patent_p");
        await queryRunner.dropForeignKey('tb_player_patent', "fk_player_patent_j");
        await queryRunner.dropTable('tb_player_patent');
    }

}
