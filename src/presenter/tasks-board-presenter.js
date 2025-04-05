import TodoListComponent from '../view/todo-list-component.js';
import TodoListItemComponent from '../view/todo-list-item-component.js';
import BoardTaskComponent from '../view/boardtask-component.js';
import {render} from '../framework/render.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #tasksModel = null;
    
    #tasksBoardComponent = new BoardTaskComponent();
    
    #boardTasks = [];
    
    constructor({boardContainer, tasksModel}) {
      this.#boardContainer = boardContainer;
      this.#tasksModel = tasksModel;
    }
    

    init() {
        this.boardTasks = [...this.tasksModel.getTasks()];
    
        render(this.tasksBoardComponent, this.boardContainer);
    
        for (let i = 0; i < 4; i++) {
            const tasksListComponent = new TodoListComponent();
            render(tasksListComponent, this.tasksBoardComponent.getElement());
    
            for (let j = 0; j < this.boardTasks.length; j++) {
                const taskComponent = new TodoListItemComponent({task: this.boardTasks[j]});
                render(taskComponent, tasksListComponent.getElement());
            }
        }
    }
    
}
