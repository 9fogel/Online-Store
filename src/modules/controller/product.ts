import products from '../data/products.json';

export default class Product {
  id: number;
  key: string;
  title: string;
  description: string;
  priceByn: number;
  stock: number;
  theme: string;
  interests: string;
  detailsCount: number;
  minAge: number;
  maxAge: number;
  thumbnail: string;
  images: Array<string>;

  constructor(index: number) {
    this.id = products.products[index].id;
    this.key = products.products[index].key;
    this.title = products.products[index].title;
    this.description = products.products[index].description;
    this.priceByn = products.products[index].priceByn;
    this.stock = products.products[index].stock;
    this.theme = products.products[index].theme;
    this.interests = products.products[index].interests;
    this.detailsCount = products.products[index].detailsCount;
    this.minAge = products.products[index].age.minAge;
    this.maxAge = products.products[index].age.maxAge;
    this.thumbnail = products.products[index].thumbnail;
    this.images = products.products[index].images;
  }

  // static getProduct(searchID: number) {
  //   const product = Array.from(new Set(products.products.filter((el) => el.id == searchID)));
  //   return product[0];
  // }

  // static amount = products.total;
}
