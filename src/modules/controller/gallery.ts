import { IProduct } from '../types/types';
import products from '../data/products.json';

class Gallery {
  static items: Array<IProduct> = Gallery.getAllUniqueItems();
  static filteredPortion: Array<IProduct> = [];
  static state = 'not filtered';

  static getAllUniqueItems() {
    for (let i = 0; i < products.total; i++) {
      this.items = Array.from(products.products);
    }

    return this.items;
  }

  static getFilteredItems(filterData: Array<string>) {
    const [filterName, filterValue] = filterData;
    console.log(filterName, filterValue);

    return this.getFilteredByRange();

    // return this.getFilteredByCheckbox();
  }

  static getFilteredByCheckbox() {
    const checkboxes = document.getElementsByClassName('filter_checkbox');
    const checkedItems = Array.from(checkboxes).filter((el) => el.hasAttribute('checked'));
    const firstFilterChecked = checkedItems.filter((el) => el.id.startsWith('theme')).map((el) => el.id.split('_')[1]);
    // console.log('first', firstFilterChecked);

    const firstRes: Array<IProduct> = [];
    if (firstFilterChecked.length !== 0) {
      firstFilterChecked.forEach((item) => {
        const filteredPortion = this.items.filter((el) => el.theme === item);
        firstRes.push(...filteredPortion);
      });
      Gallery.state = 'filtered';
      // console.log(firstRes);
    } else {
      firstRes.push(...this.items);
      // console.log(firstRes);
    }

    // console.log(firstRes);

    const secondFilterChecked = checkedItems
      .filter((el) => el.id.startsWith('interests'))
      .map((el) => el.id.split('_')[1]);
    console.log('second', secondFilterChecked);

    const secondRes: Array<IProduct> = [];
    if (secondFilterChecked.length !== 0) {
      // console.log('not zero length');
      console.log('second2', secondFilterChecked);
      secondFilterChecked.forEach((item) => {
        console.log('item', item);
        const filteredPortion = firstRes.filter((el) => el.interests === item);
        secondRes.push(...filteredPortion);
      });
      Gallery.state = 'filtered';
      // console.log(secondRes);
    } else {
      secondRes.push(...firstRes);
    }
    return secondRes;
  }

  static getFilteredByRange() {
    const [firstMin, secondMin] = document.getElementsByClassName('range_value_min');
    const [firstMax, secondMax] = document.getElementsByClassName('range_value_max');
    console.log(firstMin, firstMax);
    console.log(secondMin, secondMax);

    const firstRange: Array<number> = [];
    if (firstMin.textContent && firstMax.textContent) {
      firstRange.push(+firstMin.textContent);
      firstRange.push(+firstMax.textContent);
    }

    const secondRange: Array<number> = [];
    if (secondMin.textContent && secondMax.textContent) {
      secondRange.push(+secondMin.textContent);
      secondRange.push(+secondMax.textContent);
    }

    console.log(firstRange);
    console.log(secondRange);

    const firstRes: Array<IProduct> = [];
    const itemsToFilter = this.getFilteredByCheckbox();
    const filteredPortion = itemsToFilter.filter(
      (el) => el.detailsCount >= firstRange[0] && el.detailsCount <= firstRange[1],
    );
    firstRes.push(...filteredPortion);

    // return firstRes;

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
