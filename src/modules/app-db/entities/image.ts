import { Column } from "typeorm";

export class Image {

  @Column({ type: "bytea" })
  buffer: Buffer;

  @Column({ type: "text" })
  mimeType: string;

}
