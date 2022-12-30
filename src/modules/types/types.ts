export interface IProduct {
  [key: string]: number | string | AgeT | Array<string>;
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
  details: Array<number>;
  price: Array<number>;
};

export enum Actions {
  Add = 'add',
  Delete = 'delete',
}
