import Page from '../templates/pageTemlate';

class ProductPage extends Page {
  static textObj = {
    mainTitle: 'Product',
  };

  constructor(id: string) {
    super(id);
  }

  renderProduct() {
    const product = document.createElement('div');
    product.innerHTML = `
        <div class="item_page">
          <div class="breadcrumbs">store >> category >> subcategory >> item </div>
          <div class="card_wrapper">
            <h4 class="item_name">Item name</h4>
            <div class="item_pic">
              <img class="ilem_pic_img">
            </div>
            <div class="item_parameters">
              <span class="item_category">socks</span>
              <span class="item_color">red</span>
              <span class="item_count">2</span>
              <span class="item_count">2</span>
              <p class="irem_description">cozy socks. 2 socks in pack. red color. add it to cart. please</p>
            </div>
            <div class="item_price">50 $</div>
          </div>
          <div class="item_page_buttons">
            <button class="item_add">Add to cart</button>
            <button class="item_buy">Buy now</button>
          </div>
        </div>`;
    this.container.append(product);
  }

  render() {
    this.renderProduct();
    return this.container;
  }
}

export default ProductPage;
