import { Column } from "typeorm";

export class Image {

  @Column({ type: "bytea", nullable: true })
  buffer: Buffer;

  @Column({ type: "text", nullable: true })
  mimeType: string;

}
