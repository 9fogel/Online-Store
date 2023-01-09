import Page from '../templates/pageTemplate';
import { IErrorPage } from './pages-i';

export const enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page implements IErrorPage {
  private readonly errorType: ErrorTypes | string;

  public static textObj: { [prop: string]: string } = {
    '404': 'Error! The page was not found',
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  public render(): HTMLElement {
    const title = this.createHeaderTitle(ErrorPage.textObj[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
