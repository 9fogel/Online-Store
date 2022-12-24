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
    age: [],
    price: [],
  };

  fillFilters() {
    console.log(products);

    const themeArr = Array.from(new Set(products.products.map((el) => el.theme)));
    console.log(themeArr.sort((a: string, b: string) => a.localeCompare(b)));
    Filters.filters.theme = [...themeArr];

    const interestsArr = Array.from(new Set(products.products.map((el) => el.interests)));
    console.log(interestsArr.sort((a: string, b: string) => a.localeCompare(b)));
    Filters.filters.interests = [...interestsArr];

    const ageArr = Array.from(
      new Set(products.products.map((el) => el.age.minAge).concat(products.products.map((el) => el.age.maxAge))),
    );
    console.log(ageArr.sort((a: number, b: number) => a - b));
    Filters.filters.age = [...ageArr];

    const priceArr = Array.from(new Set(products.products.map((el) => el.priceByn)));
    console.log(priceArr.sort((a: number, b: number) => a - b));
    Filters.filters.price = [...priceArr];

    // console.log(Filters.filters);
  }
}

export default Filters;
