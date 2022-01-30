import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePurchaseItemsTable1642698839992 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_purchase_items',
            columns:[
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'quantity',
                    type: 'numeric(10,2)',
                    isNullable: true,
                    default: 0
                },
                {
                    name: 'value',
                    type: 'numeric(10,2)',
                    isNullable: true,
                    default: 0
                },
                {
                    name: 'purchase_id',
                    type: 'int',
                    isNullable: false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_purchase_items',
            new TableForeignKey({
                name: 'fk_purchaseitems_purchase',
                columnNames: ['purchase_id'],
                referencedTableName: 'tb_purchase',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_purchase_items', 'fk_purchaseitems_purchase');
        await queryRunner.dropTable('tb_purchase_items');
    }

}
