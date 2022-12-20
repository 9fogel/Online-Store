import Page from '../../../templates/page';

class ProductDetailsPage extends Page {
  static TextObject = {
    PageTitle: 'Product Details Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(ProductDetailsPage.TextObject.PageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default ProductDetailsPage;
