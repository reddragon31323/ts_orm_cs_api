import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePlayersTable1638226377669 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_player',
            columns:[
                {
                    name: 'nickname',
                    type: 'varchar(10)',
                    isPrimary: true
                },
                {
                    name: 'password',
                    type: 'varchar(5)'
                },
                {
                    name: 'points',
                    type: 'int',
                    default: 0
                },
                {
                    name: 'date_register',
                    type: 'date',
                    default: 'now()'
                },
                {
                    name: 'date_last_login',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'address_id',
                    type: 'int',
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_player',
            new TableForeignKey({
                name: 'fk_player_address',
                columnNames: ['address_id'],
                referencedTableName: 'tb_address',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_player', "fk_player_address");
        await queryRunner.dropTable('tb_player')
    }

}
