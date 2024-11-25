import { IsString } from 'class-validator';

export class AddArtworkLikeDto {

  @IsString()
  slug: string;

}