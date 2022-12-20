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

  render() {
    this.renderCart();
    return this.container;
  }
}

export default CartPage;
