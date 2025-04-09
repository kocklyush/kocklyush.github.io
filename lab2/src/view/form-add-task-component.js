import {createElement} from '../framework/render.js'; 

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="addnewtaskform">
            <label class="addnewtaskform-label">Новая задача</label><br>
            <div class="new-item-element">
                <input class="new-item-input" placeholder="Название задачи...">
                <button class="new-item-add-button">+ Добавить</button>
            </div>
        </form>`
      );
}
export default class FormAddTaskComponent {
  getTemplate() {
    return createFormAddTaskComponentTemplate();
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