import {createElement} from '../framework/render.js'; 
function createTodoListComponentTemplate() {
    return (
        `<div class="todo-list-box">
                <label class="todo-list-label">Название блока</label>
                <ul class="todo-list">
                </ul>
            </div>`
      );
}


export default class TodoListComponent {
  getTemplate() {
    return createTodoListComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }
  getList(){
    if (!this.element) {
        this.element = createElement(this.getTemplate());
      }
  
  
      return this.element.querySelector('.todo-list');
  }


  removeElement() {
    this.element = null;
  }
}