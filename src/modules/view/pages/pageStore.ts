import Cart from '../../controller/cart';
import Gallery from '../../controller/gallery';
import Page from '../templates/pageTemplate';
import Product from '../../controller/product';
import Filters from '../../controller/filters';

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

    console.log(Object.keys(Filters.filters));

    Object.keys(Filters.filters).forEach((key, index) => {
      console.log('key', key);
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
          filterCheckbox.setAttribute('id', `${elem}`);
          filterCheckbox.setAttribute('type', 'checkbox');
          filterInnerItem.append(filterCheckbox);

          const filterLabel = document.createElement('label');
          filterLabel.setAttribute('for', `${elem}`);
          filterLabel.textContent = `${elem}`;
          filterInnerItem.append(filterLabel);
        });
      } else {
        const rangeWrap = document.createElement('div');
        rangeWrap.classList.add('filter_range_wrapper');
        filterItem.append(rangeWrap);

        const dualRange = document.createElement('div');
        dualRange.classList.add('dual_range_wrapper');
        rangeWrap.append(dualRange);

        const rangeMin = document.createElement('input');
        rangeMin.setAttribute('type', 'range');
        rangeMin.setAttribute('id', 'filter_range_min');
        rangeMin.setAttribute('min', '0');
        rangeMin.setAttribute('step', '1');
        rangeMin.setAttribute('max', '10');
        dualRange.append(rangeMin);

        const rangeMax = document.createElement('input');
        rangeMax.setAttribute('type', 'range');
        rangeMax.setAttribute('id', 'filter_range_max');
        rangeMax.setAttribute('min', '0');
        rangeMax.setAttribute('step', '1');
        rangeMax.setAttribute('max', '10');
        dualRange.append(rangeMax);

        const rangeValues = document.createElement('div');
        rangeValues.classList.add('range_values');
        rangeWrap.append(rangeValues);

        const rangeValueMin = document.createElement('span');
        rangeValueMin.classList.add('range_value_min');
        const values = Filters.filters[key as keyof typeof Filters.filters];
        const minValue = values[0];
        rangeValueMin.textContent = `${minValue}`;
        rangeValues.append(rangeValueMin);

        const rangeValueMax = document.createElement('span');
        rangeValueMax.classList.add('range_value_max');
        const maxValue = values[values.length - 1];
        rangeValueMax.textContent = `${maxValue}`;
        rangeValues.append(rangeValueMax);
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
    const fragment: DocumentFragment = document.createDocumentFragment();
    const productCardTemplate: HTMLTemplateElement | null = document.querySelector('.item_template');

    if (productCardTemplate) {
      items.forEach((item: Product) => {
        const itemClone: DocumentFragment | Node = productCardTemplate.content.cloneNode(true);
        if (itemClone instanceof DocumentFragment && itemClone) {
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
    return this.container;
  }
}

export default StorePage;
