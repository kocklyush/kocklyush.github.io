import {createElement} from '../framework/render.js'; 
function createTodoListComponentTemplate() {
    return (
        `<div class="todo-list">
      <h2>Список задач</h2>
      <ul class="todo-list__items"></ul>
    </div>`
      );
}
export default class TodoListComponent {
  getTemplate() {
    return createTodoListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getList() {
    return this.getElement().querySelector('.todo-list__items');
  }

  removeElement() {
    this.element = null;
  }
}