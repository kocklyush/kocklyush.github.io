import {createElement} from '../framework/render.js'; 


function createTodoListComponentTemplate(title,status) {
    return (
        `<div class="todo-list-box">
                <label class="todo-list-label-${status} todo-list-label">${title}</label>
                <ul class="todo-list">
                </ul>
            </div>`
      );
}
export default class TodoListComponent {
  constructor({title,status}){
    this.title=title;
    this.status=status;
  }
  getTemplate() {
    return createTodoListComponentTemplate(this.title,this.status);
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