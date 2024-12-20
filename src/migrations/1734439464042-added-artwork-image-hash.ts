import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedArtworkImageHash1734439464042 implements MigrationInterface {
  name = 'AddedArtworkImageHash1734439464042'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artwork" ADD "image_hash" text`);
    await queryRunner.query(`CREATE INDEX "IDX_bdf4467a6f30dc3fee4daf0310" ON "artwork" ("image_hash") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_bdf4467a6f30dc3fee4daf0310"`);
    await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "image_hash"`);
  }

}
