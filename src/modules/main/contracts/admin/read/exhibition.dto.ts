export interface ExhibitionDto {
  id: string;
  name: string;
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    id: string;
    name: string;
    description: string;
    address: string;
    gps: string;
  }
  public: boolean;
}
