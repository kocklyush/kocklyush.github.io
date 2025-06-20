import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

// function createTodoListComponentTemplate() {
//     return (
//         `<li class="todo-list-item">Навзвание первой задачи</li>`
//       );
// }



function createMockItemComponentTemplate() {
  return (
      `<div class="taskboard__item task task--mock">
        <div class=task__body>
          <li class="todo-list-item-mock todo-list-item">
          <div   contenteditable="true" class="task--input-mock" disabled>Перетащите элемент</div>
          </li>
        </div>
      </div>`
    );
}


export default class MockItemComponent extends AbstractComponent{

  constructor(){
    super();
  }


  get template() {
    return createMockItemComponentTemplate(this.task);
  }
}