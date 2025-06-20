import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createBoardTaskComponent() {
    return (
        `<div class="todo-lists-space"></div>`
      );
}


export default class BoardTaskComponent extends AbstractComponent{
  constructor() {
    super();
  }
  get template() {
    return createBoardTaskComponent();
  }
}