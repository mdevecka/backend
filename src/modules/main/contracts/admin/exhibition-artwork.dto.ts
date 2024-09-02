import { Nft } from '@modules/app-db/entities';
import { OptionDto } from './option.dto';

export interface ExhibitionArtworkDto {
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
  nft: Nft;
  ai: boolean;
  tags: string;
  artworkGenre: OptionDto;
  artworkWorktype: OptionDto;
  artworkMaterial: OptionDto;
  artworkTechnique: OptionDto;
  measurements: string;
  width: number;
  height: number;
  active: boolean;
}
