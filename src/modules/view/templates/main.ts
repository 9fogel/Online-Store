import Component from './components';

class Main extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  // renderMain() {
  //   const wrapper = document.createElement('div');
  //   wrapper.classList.add('wrapper1');
  //   this.container.append(wrapper);
  // }

  append(node: HTMLElement) {
    // const wrapper = document.createElement('div');
    // wrapper.classList.add('wrapper2');
    // wrapper.append(node);
    // this.container.append(wrapper);
    // return this.container;
    this.container.append(node);
    return this.container;
  }

  render() {
    // this.renderMain();
    return this.container;
  }
}

export default Main;
