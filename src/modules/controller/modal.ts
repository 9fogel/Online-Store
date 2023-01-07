import Cart from './cart';

class ModalWindow {
  static fillField(
    innerText: string,
    fieldClass: string,
    type: string,
    name: string,
    placeholder: string,
    required: boolean,
    pattern?: string,
  ) {
    const label = document.createElement('label');
    label.innerText = innerText;

    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.id = name;
    input.placeholder = placeholder;
    input.required = required;
    if (pattern) input.pattern = pattern;

    const element = document.createElement('div');
    element.classList.add(fieldClass);
    element.append(label);
    element.append(input);
    return element;
  }

  static tracker() {
    const cardNumberField: HTMLElement | null = document.getElementById('card_number');
    const logo: HTMLElement | null = document.querySelector('.payment_logo');
    if (cardNumberField instanceof HTMLInputElement) {
      cardNumberField.addEventListener('input', () => {
        let string = cardNumberField.value;
        string = string.replace(/\D/g, '').substring(0, 16);
        string = string
          .split(/(\d{4})/)
          .filter((item) => item !== '')
          .join(' ');
        cardNumberField.value = string;
        if (string[0] === '2' && logo instanceof HTMLImageElement) logo.src = '../../img/card/MIR.png';
        if (string[0] === '3' && logo instanceof HTMLImageElement) logo.src = '../../img/card/AE.png';
        if (string[0] === '4' && logo instanceof HTMLImageElement) logo.src = '../../img/card/VISA.png';
        if (string[0] === '5' && logo instanceof HTMLImageElement) logo.src = '../../img/card/MC.png';
      });
    }

    const CVVField: HTMLElement | null = document.getElementById('card_CVV');
    if (CVVField instanceof HTMLInputElement)
      CVVField.addEventListener('input', () => (CVVField.value = CVVField.value.replace(/\D/g, '').substring(0, 3)));
  }

  static handleFormSubmit(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    console.log('Отправка!');

    const collection: HTMLFormControlsCollection = form.elements;

    const arr = Array.from(collection);
    arr.forEach((element) => {
      if (element instanceof HTMLInputElement) {
        const { name, value } = element;
        console.log(name, value);
      } else console.log(element);
    });
    ModalWindow.closeModal();
    ModalWindow.renderAccept();
    setTimeout(() => {
      window.location.hash = '#main-page';
      Cart.removeAll();
    }, 3000);
  }

  static renderAccept() {
    const text = document.createElement('div');
    text.classList.add('popup_text');
    text.innerText = 'Your order is accepted';

    const close = document.createElement('span');
    close.classList.add('close');
    close.innerText = '𐄂';
    close.addEventListener('click', ModalWindow.removeAccept);

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal_window');
    modalWindow.append(close);
    modalWindow.append(text);

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal_wrapper');
    modalWrapper.append(modalWindow);

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.append(modalWrapper);

    document.body.append(popup);

    window.onclick = function (event) {
      if (event.target == popup) {
        ModalWindow.removeAccept();
      }
    };

    setTimeout(ModalWindow.removeAccept, 3000);
  }

  static removeAccept() {
    const popup: HTMLElement | null = document.querySelector('.popup');
    if (popup) popup.remove();
  }

  static renderModal() {
    const close = document.createElement('span');
    close.classList.add('close');
    close.id = 'closeModal';
    close.innerText = '𐄂';
    close.addEventListener('click', ModalWindow.closeModal);

    const title = document.createElement('h3');
    title.classList.add('modal_wrapper');
    title.innerText = `Payment`;

    const userHeader = document.createElement('h5');
    userHeader.innerText = 'Personal details';

    const user = document.createElement('div');
    user.classList.add('modal_wrapper');
    user.append(userHeader);
    user.append(this.fillField('name: ', 'form_field', 'text', 'name', 'Name Surname', true));
    user.append(this.fillField('phone: ', 'form_field', 'text', 'phone', '+7(999)999-99-99', true));
    user.append(this.fillField('delivery address: ', 'form_field', 'input', 'address', 'Berlin', true));
    user.append(this.fillField('e-mail: ', 'form_field', 'email', 'email', 'online-store@store.com', true));

    const cardHeader = document.createElement('h5');
    cardHeader.innerText = 'Credit card details';

    const logo = document.createElement('img');
    logo.classList.add('payment_logo');

    const label = document.createElement('label');
    label.classList.add('card_date_label');
    label.innerText = 'Valid: ';

    const month = document.createElement('select');
    month.classList.add('card_date_month');
    for (let i = 1; i < 13; i += 1) {
      const mon = document.createElement('option');
      mon.innerText = `${i}`;
      month.append(mon);
    }

    const year = document.createElement('select');
    year.classList.add('card_date_year');
    const today = new Date();
    const currentYear = today.getFullYear();
    for (let i = currentYear; i < currentYear + 8; i += 1) {
      const y = document.createElement('option');
      y.innerText = `${i}`;
      year.append(y);
    }

    const date = document.createElement('div');
    date.classList.add('card_date');
    date.append(label);
    date.append(month);
    date.append(year);

    const card = document.createElement('div');
    card.classList.add('modal_wrapper');
    card.append(cardHeader);
    card.append(logo);
    card.append(this.fillField('Number', 'form_field', 'text', 'card_number', '0000 0000 0000 0000', true));
    card.append(date);
    card.append(this.fillField('CVV', 'form_field', 'text', 'card_CVV', '000', true));

    const submit = document.createElement('input');
    submit.classList.add('payment_confirm');
    submit.type = 'submit';
    submit.value = 'Confirm';

    const form = document.createElement('form');
    form.classList.add('payment_form');
    form.append(user);
    form.append(card);
    form.append(submit);
    form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));

    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal_window');
    modalWindow.append(close);
    modalWindow.append(title);
    modalWindow.append(form);

    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal_wrapper');
    modalWrapper.append(modalWindow);

    const payment = document.createElement('div');
    payment.classList.add('payment');
    payment.append(modalWrapper);

    document.body.append(payment);

    window.onclick = function (event) {
      if (event.target == payment) {
        ModalWindow.closeModal();
      }
    };
  }

  static closeModal() {
    const modal: HTMLElement | null = document.querySelector('.payment');
    if (modal) modal.remove();
  }

  static openModal(): void {
    ModalWindow.renderModal();
    ModalWindow.tracker();
  }
}

export default ModalWindow;
