import Cart from './cart';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const changeBtn = function (addBtn: HTMLElement, btn: string, id: number) {
  if (btn === 'discard') {
    Cart.removeProduct(id);
    addBtn.classList.add('button_buy');
    addBtn.innerText = 'Add to cart';
    addBtn.addEventListener('click', (): void => changeBtn(addBtn, 'add', id));
  }
  if (btn === 'add') {
    Cart.addItem(id);
    addBtn.classList.add('button_discard');
    addBtn.innerText = `Drop from Cart (${Cart.getProductAmount(id)})`;
    addBtn.addEventListener('click', (): void => changeBtn(addBtn, 'discard', id));
  }
};

export default changeBtn;
