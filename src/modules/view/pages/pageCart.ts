import Cart from '../../controller/cart';
import Page from '../templates/pageTemplate';
import { IProduct, TPagination } from '../../types/types';
import ModalWindow from '../../controller/modal';

class CartPage extends Page {
  static textObj = {
    mainTitle: 'Cart',
  };
  static pagination: TPagination = {
    limit: 3,
    page: 1,
  };

  constructor(id: string) {
    super(id);
  }

  private createQueryString(): string | undefined {
    if (localStorage.getItem('cart-pagination')) {
      const paginationChanged = localStorage.getItem('cart-pagination') ?? {};
      const paginationData: TPagination = JSON.parse(paginationChanged.toString());
      let queryStr = `#cart-page?`;
      for (const [key, value] of Object.entries(paginationData)) {
        if (value !== 0) {
          queryStr += `${key}=${value}&`;
        }
      }
      return queryStr.slice(0, -1);
    }
  }

  private renderCartGalleryHeader(): HTMLDivElement {
    const title = document.createElement('h4');
    title.classList.add('cart_title');
    title.innerText = 'Products in cart';

    const paginationInput = document.createElement('input');
    paginationInput.classList.add('cart_pagination_input');
    paginationInput.type = 'number';
    paginationInput.min = '1';
    paginationInput.max = `${Cart.getAmount()}`;
    if (!localStorage.getItem('cart-pagination')) {
      paginationInput.value = '3';
    } else {
      const paginationChanged = localStorage.getItem('cart-pagination') ?? {};
      const paginationData: TPagination = JSON.parse(paginationChanged.toString());
      paginationInput.value = paginationData.limit.toString();
    }

    paginationInput.step = '1';

    const curPageNum = document.createElement('span');
    curPageNum.classList.add('cart_current_page');
    curPageNum.innerText = '1';

    let maxPages = Cart.countPages(+paginationInput.value);
    paginationInput.addEventListener('change', (): void => {
      maxPages = Cart.countPages(+paginationInput.value);
      if (+curPageNum.innerText > maxPages) {
        curPageNum.innerText = maxPages.toString();
        CartPage.pagination.page = +curPageNum.innerText;
      }
      if (+curPageNum.innerText < maxPages && paginationNext.hasAttribute('disabled')) {
        paginationNext.removeAttribute('disabled');
      }
      if (+curPageNum.innerText === 1) {
        paginationPrev.setAttribute('disabled', 'disabled');
      }
      CartPage.pagination.limit = +paginationInput.value;
      localStorage.setItem('cart-pagination', JSON.stringify(CartPage.pagination));
      window.history.pushState({}, '', this.createQueryString());
      this.clearCart();
      this.drawCardCart();
      // }
    });

    const paginationSpan = document.createElement('span');
    paginationSpan.classList.add('cart_pagination_span');
    paginationSpan.innerText = 'items on page. Page';

    const paginationPrev = document.createElement('button');
    paginationPrev.classList.add('cart_pagination_prev');
    paginationPrev.innerText = '‹';
    if (+curPageNum.innerText === 1) {
      paginationPrev.setAttribute('disabled', 'disabled');
    }
    paginationPrev.addEventListener('click', (): void => {
      if (+curPageNum.innerText > 1) {
        curPageNum.innerText = `${+curPageNum.innerText - 1}`;
      }
      if (+curPageNum.innerText === 1) {
        paginationPrev.setAttribute('disabled', 'disabled');
      }
      if (+curPageNum.innerText !== maxPages) {
        paginationNext.removeAttribute('disabled');
      }
      CartPage.pagination.page = +curPageNum.innerText;
      localStorage.setItem('cart-pagination', JSON.stringify(CartPage.pagination));
      window.history.pushState({}, '', this.createQueryString());
      this.clearCart();
      this.drawCardCart();
    });

    const paginationNext = document.createElement('button');
    paginationNext.classList.add('cart_pagination_next');
    paginationNext.innerText = '›';
    paginationNext.addEventListener('click', (): void => {
      maxPages = Cart.countPages(+paginationInput.value);
      curPageNum.innerText = `${+curPageNum.innerText + 1}`;
      if (+curPageNum.innerText > 1) {
        paginationPrev.removeAttribute('disabled');
      }
      if (+curPageNum.innerText === maxPages) {
        paginationNext.setAttribute('disabled', 'disabled');
      }
      CartPage.pagination.page = +curPageNum.innerText;
      localStorage.setItem('cart-pagination', JSON.stringify(CartPage.pagination));
      window.history.pushState({}, '', this.createQueryString());
      this.clearCart();
      this.drawCardCart();
    });

    const pagination = document.createElement('div');
    pagination.classList.add('cart_pagination');
    pagination.append(paginationInput);
    pagination.append(paginationSpan);
    pagination.append(paginationPrev);
    pagination.append(curPageNum);
    pagination.append(paginationNext);

    const cartGalleryHeader = document.createElement('div');
    cartGalleryHeader.classList.add('cart_gallery_header');
    cartGalleryHeader.append(title);
    cartGalleryHeader.append(pagination);

    return cartGalleryHeader;
  }

