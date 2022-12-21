import AppView from './view/appView';

class App {
  // private controller: AppController;
  private view: AppView;

  constructor() {
    // this.controller = new AppController();
    this.view = new AppView();
  }

  public start(): void {
    this.view.renderApp();
  }
}

export default App;
