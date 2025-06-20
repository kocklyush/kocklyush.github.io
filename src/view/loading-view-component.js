import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskTemplate(){
    return(
        `<div class="loading-view">
  <div class="loading-view__spinner"></div>
  <div class="loading-view__text">Загрузка...</div>
</div>
`
    )
}


export default class LoadingViewComponent extends AbstractComponent{
    get template(){
        return createNoTaskTemplate();
    }
}