import './index.html'; //watch changes in index.html
import './index.scss';

console.log('Hello World!');

/* -------------- CHANGE VIEW -------------- */

const pages: string[] = ['store', 'item_page', 'cart', 'payment', 'about', 'page_404'];
const pagesLinks: NodeListOf<Element>[] = [];
const pagesView: Element[] = [];
pages.forEach((el: string): void => {
  pagesLinks.push(document.querySelectorAll(`.to_${el}`));
});
pages.forEach((el: string): void => {
  const temp = document.querySelector(`.${el}`);
  if (temp !== null) pagesView.push(temp);
});

const changeView = function (view: number) {
  pagesView.forEach((el) => {
    el.classList.add('invisible');
    console.log('add invisible', el);
  });
  pagesView[view].classList.remove('invisible');
};

pagesLinks.forEach((item, iter) => item.forEach((el) => el.addEventListener('click', () => changeView(iter))));
