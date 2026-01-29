import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createHeaderComponentTemplate() {
    return (
        `<header class="header">
    <a class="header-label">Список задач</a>
</header>`
      );
}


export default class HeaderComponent extends AbstractComponent{
  constructor() {
    super();}
  get template() {
    return createHeaderComponentTemplate();
  }
}