import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTodoListComponentTemplate(title,status) {
    return (
        `<div class="todo-list-box">
                <label class="todo-list-label-${status} todo-list-label">${title}</label>
                <ul class="todo-list">
                </ul>
                <div class="spacer"></div>
            </div>`
      );
}


export default class TodoListComponent extends AbstractComponent{
  constructor({title,status,onTaskDrop}){
    super();
    this.title=title;
    this.status=status;
    this.#setDropHandler(onTaskDrop);
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

  #setDropHandler(onTaskDrop){
    const container = this.element.querySelector('.todo-list');
  
    container.addEventListener('dragover', event => {
      event.preventDefault();
    });
  
    container.addEventListener('drop', event => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
  
      const children = Array.from(container.children);
  
      let dropIndex = children.length;
  
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        if (event.clientY < rect.top + rect.height / 2) {
          dropIndex = i;
          break;
        }
      }

      onTaskDrop(taskId, this.status, dropIndex);
    });
  }
}