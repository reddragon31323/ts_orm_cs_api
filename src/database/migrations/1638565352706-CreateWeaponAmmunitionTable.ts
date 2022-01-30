import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateWeaponAmmunitionTable1638565352706 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_weapon_ammunition',
            columns:[
                {
                    name: 'weapon_id',
                    type: 'int',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'ammunition_id',
                    type:'int',
                    isPrimary: true,
                    isNullable: false
                }
            ]
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'tb_weapon_ammunition',
            new TableForeignKey({
                name: 'fk_weapon_ammunition_a',
                columnNames: ['weapon_id'],
                referencedTableName: 'tb_artefact',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.createForeignKey(
            'tb_weapon_ammunition',
            new TableForeignKey({
                name: 'fk_tb_weapon_ammunition_m',
                columnNames: ['ammunition_id'],
                referencedTableName: 'tb_artefact',
                referencedColumnNames: ['id']
            })
        );
        await queryRunner.dropForeignKey('tb_weapon_ammunition', "fk_weapon_ammunition_a");
        await queryRunner.dropForeignKey('tb_weapon_ammunition', "fk_tb_weapon_ammunition_m");
        await queryRunner.dropTable('tb_weapon_ammunition');
    }

}
