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

  fillSlider(
    sliderMin: HTMLInputElement,
    sliderMax: HTMLInputElement,
    fillColor: string,
    bgColor: string,
    controlSlider: HTMLInputElement,
  ) {
    const rangeDistance = +sliderMax.max - +sliderMax.min;
    const fromPosition = +sliderMin.value - +sliderMin.min;
    const toPosition = +sliderMax.value - +sliderMax.min;

    controlSlider.style.background = `linear-gradient(
      to right,
      ${bgColor} 0%,
      ${bgColor} ${(fromPosition / rangeDistance) * 100}%,
      ${fillColor} ${(fromPosition / rangeDistance) * 100}%,
      ${fillColor} ${(toPosition / rangeDistance) * 100}%,
      ${bgColor} ${(toPosition / rangeDistance) * 100}%,
      ${bgColor} 100%)`;
  }

  setToggle(currentTarget: HTMLInputElement, sliderMax: HTMLInputElement, minValue: number) {
    if (Number(currentTarget.value) <= minValue) {
      sliderMax.style.zIndex = '2';
    } else {
      sliderMax.style.zIndex = '0';
    }
  }

  getValues(currentMin: HTMLInputElement, currentMax: HTMLInputElement) {
    const from = parseInt(currentMin.value, 10);
    const to = parseInt(currentMax.value, 10);
    return [from, to];
  }

  handleSliderMin(sliderMin: HTMLInputElement, sliderMax: HTMLInputElement, valueMin: HTMLSpanElement) {
    const [from, to] = this.getValues(sliderMin, sliderMax);
    this.fillSlider(sliderMin, sliderMax, 'orange', '#C6C6C6', sliderMax);
    if (from > to) {
      sliderMin.value = to.toString();
      valueMin.textContent = to.toString();
    } else {
      valueMin.textContent = from.toString();
    }
  }

  handleSliderMax(
    sliderMin: HTMLInputElement,
    sliderMax: HTMLInputElement,
    valueMax: HTMLSpanElement,
    minValue: number,
  ) {
    const [from, to] = this.getValues(sliderMin, sliderMax);
    this.fillSlider(sliderMin, sliderMax, 'orange', '#C6C6C6', sliderMax);
    this.setToggle(sliderMax, sliderMax, minValue);
    if (from <= to) {
      sliderMax.value = to.toString();
      valueMax.textContent = to.toString();
    } else {
      valueMax.textContent = from.toString();
      sliderMax.value = from.toString();
    }
  }

  enableDualSliders(sliderMin: HTMLInputElement, sliderMax: HTMLInputElement, minValue: number) {
    this.fillSlider(sliderMin, sliderMax, 'orange', '#C6C6C6', sliderMax);
    this.setToggle(sliderMax, sliderMax, minValue);
  }
}

export default Filters;
