//this module is responsible for rendering StorePage and nav between pages
import Page from '../templates/page';
import StorePage from './pages/store/store';
import ProductDetailsPage from './pages/productDetails/productDetails';
import CartPage from './pages/cart/cart';
import Header from './header/header';
import ErrorPage, { ErrorTypes } from './pages/error/error';

export const enum PageIds {
  StorePage = 'store-page',
  ProductDetailsPage = 'product-details-page',
  CartPage = 'cart-page',
}

class AppView {
  private static container: HTMLElement = document.body;
  private static defaultPageId = 'current-page';
  private initialPage: StorePage;
  private header: Header;

  constructor() {
    this.initialPage = new StorePage('store-page');
    this.header = new Header('header', 'header');
  }

  static renderNewPage(idPage: string) {
    // AppView.container.innerHTML = '';
    const currentPageHTML = document.querySelector(`#${AppView.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.StorePage) {
      page = new StorePage(idPage);
    } else if (idPage === PageIds.ProductDetailsPage) {
      page = new ProductDetailsPage(idPage);
    } else if (idPage === PageIds.CartPage) {
      page = new CartPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = AppView.defaultPageId;
      AppView.container.append(pageHTML);
    }
  }

  private enableHashChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      AppView.renderNewPage(hash);
    });
  }

  drawView() {
    AppView.container.append(this.header.render());
    AppView.renderNewPage('store-page');
    this.enableHashChange();
  }
}

//Store, ProductDetails, Cart - pages

export default AppView;
