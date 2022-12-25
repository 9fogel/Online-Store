import Cart from '../../controller/cart';
import Page from '../templates/pageTemplate';
import Product from '../../controller/product';

class CartPage extends Page {
  static textObj = {
    mainTitle: 'Cart',
  };

  constructor(id: string) {
    super(id);
  }

  renderCartGalleryHeader() {
    const title = document.createElement('h4');
    title.classList.add('cart_title');
    title.innerText = 'Products in cart';

    const paginationInput = document.createElement('input');
    paginationInput.classList.add('cart_pagination_input');
    paginationInput.type = 'number';
    paginationInput.min = '1';
    paginationInput.max = `${Cart.getAmount()}`;
    paginationInput.value = '10';
    paginationInput.step = '1';
    paginationInput.addEventListener('change', () => console.log(paginationInput.value));

    const paginationSpan = document.createElement('span');
    paginationSpan.classList.add('cart_pagination_span');
    paginationSpan.innerText = 'items on page. Page';

    const paginationPrev = document.createElement('button');
    paginationPrev.classList.add('cart_pagination_prev');
    paginationPrev.innerText = '‹';
    paginationPrev.addEventListener('click', () => console.log('prev'));

    const paginationCurrent = document.createElement('span');
    paginationCurrent.classList.add('cart_pagination_prev');
    paginationCurrent.innerText = '1'; // TODO

    const paginationNext = document.createElement('button');
    paginationNext.classList.add('cart_pagination_prev');
    paginationNext.innerText = '›';
    paginationNext.addEventListener('click', () => console.log('hext'));

    const pagination = document.createElement('div');
    pagination.classList.add('cart_pagination');
    pagination.append(paginationInput);
    pagination.append(paginationSpan);
    pagination.append(paginationPrev);
    pagination.append(paginationCurrent);
    pagination.append(paginationNext);

    const cartGalleryHeader = document.createElement('div');
    cartGalleryHeader.classList.add('cart_gallary_header');
    cartGalleryHeader.append(title);
    cartGalleryHeader.append(pagination);
    return cartGalleryHeader;
  }
  renderCartGalleryBody() {
    const cartGalleryBody = document.createElement('div');
    cartGalleryBody.classList.add('cart_gallery_body');
    return cartGalleryBody;
  }
  renderCartGallery() {
    const cartGallery = document.createElement('div');
    cartGallery.classList.add('cart_gallary');
    cartGallery.append(this.renderCartGalleryHeader());
    cartGallery.append(this.renderCartGalleryBody());
    return cartGallery;
  }
  renderCartSummary() {
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
    button.addEventListener('click', () => console.log('buy'));

    const cartSummary = document.createElement('div');
    cartSummary.classList.add('cart_summary');
    cartSummary.append(amount);
    cartSummary.append(price);
    cartSummary.append(coupon);
    cartSummary.append(button);
    return cartSummary;
  }

  renderCart() {
    const cart = document.createElement('div');
    cart.classList.add('cart');
    cart.append(this.renderCartGallery());
    cart.append(this.renderCartSummary());
    this.container.append(cart);
  }

  drawCardCart() {
    const items: Product[] = Cart.getUniqueItems();

    const fragment: DocumentFragment = document.createDocumentFragment();
    const template: HTMLTemplateElement | null = document.querySelector('.cart_item_template') as HTMLTemplateElement;

    if (template) {
      items.forEach((item: Product) => {
        const itemClone: DocumentFragment | Node = template.content.cloneNode(true);
        if (itemClone instanceof DocumentFragment && itemClone) {
          // itemClone.classList.remove('invisible');

          const itemName: HTMLElement | null = itemClone.querySelector('.cart_item_name');
          if (itemName) {
            itemName.textContent = `Name: ${item.title}`;
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
            itemCount.textContent = `Count: ${item.detailsCount}`;
          }

          const itemAmount: HTMLElement | null = itemClone.querySelector('.item_amount');
          if (itemAmount) {
            itemAmount.textContent = `Amount: ${item.stock}`;
          }

          const itemAge: HTMLElement | null = itemClone.querySelector('.item_age');
          if (itemAge) {
            itemAge.textContent = `Age: ${item.minAge} to ${item.maxAge}`;
          }

          const itemPrice: HTMLElement | null = itemClone.querySelector('.cart_item_price');
          if (itemPrice) {
            itemPrice.textContent = `Price: ${item.priceByn} BYN`;
          }

          const removeItem: HTMLElement | null = itemClone.querySelector('.cart_item_amount_less');
          if (removeItem) {
            removeItem.textContent = `-`;
            removeItem.addEventListener('click', () => Cart.removeItem(item));
          }

          const countItem: HTMLElement | null = itemClone.querySelector('.cart_count');
          if (countItem) {
            countItem.textContent = `${Cart.getProductAmount(item)}`;
          }

          const addItem: HTMLElement | null = itemClone.querySelector('.cart_item_amount_more');
          if (addItem) {
            addItem.textContent = `+`;
            addItem.addEventListener('click', () => Cart.addItem(item));
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

  render() {
    this.renderCart();
    return this.container;
  }
}

export default CartPage;
