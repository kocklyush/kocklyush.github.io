import {createElement} from '../framework/render.js'; 


function createBinButtonComponent() {
    return (
        `<button class="clear-button">x Очистить</button>`
      );
}


export default class BinButtonComponent {
  getTemplate() {
    return createBinButtonComponent();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}