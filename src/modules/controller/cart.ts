// import Product from './product';
import { IProduct } from '../types/types';

class Cart {
  // static items: Array<Product> = [];
  static items: Array<IProduct> = [];
  static addItem(item: IProduct): void {
    this.items.push(item);
  }
  static removeItem(item: IProduct) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }
  static removeAll() {
    this.items = [];
  }
  static getItems() {
    return this.items;
  }
  static getUniqueItems() {
    const uniqueItems = Array.from(new Set(this.items));
    return uniqueItems;
  }
  static getAmount() {
    return this.items.length;
  }
  static getUniqueAmount() {
    const uniqueItems = Array.from(new Set(this.items));
    return uniqueItems.length;
  }
  static getProductAmount(product: IProduct) {
    let amount = 0;
    Cart.items.forEach((el) => {
      if (el === product) amount++;
    });
    return amount;
  }
  static getTotal() {
    let total = 0;
    Cart.items.forEach((el) => (total += el.priceByn));
    return total;
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
