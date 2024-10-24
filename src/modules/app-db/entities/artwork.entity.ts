import { Entity, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn, AfterLoad, BeforeInsert, BeforeUpdate, Index } from 'typeorm';
import { LabeledEntity } from './labeled.entity';
import { Artist, ArtistId } from './artist.entity';
import { Exhibition } from './exhibition.entity';
import { ArtworkGenre, ArtworkGenreId } from './artwork-genre.entity';
import { ArtworkMaterial, ArtworkMaterialId } from './artwork-material.entity';
import { ArtworkWorktype, ArtworkWorktypeId } from './artwork-worktype.entity';
import { ArtworkTechnique, ArtworkTechniqueId } from './artwork-technique.entity';
import { Nft, NftId } from './nft.entity';
import { Image } from './image';
import { ArtworkImage } from './artwork-image';
import { ID } from '@common/helpers';
import * as sharp from 'sharp';

export type ArtworkId = ID<"Artwork">;

export enum AiMode {
  Automatic = 'automatic',
  Manual = 'manual',
}

async function createUnityImage(image: Buffer, maxSize: number) {
  const sharpImage = sharp(image);
  const meta = await sharpImage.metadata();
  const maxDim = Math.max(meta.width, meta.height);
  if (maxDim <= maxSize)
    return image;
  const opt: sharp.ResizeOptions = (meta.width > meta.height) ? { width: maxSize } : { height: maxSize };
  return sharpImage.resize(opt).toFormat('jpg').toBuffer();
}

async function createThumbnail(image: Buffer) {
  return sharp(image).resize({ width: 480 }).toFormat('jpg').toBuffer();
}

const unityTextureSize = 2048;

@Entity()
@Index(['name', 'artistId'], { unique: true })
@Index(['label', 'artistId'], { unique: true })
export class Artwork extends LabeledEntity {

  private _lastImage: Buffer;

  id: ArtworkId;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Artist, { onDelete: 'CASCADE' })
  artist: Artist;

  @Column({ nullable: true })
  artistId: ArtistId;

  @Column(() => ArtworkImage)
  image: Image;

  @Column(() => ArtworkImage)
  protectedImage: Image;

  @Column(() => Image)
  unityImage: Image;

  @Column(() => Image)
  thumbnail: Image;

  @Column('text', { nullable: true })
  year: string;

  @Column({ type: 'boolean', default: false })
  ai: boolean;

  @Column({ type: "enum", enum: AiMode, default: AiMode.Automatic })
  aiMode: AiMode;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @ManyToOne(() => ArtworkGenre, { nullable: true })
  artworkGenre: ArtworkGenre;

  @Column({ nullable: true })
  artworkGenreId: ArtworkGenreId;

  @ManyToOne(() => ArtworkMaterial, { nullable: true })
  artworkMaterial: ArtworkMaterial;

  @Column({ nullable: true })
  artworkMaterialId: ArtworkMaterialId;

  @ManyToOne(() => ArtworkTechnique, { nullable: true })
  artworkTechnique: ArtworkTechnique;

  @Column({ nullable: true })
  artworkTechniqueId: ArtworkTechniqueId;

  @ManyToOne(() => ArtworkWorktype, { nullable: true })
  artworkWorktype: ArtworkWorktype;

  @Column({ nullable: true })
  artworkWorktypeId: ArtworkWorktypeId;

  @ManyToMany(() => Exhibition, ex => ex.artworks, { onDelete: 'CASCADE' })
  exhibitions: Exhibition[];

  @Column('text', { nullable: true })
  measurements: string;

  @Column('integer', { nullable: true })
  width: number;

  @Column('integer', { nullable: true })
  height: number;

  @Column({ type: 'boolean', default: false })
  public: boolean

  @OneToOne(() => Nft, nft => nft.artwork, { nullable: true })
  @JoinColumn()
  nft: Nft;

  @Column({ nullable: true })
  nftId: NftId;

  @Column('int', { nullable: true })
  importId: number;

  @AfterLoad()
  afterLoad() {
    this._lastImage = this.image?.buffer;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async updateImageData() {
    const buffer = this.protectedImage?.buffer ?? this.image?.buffer;
    if (buffer != this._lastImage) {
      if (buffer != null) {
        const imageInfo = await sharp(buffer).metadata();
        this.thumbnail = { buffer: await createThumbnail(buffer), mimeType: "image/jpeg" };
        this.unityImage = { buffer: await createUnityImage(buffer, unityTextureSize), mimeType: "image/jpeg" };
        this.width = imageInfo.width;
        this.height = imageInfo.height;
      } else {
        this.thumbnail = Image.empty;
        this.unityImage = Image.empty;
        this.width = null;
        this.height = null;
      }
      this._lastImage = buffer;
    }
  }

}
