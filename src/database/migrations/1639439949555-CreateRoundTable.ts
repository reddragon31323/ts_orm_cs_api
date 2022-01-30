import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateRoundTable1639439949555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_round',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'number',
                    type: 'int',
                    isNullable: false
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
                    name: 'match_id',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'mode',
                    type: 'varchar(30)',
                    isNullable: true
                }
            ]
           }));
          
            
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_round',
            new TableForeignKey({
                name: 'fk_round_match',
                columnNames: ['match_id'],
                referencedTableName: 'tb_match',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_round', "fk_round_match");
        await queryRunner.dropTable('tb_round');
    }

}
