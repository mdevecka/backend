import { OptionDto } from '@common/helpers';
import { ArtistId, ArtworkId, NftId, ArtworkGenreId, ArtworkWorktypeId, ArtworkMaterialId, ArtworkTechniqueId } from '@modules/app-db/entities';

export interface ArtworkDetailDto {
  id: ArtworkId;
  name: string;
  description: string;
  artist: {
    id: ArtistId;
    name: string;
    born: string;
    biography: string;
  };
  year: string;
  nftId: NftId;
  ai: boolean;
  tags: string;
  artworkGenre: OptionDto<ArtworkGenreId>;
  artworkWorktype: OptionDto<ArtworkWorktypeId>;
  artworkMaterial: OptionDto<ArtworkMaterialId>;
  artworkTechnique: OptionDto<ArtworkTechniqueId>;
  measurements: string;
  width: number;
  height: number;
  public: boolean;
}
