import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNftLabel1732203363585 implements MigrationInterface {
  name = 'AddedNftLabel1732203363585'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "nft" ADD "label" text`);
    await queryRunner.query(`CREATE INDEX "IDX_ce5b67ac864d23e38053ae87d4" ON "nft" ("label") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_ce5b67ac864d23e38053ae87d4"`);
    await queryRunner.query(`ALTER TABLE "nft" DROP COLUMN "label"`);
  }

}
