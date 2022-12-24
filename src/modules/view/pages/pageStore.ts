import Cart from '../../controller/cart';
// import gallery from '../../controller/gallery';
import Gallery from '../../controller/gallery';
import Page from '../templates/pageTemplate';
import Product from '../../controller/product';

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
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');

    const galleryHeader = document.createElement('div');
    galleryHeader.classList.add('gallery_head');
    gallery.append(galleryHeader);

    const galleryBody = document.createElement('div');
    galleryBody.classList.add('gallery_body');
    gallery.append(galleryBody);

    const galleryWrap = document.createElement('div');
    galleryWrap.classList.add('gallery_wrapper');
    galleryBody.append(galleryWrap);
    // const gallery = document.createElement('div');
    // gallery.innerHTML = `
    //       <section class="gallery">
    //         <div class="gallery_head">
    //           <div class="items_amount">100 items found</div>
    //           <div class="search">Search</div>
    //           <div class="sorting">Sort by</div>
    //           <div class="view">Big/Small</div>
    //         </div>
    //         <div class="gallery_body">
    //           <div class="gallery_wrapper">
    //           </div>
    //         </div>
    //       </section>`;
    this.container.append(gallery);
    return galleryWrap;
  }

  drawCardStore() {
    const items: Product[] = Gallery.getUniqueItems();
    // const items = gallery();
    const fragment: DocumentFragment = document.createDocumentFragment();
    const productCardTemplate: HTMLTemplateElement | null = document.querySelector('.item_template');

    if (productCardTemplate) {
      items.forEach((item: Product) => {
        const itemClone: DocumentFragment | Node = productCardTemplate.content.cloneNode(true);
        if (itemClone instanceof DocumentFragment && itemClone) {
          const info: HTMLElement | null = itemClone.querySelector('.item_info');
          if (info) {
            info.addEventListener('click', () => (window.location.hash = `#product-page_${item.id}`));
          }

          const itemName: HTMLElement | null = itemClone.querySelector('.item_name');
          if (itemName) {
            itemName.textContent = `Name: ${item.title}`;
          }

          const itemPicture: HTMLImageElement | null = itemClone.querySelector('.item_pic_img');
          if (itemPicture) {
            itemPicture.src = item.thumbnail;
          }

          const itemCategory: HTMLElement | null = itemClone.querySelector('.item_category');
          if (itemCategory) {
            itemCategory.textContent = `Category: ${item.theme}`;
          }

          const itemSubCategory: HTMLElement | null = itemClone.querySelector('.item_subcategory');
          if (itemSubCategory) {
            itemSubCategory.textContent = `SubCategory: ${item.interests}`;
          }

          const itemBrand: HTMLElement | null = itemClone.querySelector('.item_brand');
          if (itemBrand) {
            itemBrand.textContent = `Brand: LEGO`;
          }

          const itemCount: HTMLElement | null = itemClone.querySelector('.item_count');
          if (itemCount) {
            itemCount.textContent = `Count: ${item.detailsCount}`;
          }

          const itemAmount: HTMLElement | null = itemClone.querySelector('.item_amount');
          if (itemAmount) {
            itemAmount.textContent = `Amount: ${item.stock}`;
          }

          const itemAge: HTMLElement | null = itemClone.querySelector('.item_age');
          if (itemAge) {
            itemAge.textContent = `Age: ${item.minAge} to ${item.maxAge}`;
          }

          const itemPrice: HTMLElement | null = itemClone.querySelector('.item_price');
          if (itemPrice) {
            itemPrice.textContent = `Price: ${item.priceByn} BYN`;
          }
          const addBtn: HTMLButtonElement | null = itemClone.querySelector('.add_item_to_cart');

          if (addBtn) {
            addBtn.addEventListener('click', () => Cart.addItem(item));
          }

          fragment.append(itemClone);
        }
      });
    }

    const galleryWrap: HTMLElement | null = document.querySelector('.gallery_wrapper');
    if (galleryWrap) {
      galleryWrap.append(fragment);
    }

    this.container.append(fragment);
  }

  render() {
    this.renderFilters();
    this.renderGallery();
    // this.drawCardStore();

    // const title = this.createHeaderTitle(StorePage.textObj.mainTitle);
    // this.container.append(title);
    return this.container;
  }
}

export default StorePage;
