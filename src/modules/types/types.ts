export interface IProduct {
  [key: string]: number | string | TAge | Array<string>;
  id: number;
  key: string;
  title: string;
  description: string;
  priceByn: number;
  stock: number;
  theme: string;
  interests: string;
  detailsCount: number;
  age: TAge;
  thumbnail: string;
  images: Array<string>;
}

export type TAge = { minAge: number; maxAge: number };

export type Tfilters = {
  theme: Array<string>;
  interests: Array<string>;
  pieces: Array<number>;
  price: Array<number>;
  [key: string]: Array<string> | Array<number>;
};

export type TPagination = {
  [key: string]: number;
};
