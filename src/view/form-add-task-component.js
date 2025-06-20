import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="addnewtaskform">
            <label class="addnewtaskform-label">Новая задача</label><br>
            <div class="new-item-element">
                <input class="new-item-input" id="new-item-input" placeholder="Название задачи...">
                <button class="new-item-add-button">+ Добавить</button>
            </div>
        </form>`
      );
}


export default class FormAddTaskComponent extends AbstractComponent{
  #handleClick = null;
  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }
  
  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler=(evt)=>{
    evt.preventDefault();
    this.#handleClick();
  }
}