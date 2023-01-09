import AppView from './view/appView';

class App {
  private view: AppView;

  constructor() {
    this.view = new AppView();
  }

  public start(): void {
    this.view.renderApp();
  }
}

export default App;
