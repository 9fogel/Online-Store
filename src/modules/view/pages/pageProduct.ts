import Cart from '../../controller/cart';
import openModal from '../../controller/modal/openModal';
// import Product from '../../controller/product';
import Page from '../templates/pageTemplate';
import { IProduct } from '../../types/types';

class ProductPage extends Page {
  static textObj = {
    mainTitle: 'Product',
  };

  constructor(id: string) {
    super(id);
  }

  breadcrumbs(item?: IProduct) {
    if (item) {
      const store = document.createElement('a');
      store.href = '#main-page';
      store.innerText = 'store';

      const category = document.createElement('a');
      category.href = '#main-page'; // здесь должна быть ссылка на store с этим фильтром
      category.innerText = `${item.theme}`;

      const subcategory = document.createElement('a');
      subcategory.href = '#main-page'; // здесь должна быть ссылка на store с этим фильтром
      subcategory.innerText = `${item.interests}`;

      const name = document.createElement('span');
      name.innerText = `${item.title}`;

      const crumbs = document.createElement('div');
      crumbs.classList.add('breadcrumbs');
      crumbs.append(store);
      crumbs.append(' >> ');
      crumbs.append(category);
      crumbs.append(' >> ');
      crumbs.append(subcategory);
      crumbs.append(' >> ');
      crumbs.append(name);

      this.container.append(crumbs);
    }
  }

  renderButtons(item?: IProduct) {
    if (item) {
      const addBtn = document.createElement('button');
      addBtn.classList.add('button_buy');
      addBtn.innerText = 'Add to cart';
      addBtn.addEventListener('click', () => Cart.addItem(item.id));

      const buyBtn = document.createElement('button');
      buyBtn.classList.add('button_buy');
      buyBtn.innerText = 'Buy now';
      buyBtn.addEventListener('click', () => openModal());

      const buttons = document.createElement('div');
      buttons.append(addBtn);
      buttons.append(buyBtn);

      this.container.append(buttons);
    }
  }

  renderProduct(item?: IProduct) {
    const product = document.createElement('div');
    if (item) {
      const title = document.createElement('h3');
      title.classList.add('item_name');
      title.innerText = `Item name: ${item.title}`;

      const mainPicture = document.createElement('img');
      mainPicture.classList.add('item_main_picture');
      mainPicture.src = `${item.thumbnail}`;

      const additionalPicture = document.createElement('div');
      additionalPicture.classList.add('pictures_wrapper');

      for (let i = 0; i < item.images.length; i++) {
        const picture = document.createElement('img');
        picture.classList.add('item_additional_picture');
        picture.src = `${item.images[i]}`;
        additionalPicture.append(picture);
      }

      const category = document.createElement('div');
      category.classList.add('item_characteristic');
      category.innerText = `Category: ${item.theme}`;

      const interests = document.createElement('div');
      interests.classList.add('item_characteristic');
      interests.innerText = `Interests: ${item.interests}`;

      const brand = document.createElement('div');
      brand.classList.add('item_characteristic');
      brand.innerText = `Brand: LEGO`;

      const count = document.createElement('div');
      count.classList.add('item_characteristic');
      count.innerText = `Pieces: ${item.detailsCount}`;

      const amount = document.createElement('div');
      amount.classList.add('item_characteristic');
      amount.innerText = `Amount: ${item.stock}`;

      const age = document.createElement('div');
      age.classList.add('item_characteristic');
      age.innerText = `Age: ${item.minAge} to ${item.maxAge}`;

      const description = document.createElement('div');
      description.classList.add('item_characteristic');
      description.innerText = `Description: ${item.description}`;

      const parameters = document.createElement('div');
      parameters.classList.add('item_parameters');
      parameters.append(category);
      parameters.append(interests);
      parameters.append(brand);
      parameters.append(count);
      parameters.append(amount);
      parameters.append(age);
      parameters.append(description);

      const price = document.createElement('h4');
      price.classList.add('item_price');
      price.innerText = `Price: ${item.priceByn} BYN`;

      const wrapper = document.createElement('div');
      wrapper.classList.add('item_wrapper');
      wrapper.append(title);
      wrapper.append(mainPicture);
      wrapper.append(additionalPicture);
      wrapper.append(parameters);
      wrapper.append(price);

      product.append(wrapper);

      // product.innerHTML = `
      //     <div class="item_page">
      //       <div class="card_wrapper">
      //         <h4 class="item_name">Item name: ${item.title}</h4>
      //         <div class="item_pic">
      //           <img class="ilem_pic_img" src="${item.thumbnail}">
      //         </div>
      //         <div class="item_parameters">
      //           <div class="item_category">Category: ${item.theme}</div>
      //           <div class="item_subcategory">SubCategory: ${item.interests}</div>
      //           <div class="item_brand">Brand: LEGO</div>
      //           <div class="item_count">Count: ${item.detailsCount}</div>
      //           <div class="item_subcategory">Amount: ${item.stock}</div>
      //           <div class="item_brand">Age: ${item.minAge} to ${item.maxAge}</div>
      //           <p class="irem_description">Description: ${item.description} </p>
      //         </div>
      //         <div class="item_price">Price: ${item.priceByn} BYN</div>
      //       </div>
      //     </div>`;
    }

    this.container.append(product);
  }

  render(item?: IProduct) {
    this.breadcrumbs(item);
    this.renderProduct(item);
    this.renderButtons(item);
    return this.container;
  }
}

export default ProductPage;
