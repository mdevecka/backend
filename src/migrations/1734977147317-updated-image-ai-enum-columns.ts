import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedImageAiEnumColumns1734977147317 implements MigrationInterface {
  name = 'UpdatedImageAiEnumColumns1734977147317'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."artwork_ai_generated_status_enum" AS ENUM('NOT_GENERATED', 'GENERATED', 'GENERATED_PROTECTED')`);
    await queryRunner.query(`ALTER TABLE "artwork" ADD "ai_generated_status" "public"."artwork_ai_generated_status_enum" NOT NULL DEFAULT 'NOT_GENERATED'`);
    await queryRunner.query(`CREATE TYPE "public"."artwork_ai_duplicate_status_enum" AS ENUM('OK', 'EXISTS', 'PLAGIARIZED')`);
    await queryRunner.query(`ALTER TABLE "artwork" ADD "ai_duplicate_status" "public"."artwork_ai_duplicate_status_enum" NOT NULL DEFAULT 'OK'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "ai_duplicate_status"`);
    await queryRunner.query(`DROP TYPE "public"."artwork_ai_duplicate_status_enum"`);
    await queryRunner.query(`ALTER TABLE "artwork" DROP COLUMN "ai_generated_status"`);
    await queryRunner.query(`DROP TYPE "public"."artwork_ai_generated_status_enum"`);
  }

}
