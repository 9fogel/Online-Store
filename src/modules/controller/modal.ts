import Cart from './cart';
import Popup from './popup';

class ModalWindow {
  static fillField(
    innerText: string,
    fieldClass: string,
    type: string,
    name: string,
    placeholder: string,
    required: boolean,
    pattern?: string,
    size?: number,
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
    if (size) input.size = size;

    const element = document.createElement('div');
    element.classList.add(fieldClass);
    element.append(label);
    element.append(input);
    return element;
  }

  static tracker() {
    const phoneNumberField: HTMLElement | null = document.getElementById('phone');
    if (phoneNumberField instanceof HTMLInputElement) {
      phoneNumberField.addEventListener(
        'input',
        () => (phoneNumberField.value = '+' + phoneNumberField.value.replace(/\D/g, '')),
      );
    }

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
        if (string[0] === '2' && logo) {
          logo.classList.add('mir');
        } else if (string[0] === '3' && logo) {
          logo.classList.add('amer-expr');
        } else if (string[0] === '4' && logo) {
          logo.classList.add('visa');
        } else if (string[0] === '5' && logo) {
          logo.classList.add('mastercard');
        } else if (logo) {
          logo.className = 'payment_logo';
        }
      });
    }

    const cardValidField: HTMLElement | null = document.getElementById('card_date');
    if (cardValidField instanceof HTMLInputElement) {
      cardValidField.addEventListener('input', () => {
        let string = cardValidField.value;
        string = string.replace(/\D/g, '').substring(0, 4);
        string = string
          .split(/(\d{2})/)
          .filter((item) => item !== '')
          .join('/');
        cardValidField.value = string;
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
    Popup.renderPopup('Your order is accepted', 5000, 'order_confirmed');
    setTimeout(() => {
      window.location.hash = '#main-page';
      Cart.removeAll();
    }, 3000);
  }

  static renderModal() {
    const close = document.createElement('div');
    close.classList.add('close');
    close.id = 'closeModal';
    // close.innerText = '𐄂';
    close.addEventListener('click', ModalWindow.closeModal);

    const title = document.createElement('h3');
    title.classList.add('modal_wrapper');
    title.innerText = `Payment`;

    const userHeader = document.createElement('h5');
    userHeader.innerText = 'Personal details';

    const user = document.createElement('div');
    user.classList.add('modal_wrapper');
    user.append(userHeader);
    user.append(this.fillField('name: ', 'form_field', 'text', 'name', 'Name Surname', true, '^\\w{3,}\\s\\w{3,}'));
    user.append(this.fillField('phone: ', 'form_field', 'text', 'phone', '+99999999999', true, '^\\+\\d{9,}'));
    user.append(
      this.fillField(
        'delivery address: ',
        'form_field',
        'input',
        'address',
        'Minsk, Lenin Street 1',
        true,
        '^\\w{5,}\\s\\w{5,}\\s\\w{5,}',
      ),
    );
    user.append(this.fillField('e-mail: ', 'form_field', 'email', 'email', 'online-store@store.com', true));

    const cardHeader = document.createElement('h5');
    cardHeader.innerText = 'Credit card details';

    const logo = document.createElement('div');
    logo.classList.add('payment_logo');

    const label = document.createElement('label');
    label.classList.add('card_date_label');
    label.innerText = 'Valid: ';

    const cardWrap = document.createElement('div');
    cardWrap.classList.add('card_attributes');
    cardWrap.append(this.fillField('Valid: ', 'form_field', 'text', 'card_date', '11/11', true, '^\\d{2}\\/\\d{2}', 6));
    cardWrap.append(this.fillField('CVV ', 'form_field', 'text', 'card_CVV', '000', true, '^\\d{3}', 6));

    const card = document.createElement('div');
    card.classList.add('modal_wrapper');
    card.append(cardHeader);
    card.append(logo);
    card.append(
      this.fillField(
        'card number ',
        'form_field',
        'text',
        'card_number',
        '0000 0000 0000 0000',
        true,
        '^\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}',
        18,
      ),
    );
    card.append(cardWrap);

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
