import Page from './templates/pageTemplate';
import Header from './templates/header';
import StorePage from './pages/pageStore';
import CartPage from './pages/pageCart';
import AboutPage from './pages/pageAbout';
import ErrorPage, { ErrorTypes } from './pages/page404';
import ProductPage from './pages/pageProduct';
import Footer from './templates/footer';
import Main from './templates/main';
import Gallery from '../controller/gallery';
// import { IProduct } from '../types/types';
import Cart from '../controller/cart';

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

    if (pageID.includes(pageIDs.StorePage)) {
      page = new StorePage(pageID);
    } else if (pageID.includes(pageIDs.CartPage)) {
      page = new CartPage(pageID);
    } else if (pageID === pageIDs.AboutPage) {
      page = new AboutPage(pageID);
    } else if (pageID.includes(pageIDs.ProductPage)) {
      page = new ProductPage(pageID);
    } else page = new ErrorPage(pageID, ErrorTypes.Error_404);

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = AppView.defaultPageID;
      this.main.append(pageHTML);
    }

    if (page instanceof StorePage) {
      const pageWrap = document.querySelector('#current-page');
      if (pageWrap) {
        pageWrap.classList.add('store_page');
      }
      if (!localStorage.getItem('legoFilters')) {
        page.drawCardStore(Gallery.items);
      } else {
        page.drawCardStore(Gallery.getFilteredItems());
      }
    }

    if (page instanceof ProductPage) {
      const pageWrap = document.querySelector('#current-page');
      if (pageWrap) {
        pageWrap.classList.add('product_page');
      }
      // const id = +pageID.slice(13);
      // console.log(window.location.hash.slice(14));
      const id = +window.location.hash.slice(14);
      const product = Cart.getProduct(id);
      // console.log(product);
      page.render(product, id);
    }

    if (page instanceof CartPage) {
      const pageWrap = document.querySelector('#current-page');
      if (pageWrap) {
        pageWrap.classList.add('cart_page');
      }
      // const itemsPerPage: HTMLInputElement | null = document.querySelector('.cart_pagination_input');
      // if (itemsPerPage instanceof HTMLInputElement) {
      //   console.log('items per Page', itemsPerPage.value);
      // }
      // const curPage: HTMLElement | null = document.querySelector('.cart_current_page');
      // if (curPage) {
      //   console.log('page Num', curPage.textContent);
      // }

      page.renderCartGalleryHeader();
      page.drawCardCart();
    }
  }

  private enableRoughtChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  private checkPageToLoad() {
    if (window.location.hash.includes(pageIDs.ProductPage)) {
      this.renderNewPage('product-page');
    } else if (window.location.hash.includes(pageIDs.CartPage)) {
      this.renderNewPage('cart-page');
    } else {
      this.renderNewPage('main-page');
    }
  }

  renderApp() {
    AppView.container.append(this.header.render());
    AppView.container.append(this.main.render());
    this.checkPageToLoad();
    // console.log(window.location.hash);
    // this.renderNewPage('main-page');
    AppView.container.append(this.footer.render());
    this.enableRoughtChange();
  }
}

export default AppView;
