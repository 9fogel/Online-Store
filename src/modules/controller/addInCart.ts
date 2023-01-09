import Cart from './cart';

const changeBtn: (addBtn: HTMLElement, btn: string, id: number) => void = function (
  addBtn: HTMLElement,
  btn: string,
  id: number,
) {
  if (btn === 'discard') {
    Cart.removeProduct(id);
    addBtn.classList.add('button_buy');
    addBtn.classList.remove('button_discard');
    addBtn.innerText = 'Add to cart';
    addBtn.addEventListener('click', (): void => changeBtn(addBtn, 'add', id));
  }
  if (btn === 'add') {
    Cart.addItem(id);
    addBtn.classList.add('button_discard');
    addBtn.classList.remove('button_buy');
    addBtn.innerText = `Drop from Cart (${Cart.getProductAmount(id)})`;
    addBtn.addEventListener('click', (): void => changeBtn(addBtn, 'discard', id));
  }
};

export default changeBtn;
