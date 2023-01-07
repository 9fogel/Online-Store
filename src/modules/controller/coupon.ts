import Cart from './cart';

class Coupon {
  static promo: Array<string> = ['RSSchool', '9fogel', '4Quark'];

  static addCoupon(text: string) {
    const couponField: HTMLElement | null = document.querySelector('.cart_summary_coupon');
    if (couponField) {
      const string = document.createElement('div');
      string.classList.add('coupon_string');
      string.innerText = `${text} - 10% discount `;

      const button = document.createElement('button');
      button.classList.add('coupon_button');
      button.innerText = 'add';
      button.addEventListener('click', () => Coupon.applyCoupon(text));

      string.append(button);
      couponField.append(string);
    }
  }

  static renderPrice() {
    const couponAmount = document.querySelectorAll('.applied_coupon_string').length;
    const price: HTMLDivElement | null = document.querySelector('.summary_price');
    let newPrice: HTMLDivElement | null = document.querySelector('.summary_new_price');

    if (couponAmount) {
      if (price) price.classList.add('old_price');
      if (!newPrice) {
        newPrice = document.createElement('div');
        newPrice.classList.add('summary_new_price');
      }
      newPrice.innerText = `Your price: ${Cart.getPromoTotal(couponAmount)} BYN`;
      if (price) price.after(newPrice);
    } else {
      if (price) price.classList.remove('old_price');
      if (newPrice) newPrice.remove();
    }
  }

  static removeCoupon() {
    const string: HTMLElement | null = document.querySelector('.coupon_string');
    if (string) string.remove();
  }

  static applyCoupon(text: string) {
    const couponField: HTMLElement | null = document.querySelector('.cart_summary_coupon');
    let appliedHeader: HTMLElement | null = document.querySelector('.applied_header');
    Coupon.removeCoupon();

    if (!appliedHeader) {
      appliedHeader = document.createElement('div');
      appliedHeader.classList.add('applied_header');
      appliedHeader.innerText = 'Applied codes';
    }

    const string = document.createElement('div');
    string.classList.add('applied_coupon_string');
    string.id = `coupon_${text}`;
    string.innerText = `${text} - 10% discount `;

    const button = document.createElement('button');
    button.classList.add('applied_coupon_button');
    button.innerText = 'drop';
    button.addEventListener('click', () => Coupon.dropCoupon(text));

    string.append(button);

    const appliedCodes = document.createElement('div');
    appliedCodes.classList.add('applied_codes');
    appliedCodes.append(appliedHeader);
    appliedCodes.append(string);
    if (couponField) couponField.prepend(appliedCodes);

    const couponInput: HTMLElement | null = document.querySelector('.coupon_input');
    if (couponInput instanceof HTMLInputElement) couponInput.value = '';

    Coupon.renderPrice();
  }

  static dropCoupon(text: string) {
    const string: HTMLElement | null = document.getElementById(`coupon_${text}`);
    if (string) string.remove();
    const rest: HTMLElement | null = document.querySelector('.applied_coupon_string');
    if (!rest) {
      const appliedHeader: HTMLElement | null = document.querySelector('.applied_header');
      if (appliedHeader) appliedHeader.remove();
    }
    Coupon.renderPrice();
  }

  static checkСoupon() {
    const couponInput: HTMLElement | null = document.querySelector('.coupon_input');
    if (couponInput instanceof HTMLInputElement) {
      if (Coupon.promo.includes(couponInput.value)) {
        Coupon.addCoupon(couponInput.value);
      } else Coupon.removeCoupon();
    }
  }
}

export default Coupon;
