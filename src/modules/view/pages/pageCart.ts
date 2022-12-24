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

  renderCart() {
    const cart = document.createElement('div');
    cart.innerHTML = `
    <div class="cart">
    <div class="cart_items">
      <div class="cart_items_header">
        <h4>Products in cart</h4>
        <div class="cart_pagination">
          <div class="cart_items_on_page">
            <input type="number" class="cart_items_on_page_input">
            <span>5 items on page</span>
          </div>
          <div class="cart_pagination_prev">prev</div>
          <div class="cart_pagination_current">current</div>
          <div class="cart_pagination_next">next</div>
        </div>
      </div>
      <div class="cart_items_body">
      </div>
    </div>
    <div class="cart_summary">
      <div class="cart_summary_products">Total products: ${Cart.getAmount()}</div>
      <div class="cart_summary_price">Total price: ${Cart.getTotal()} BYN</div>
      <div class="cart_summary_coupon">
        <span>Enter promo code</span>
        <input type="input" class="coupon_input"></input>
        <button class="coupon_btn"></button>
      </div>
      <button class="item_buy">Buy now</button>
    </div>
  </div>`;
    this.container.append(cart);
  }

  drawCardCart() {
    const items: Product[] = Cart.getUniqueItems();

    const fragment: DocumentFragment = document.createDocumentFragment();
    const template: HTMLTemplateElement | null = document.querySelector('.cart_item_template') as HTMLTemplateElement;
    // const cardBlock = document.querySelector('.cart_items_body') as HTMLElement;

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
    // cardBlock.innerHTML = '';
    // cardBlock.appendChild(fragment);
    this.container.append(fragment);
  }

  render() {
    this.renderCart();
    this.drawCardCart();
    return this.container;
  }
}

export default CartPage;
