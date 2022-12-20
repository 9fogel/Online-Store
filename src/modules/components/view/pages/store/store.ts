import Page from '../../../templates/page';

class StorePage extends Page {
  static TextObject = {
    PageTitle: 'Store Page',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(StorePage.TextObject.PageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default StorePage;
