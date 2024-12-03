import { MigrationInterface, QueryRunner } from "typeorm";

export class ArtworkAiChanges1733133698841 implements MigrationInterface {
  name = 'ArtworkAiChanges1733133698841'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artwork" ADD "ai_processing" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`CREATE TYPE "public"."artwork_ai_generated_status_enum" AS ENUM('not-generated', 'generated', 'generated-protected')`);
    await queryRunner.query(`ALTER TABLE "artwork" ADD "ai_generated_status" "public"."artwork_ai_generated_status_enum" NOT NULL DEFAULT 'not-generated'`);
    await queryRunner.query(`CREATE TYPE "public"."artwork_ai_duplicate_status_enum" AS ENUM('ok', 'exists', 'plagiarized')`);
    await queryRunner.query(`ALTER TABLE "artwork" ADD "ai_duplicate_status" "public"."artwork_ai_duplicate_status_enum" NOT NULL DEFAULT 'ok'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "ai_duplicate_status"`);
    await queryRunner.query(`DROP TYPE "public"."artwork_ai_duplicate_status_enum"`);
    await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "ai_generated_status"`);
    await queryRunner.query(`DROP TYPE "public"."artwork_ai_generated_status_enum"`);
    await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "ai_processing"`);
  }

}
