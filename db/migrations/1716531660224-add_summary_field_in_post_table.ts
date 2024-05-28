import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSummaryFieldInPostTable1716531660224 implements MigrationInterface {
    name = 'AddSummaryFieldInPostTable1716531660224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }

}
