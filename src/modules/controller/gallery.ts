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

    return this.getFilteredByCheckbox();
  }

  static getFilteredByCheckbox() {
    const checkboxes = document.getElementsByClassName('filter_checkbox');
    const checkedItems = Array.from(checkboxes).filter((el) => el.hasAttribute('checked'));
    const firstFilterChecked = checkedItems.filter((el) => el.id.startsWith('theme')).map((el) => el.id.split('-')[1]);
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
      .map((el) => el.id.split('-')[1]);
    console.log('second', secondFilterChecked);

    const secondRes: Array<IProduct> = [];
    if (secondFilterChecked.length !== 0) {
      console.log('not zero length');
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
}

export default Gallery;
