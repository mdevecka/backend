import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedGalleryThumbnail1734106565350 implements MigrationInterface {
  name = 'AddedGalleryThumbnail1734106565350'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gallery" ADD "thumbnail_buffer" bytea`);
    await queryRunner.query(`ALTER TABLE "gallery" ADD "thumbnail_mime_type" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "thumbnail_mime_type"`);
    await queryRunner.query(`ALTER TABLE "gallery" DROP COLUMN "thumbnail_buffer"`);
  }

}
