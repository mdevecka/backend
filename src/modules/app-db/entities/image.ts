import { Column } from "typeorm";
import { MimeType } from '@common/helpers';

export class Image {

  static get empty() { return new Image(); }

  @Column({ type: "bytea", nullable: true, select: false })
  buffer: Buffer = null;

  @Column({ type: "text", nullable: true })
  mimeType: MimeType = null;

}
