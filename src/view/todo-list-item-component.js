import {createElement} from '../framework/render.js'; 
import { status } from '../const.js';

function createTodoListComponentTemplate() {
    return (
        `<div class="taskboard__item task task--${status}">
      <div class="task__body">
        <p class="task__view">${title}</p>
        <input type="text" class="task__input" />
      </div>
      <button aria-label="Изменить" class="task__edit" type="button"></button>
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
