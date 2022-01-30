import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateMatchTable1639439164942 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_match',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'begin',
                    type: 'timestamp',
                    isNullable: true,
                    default: 'now()'
                },
                {
                    name: 'end',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'player_nickname',
                    type: 'varchar(10)',
                    isNullable: false
                }
            ]
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_match',
            new TableForeignKey({
                name: 'fk_match_nickname',
                columnNames: ['player_nickname'],
                referencedTableName: 'tb_player',
                referencedColumnNames: ['nickname']
            })
        );
        await queryRunner.dropForeignKey('tb_match', "fk_match_nickname");
        await queryRunner.dropTable('tb_match');
    }

}
