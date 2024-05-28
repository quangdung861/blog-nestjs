import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDescriptionToLongText1716780646482 implements MigrationInterface {
    name = 'ChangeDescriptionToLongText1716780646482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
