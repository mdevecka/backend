import { Column } from "typeorm";

export class Image {

  static get empty() { return new Image(); }

  @Column({ type: "bytea", nullable: true })
  buffer: Buffer = null;

  @Column({ type: "text", nullable: true })
  mimeType: string = null;

}
