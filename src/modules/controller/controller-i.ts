import { IProduct } from '../types/types';

export interface IFilters {
  fillFilters(): void;
  fillSlider(
    sliderMin: HTMLInputElement,
    sliderMax: HTMLInputElement,
    fillColor: string,
    bgColor: string,
    controlSlider: HTMLInputElement,
  ): void;
  getValues(currentMin: HTMLInputElement, currentMax: HTMLInputElement): Array<number>;
  handleSliderMin(sliderMin: HTMLInputElement, sliderMax: HTMLInputElement, valueMin: HTMLSpanElement): void;
  handleSliderMax(
    sliderMin: HTMLInputElement,
    sliderMax: HTMLInputElement,
    valueMax: HTMLSpanElement,
    minValue: number,
  ): void;
  enableDualSliders(sliderMin: HTMLInputElement, sliderMax: HTMLInputElement, minValue: number): void;
  getStoreFiltered(event: Event): Array<IProduct> | undefined;
}
