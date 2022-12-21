import Cart from '../../controller/cart';
import gallery from '../../controller/gallery';
import Page from '../templates/pageTemplate';

class StorePage extends Page {
  static textObj = {
    mainTitle: 'LEGO Store',
  };

  constructor(id: string) {
    super(id);
  }

  renderFilters() {
    const filters = document.createElement('div');
    filters.innerHTML = `
          <aside class="filters">
            <fieldset class="filters_fieldset">
              <legend>Filters</legend>
              <ul class="filters_list">
                <li class="filter_item">
                  <span>Category</span>
                  <ul class="filter_ul">
                    <li class="filter_li">
                      <input id="cat1" type="checkbox">
                      <label for="cat1">Category1</label>
                    </li>
                    <li class="filter_li">
                        <input id="cat2" type="checkbox">
                        <label for="cat2">Category2</label>
                    </li>
                    <li class="filter_li">
                        <input id="cat3" type="checkbox">
                        <label for="cat3">Category3</label>
                    </li>
                  </ul>
                </li>
                <li class="filter_item">
                  <span>Subcategory</span>
                  <ul class="filter_ul">
                    <li class="filter_li">
                      <input id="cat1" type="checkbox">
                      <label for="cat1">Subcategory1</label>
                    </li>
                    <li class="filter_li">
                        <input id="cat2" type="checkbox">
                        <label for="cat2">Subcategory2</label>
                    </li>
                    <li class="filter_li">
                        <input id="cat3" type="checkbox">
                        <label for="cat3">Subcategory3</label>
                    </li>
                  </ul>
                </li>
                <li class="filter_item">
                  <span>Amount</span>
                  <div class="filter_from">0</div>
                  <div class="filter_range">
                      <input type="range" id="filter_range_min" min="0" step="1" max="10" value="3">
                      <input type="range" id="filter_range_max" min="0" step="1" max="10" value="7">
                  </div>
                  <div class="filter_to">100</div>
                </li>
                <li class="filter_item">
                  <span>Price</span>
                  <div class="filter_from">0 $</div>
                  <div class="filter_range">
                      <input type="range" id="filter_range_min" min="0" step="10" max="100" value="25">
                      <input type="range" id="filter_range_max" min="0" step="10" max="100" value="75">
                  </div>
                  <div class="filter_to">100 $</div>
                </li>
              </ul>
              <button class="reset_filters">Reset</button>
              <button class="copy_link">Copy</button>
            </fieldset>
          </aside>`;
    this.container.append(filters);
  }

  renderGallery() {
    const gallery = document.createElement('div');
    gallery.innerHTML = `
          <section class="gallery">
            <div class="gallery_head">
              <div class="items_amount">100 items found</div>
              <div class="search">Search</div>
              <div class="sorting">Sort by</div>
              <div class="view">Big/Small</div>
            </div>
            <div class="gallery_body">
              <div class="gallery_wrapper">
              </div>
            </div>
          </section>`;
    this.container.append(gallery);
  }

  drawCardStore() {
    const items = gallery();
    const fragment = document.createDocumentFragment();
    const productCardTemplate = document.querySelector('.item_template') as HTMLTemplateElement;
    // const cardBlock = document.querySelector('.gallery_wrapper') as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items.forEach((item: any) => {
      const itemClone = productCardTemplate.cloneNode(true) as HTMLTemplateElement;
      itemClone.classList.remove('invisible');
      const itemName = itemClone.querySelector('.item_name') as HTMLElement;
      const itemPicture = itemClone.querySelector('.item_pic_img') as HTMLImageElement;
      const itemCategory = itemClone.querySelector('.item_category') as HTMLElement;
      const itemSubCategory = itemClone.querySelector('.item_subcategory') as HTMLElement;
      const itemBrand = itemClone.querySelector('.item_brand') as HTMLElement;
      const itemCount = itemClone.querySelector('.item_count') as HTMLElement;
      const itemAmount = itemClone.querySelector('.item_amount') as HTMLElement;
      const itemAge = itemClone.querySelector('.item_age') as HTMLElement;
      const itemPrice = itemClone.querySelector('.item_price') as HTMLElement;
      const addBtn = itemClone.querySelector('.add_item_to_cart') as HTMLElement;

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
      addBtn.addEventListener('click', () => Cart.addItem(item));
    });

    // cardBlock.innerHTML = '';
    // cardBlock.appendChild(fragment);
    this.container.append(fragment);
  }

  render() {
    this.renderFilters();
    this.renderGallery();
    this.drawCardStore();
    // const title = this.createHeaderTitle(StorePage.textObj.mainTitle);
    // this.container.append(title);
    return this.container;
  }
}

export default StorePage;
