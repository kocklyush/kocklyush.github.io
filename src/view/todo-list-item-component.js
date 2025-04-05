import {createElement} from '../framework/render.js'; 


function createTodoListComponentTemplate() {
    return (
        `<div class="todo-list-item task task--${status}">
      <div class="todo-list-item__body">
        <p class="todo-list-item__view">${title}</p>
        <input type="text" class="new-item-input" />
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
    return createTodoListComponentTemplate();
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
