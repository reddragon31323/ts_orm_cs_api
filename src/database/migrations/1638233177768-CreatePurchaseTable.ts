import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCompraTable1638233177768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_purchase',
            columns:[
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'data',
                    type: 'timestamp',
                    isNullable: true,
                    default: 'now()'
                },
                {
                    name: 'total',
                    type: 'numeric(10,2)',
                    isNullable: true,
                    default: 0
                },
                {
                    name: 'player_nickname',
                    type: 'varchar(10)',
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_purchase',
            new TableForeignKey({
                name: 'fk_purchase_player',
                columnNames: ['player_nickname'],
                referencedTableName: 'tb_player',
                referencedColumnNames: ['nickname']
            })
        );
        await queryRunner.dropForeignKey('tb_purchase', "fk_purchase_player");
        await queryRunner.dropTable('tb_purchase');
    }

}
