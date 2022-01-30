import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddressTable1638208621062 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_address',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'cep',
                    type: 'varchar(8)',
                    isNullable: false
                },
                {
                    name: 'complement',
                    type: 'varchar(100)',
                    isNullable: true
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_address');
    }

}
