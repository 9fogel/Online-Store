import Page from './templates/pageTemplate';
import Header from './templates/header';
import StorePage from './pages/pageStore';
import CartPage from './pages/pageCart';
import AboutPage from './pages/pageAbout';
import ErrorPage, { ErrorTypes } from './pages/page404';
import ProductPage from './pages/pageProduct';
import Footer from './templates/footer';
import Main from './templates/main';

export const enum pageIDs {
  StorePage = 'main-page',
  ProductPage = 'product-page',
  AboutPage = 'about-page',
  CartPage = 'cart-page',
}

class AppView {
  private static container: HTMLElement = document.body;
  private static defaultPageID = 'current-page';
  private header: Header;
  private main: Main;
  private footer: Footer;

  constructor() {
    this.header = new Header('header', 'header container');
    this.main = new Main('main', 'main container');
    this.footer = new Footer('footer', 'footer container');
  }

  private renderNewPage(pageID: string) {
    const currentPageHTML = document.querySelector(`#${AppView.defaultPageID}`);
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
      pageHTML.id = AppView.defaultPageID;
      this.main.append(pageHTML);
    }

    if (page instanceof StorePage) {
      console.log(page);
      const pageWrap = document.querySelector('#current-page');
      if (pageWrap) {
        pageWrap.classList.add('store-page');
      }
      page.drawCardStore();
    }
  }

  private enableRoughtChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  renderApp() {
    AppView.container.append(this.header.render());
    AppView.container.append(this.main.render());
    this.renderNewPage('main-page');
    AppView.container.append(this.footer.render());
    this.enableRoughtChange();
  }
}

export default AppView;
