const openModal = function () {
  console.log('open modal');
  const modal: HTMLElement | null = document.querySelector('.payment');
  const closePopup: HTMLElement | null = document.querySelector('.close');

  if (modal) {
    console.log('win');
    modal.classList.remove('invisible');

    if (closePopup) {
      closePopup.onclick = function () {
        modal.classList.add('invisible');
      };
    }

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.classList.add('invisible');
      }
    };
  }
};

export default openModal;
