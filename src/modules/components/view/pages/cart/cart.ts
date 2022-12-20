import Page from '../../../templates/page';

class CartPage extends Page {
  static TextObject = {
    PageTitle: 'Cart Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(CartPage.TextObject.PageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default CartPage;
