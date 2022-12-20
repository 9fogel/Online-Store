import './index.html'; //watch changes in index.html
import './index.scss';
import AppView from './modules/components/view/appView';
// import App from './modules/components/app/app';

const App = new AppView();
App.drawView();
console.log('Hello World!');

// const app = new App();
// app.start();

/* -------------- CHANGE VIEW -------------- */

// const pages: string[] = ['store', 'item_page', 'cart', 'payment', 'about', 'page_404'];
// const pagesLinks: NodeListOf<Element>[] = [];
// const pagesView: Element[] = [];
// pages.forEach((el) => {
//   pagesLinks.push(document.querySelectorAll(`.to_${el}`));
// });
// pages.forEach((el) => {
//   const temp = document.querySelector(`.${el}`);
//   if (temp !== null) pagesView.push(temp);
// });

// const changeView = function (view: number) {
//   pagesView.forEach((el) => {
//     el.classList.add('invisible');
//   });
//   pagesView[view].classList.remove('invisible');
// };

// pagesLinks.forEach((item, iter) => item.forEach((el) => el.addEventListener('click', () => changeView(iter))));

// document.addEventListener("DOMContentLoaded", app);
