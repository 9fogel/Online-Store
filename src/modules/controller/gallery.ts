import Product from './product';

class Gallery {
  static items: Array<Product> = [];

  static getUniqueItems() {
    for (let i = 0; i < 30; i++) {
      const item = new Product(i);
      this.items.push(item);
    }
    return this.items;
  }
}

// const gallery = function () {
//   const galleryArr = new Set();
//   for (let i = 0; i < 30; i++) {
//     const item = new Product(i);
//     galleryArr.add(item);
//   }
//   return galleryArr;
// };

// export default gallery;

export default Gallery;
