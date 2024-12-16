import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTokenExpirationDates1733990205458 implements MigrationInterface {
  name = 'AddedTokenExpirationDates1733990205458'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "register_token_expiration" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(`ALTER TABLE "user" ADD "reset_token_expiration" TIMESTAMP WITH TIME ZONE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token_expiration"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "register_token_expiration"`);
  }

}
