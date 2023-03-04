import Component from './components';

class Main extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  public append(node: HTMLElement): HTMLElement {
    this.container.append(node);
    return this.container;
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Main;
