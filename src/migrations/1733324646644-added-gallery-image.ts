import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedGalleryImage1733324646644 implements MigrationInterface {
  name = 'AddedGalleryImage1733324646644'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gallery" ADD "image_buffer" bytea`);
    await queryRunner.query(`ALTER TABLE "gallery" ADD "image_mime_type" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "image_mime_type"`);
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "image_buffer"`);
  }

}
