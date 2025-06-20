import {createElement} from '../framework/render.js'; 

function createTodoListComponentTemplate() {
    return (
        `<li class="todo-list-item">Навзвание первой задачи</li>`
      );
}


export default class TodoListItemComponent {
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