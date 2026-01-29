import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
        `<form class="addnewtaskform">
            <label class="addnewtaskform-label">Новая задача</label><br>
            <div class="new-item-element">
                <input class="new-item-input" placeholder="Название задачи...">
                <button class="new-item-add-button">+ Добавить</button>
            </div>
        </form>`
      );
}


export default class FormAddTaskComponent extends AbstractComponent{
  constructor() {
    super();}
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}