import { IProduct } from '../types/types';
import products from '../data/products.json';
import { Tfilters } from '../types/types';
import Filters from './filters';

class Gallery {
  static items: Array<IProduct> = Gallery.getAllUniqueItems();
  static filteredPortion: Array<IProduct> = [];
  static state = 'not filtered';
  static queryStr = '#main-page';
  static filtersChecked: Tfilters = {
    theme: [],
    interests: [],
    pieces: [],
    price: [],
    search: [],
    layout: [],
    sort: [],
  };

  public static getAllUniqueItems(): Array<IProduct> {
    for (let i = 0; i < products.total; i++) {
      this.items = Array.from(products.products);
    }

    return this.items;
  }

  public static getFilteredItems(event?: Event): Array<IProduct> {
    Gallery.queryStr = '#main-page?';

    const itemsToFilter: Array<IProduct> = this.getFilteredByCheckbox();
    const itemsFiltered: Array<IProduct> = this.getFilteredByRange(itemsToFilter);
    const itemsSearched: Array<IProduct> = this.getSearchResults(itemsFiltered);
    const itemsSorted: Array<IProduct> = this.getItemsSorted(itemsSearched);
    if (event) {
      this.changeLayout(event);
    }

    localStorage.setItem('legoFilters', JSON.stringify(Gallery.filtersChecked));
    window.history.pushState({}, '', this.createQueryString());

    return itemsSorted;
  }

  private static createQueryString(): string | undefined {
    if (localStorage.getItem('legoFilters')) {
      const filtersUsed: string = localStorage.getItem('legoFilters') ?? '';
      const filtersUsedObj: Tfilters = JSON.parse(filtersUsed.toString());
      for (const [key, value] of Object.entries(filtersUsedObj)) {
        if (Array.isArray(value) && value.length !== 0) {
          Gallery.queryStr += `&${key}=${value}`;
          // Gallery.queryStr += `/${key}=${value.join(',')}`;

          // for (let i = 0; i < value.length; i++) {
          //   Gallery.queryStr += `&${key}=${value[i]}`;
          // }
        }
      }

      return Gallery.queryStr;
    }
  }

  private static getFilteredByCheckbox(): Array<IProduct> {
    const checkboxes: HTMLCollectionOf<Element> = document.getElementsByClassName('filter_checkbox');
    const checkedItems: Array<Element> = Array.from(checkboxes).filter((el: Element): boolean =>
      el.hasAttribute('checked'),
    );
    const firstFilterChecked: Array<string> = checkedItems
      .filter((el: Element): boolean => el.id.startsWith('theme'))
      .map((el: Element): string => el.id.split('_')[1]);
    Gallery.filtersChecked.theme = firstFilterChecked;

    const firstRes: Array<IProduct> = [];
    if (firstFilterChecked.length !== 0) {
      firstFilterChecked.forEach((item: string): void => {
        const filteredPortion = this.items.filter((el: IProduct): boolean => el.theme === item);
        firstRes.push(...filteredPortion);
      });
      Gallery.state = 'filtered';
    } else {
      firstRes.push(...this.items);
    }

    const secondFilterChecked: Array<string> = checkedItems
      .filter((el: Element): boolean => el.id.startsWith('interests'))
      .map((el: Element): string => el.id.split('_')[1]);
    Gallery.filtersChecked.interests = secondFilterChecked;

    const secondRes: Array<IProduct> = [];
    if (secondFilterChecked.length !== 0) {
      secondFilterChecked.forEach((item: string): void => {
        const filteredPortion: Array<IProduct> = firstRes.filter((el: IProduct): boolean => el.interests === item);
        secondRes.push(...filteredPortion);
      });
      Gallery.state = 'filtered';
    } else {
      secondRes.push(...firstRes);
    }

    return secondRes;
  }

