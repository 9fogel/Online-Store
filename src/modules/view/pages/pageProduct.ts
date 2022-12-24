import Product from '../../controller/product';
import Page from '../templates/pageTemplate';

class ProductPage extends Page {
  static textObj = {
    mainTitle: 'Product',
  };

  constructor(id: string) {
    super(id);
  }

  renderProduct(item?: Product) {
    console.log(item);
    const product = document.createElement('div');
    if (item) {
      product.innerHTML = `
          <div class="item_page">
            <div class="breadcrumbs">store >> category >> subcategory >> item </div>
            <div class="card_wrapper">
              <h4 class="item_name">Item name: ${item.title}</h4>
              <div class="item_pic">
                <img class="ilem_pic_img" src="${item.thumbnail}">
              </div>
              <div class="item_parameters">
                <div class="item_category">Category: ${item.theme}</div>
                <div class="item_subcategory">SubCategory: ${item.interests}</div>
                <div class="item_brand">Brand: LEGO</div>
                <div class="item_count">Count: ${item.detailsCount}</div>
                <div class="item_subcategory">Amount: ${item.stock}</div>
                <div class="item_brand">Age: ${item.minAge} to ${item.maxAge}</div>
                <p class="irem_description">Description: ${item.description} </p>
              </div>
              <div class="item_price">Price: ${item.priceByn} BYN</div>
            </div>
            <div class="item_page_buttons">
              <button class="item_add">Add to cart</button>
              <button class="item_buy">Buy now</button>
            </div>
          </div>`;
    } else {
      product.innerHTML = 'Nothing found';
    }
    this.container.append(product);
  }

  render() {
    // this.renderProduct();
    return this.container;
  }
}

export default ProductPage;
