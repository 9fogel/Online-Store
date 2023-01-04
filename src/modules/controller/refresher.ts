import Cart from './cart';

class Refresher {
  static refreshHeader(): void {
    const amount: HTMLElement | null = document.querySelector('.header_cart_amount');
    if (amount) {
      amount.innerText = `${Cart.getAmount()} `;
    }
    const total: HTMLElement | null = document.querySelector('.header_cart_total');
    if (total) {
      total.innerText = ` ${Cart.getTotal()} BYN`;
    }
  }
}

export default Refresher;
