export interface ArtworkExhibitionDto {
  id: string;
  name: string
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    id: string;
    name: string;
  }
  public: boolean;
}
