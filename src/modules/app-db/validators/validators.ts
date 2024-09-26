import { createExistsValidator } from './utils';

export const UserExists = createExistsValidator((repo, id) => repo.userExists(id), "user does not exist");

export const CountryExists = createExistsValidator((repo, id) => repo.countryExists(id), "country does not exist");

export const ArtistCategoryExists = createExistsValidator((repo, id) => repo.artistCategoryExists(id), "artist category does not exist");

export const ArtworkGenreExists = createExistsValidator((repo, id) => repo.artworkGenreExists(id), "artwork genre does not exist");

export const ArtworkWorktypeExists = createExistsValidator((repo, id) => repo.artworkWorktypeExists(id), "artwork worktype does not exist");

export const ArtworkMaterialExists = createExistsValidator((repo, id) => repo.artworkMaterialExists(id), "artwork material does not exist");

export const ArtworkTechniqueExists = createExistsValidator((repo, id) => repo.artworkTechniqueExists(id), "artwork technique does not exist");

export const ItemTypeExists = createExistsValidator((repo, id) => repo.itemTypeExists(id), "item type does not exist");
