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

export type filtersT = {
  theme: Array<string>;
  interests: Array<string>;
  age: Array<number>;
  price: Array<number>;
};
