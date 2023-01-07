import Cart from '../../controller/cart';
import Page from '../templates/pageTemplate';
import Filters from '../../controller/filters';
import { filtersT, IProduct } from '../../types/types';
import Gallery from '../../controller/gallery';
import changeBtn from '../../controller/addInCart';

class StorePage extends Page {
  static textObj = {
    mainTitle: 'LEGO Store',
  };
  filtersPart = new Filters();

  constructor(id: string) {
    super(id);
  }

  fillCheckedFilters(key: string, checkboxValue: string | number, checkboxEl: HTMLInputElement): void {
    if (localStorage.getItem('legoFilters')) {
      const filtersUsed = localStorage.getItem('legoFilters') ?? {};
      const filtersUsedObj: filtersT = JSON.parse(filtersUsed.toString());
      const storageArray: Array<string | number> = filtersUsedObj[key];

      if (storageArray.includes(checkboxValue)) {
        Gallery.state === 'filtered';
        checkboxEl.setAttribute('checked', 'true');
      }
    }
  }

  fillChangedSlider(
    key: string,
    rangeMin: HTMLInputElement,
    rangeMax: HTMLInputElement,
    rangeValueMin: HTMLSpanElement,
    rangeValueMax: HTMLSpanElement,
  ): void {
    if (localStorage.getItem('legoFilters')) {
      const filtersUsed = localStorage.getItem('legoFilters') ?? {};
      const filtersUsedObj: filtersT = JSON.parse(filtersUsed.toString());
      const storageArray: Array<string | number> = filtersUsedObj[key];
      if (storageArray.length !== 0) {
        Gallery.state === 'filtered';
        rangeMin.value = filtersUsedObj[key][0].toString();
        rangeMax.value = filtersUsedObj[key][1].toString();
        rangeValueMin.textContent = `${rangeMin.value}`;
        rangeValueMax.textContent = `${rangeMax.value}`;
        this.filtersPart.fillSlider(rangeMin, rangeMax, 'orange', '#C6C6C6', rangeMax);
      }
    }
  }

  fillSearchInput(searchInput: HTMLInputElement): void {
    if (localStorage.getItem('legoFilters')) {
      const filtersUsed = localStorage.getItem('legoFilters') ?? {};
      const filtersUsedObj: filtersT = JSON.parse(filtersUsed.toString());
      if (filtersUsedObj.search) {
        Gallery.state === 'filtered';
        searchInput.value = filtersUsedObj.search.toString();
      }
    }
  }

  fillSortSelect(sortDropdown: HTMLSelectElement, defaultOption: HTMLOptionElement): void {
    if (localStorage.getItem('legoFilters')) {
      const filtersUsed = localStorage.getItem('legoFilters') ?? {};
      const filtersUsedObj: filtersT = JSON.parse(filtersUsed.toString());
      if (filtersUsedObj.sort) {
        Gallery.state === 'filtered';
        defaultOption.removeAttribute('selected');
        sortDropdown.value = filtersUsedObj.sort.toString();
      }
    }
  }

  fillLayoutValue(bigTilesRadio: HTMLInputElement, smallTilesRadio: HTMLInputElement, galleryWrap: HTMLElement): void {
    if (localStorage.getItem('legoFilters')) {
      const filtersUsed = localStorage.getItem('legoFilters') ?? {};
      const filtersUsedObj: filtersT = JSON.parse(filtersUsed.toString());
      if (filtersUsedObj.layout) {
        Gallery.state === 'filtered';
        if (filtersUsedObj.layout.toString() === 'big') {
          bigTilesRadio.setAttribute('checked', 'true');
          smallTilesRadio.removeAttribute('checked');
          galleryWrap.classList.remove('small_tiles');
          galleryWrap.classList.add('big_tiles');
        } else {
          smallTilesRadio.setAttribute('checked', 'true');
          bigTilesRadio.removeAttribute('checked');
          galleryWrap.classList.add('small_tiles');
          galleryWrap.classList.remove('big_tiles');
        }
      }
    }
  }

