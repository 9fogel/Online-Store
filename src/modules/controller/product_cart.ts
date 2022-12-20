// import gallery from '../gallery';

import Cart from './cart';

const drawCardCart = function () {
  const items = Cart.getUniqueItems();

  const fragment = document.createDocumentFragment();
  const template = document.querySelector('.cart_item_template') as HTMLTemplateElement;
  const cardBlock = document.querySelector('.cart_items_body') as HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items.forEach((item: any) => {
    const itemClone = template.cloneNode(true) as HTMLTemplateElement;
    const itemName = itemClone.querySelector('.item_name') as HTMLElement;
    const itemPicture = itemClone.querySelector('.item_pic_img') as HTMLImageElement;
    const itemCategory = itemClone.querySelector('.item_category') as HTMLElement;
    const itemSubCategory = itemClone.querySelector('.item_subcategory') as HTMLElement;
    const itemBrand = itemClone.querySelector('.item_brand') as HTMLElement;
    const itemCount = itemClone.querySelector('.item_count') as HTMLElement;
    const itemAmount = itemClone.querySelector('.item_amount') as HTMLElement;
    const itemAge = itemClone.querySelector('.item_age') as HTMLElement;
    const itemPrice = itemClone.querySelector('.item_price') as HTMLElement;
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

  cardBlock.innerHTML = '';
  cardBlock.appendChild(fragment);
};

export default drawCardCart;
