import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedArtworkLikes1731863200995 implements MigrationInterface {
  name = 'AddedArtworkLikes1731863200995'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artwork" ADD "likes" integer NOT NULL DEFAULT '0'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "likes"`);
  }

}
