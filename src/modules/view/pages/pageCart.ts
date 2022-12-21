import Cart from '../../controller/cart';
import Page from '../templates/pageTemlate';

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
              <div class="cart_total_items">
                <span>0 items in cart</span>
              </div>
              <div class="cart_pagination">
                <div class="cart_pagination_prev">prev</div>
                <div class="cart_pagination_current">current</div>
                <div class="cart_pagination_next">next</div>
              </div>
            </div>
            <div class="cart_items_body">
            </div>
          </div>
          <div class="cart_summary">
            <div class="cart_summary_products">Total products: 4</div>
            <div class="cart_summary_price">Total price: 6 $</div>
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
    const items = Cart.getUniqueItems();

    const fragment = document.createDocumentFragment();
    const template = document.querySelector('.cart_item_template') as HTMLTemplateElement;
    // const cardBlock = document.querySelector('.cart_items_body') as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.forEach((item: any) => {
      const itemClone = template.cloneNode(true) as HTMLTemplateElement;
      itemClone.classList.remove('invisible');
      const itemName = itemClone.querySelector('.cart_item_name') as HTMLElement;
      const itemPicture = itemClone.querySelector('.cart_item_pic_img') as HTMLImageElement;
      const itemCategory = itemClone.querySelector('.cart_item_category') as HTMLElement;
      const itemSubCategory = itemClone.querySelector('.item_subcategory') as HTMLElement;
      const itemBrand = itemClone.querySelector('.item_brand') as HTMLElement;
      const itemCount = itemClone.querySelector('.item_count') as HTMLElement;
      const itemAmount = itemClone.querySelector('.item_amount') as HTMLElement;
      const itemAge = itemClone.querySelector('.item_age') as HTMLElement;
      const itemPrice = itemClone.querySelector('.cart_item_price') as HTMLElement;
      // const addBtn = itemClone.querySelector('.cart_item_amount_less') as HTMLElement;

      itemName.textContent = `Name: ${item.title}`;
      itemPicture.src = item.thumbnail;
      itemCategory.textContent = `Category: ${item.theme}`;
      itemSubCategory.textContent = `SubCategory: ${item.interests}`;
      itemBrand.textContent = `Brand: LEGO`;
      itemCount.textContent = `Count: ${item.detailsCount}`;
      itemAmount.textContent = `Amount: ${item.stock}`;
      itemAge.textContent = `Age: ${item.minAge} to ${item.maxAge}`;
      itemPrice.textContent = `Price: ${item.priceByn} BYN`;
      fragment.append(itemClone);
      // addBtn.addEventListener('click', () => Cart.addItem(item.id));
    });

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
