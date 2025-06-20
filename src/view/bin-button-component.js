import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';


function createBinButtonComponent() {
    return (
        `<button class="clear-button">x Очистить</button>`
      );
}


export default class BinButtonComponent extends AbstractComponent{


  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }
  get template() {
    return createBinButtonComponent();
  }
  #clickHandler=(evt)=>{
    evt.preventDefault();
    this.#handleClick();
  }
  setUnviable(){
    this.element.disabled = true;
  }
}