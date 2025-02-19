import { Column, Index } from "typeorm";
import { ID, MimeType } from '@common/helpers';

export type ArtworkImageId = ID<"ArtworkImage">;

export class ArtworkImage {

  static get empty() { return new ArtworkImage(); }

  @Index()
  @Column("uuid", { nullable: true })
  id: ArtworkImageId = null;

  @Column({ type: "bytea", nullable: true, select: false })
  buffer: Buffer = null;

  @Column({ type: "text", nullable: true })
  mimeType: MimeType = null;

}
