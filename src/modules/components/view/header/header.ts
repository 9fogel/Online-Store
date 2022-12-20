import Component from '../../templates/components';
import { PageIds } from '../appView';

const navLinks = [
  {
    id: PageIds.StorePage,
    text: 'Go to Store',
  },
  {
    id: PageIds.ProductDetailsPage,
    text: 'View Product Details',
  },
  {
    id: PageIds.CartPage,
    text: 'Go to Cart',
  },
];

class Header extends Component {
  constructor(tag: string, className: string) {
    super(tag, className);
  }

  renderNavLinks() {
    const navLinksWrap = document.createElement('nav');
    navLinks.forEach((navLink) => {
      const linkHTML: HTMLAnchorElement = document.createElement('a');
      linkHTML.href = `#${navLink.id}`;
      linkHTML.innerText = navLink.text;
      navLinksWrap.append(linkHTML);
    });
    this.container.append(navLinksWrap);
  }

  render() {
    this.renderNavLinks();
    return this.container;
  }
}

export default Header;