  private renderCartGalleryBody(): HTMLDivElement {
    const cartGalleryBody = document.createElement('div');
    cartGalleryBody.classList.add('cart_gallery_body');

    return cartGalleryBody;
  }

  private renderCartGallery(): HTMLDivElement {
    const cartGallery = document.createElement('div');
    cartGallery.classList.add('cart_gallery');
    const clearBtn = document.createElement('button');
    clearBtn.classList.add('clear_cart');
    clearBtn.innerText = 'Clear all';

    clearBtn.addEventListener('click', () => {
      Cart.removeAll();
      this.emptyCart();
    });

    cartGallery.append(this.renderCartGalleryHeader());
    cartGallery.append(this.renderCartGalleryBody());
    cartGallery.append(clearBtn);

    return cartGallery;
  }

  private renderCartSummary(): HTMLDivElement {
    const amount = document.createElement('div');
    amount.classList.add('summary_products');
    amount.innerText = `Total products: ${Cart.getAmount()}`;

    const price = document.createElement('div');
    price.classList.add('summary_price');
    price.innerText = `Total price: ${Cart.getTotal()} BYN`;

    const couponSpan = document.createElement('div');
    couponSpan.classList.add('coupon_span');
    couponSpan.innerText = 'Enter promo code';

    const couponInput = document.createElement('input');
    couponInput.classList.add('coupon_input');
    couponInput.type = 'text';

    const couponButton = document.createElement('button');
    couponButton.classList.add('coupon_btn');
    couponButton.innerText = `Total price: ${Cart.getTotal()} BYN`;

    const coupon = document.createElement('div');
    coupon.classList.add('cart_summary_coupon');
    coupon.append();

    const button = document.createElement('button');
    button.classList.add('button_buy');
    button.innerText = 'Buy now';
    button.addEventListener('click', ModalWindow.openModal);

    const cartSummary = document.createElement('div');
    cartSummary.classList.add('cart_summary');
    cartSummary.append(amount);
    cartSummary.append(price);
    cartSummary.append(coupon);
    cartSummary.append(button);

    return cartSummary;
  }

  private renderCart(): void {
    const cart = document.createElement('div');
    cart.classList.add('cart');
    const cartArr = Array.from(Cart.getUniqueItems());
    if (cartArr.length !== 0) {
      cart.append(this.renderCartGallery());
      cart.append(this.renderCartSummary());
    } else {
      cart.classList.add('empty_cart');
      cart.innerHTML = 'No items in cart';
    }
    this.container.append(cart);
  }

  private clearCart(): void {
    const wrapper: HTMLElement | null = document.querySelector('.cart_gallery_body');
    if (wrapper) {
      wrapper.innerHTML = '';
    }
  }

  private emptyCart(): void {
    const cart: HTMLElement | null = document.querySelector('.cart');
    if (cart) {
      cart.classList.add('empty_cart');
      cart.innerHTML = 'No items in cart';
    }
  }

