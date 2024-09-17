import { OptionDto } from './option.dto';

export interface ArtistArtworkDto {
  id: string;
  name: string;
  description: string;
  artist: {
    id: string;
    name: string;
    born: string;
    biography: string;
  };
  year: string;
  nftId: string;
  ai: boolean;
  tags: string;
  artworkGenre: OptionDto;
  artworkWorktype: OptionDto;
  artworkMaterial: OptionDto;
  artworkTechnique: OptionDto;
  measurements: string;
  width: number;
  height: number;
  public: boolean;
}
