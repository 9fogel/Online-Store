abstract class Page {
  protected container: HTMLElement;
  static textObj = {};

  constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string): HTMLHeadingElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
