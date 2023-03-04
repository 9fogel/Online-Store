import Cart from '../../controller/cart';
import Component from '../templates/components';

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }
  private static defaultLogo = 'The Bricks';

  renderLogo(): void {
    const link = document.createElement('a');
    link.href = '#main-page';
    link.classList.add('header_logo');
    link.innerText = Header.defaultLogo;
    const title = document.createElement('h1');
    title.classList.add('logo');
    title.append(link);
    this.container.append(title);
  }

  renderCart(): void {
    const amount = document.createElement('span');
    amount.classList.add('header_cart_amount');
    amount.innerText = `${Cart.getAmount()} `;
    const picture = document.createElement('span');
    picture.classList.add('header_cart_pic');
    picture.innerHTML = `&#128722;`;
    const total = document.createElement('span');
    total.classList.add('header_cart_total');
    total.innerText = ` ${Cart.getTotal()} BYN`;
    const button = document.createElement('button');
    button.classList.add('cart_btn');
    button.append(amount);
    button.append(picture);
    button.append(total);
    button.addEventListener('click', () => (window.location.hash = '#cart-page'));
    this.container.append(button);
  }

  render(): HTMLElement {
    this.renderLogo();
    this.renderCart();
    return this.container;
  }
}

export default Header;
