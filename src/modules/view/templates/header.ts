import { pageIDs } from '../../view/appView';
import Component from '../templates/components';

const Buttons = [
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
  renderButtons() {
    const pageBtns = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageBtns.append(buttonHTML);
    });
    this.container.append(pageBtns);
  }
  render() {
    this.renderLogo();
    this.renderButtons();
    return this.container;
  }
}

export default Header;