  private static getFilteredByRange(items: Array<IProduct>): Array<IProduct> {
    const [firstMin, secondMin]: HTMLCollectionOf<Element> = document.getElementsByClassName('range_value_min');
    const [firstMax, secondMax]: HTMLCollectionOf<Element> = document.getElementsByClassName('range_value_max');

    const firstRange: Array<number> = [];
    if (firstMin.textContent && firstMax.textContent) {
      firstRange.push(+firstMin.textContent);
      firstRange.push(+firstMax.textContent);
    }
    if (
      firstRange[0] === Filters.filters.pieces[0] &&
      firstRange[1] === Filters.filters.pieces[Filters.filters.pieces.length - 1]
    ) {
      Gallery.filtersChecked.pieces = [];
    } else {
      Gallery.filtersChecked.pieces = firstRange;
    }

    const secondRange: Array<number> = [];
    if (secondMin.textContent && secondMax.textContent) {
      secondRange.push(+secondMin.textContent);
      secondRange.push(+secondMax.textContent);
    }
    if (
      secondRange[0] === Math.floor(Filters.filters.price[0]) &&
      secondRange[1] === Math.ceil(Filters.filters.price[Filters.filters.price.length - 1])
    ) {
      Gallery.filtersChecked.price = [];
    } else {
      Gallery.filtersChecked.price = secondRange;
    }

    const firstRes: Array<IProduct> = [];
    const itemsToFilter: Array<IProduct> = items;
    const filteredPortion: Array<IProduct> = itemsToFilter.filter(
      (el: IProduct): boolean => el.detailsCount >= firstRange[0] && el.detailsCount <= firstRange[1],
    );
    firstRes.push(...filteredPortion);

    const secondRes: Array<IProduct> = [];
    const itemsToFinalFilter: Array<IProduct> = firstRes;
    const filteredPortionFinal: Array<IProduct> = itemsToFinalFilter.filter(
      (el: IProduct): boolean => el.priceByn >= secondRange[0] && el.priceByn <= secondRange[1],
    );
    secondRes.push(...filteredPortionFinal);

    this.showFoundMessage(secondRes);

    return secondRes;
  }

  private static getSearchResults(itemsFiltered: Array<IProduct>): Array<IProduct> {
    let itemsSearched: Array<IProduct> = itemsFiltered;
    const searchInput: HTMLInputElement | null = document.querySelector('.search_input');
    if (searchInput) {
      const searchValue: string = searchInput.value;
      if (searchValue) {
        Gallery.state = 'filtered';
        Gallery.filtersChecked.search = [searchValue];
        const searchRegX = new RegExp(searchValue, 'i');

        itemsSearched = itemsFiltered.filter((item: IProduct): boolean => {
          for (const key in item) {
            const value: string = item[key].toString();
            if (searchRegX.test(value)) {
              return true;
            }
          }
          return false;
        });
      } else {
        Gallery.filtersChecked.search = [];
      }
    }

    this.showFoundMessage(itemsSearched);

    return itemsSearched;
  }

  private static getItemsSorted(itemsSearched: Array<IProduct>): Array<IProduct> {
    let itemsSorted: Array<IProduct> = itemsSearched;
    const sortDropdown: HTMLElement | null = document.getElementById('sort_select');

    if (sortDropdown instanceof HTMLSelectElement) {
      const sortValue: string = sortDropdown.value;
      Gallery.state = 'filtered';
      if (sortValue !== 'not sorted' && sortValue !== '') {
        Gallery.filtersChecked.sort = [sortValue];
      } else {
        Gallery.filtersChecked.sort = [];
      }

      if (sortValue.includes('name')) {
        const order: string = sortValue.slice(5);
        switch (order) {
          case 'A-Z':
            itemsSorted = itemsSorted.sort((a: IProduct, b: IProduct): number => a.title.localeCompare(b.title));
            break;
          case 'Z-A':
            itemsSorted = itemsSorted.sort((a: IProduct, b: IProduct): number => b.title.localeCompare(a.title));
            break;
        }
      }
      if (sortValue.includes('price')) {
        const order: string = sortValue.slice(6);
        switch (order) {
          case 'lowest':
            itemsSorted = itemsSorted.sort((a: IProduct, b: IProduct): number => a.priceByn - b.priceByn);
            break;
          case 'highest':
            itemsSorted = itemsSorted.sort((a: IProduct, b: IProduct): number => b.priceByn - a.priceByn);
            break;
        }
      }
    }

    return itemsSorted;
  }

  private static showFoundMessage(results: Array<IProduct>): void {
    const itemsFound: HTMLElement | null = document.querySelector('.items_found');
    const galleryWrap: HTMLElement | null = document.querySelector('.gallery_wrapper');
    if (itemsFound && galleryWrap) {
      if (results.length === 0) {
        galleryWrap.textContent = 'Sorry. Nothing was found.';
        itemsFound.textContent = `${results.length} items found.`;
      } else {
        if (results.length === 1) {
          itemsFound.textContent = `${results.length} item found.`;
        } else {
          itemsFound.textContent = `${results.length} items found.`;
        }
      }
    }
  }

  private static changeLayout(event: Event): void {
    if (event.target instanceof HTMLInputElement && event.target.type === 'radio') {
      const galleryWrap: HTMLElement | null = document.querySelector('.gallery_wrapper');
      if (galleryWrap) {
        galleryWrap.classList.toggle('small_tiles');
        galleryWrap.classList.toggle('big_tiles');
        const layoutValue: string = event.target.value;
        Gallery.filtersChecked.layout = [`${layoutValue}`];
        const radioBtns: NodeListOf<Element> = document.querySelectorAll('.custom_radio');
        radioBtns.forEach((radio: Element): void => radio.removeAttribute('checked'));
        event.target.setAttribute('checked', 'true');
      }
    }
  }
}

export default Gallery;
