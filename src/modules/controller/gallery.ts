import { IProduct } from '../types/types';
import products from '../data/products.json';
import { filtersT } from '../types/types';

class Gallery {
  static items: Array<IProduct> = Gallery.getAllUniqueItems();
  static filteredPortion: Array<IProduct> = [];
  static state = 'not filtered';
  static queryStr = '#main-page/';
  static filtersChecked: filtersT = {
    theme: [],
    interests: [],
    details: [],
    price: [],
  };

  static getAllUniqueItems() {
    for (let i = 0; i < products.total; i++) {
      this.items = Array.from(products.products);
    }

    return this.items;
  }

  static getFilteredItems() {
    Gallery.queryStr = '#main-page/';

    const itemsToFilter = this.getFilteredByCheckbox();
    const itemsFiltered = this.getFilteredByRange(itemsToFilter);

    console.log(Gallery.filtersChecked);
    localStorage.setItem('legoFilters', JSON.stringify(Gallery.filtersChecked));
    if (localStorage.getItem('legoFilters')) {
      const filtersUsed = localStorage.getItem('legoFilters') ?? {};
      const filtersUsedObj = JSON.parse(filtersUsed.toString());
      for (const [key, value] of Object.entries(filtersUsedObj)) {
        // if (value.length > 0) {
        Gallery.queryStr += `${key}=${value}/`;
        // }
      }
    }
    // Gallery.queryStr += localStorage.getItem('legoFilters');
    return itemsFiltered;
    // return this.getFilteredByCheckbox();
  }

  static getFilteredByCheckbox() {
    const checkboxes = document.getElementsByClassName('filter_checkbox');
    const checkedItems = Array.from(checkboxes).filter((el) => el.hasAttribute('checked'));
    const firstFilterChecked = checkedItems.filter((el) => el.id.startsWith('theme')).map((el) => el.id.split('_')[1]);
    Gallery.filtersChecked.theme = firstFilterChecked;

    const firstRes: Array<IProduct> = [];
    if (firstFilterChecked.length !== 0) {
      this.queryStr += 'theme=';
      firstFilterChecked.forEach((item) => {
        this.queryStr += `${item}`;
        const filteredPortion = this.items.filter((el) => el.theme === item);
        firstRes.push(...filteredPortion);
      });
      Gallery.state = 'filtered';
    } else {
      firstRes.push(...this.items);
    }

    const secondFilterChecked = checkedItems
      .filter((el) => el.id.startsWith('interests'))
      .map((el) => el.id.split('_')[1]);
    Gallery.filtersChecked.interests = secondFilterChecked;

    const secondRes: Array<IProduct> = [];
    if (secondFilterChecked.length !== 0) {
      secondFilterChecked.forEach((item) => {
        const filteredPortion = firstRes.filter((el) => el.interests === item);
        secondRes.push(...filteredPortion);
      });
      Gallery.state = 'filtered';
    } else {
      secondRes.push(...firstRes);
    }
    return secondRes;
  }

  static getFilteredByRange(items: Array<IProduct>) {
    const [firstMin, secondMin] = document.getElementsByClassName('range_value_min');
    const [firstMax, secondMax] = document.getElementsByClassName('range_value_max');

    const firstRange: Array<number> = [];
    if (firstMin.textContent && firstMax.textContent) {
      firstRange.push(+firstMin.textContent);
      firstRange.push(+firstMax.textContent);
    }
    Gallery.filtersChecked.details = firstRange;

    const secondRange: Array<number> = [];
    if (secondMin.textContent && secondMax.textContent) {
      secondRange.push(+secondMin.textContent);
      secondRange.push(+secondMax.textContent);
    }
    Gallery.filtersChecked.price = secondRange;

    const firstRes: Array<IProduct> = [];
    const itemsToFilter = items;
    const filteredPortion = itemsToFilter.filter(
      (el) => el.detailsCount >= firstRange[0] && el.detailsCount <= firstRange[1],
    );
    firstRes.push(...filteredPortion);

    const secondRes: Array<IProduct> = [];
    const itemsToFinalFilter = firstRes;
    const filteredPortionFinal = itemsToFinalFilter.filter(
      (el) => el.priceByn >= secondRange[0] && el.priceByn <= secondRange[1],
    );
    secondRes.push(...filteredPortionFinal);

    const itemsFound: HTMLElement | null = document.querySelector('.items_found');
    if (itemsFound) {
      if (secondRes.length === 0) {
        itemsFound.textContent = 'Sorry. Nothing was found.';
      } else {
        if (secondRes.length === 1) {
          itemsFound.textContent = `${secondRes.length} item found.`;
        } else {
          itemsFound.textContent = `${secondRes.length} items found.`;
        }
      }
    }
    return secondRes;
  }
}

export default Gallery;
