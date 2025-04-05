import {createElement} from '../framework/render.js'; 


function createTodoListItemComponentTemplate(title, Status) {
    return (
        `<div class="todo-list-item todo-list-item--${status}">
      <div class="todo-list-item__body">
        <p class="todo-list-item__view">${title}</p>
        <input type="text" class="todo-list-item__input" />
      </div>
      <button aria-label="Изменить" class="todo-list-item__edit" type="button"></button>
    </div>`
      );
}
export default class TodoListItemComponent {
  constructor({task}) {
    this.task = task;
  }

  getTemplate() {
    return createTodoListItemComponentTemplate(this.task.title, this.task.status);
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