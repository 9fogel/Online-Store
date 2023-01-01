import { IProduct } from '../types/types';
import products from '../data/products.json';

class Cart {
  static itemsID: Array<number> = [];
  static addItem(id: number): void {
    if (this.getProductAmount(id) < this.getProduct(id).stock) {
      this.itemsID.push(id);
      localStorage.setItem('cart', this.itemsID.join(','));
    } else {
      console.log('not enough goods');
    }
  }
  static removeItem(id: number) {
    const index = this.itemsID.indexOf(id);
    this.itemsID.splice(index, 1);
    localStorage.setItem('cart', this.itemsID.join(','));
  }
  static removeAll() {
    this.itemsID = [];
    localStorage.removeItem('cart');
  }
  static getItems() {
    Cart.refresh();
    return this.itemsID;
  }
  static getUniqueItems() {
    Cart.refresh();
    const uniqueItemsID = Array.from(new Set(this.itemsID));
    const uniqueItems: IProduct[] = [];
    uniqueItemsID.forEach((el) => {
      const add = Cart.getProduct(el);
      uniqueItems.push(add);
    });
    return uniqueItems;
  }
  static getAmount() {
    Cart.refresh();
    return this.itemsID.length;
  }
  static getUniqueAmount() {
    Cart.refresh();
    const uniqueItems = Array.from(new Set(this.itemsID));
    return uniqueItems.length;
  }
  static getProductAmount(id: number) {
    Cart.refresh();
    let amount = 0;
    Cart.itemsID.forEach((el) => {
      if (el === id) amount++;
    });
    return amount;
  }
  static getTotal() {
    Cart.refresh();
    let total = 0;
    Cart.itemsID.forEach((el) => (total += Cart.getProduct(el).priceByn));
    return total;
  }
  static getProduct(searchID: number) {
    const product = Array.from(new Set(products.products.filter((el) => el.id == searchID)));
    return product[0];
  }
  static refresh() {
    const cartArr = localStorage.getItem('cart');
    if (cartArr === null) {
      this.itemsID = [];
    } else {
      this.itemsID = [];
      const arr = cartArr.split(',');
      arr.forEach((el) => this.itemsID.push(+el));
    }
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
