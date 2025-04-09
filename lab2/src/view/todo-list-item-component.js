import {createElement} from 'C:\Users\Dasha\helpp\src\framework\render.js'; 


function createTodoListComponentTemplate() {
    return (
        `<li class="todo-list-item">Назввание первой задачи</li>`
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