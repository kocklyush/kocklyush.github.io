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
          <button aria-label="Изменить" class="task__edit" type="button"></button>
          </li>
        </div>
      </div>`
    );
}


export default class TodoListItemComponent extends AbstractComponent{

  constructor({task}){
    super();
    this.task=task;
    this.#afterCreateElement();
  }


  get template() {
    return createTodoListComponentTemplate(this.task);
  }

  #afterCreateElement(){
    this.#makeTaskDraggable();
  }

  #makeTaskDraggable(){
    this.element.setAttribute(`draggable`,true);

    this.element.addEventListener('dragstart',(event)=>{
      event.dataTransfer.setData('text/plain',this.task.id);
    });
  }
}