import Cart from '../../controller/cart';
import { pageIDs } from '../../view/appView';
import Component from '../templates/components';

const NavLinks = [
  {
    id: pageIDs.StorePage,
    text: ' _toStore_ ',
  },
  {
    id: pageIDs.ProductPage,
    text: ' _toProduct_ ',
  },
  {
    id: pageIDs.AboutPage,
    text: ' _toAbout_ ',
  },
  {
    id: pageIDs.CartPage,
    text: ' _toCart_ ',
  },
];

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }
  private static defaultLogo = 'LEGO online';

  renderLogo() {
    const link = document.createElement('a');
    link.href = '#main-page';
    link.innerText = Header.defaultLogo;
    const title = document.createElement('h1');
    title.classList.add('logo');
    title.append(link);
    this.container.append(title);
  }

  renderCart() {
    const amount = document.createElement('span');
    amount.classList.add('header_cart_amount');
    amount.innerText = `${Cart.getAmount()} `;
    const picture = document.createElement('span');
    picture.classList.add('header_cart_pic');
    picture.innerHTML = `&#128722;`;
    const total = document.createElement('span');
    total.classList.add('header_cart_amount');
    total.innerText = ` ${Cart.getTotal()} BYN`;
    const button = document.createElement('button');
    button.classList.add('cart_btn');
    button.append(amount);
    button.append(picture);
    button.append(total);
    button.addEventListener('click', () => (window.location.hash = '#cart-page'));
    this.container.append(button);
  }

  renderNavLinks() {
    const navLinksWrap = document.createElement('nav');
    navLinksWrap.classList.add('nav_list');

    NavLinks.forEach((navLink) => {
      const linkHTML: HTMLAnchorElement = document.createElement('a');
      linkHTML.href = `#${navLink.id}`;
      linkHTML.innerText = navLink.text;
      navLinksWrap.append(linkHTML);
    });
    this.container.append(navLinksWrap);
  }

  render() {
    this.renderLogo();
    this.renderNavLinks();
    this.renderCart();
    return this.container;
  }
}

export default Header;
