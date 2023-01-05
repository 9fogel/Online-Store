import Cart from '../../controller/cart';
import openModal from '../../controller/modal/openModal';
import Page from '../templates/pageTemplate';
import { IProduct } from '../../types/types';
import changeBtn from '../../controller/addInCart';

class ProductPage extends Page {
  static textObj = {
    mainTitle: 'Product',
  };

  constructor(id: string) {
    super(id);
  }

  private breadcrumbs(item?: IProduct): void {
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

  private changePicture(event: Event, mainPicture: HTMLImageElement, item: IProduct, images: HTMLCollection): void {
    if (event.target instanceof HTMLImageElement) {
      Array.from(images).forEach((image) => image.classList.remove('selected'));
      event.target.classList.add('selected');
      const id: number = +event.target.id;
      mainPicture.src = `${item.images[id]}`;
    }
  }

  private renderButtons(item?: IProduct): void {
    if (item) {
      const addBtn = document.createElement('button');
      if (Cart.getProductAmount(item.id)) {
        addBtn.classList.add('button_discard');
        addBtn.innerText = `Drop from Cart (${Cart.getProductAmount(item.id)})`;
        addBtn.addEventListener('click', () => changeBtn(addBtn, 'discard', item.id));
      } else {
        addBtn.classList.add('button_buy');
        addBtn.innerText = 'Add to cart';
        addBtn.addEventListener('click', () => changeBtn(addBtn, 'add', item.id));
      }

      const buyBtn = document.createElement('button');
      buyBtn.classList.add('button_buy');
      buyBtn.innerText = 'Buy now';
      buyBtn.addEventListener('click', () => openModal());

      const buttons = document.createElement('div');
      buttons.classList.add('buttons_wrapper');
      buttons.append(addBtn);
      buttons.append(buyBtn);

      this.container.append(buttons);
    }
  }

  private renderProduct(item?: IProduct): void {
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
        if (i === 0) {
          picture.classList.add('selected');
        }
        picture.setAttribute('id', `${i}`);
        picture.src = `${item.images[i]}`;
        additionalPicture.append(picture);
      }

      const brand = document.createElement('div');
      brand.classList.add('item_characteristic');
      brand.innerText = `Brand: `;
      const brandDesc = document.createElement('span');
      brandDesc.innerText = `LEGO`;
      brand.append(brandDesc);

      const category = document.createElement('div');
      category.classList.add('item_characteristic');
      category.innerText = `Category: `;
      const categoryDesc = document.createElement('span');
      categoryDesc.innerText = `${item.theme}`;
      category.append(categoryDesc);

      const interests = document.createElement('div');
      interests.classList.add('item_characteristic');
      interests.innerText = `Interests: `;
      const interestsDesc = document.createElement('span');
      interestsDesc.innerText = `${item.interests}`;
      interests.append(interestsDesc);

      const code = document.createElement('div');
      code.classList.add('item_characteristic');
      code.innerText = `Product code: `;
      const codeDesc = document.createElement('span');
      codeDesc.innerText = `${item.key}`;
      code.append(codeDesc);

      const count = document.createElement('div');
      count.classList.add('item_characteristic');
      count.innerText = `Pieces: `;
      const countDesc = document.createElement('span');
      countDesc.innerText = `${item.detailsCount}`;
      count.append(countDesc);

      const stock = document.createElement('div');
      stock.classList.add('item_characteristic');
      stock.innerText = `Stock: `;
      const stockDesc = document.createElement('span');
      stockDesc.innerText = `${item.stock}`;
      stock.append(stockDesc);

      const age = document.createElement('div');
      age.classList.add('item_characteristic');
      age.innerText = `Age: `;
      const ageDesc = document.createElement('span');
      ageDesc.innerText = `${item.age.minAge} to ${item.age.maxAge}`;
      age.append(ageDesc);

      const description = document.createElement('div');
      description.classList.add('item_characteristic');
      description.innerText = `Description: `;
      const descriptionDesc = document.createElement('span');
      descriptionDesc.innerText = `${item.description}`;
      description.append(descriptionDesc);

      const parameters = document.createElement('div');
      parameters.classList.add('item_parameters');
      const detailsWrap = document.createElement('div');
      detailsWrap.classList.add('details_wrapper');
      parameters.append(description);
      parameters.append(detailsWrap);
      detailsWrap.append(category);
      detailsWrap.append(interests);
      detailsWrap.append(code);
      detailsWrap.append(count);
      detailsWrap.append(stock);
      detailsWrap.append(age);

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

      additionalPicture.addEventListener('click', (event) => {
        const images = additionalPicture.children;
        this.changePicture(event, mainPicture, item, images);
      });
    }

    this.container.append(product);
  }

  public render(item?: IProduct): HTMLElement {
    this.breadcrumbs(item);
    this.renderProduct(item);
    this.renderButtons(item);
    return this.container;
  }
}

export default ProductPage;