  public drawCardCart(): void {
    const items: Array<IProduct> = Cart.getUniqueItems();
    let drawItems: Array<IProduct>;

    const itemsPerPage: HTMLInputElement | null = document.querySelector('.cart_pagination_input');
    if (itemsPerPage instanceof HTMLInputElement) {
      const curPage: HTMLSpanElement | null = document.querySelector('.cart_current_page');
      if (curPage instanceof HTMLSpanElement && curPage.textContent) {
        const curPageNum = +curPage.textContent;
        const sliceStart = (curPageNum - 1) * +itemsPerPage.value;
        const sliceEnd = curPageNum * +itemsPerPage.value;
        drawItems = items.slice(sliceStart, sliceEnd);

        const fragment: DocumentFragment = document.createDocumentFragment();
        const template: HTMLTemplateElement | null = document.querySelector('.cart_item_template');

        if (template) {
          drawItems.forEach((item: IProduct): void => {
            const itemClone: DocumentFragment | Node = template.content.cloneNode(true);
            if (itemClone instanceof DocumentFragment && itemClone) {
              const orderNum: HTMLElement | null = itemClone.querySelector('.cart_order_number');
              if (orderNum) {
                orderNum.textContent = `${Cart.getUniqueItems().indexOf(item) + 1}`;
              }

              const info: HTMLElement | null = itemClone.querySelector('.cart_item_info');
              if (info) {
                info.addEventListener('click', (): string => (window.location.hash = `#product-page/${item.id}`));
              }

              const itemName: HTMLElement | null = itemClone.querySelector('.cart_item_name');
              if (itemName) {
                itemName.textContent = `${item.title}`;
              }

              const itemPicture: HTMLImageElement | null = itemClone.querySelector('.cart_item_pic_img');
              if (itemPicture) {
                itemPicture.src = item.thumbnail;
              }

              const itemCategory: HTMLElement | null = itemClone.querySelector('.cart_item_category');
              if (itemCategory) {
                itemCategory.textContent = `Category: ${item.theme}`;
              }

              const itemSubCategory: HTMLElement | null = itemClone.querySelector('.item_subcategory');
              if (itemSubCategory) {
                itemSubCategory.textContent = `SubCategory: ${item.interests}`;
              }

              const itemBrand: HTMLElement | null = itemClone.querySelector('.item_brand');
              if (itemBrand) {
                itemBrand.textContent = `Brand: LEGO`;
              }

              const itemCount: HTMLElement | null = itemClone.querySelector('.item_count');
              if (itemCount) {
                itemCount.textContent = `Pieces: ${item.detailsCount}`;
              }

              const itemAmount: HTMLElement | null = itemClone.querySelector('.item_amount');
              if (itemAmount) {
                itemAmount.textContent = `Stock: ${item.stock}`;
              }

              const itemAge: HTMLElement | null = itemClone.querySelector('.item_age');
              if (itemAge) {
                itemAge.textContent = `Age: ${item.age.minAge} to ${item.age.maxAge}`;
              }

              const itemPrice: HTMLElement | null = itemClone.querySelector('.cart_item_price');
              if (itemPrice) {
                itemPrice.innerText = `${Cart.getProductAmount(item.id) * item.priceByn} BYN`;
              }

              const removeItem: HTMLElement | null = itemClone.querySelector('.cart_item_amount_less');
              if (removeItem) {
                removeItem.textContent = `-`;
                removeItem.addEventListener('click', (): void => {
                  Cart.removeItem(item.id);
                  this.clearCart();
                  const itemsTotal = [...Cart.getUniqueItems()];
                  if (itemsTotal.length === 0) {
                    this.emptyCart();
                  }
                  const paginationInput: HTMLInputElement | null = document.querySelector('.cart_pagination_input');
                  if (paginationInput instanceof HTMLInputElement) {
                    const maxPages = Cart.countPages(+paginationInput.value);
                    if (curPageNum > maxPages) {
                      curPage.textContent = maxPages.toString();
                    }
                    if (curPageNum === maxPages) {
                      const paginationNext: HTMLButtonElement | null = document.querySelector('.cart_pagination_next');
                      if (paginationNext instanceof HTMLButtonElement) {
                        paginationNext.setAttribute('disabled', 'disabled');
                      }
                    }
                    if (curPage.textContent && +curPage.textContent === 1) {
                      const paginationPrev: HTMLButtonElement | null = document.querySelector('.cart_pagination_prev');
                      if (paginationPrev instanceof HTMLButtonElement) {
                        paginationPrev.setAttribute('disabled', 'disabled');
                      }
                    }
                  }

                  return this.drawCardCart();
                });
              }

              const countItem: HTMLElement | null = itemClone.querySelector('.cart_count');
              if (countItem) {
                countItem.textContent = `${Cart.getProductAmount(item.id)}`;
              }

              const addItem: HTMLElement | null = itemClone.querySelector('.cart_item_amount_more');
              if (addItem) {
                addItem.textContent = `+`;
                addItem.addEventListener('click', (): void => {
                  Cart.addItem(item.id);
                  this.clearCart();

                  return this.drawCardCart();
                });
              }
              fragment.append(itemClone);
            }
          });
        }

        const cartWrap: HTMLElement | null = document.querySelector('.cart_gallery_body');
        if (cartWrap) {
          cartWrap.append(fragment);
        }

        this.container.append(fragment);
      }
    }
  }

  public render(): HTMLElement {
    this.renderCart();

    return this.container;
  }
}

export default CartPage;