  renderFilters(): void {
    this.filtersPart.fillFilters();

    const filtersWrap = document.createElement('aside');
    filtersWrap.classList.add('filters_wrapper');
    this.container.append(filtersWrap);

    const filterFieldset = document.createElement('fieldset');
    filterFieldset.classList.add('filters_fieldset');
    filtersWrap.append(filterFieldset);

    const filterLegend = document.createElement('legend');
    filterLegend.classList.add('filters_legend');
    // filterLegend.textContent = 'Filters';
    filterFieldset.append(filterLegend);

    const filterSlogan = document.createElement('h3');
    filterSlogan.classList.add('filters_slogan');
    filterSlogan.innerText = 'Choose your Lego:';
    filterFieldset.append(filterSlogan);

    const filtersList = document.createElement('ul');
    filtersList.classList.add('filters_list');
    filterFieldset.append(filtersList);

    Object.keys(Filters.filters).forEach((key: string, index: number) => {
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

        Filters.filters[key as keyof typeof Filters.filters].forEach((elem: string | number) => {
          const filterInnerItem = document.createElement('li');
          filterInnerItem.classList.add('filter_inner_item');
          filterInnerList.append(filterInnerItem);

          const filterCheckbox = document.createElement('input');
          filterCheckbox.classList.add('filter_checkbox');
          filterCheckbox.setAttribute('id', `${key}_${elem}`);
          filterCheckbox.setAttribute('type', 'checkbox');
          filterInnerItem.append(filterCheckbox);

          const filterLabel = document.createElement('label');
          filterLabel.setAttribute('for', `${key}_${elem}`);
          filterLabel.textContent = `${elem}`;
          filterInnerItem.append(filterLabel);

          filterCheckbox.addEventListener('change', (event: Event): void => {
            this.clearGallery();
            return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
          });

          this.fillCheckedFilters(key, elem, filterCheckbox);
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

        rangeMin.addEventListener('input', (): void => {
          this.filtersPart.enableDualSliders(rangeMin, rangeMax, minValue);
          this.filtersPart.handleSliderMin(rangeMin, rangeMax, rangeValueMin);
        });
        rangeMin.addEventListener('change', (event: Event): void => {
          this.clearGallery();
          return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
        });
        rangeMax.addEventListener('input', (): void => {
          this.filtersPart.enableDualSliders(rangeMin, rangeMax, minValue);
          this.filtersPart.handleSliderMax(rangeMin, rangeMax, rangeValueMax, minValue);
        });
        rangeMax.addEventListener('change', (event: Event): void => {
          this.clearGallery();
          return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
        });

        this.fillChangedSlider(key, rangeMin, rangeMax, rangeValueMin, rangeValueMax);
      }
    });

    const filterBtnWrap = document.createElement('div');
    filterBtnWrap.classList.add('filter_btn_wrapper');
    filterFieldset.append(filterBtnWrap);

    const resetButton = document.createElement('button');
    resetButton.classList.add('reset_btn');
    resetButton.textContent = 'Reset';
    filterBtnWrap.append(resetButton);
    resetButton.addEventListener('click', (): void => {
      console.log('reset');
      localStorage.removeItem('legoFilters');
      this.clearGallery();
      window.location.hash = '#main-page';
      return this.drawCardStore(Gallery.getAllUniqueItems());
    });

    const copyLinkButton = document.createElement('button');
    copyLinkButton.classList.add('copy_link_btn');
    copyLinkButton.textContent = 'Copy';
    filterBtnWrap.append(copyLinkButton);
    copyLinkButton.addEventListener('click', () => {
      console.log(window.location.href);
      navigator.clipboard
        .writeText(window.location.href)
        .then((): void => {
          if (copyLinkButton.innerText !== 'Copied!') {
            const originalText = copyLinkButton.innerText;
            copyLinkButton.innerText = 'Copied!';
            setTimeout(() => {
              copyLinkButton.innerText = originalText;
            }, 1000);
          }
        })
        .catch((err) => {
          console.log('Something went wrong', err);
        });
    });
  }

  clearGallery(): void {
    const galleryWrap: HTMLElement | null = document.querySelector('.gallery_wrapper');
    if (galleryWrap) {
      galleryWrap.innerHTML = ' ';
    }
  }

  renderGallery(): HTMLDivElement {
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
    galleryWrap.classList.add('small_tiles');
    galleryBody.append(galleryWrap);

    const searchForm = document.createElement('form');
    searchForm.classList.add('search_form');
    galleryHeader.append(searchForm);

    const searchInput = document.createElement('input');
    searchInput.classList.add('search_input');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('placeholder', 'Search goods by keyword');
    searchForm.append(searchInput);

    searchInput.addEventListener('change', (event: Event): void => {
      this.clearGallery();
      return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
    });

    this.fillSearchInput(searchInput);

    const searchBtn = document.createElement('button');
    searchBtn.classList.add('search_icon');
    searchBtn.setAttribute('type', 'submit');
    searchBtn.setAttribute('disabled', 'disabled');
    searchForm.append(searchBtn);

    const itemsFound = document.createElement('div');
    itemsFound.classList.add('items_found');
    itemsFound.textContent = `All items:`;
    galleryHeader.append(itemsFound);

    const changeLayout = document.createElement('div');
    changeLayout.classList.add('change_layout');
    galleryHeader.append(changeLayout);

    const bigTiles = document.createElement('div');
    bigTiles.classList.add('big_layout');
    changeLayout.append(bigTiles);

    const bigTilesRadio = document.createElement('input');
    bigTilesRadio.classList.add('custom_radio');
    bigTilesRadio.setAttribute('type', 'radio');
    bigTilesRadio.setAttribute('name', 'layout');
    bigTilesRadio.setAttribute('id', 'big');
    bigTilesRadio.setAttribute('value', 'big');
    bigTiles.append(bigTilesRadio);

    const bigTilesLabel = document.createElement('label');
    bigTilesLabel.setAttribute('for', 'big');
    bigTilesLabel.textContent = 'Big Tiles';
    bigTiles.append(bigTilesLabel);

    const smallTiles = document.createElement('div');
    smallTiles.classList.add('small_layout');
    changeLayout.append(smallTiles);

    const smallTilesRadio = document.createElement('input');
    smallTilesRadio.classList.add('custom_radio');
    smallTilesRadio.setAttribute('type', 'radio');
    smallTilesRadio.setAttribute('name', 'layout');
    smallTilesRadio.setAttribute('id', 'small');
    smallTilesRadio.setAttribute('value', 'small');
    smallTilesRadio.setAttribute('checked', 'true');
    smallTiles.append(smallTilesRadio);

    const smallTilesLabel = document.createElement('label');
    smallTilesLabel.setAttribute('for', 'small');
    smallTilesLabel.textContent = 'Small Tiles';
    smallTiles.append(smallTilesLabel);

    bigTilesRadio.addEventListener('change', (event: Event): void => {
      this.clearGallery();
      return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
    });

    smallTilesRadio.addEventListener('change', (event: Event): void => {
      this.clearGallery();
      return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
    });

    this.fillLayoutValue(bigTilesRadio, smallTilesRadio, galleryWrap);

    const sortWrap = document.createElement('div');
    sortWrap.classList.add('sort_wrapper');
    galleryHeader.append(sortWrap);

    const sortLabel = document.createElement('label');
    sortLabel.classList.add('sort_label');
    sortLabel.setAttribute('for', 'sort_select');
    sortLabel.textContent = `Sort by:`;
    sortWrap.append(sortLabel);

    const sortDropdown = document.createElement('select');
    sortDropdown.classList.add('sort_select');
    sortDropdown.setAttribute('id', 'sort_select');
    sortDropdown.textContent = `Sort by:`;
    sortWrap.append(sortDropdown);

    const sortArrow = document.createElement('div');
    sortArrow.classList.add('sort_arrow');
    sortDropdown.append(sortArrow);

    sortDropdown.addEventListener('change', (event: Event): void => {
      console.log(sortDropdown.value);
      this.clearGallery();
      return this.drawCardStore(this.filtersPart.getStoreFiltered(event) ?? []);
    });

    const sortOption = document.createElement('option');
    sortOption.textContent = 'not sorted';
    sortOption.setAttribute('name', 'default-sort');
    sortOption.setAttribute('selected', 'selected');
    sortOption.setAttribute('disabled', 'disabled');
    sortDropdown.append(sortOption);

    const sortOptionNames = ['name A-Z', 'name Z-A', 'price lowest', 'price highest'];
    for (let i = 0; i < sortOptionNames.length; i++) {
      const sortOption = document.createElement('option');
      sortOption.textContent = sortOptionNames[i];
      const nameAttr = i < 2 ? sortOptionNames[i].slice(0, 6) : sortOptionNames[i].slice(0, 7);
      sortOption.setAttribute('name', `${nameAttr}`);
      sortDropdown.append(sortOption);
    }

    this.fillSortSelect(sortDropdown, sortOption);

    this.container.append(gallery);
    return galleryWrap;
  }

  drawCardStore(items: Array<IProduct>): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const productCardTemplate: HTMLTemplateElement | null = document.querySelector('.item_template');

    if (productCardTemplate) {
      items.forEach((item: IProduct): void => {
        const itemClone: DocumentFragment | Node = productCardTemplate.content.cloneNode(true);
        if (itemClone instanceof DocumentFragment && itemClone) {
          const info: HTMLElement | null = itemClone.querySelector('.item_info');
          if (info) {
            info.addEventListener('click', (): string => (window.location.hash = `#product-page/${item.id}`));
          }

          const itemName: HTMLElement | null = itemClone.querySelector('.item_name');
          if (itemName) {
            itemName.textContent = `${item.title}`;
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
            itemCount.textContent = `Pieces: ${item.detailsCount}`;
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
            if (Cart.getProductAmount(item.id)) {
              addBtn.classList.add('button_discard');
              addBtn.innerText = `Drop from Cart (${Cart.getProductAmount(item.id)})`;
              addBtn.addEventListener('click', () => changeBtn(addBtn, 'discard', item.id));
            } else {
              addBtn.classList.add('button_buy');
              addBtn.innerText = 'Add to cart';
              addBtn.addEventListener('click', () => changeBtn(addBtn, 'add', item.id));
            }
            // if (!addBtn.classList.contains('drop_btn')) {
            // Cart.addItem(item.id);
            // addBtn.textContent = 'Drop from Cart';
            // addBtn.classList.add('drop_btn');
            // } else {
            //   Cart.removeItem(item.id);
            //   addBtn.textContent = 'Add to Cart';
            //   addBtn.classList.remove('drop_btn');
            //TODO: удалять элемент из корзины при повторном нажатии (если локал сторадж с пустыми значениями, то падет ошибка)
            // }
            // });
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

  render(): HTMLElement {
    this.renderFilters();
    this.renderGallery();
    return this.container;
  }
}

export default StorePage;
