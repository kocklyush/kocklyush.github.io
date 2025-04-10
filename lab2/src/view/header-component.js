import {createElement} from '../framework/render.js'; 

function createHeaderComponentTemplate() {
    return (
        `<header class="header">
        <a class="header-label">Список задач</a>
        </header>`
      );
}
export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
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