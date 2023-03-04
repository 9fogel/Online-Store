import AppView from './view/appView';

class App {
  private readonly view: AppView;

  constructor() {
    this.view = new AppView();
  }

  public start(): void {
    this.view.renderApp();
  }
}

export default App;
