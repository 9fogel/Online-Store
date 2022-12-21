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
    const title = document.createElement('h1');
    title.innerText = Header.defaultLogo;
    this.container.append(title);
  }

  renderNavLinks() {
    const navLinksWrap = document.createElement('nav');

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
    return this.container;
  }
}

export default Header;
