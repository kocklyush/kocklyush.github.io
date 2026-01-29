import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTodoListComponentTemplate(title,status) {
    return (
        `<div class="todo-list-box">
                <label class="todo-list-label-${status} todo-list-label">${title}</label>
                <ul class="todo-list">
                </ul>
            </div>`
      );
}


export default class TodoListComponent extends AbstractComponent{
  constructor({title,status}){
    super();
    this.title=title;
    this.status=status;
  }
  get template() {
    return createTodoListComponentTemplate(this.title,this.status);
  }
  getList(){
    if (!this.element) {
        this.element = createElement(this.template);
      }
  
  
      return this.element.querySelector('.todo-list');
  }
}