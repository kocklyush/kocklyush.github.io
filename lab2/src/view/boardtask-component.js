import {createElement} from '../framework/render.js';


function createBoardTaskComponent() {
    return (
        `<div class="todo-lists-space"></div>`
      );
}
export default class BoardTaskComponent {
  getTemplate() {
    return createBoardTaskComponent();
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