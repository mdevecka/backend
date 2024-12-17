import { MigrationInterface, QueryRunner } from "typeorm";

export class EnsureArtworkImageId1734359609058 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "artwork" SET image_id = NULL WHERE image_buffer IS NULL`);
    await queryRunner.query(`UPDATE "artwork" SET image_id = gen_random_uuid() WHERE image_buffer IS NOT NULL AND image_id IS NULL`);
  }

  public async down(): Promise<void> {
  }

}
