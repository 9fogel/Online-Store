import Page from './view/templates/pageTemlate';
import Header from './view/templates/header';
import StorePage from './view/pages/main';
import CartPage from './view/pages/pageCart';
import AboutPage from './view/pages/pageAbout';
import ErrorPage, { ErrorTypes } from './view/pages/page404';
import ProductPage from './view/pages/pageProduct';
import Footer from './view/templates/footer';
import drawCardStore from './controller/product_store';

export const enum pageIDs {
  StorePage = 'main-page',
  ProductPage = 'product-page',
  AboutPage = 'about-page',
  CartPage = 'cart-page',
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageID = 'current-page';
  private header: Header;
  private footer: Footer;

  static renderNewPage(pageID: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageID}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    if (pageID === pageIDs.StorePage) {
      page = new StorePage(pageID);
    } else if (pageID === pageIDs.CartPage) {
      page = new CartPage(pageID);
    } else if (pageID === pageIDs.AboutPage) {
      page = new AboutPage(pageID);
    } else if (pageID === pageIDs.ProductPage) {
      page = new ProductPage(pageID);
    } else page = new ErrorPage(pageID, ErrorTypes.Error_404);

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageID;
      App.container.append(pageHTML);
    }
  }

  private enableRoughtChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      console.log(hash);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header('header', 'header-container');
    this.footer = new Footer('footer', 'footer-container');
  }

  run() {
    App.container.append(this.header.render());
    App.renderNewPage('main-page');
    App.container.append(this.footer.render());
    this.enableRoughtChange();
    drawCardStore();
  }
}

export default App;
