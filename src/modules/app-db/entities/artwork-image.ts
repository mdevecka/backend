import { Column } from "typeorm";

export class ArtworkImage {

  static get empty() { return new Image(); }

  @Column("uuid", { nullable: true })
  id: string;

  @Column({ type: "bytea", nullable: true, select: false })
  buffer: Buffer = null;

  @Column({ type: "text", nullable: true })
  mimeType: string = null;

}
