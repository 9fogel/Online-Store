import Cart from './cart';
import product from './product';
import drawCardCart from './product_cart';

const addItem = function (item: product) {
  Cart.addItem(item);
  drawCardCart();
};

export default addItem;
