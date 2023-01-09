import { IProduct } from '../types/types';
import products from '../data/products.json';
import Refresher from './refresher';
import Popup from './popup';

class Cart {
  static itemsID: Array<number> = [];

  public static addItem(id: number): void {
    Cart.refresh();
    if (this.getProductAmount(id) < this.getProduct(id).stock) {
      this.itemsID.push(id);
      localStorage.setItem('cart', this.itemsID.join(','));
    } else Popup.renderPopup('Sorry. Not enough goods', 5000, 'no_goods');
    Refresher.refreshHeader();
    Refresher.refreshCart();
  }

  public static removeItem(id: number): void {
    const index: number = this.itemsID.indexOf(id);
    this.itemsID.splice(index, 1);
    localStorage.setItem('cart', this.itemsID.join(','));
    Refresher.refreshHeader();
    Refresher.refreshCart();
  }

  public static removeProduct(id: number): void {
    while (Cart.getProductAmount(id) > 0) {
      const index: number = this.itemsID.indexOf(id);
      this.itemsID.splice(index, 1);
      localStorage.setItem('cart', this.itemsID.join(','));
    }
    Refresher.refreshHeader();
  }

  public static removeAll(): void {
    this.itemsID = [];
    localStorage.removeItem('cart');
    Refresher.refreshHeader();
    Refresher.refreshCart();
  }

  public static getItems(): Array<number> {
    Cart.refresh();

    return this.itemsID;
  }

  public static getUniqueItems(): Array<IProduct> {
    Cart.refresh();
    const uniqueItemsID: Array<number> = Array.from(new Set(this.itemsID));
    const uniqueItems: Array<IProduct> = [];
    uniqueItemsID.forEach((el: number): void => {
      const add: IProduct = Cart.getProduct(el);
      uniqueItems.push(add);
    });

    return uniqueItems;
  }

  public static getAmount(): number {
    Cart.refresh();

    return this.itemsID.length;
  }

  public static getUniqueAmount(): number {
    Cart.refresh();
    const uniqueItems: Array<number> = Array.from(new Set(this.itemsID));

    return uniqueItems.length;
  }

  public static getProductAmount(id: number): number {
    Cart.refresh();
    let amount = 0;
    Cart.itemsID.forEach((el: number): void => {
      if (el === id) amount++;
    });

    return amount;
  }

  public static getTotal(): number {
    Cart.refresh();
    let total = 0;
    Cart.itemsID.forEach((el: number) => (total += Cart.getProduct(el).priceByn));

    return +total.toFixed(2);
  }

  public static getPromoTotal(couponAmount: number): number {
    Cart.refresh();
    const total: number = Cart.getTotal();
    const discount: number = couponAmount * 0.1;

    return +((1 - discount) * total).toFixed(2);
  }

  public static getProduct(searchID: number): IProduct {
    const product: Array<IProduct> = Array.from(new Set(products.products.filter((el: IProduct) => el.id == searchID)));

    return product[0];
  }

  public static countPages(inputValue: number): number {
    const pagesCount: number = Math.ceil(Cart.getUniqueItems().length / inputValue);

    return pagesCount;
  }

  private static refresh() {
    const cartArr: string | null = localStorage.getItem('cart');
    if (cartArr === null) {
      this.itemsID = [];
    }
    if (cartArr) {
      this.itemsID = [];
      const arr: Array<string> = cartArr.split(',');
      arr.forEach((el: string): number => this.itemsID.push(+el));
    }
  }
}

export default Cart;
