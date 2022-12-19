export interface IProduct {
  id: number;
  key: string;
  title: string;
  description: string;
  priceByn: number;
  stock: number;
  theme: string;
  interests: string;
  detailsCount: number;
  age: AgeT;
  thumbnail: string;
  images: Array<string>;
}

export type AgeT = { minAge: number; maxAge: number };
