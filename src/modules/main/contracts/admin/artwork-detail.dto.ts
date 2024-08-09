import { OptionDto } from './option.dto';

export interface ArtworkDetailDto {
  id: string;
  name: string;
  description: string;
  artist: {
    id: string;
    name: string;
    born: string;
    biography: string;
  };
  imageUrl: string;
  year: string;
  artworkGenre: OptionDto;
  artworkWorktype: OptionDto;
  artworkCategory: OptionDto;
  artworkMaterial: OptionDto;
  artworkTechnique: OptionDto;
  measurements: string;
  width: number;
  height: number;
  active: boolean;
}
