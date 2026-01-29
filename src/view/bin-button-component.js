import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createBinButtonComponent() {
    return (
        `<button class="clear-button">x Очистить</button>`
      );
}


export default class BinButtonComponent extends AbstractComponent{
  constructor() {
    super();}
  get template() {
    return createBinButtonComponent();
  }
}