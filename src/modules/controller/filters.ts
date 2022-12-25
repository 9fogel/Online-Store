import products from '../data/products.json';
import { filtersT } from '../types/types';

// const filters = {
//   theme: [],
//   interests: [],
//   priceByn: [],
//   age: [],
// };

class Filters {
  static filters: filtersT = {
    theme: [],
    interests: [],
    details: [],
    price: [],
  };

  fillFilters() {
    console.log(products);

    const themeArr = Array.from(new Set(products.products.map((el) => el.theme)));
    themeArr.sort((a: string, b: string) => a.localeCompare(b));
    Filters.filters.theme = [...themeArr];
    // console.log(themeArr);

    const interestsArr = Array.from(new Set(products.products.map((el) => el.interests)));
    interestsArr.sort((a: string, b: string) => a.localeCompare(b));
    Filters.filters.interests = [...interestsArr];
    // console.log(interestsArr);

    // const ageArr = Array.from(
    //   new Set(products.products.map((el) => el.age.minAge).concat(products.products.map((el) => el.age.maxAge))),
    // );
    // console.log(ageArr.sort((a: number, b: number) => a - b));
    // Filters.filters.age = [...ageArr];

    const detailsArr = Array.from(new Set(products.products.map((el) => el.detailsCount)));
    detailsArr.sort((a: number, b: number) => a - b);
    Filters.filters.details = [...detailsArr];
    // console.log(detailsArr);

    const priceArr = Array.from(new Set(products.products.map((el) => el.priceByn)));
    priceArr.sort((a: number, b: number) => a - b);
    Filters.filters.price = [...priceArr];
    // console.log(priceArr);

    // console.log(Filters.filters);
  }
}

export default Filters;
