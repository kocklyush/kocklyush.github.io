import TodoListComponent from '../view/todo-list-component.js'
import BoardTaskComponent from '../view/boardtask-component.js'
import TodoListItemComponent from '../view/todo-list-item-component.js'
import{Status,StatusI,StatusLabel} from '../const.js'
import { render } from '../framework/render.js';
import BinButtonComponent from '../view/bin-button-component.js';
import MockItemComponent from '../view/mock-item-component.js';

export default class TasksBoardPresenter{
    #tasksBoardComponent=new BoardTaskComponent();

    #boardContainer=null;
    #tasksModel=null;

    #boardTasks=[];

    constructor({boardContainer,tasksModel}){
        this.#boardContainer=boardContainer;
        this.#tasksModel= tasksModel;
    }

    init() {
        this.#renderBoard()
    }

    #renderTask(task,container){
        const taskComponent=new TodoListItemComponent({task});
        render(taskComponent,container);
    }
    #renderMockTask(container){
        const taskComponent=new MockItemComponent();
        render(taskComponent,container);
    }
    #renderTodoList(status,container,boardTasks){
        const todoListComponent=new TodoListComponent({ title: StatusLabel[status] ,status:status});
        render(todoListComponent, container);
        const todoListElement = todoListComponent.getList();
        const statArray=boardTasks.filter(task => task.status === status);
        if(statArray.length>0){
            statArray.forEach((task)=>{this.#renderTask(task,todoListElement);})
        }
        else{
            this.#renderMockTask(todoListElement);
        }
        if(status===StatusI[3]){
            this.#renderBinButton(todoListElement);
        }
    }
    #renderBinButton(container){
        const binButtonComponent=new BinButtonComponent();
                    render(binButtonComponent, container);
    }

    #renderBoard(){
        render(this.#tasksBoardComponent, this.#boardContainer);    
        
            
        // this.#boardTasks = this.#tasksModel.tasks;
        for(let i=0;i<Object.keys(StatusI).length;i++){
            const status=StatusI[i];
            this.#renderTodoList(status,this.#tasksBoardComponent.element, this.#boardTasks)
        } 
        
    }
}