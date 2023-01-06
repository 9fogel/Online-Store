import { IProduct } from '../types/types';
import products from '../data/products.json';
import Refresher from './refresher';

class Cart {
  static itemsID: Array<number> = [];

  public static addItem(id: number): void {
    Cart.refresh();
    if (this.getProductAmount(id) < this.getProduct(id).stock) {
      this.itemsID.push(id);
      localStorage.setItem('cart', this.itemsID.join(','));
    } else {
      console.log('not enough goods');
    }
    Refresher.refreshHeader();
    Refresher.refreshCart();
  }

  public static removeItem(id: number): void {
    const index = this.itemsID.indexOf(id);
    this.itemsID.splice(index, 1);
    localStorage.setItem('cart', this.itemsID.join(','));
    Refresher.refreshHeader();
    Refresher.refreshCart();
  }

  public static removeProduct(id: number): void {
    console.log('remove');
    while (Cart.getProductAmount(id) > 0) {
      console.log(Cart.getProductAmount(id));
      const index = this.itemsID.indexOf(id);
      this.itemsID.splice(index, 1);
      localStorage.setItem('cart', this.itemsID.join(','));
    }
    Refresher.refreshHeader();
  }

  public static removeAll(): void {
    this.itemsID = [];
    localStorage.removeItem('cart');
    Refresher.refreshHeader();
  }

  public static getItems(): Array<number> {
    Cart.refresh();

    return this.itemsID;
  }

  public static getUniqueItems(): Array<IProduct> {
    Cart.refresh();
    const uniqueItemsID = Array.from(new Set(this.itemsID));
    const uniqueItems: IProduct[] = [];
    uniqueItemsID.forEach((el: number): void => {
      const add = Cart.getProduct(el);
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
    const uniqueItems = Array.from(new Set(this.itemsID));

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
    Cart.itemsID.forEach((el) => (total += Cart.getProduct(el).priceByn));

    return total;
  }

  public static getProduct(searchID: number): IProduct {
    const product = Array.from(new Set(products.products.filter((el) => el.id == searchID)));

    return product[0];
  }

  private static refresh() {
    const cartArr = localStorage.getItem('cart');
    if (cartArr === null) {
      this.itemsID = [];
    }
    if (cartArr) {
      this.itemsID = [];
      const arr = cartArr.split(',');
      arr.forEach((el: string): number => this.itemsID.push(+el));
    }
  }

  static countPages(inputValue: number) {
    console.log(inputValue);
    const pagesCount = Math.ceil(Cart.getUniqueItems().length / inputValue);
    console.log('total pages', pagesCount);

    return pagesCount;
  }

  // static productsOnPage() {
  //   const input: Element | null = document.querySelector('.cart_pagination_input');
  //   if (input) {
  //     const count = input.ariaValueMax;
  //     return count;
  //   }
  // }
}

export default Cart;
