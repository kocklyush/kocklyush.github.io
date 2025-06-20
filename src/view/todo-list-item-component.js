import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

// function createTodoListComponentTemplate() {
//     return (
//         `<li class="todo-list-item">Навзвание первой задачи</li>`
//       );
// }



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


export default class TodoListItemComponent extends AbstractComponent{

  constructor({task}){
    super();
    this.task=task;
  }


  get template() {
    return createTodoListComponentTemplate(this.task);
  }
}