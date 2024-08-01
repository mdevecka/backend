export interface ExhibitionDto {
  id: string;
  fromDate: string;
  toDate: string;
  curator: string;
  gallery: {
    id: string;
    name: string;
    description: string;
    street: string;
    city: string;
    postcode: string;
    gps: string;
  }
  active: boolean;
}
