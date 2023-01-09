import { IProduct } from '../../types/types';

export interface IErrorPage {
  render(): HTMLElement;
}

export interface IProductPage {
  render(item?: IProduct, id?: number): HTMLElement;
}

export interface ICartPage {
  renderCartGalleryHeader(): HTMLDivElement;
  drawCardCart(): void;
  render(): HTMLElement;
}
