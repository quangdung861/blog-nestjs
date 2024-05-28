import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultValForRefreshTokenInUserTable1715673945648 implements MigrationInterface {
    name = 'SetDefaultValForRefreshTokenInUserTable1715673945648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NOT NULL`);
    }

}
