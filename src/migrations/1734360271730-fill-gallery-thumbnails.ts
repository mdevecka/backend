import { MigrationInterface, QueryRunner } from "typeorm";
import { createThumbnail } from '@common/helpers';

interface Gallery {
  id: string;
  image_buffer: Buffer;
  image_mime_type: string;
}

export class FillGalleryThumbnails1734360271730 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const galleries: Gallery[] = await queryRunner.query(`SELECT id, image_buffer, image_mime_type FROM "gallery"`);
    for (const gallery of galleries) {
      const buffer = gallery.image_buffer;
      const thumbnail = (buffer != null) ? await createThumbnail(buffer) : null;
      const mimeType = (buffer != null) ? "image/jpeg" : null;
      await queryRunner.query(`UPDATE "gallery" SET thumbnail_buffer = $1, thumbnail_mime_type = $2 WHERE id = $3`, [thumbnail, mimeType, gallery.id]);
    }
  }

  public async down(): Promise<void> {
  }

}
