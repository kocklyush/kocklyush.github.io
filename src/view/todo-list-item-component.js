import {createElement} from '../framework/render.js'; 

function createTodoListComponentTemplate(task) {
  const {title,status}=task;
  return (
      `<div class="taskboard__item task task--${status}">
        <div class=task__body>
          <li class="todo-list-item-${status} todo-list-item">
          <div   contenteditable="true" class="task--input" disabled>${title}</div>
          </li>
        </div>
      </div>`
    );
}


export default class TodoListItemComponent {

  constructor({task}){
    this.task=task;
  }
  getTemplate() {
    return createTodoListComponentTemplate(this.task);
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