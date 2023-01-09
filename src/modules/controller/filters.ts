import products from '../data/products.json';
import { Tfilters, IProduct } from '../types/types';
import Gallery from './gallery';
import { IFilters } from './controller-i';

class Filters implements IFilters {
  static filters: Tfilters = {
    theme: [],
    interests: [],
    pieces: [],
    price: [],
  };

  public fillFilters(): void {
    const themeArr: Array<string> = Array.from(new Set(products.products.map((el: IProduct): string => el.theme)));
    themeArr.sort((a: string, b: string): number => a.localeCompare(b));
    Filters.filters.theme = [...themeArr];

    const interestsArr: Array<string> = Array.from(
      new Set(products.products.map((el: IProduct): string => el.interests)),
    );
    interestsArr.sort((a: string, b: string): number => a.localeCompare(b));
    Filters.filters.interests = [...interestsArr];

    const detailsArr: Array<number> = Array.from(
      new Set(products.products.map((el: IProduct): number => el.detailsCount)),
    );
    detailsArr.sort((a: number, b: number): number => a - b);
    Filters.filters.pieces = [...detailsArr];

    const priceArr: Array<number> = Array.from(new Set(products.products.map((el: IProduct): number => el.priceByn)));
    priceArr.sort((a: number, b: number): number => a - b);
    Filters.filters.price = [...priceArr];
  }

  public fillSlider(
    sliderMin: HTMLInputElement,
    sliderMax: HTMLInputElement,
    fillColor: string,
    bgColor: string,
    controlSlider: HTMLInputElement,
  ): void {
    const rangeDistance: number = +sliderMax.max - +sliderMax.min;
    const fromPosition: number = +sliderMin.value - +sliderMin.min;
    const toPosition: number = +sliderMax.value - +sliderMax.min;

    controlSlider.style.background = `linear-gradient(
      to right,
      ${bgColor} 0%,
      ${bgColor} ${(fromPosition / rangeDistance) * 100}%,
      ${fillColor} ${(fromPosition / rangeDistance) * 100}%,
      ${fillColor} ${(toPosition / rangeDistance) * 100}%,
      ${bgColor} ${(toPosition / rangeDistance) * 100}%,
      ${bgColor} 100%)`;
  }

  public getValues(currentMin: HTMLInputElement, currentMax: HTMLInputElement): Array<number> {
    const from = parseInt(currentMin.value, 10);
    const to = parseInt(currentMax.value, 10);

    return [from, to];
  }

  public handleSliderMin(sliderMin: HTMLInputElement, sliderMax: HTMLInputElement, valueMin: HTMLSpanElement): void {
    const [from, to]: Array<number> = this.getValues(sliderMin, sliderMax);
    this.fillSlider(sliderMin, sliderMax, 'orange', '#C6C6C6', sliderMax);
    if (from > to) {
      sliderMin.value = to.toString();
      valueMin.textContent = to.toString();
    } else {
      valueMin.textContent = from.toString();
    }
  }

  public handleSliderMax(
    sliderMin: HTMLInputElement,
    sliderMax: HTMLInputElement,
    valueMax: HTMLSpanElement,
    minValue: number,
  ): void {
    const [from, to]: Array<number> = this.getValues(sliderMin, sliderMax);
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

  public enableDualSliders(sliderMin: HTMLInputElement, sliderMax: HTMLInputElement, minValue: number): void {
    this.fillSlider(sliderMin, sliderMax, 'orange', '#C6C6C6', sliderMax);
    this.setToggle(sliderMax, sliderMax, minValue);
  }

  public getStoreFiltered(event: Event): Array<IProduct> | undefined {
    if (event.target instanceof Element) {
      if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'SELECT') return;

      if (event.target instanceof HTMLInputElement) {
        if (!event.target.hasAttribute('checked') && event.target.type === 'checkbox') {
          event.target.setAttribute('checked', 'true');
        } else {
          event.target.removeAttribute('checked');
        }
      }

      return Gallery.getFilteredItems(event);
    }
  }

  private setToggle(currentTarget: HTMLInputElement, sliderMax: HTMLInputElement, minValue: number): void {
    if (Number(currentTarget.value) <= minValue) {
      sliderMax.style.zIndex = '2';
    } else {
      sliderMax.style.zIndex = '0';
    }
  }
}

export default Filters;
