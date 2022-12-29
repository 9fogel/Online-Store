import Cart from '../../controller/cart';
// import Gallery from '../../controller/gallery';
import Page from '../templates/pageTemplate';
// import Product from '../../controller/product';
import Filters from '../../controller/filters';
import { IProduct } from '../../types/types';

class StorePage extends Page {
  static textObj = {
    mainTitle: 'LEGO Store',
  };
  filtersPart = new Filters();

  constructor(id: string) {
    super(id);
  }

  renderFilters() {
    this.filtersPart.fillFilters();
    // console.log(Filters.filters);

    const filtersWrap = document.createElement('aside');
    filtersWrap.classList.add('filters_wrapper');
    this.container.append(filtersWrap);

    const filterFieldset = document.createElement('fieldset');
    filterFieldset.classList.add('filters_fieldset');
    filtersWrap.append(filterFieldset);

    const filterLegend = document.createElement('legend');
    filterLegend.classList.add('filters_legend');
    filterLegend.textContent = 'Filters';
    filterFieldset.append(filterLegend);

    const filtersList = document.createElement('ul');
    filtersList.classList.add('filters_list');
    filterFieldset.append(filtersList);

    // console.log(Object.keys(Filters.filters));

    Object.keys(Filters.filters).forEach((key, index) => {
      // console.log('key', key);
      const filterItem = document.createElement('li');
      filterItem.classList.add('filter_item');
      filtersList.append(filterItem);

      const filterName = document.createElement('span');
      filterName.classList.add('filter_name');
      filterName.textContent = `${key}`;
      filterItem.append(filterName);

      if (index < 2) {
        const filterInnerList = document.createElement('ul');
        filterInnerList.classList.add('filter_inner_list');
        filterItem.append(filterInnerList);

        Filters.filters[key as keyof typeof Filters.filters].forEach((elem) => {
          const filterInnerItem = document.createElement('li');
          filterInnerItem.classList.add('filter_inner_item');
          filterInnerList.append(filterInnerItem);

          const filterCheckbox = document.createElement('input');
          filterCheckbox.classList.add('filter_checkbox');
          filterCheckbox.setAttribute('id', `${key}_${elem}`);
          filterCheckbox.setAttribute('type', 'checkbox');
          filterInnerItem.append(filterCheckbox);

          const filterLabel = document.createElement('label');
          filterLabel.setAttribute('for', `${elem}`);
          filterLabel.textContent = `${elem}`;
          filterInnerItem.append(filterLabel);

          filterCheckbox.addEventListener('change', (event: Event) => {
            this.clearGallery();
            // console.log(window.location.href);
            return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
          });
        });
      } else {
        const rangeWrap = document.createElement('div');
        rangeWrap.classList.add('filter_range_wrapper');
        filterItem.append(rangeWrap);

        const dualRange = document.createElement('div');
        dualRange.classList.add('dual_range_wrapper');
        rangeWrap.append(dualRange);

        const values = Filters.filters[key as keyof typeof Filters.filters];
        const minValue = Math.floor(+values[0]);
        const maxValue = Math.ceil(+values[values.length - 1]);

        const rangeMin = document.createElement('input');
        rangeMin.classList.add('filter_range_min');
        rangeMin.setAttribute('type', 'range');
        rangeMin.setAttribute('id', `filter_range_min_${key}`);
        rangeMin.setAttribute('min', `${minValue}`);
        rangeMin.setAttribute('step', '1');
        rangeMin.setAttribute('max', `${maxValue}`);
        dualRange.append(rangeMin);

        const rangeMax = document.createElement('input');
        rangeMax.classList.add('filter_range_max');
        rangeMax.setAttribute('type', 'range');
        rangeMax.setAttribute('id', `filter_range_max_${key}`);
        rangeMax.setAttribute('min', `${minValue}`);
        rangeMax.setAttribute('step', '1');
        rangeMax.setAttribute('max', `${maxValue}`);
        rangeMax.setAttribute('value', `${maxValue}`);
        dualRange.append(rangeMax);

        const rangeValues = document.createElement('div');
        rangeValues.classList.add('range_values');
        rangeWrap.append(rangeValues);

        const rangeValueMin = document.createElement('span');
        rangeValueMin.classList.add('range_value_min');
        rangeValueMin.textContent = `${minValue}`;
        rangeValues.append(rangeValueMin);

        const rangeValueMax = document.createElement('span');
        rangeValueMax.classList.add('range_value_max');
        rangeValueMax.textContent = `${maxValue}`;
        rangeValues.append(rangeValueMax);

        rangeMin.addEventListener('input', () => {
          this.filtersPart.enableDualSliders(rangeMin, rangeMax, minValue);
          this.filtersPart.handleSliderMin(rangeMin, rangeMax, rangeValueMin);
        });
        rangeMin.addEventListener('change', (event) => {
          console.log(rangeValueMin.textContent);
          this.clearGallery();
          return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
        });
        rangeMax.addEventListener('input', () => {
          this.filtersPart.enableDualSliders(rangeMin, rangeMax, minValue);
          this.filtersPart.handleSliderMax(rangeMin, rangeMax, rangeValueMax, minValue);
        });
        rangeMax.addEventListener('change', (event) => {
          console.log('rangeValueMax', rangeValueMax);
          this.clearGallery();
          return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
        });
      }
    });

    const filterBtnWrap = document.createElement('div');
    filterBtnWrap.classList.add('filter_btn_wrapper');
    filterFieldset.append(filterBtnWrap);

    const resetButton = document.createElement('button');
    resetButton.classList.add('reset_btn');
    resetButton.textContent = 'Reset';
    filterBtnWrap.append(resetButton);

    const copyLinkButton = document.createElement('button');
    copyLinkButton.classList.add('copy_link_btn');
    copyLinkButton.textContent = 'Copy';
    filterBtnWrap.append(copyLinkButton);
  }

  clearGallery() {
    const galleryWrap: HTMLElement | null = document.querySelector('.gallery_wrapper');
    if (galleryWrap) {
      galleryWrap.innerHTML = ' ';
    }
  }

  renderGallery() {
    const gallery = document.createElement('section');
    gallery.classList.add('gallery');

    const galleryHeader = document.createElement('div');
    galleryHeader.classList.add('gallery_head');
    gallery.append(galleryHeader);

    const itemsFound = document.createElement('div');
    itemsFound.classList.add('items_found');
    itemsFound.textContent = `All items:`;
    galleryHeader.append(itemsFound);

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

  drawCardStore(items: Array<IProduct>) {
    // const items: Product[] = Gallery.getUniqueItems();
    // const items: Array<IProduct> = Gallery.getUniqueItems();
    const fragment: DocumentFragment = document.createDocumentFragment();
    const productCardTemplate: HTMLTemplateElement | null = document.querySelector('.item_template');

    if (productCardTemplate) {
      // items.forEach((item: Product) => {
      items.forEach((item: IProduct) => {
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
            itemAge.textContent = `Age: ${item.age.minAge} to ${item.age.maxAge}`;
          }

          const itemPrice: HTMLElement | null = itemClone.querySelector('.item_price');
          if (itemPrice) {
            itemPrice.textContent = `Price: ${item.priceByn} BYN`;
          }
          const addBtn: HTMLButtonElement | null = itemClone.querySelector('.add_item_to_cart');

          if (addBtn) {
            // addBtn.addEventListener('click', () => Cart.addItem(item));
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
    return this.container;
  }
}

export default StorePage;
