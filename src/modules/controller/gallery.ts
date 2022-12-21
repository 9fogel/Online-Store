import Product from './product';

const gallery = function () {
  const galleryArr = new Set();
  for (let i = 0; i < 30; i++) {
    const item = new Product(i);
    galleryArr.add(item);
  }
  return galleryArr;
};

export default gallery;
