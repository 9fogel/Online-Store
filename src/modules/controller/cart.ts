import Product from './product';

class Cart {
  static items: Array<Product> = [];
  static addItem(item: Product): void {
    this.items.push(item);
  }
  static removeItem(item: Product) {
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
  // setTotal() {}
  // getTotal() {}
}

export default Cart;
