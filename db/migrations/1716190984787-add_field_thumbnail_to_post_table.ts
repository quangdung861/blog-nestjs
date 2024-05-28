import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldThumbnailToPostTable1716190984787 implements MigrationInterface {
    name = 'AddFieldThumbnailToPostTable1716190984787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`thumbnail\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`thumbnail\``);
    }

}
