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
    #binButtonComponent = null;


    constructor({boardContainer,tasksModel}){
        this.#boardContainer=boardContainer;
        this.#tasksModel= tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
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
        if(!this.#binButtonComponent){
            this.#binButtonComponent = new BinButtonComponent({
                onClick: this.#handleBinClear.bind(this)
            });
        }
        render(this.#binButtonComponent, container);
        
    }

    #renderBoard(){
        render(this.#tasksBoardComponent, this.#boardContainer);    

        for(let i=0;i<Object.keys(StatusI).length;i++){
            const status=StatusI[i];
            this.#renderTodoList(status,this.#tasksBoardComponent.element, this.tasks)
        } 
        
    }

    createTask(){
        const taskTitle = document.querySelector('#new-item-input').value.trim();
        if(!taskTitle){
            return;
        }
        this.#tasksModel.addTask(taskTitle);
        document.querySelector('#new-item-input').value='';
    }

    get tasks(){
        return this.#tasksModel.tasks;
    }

    #clearBoard(){
        this.#tasksBoardComponent.element.innerHTML = '';
    }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
    }

    #clearBin(){
        this.#tasksModel.clearBin();
        this.#tasksBoardComponent.element.innerHTML = '';
    }


    #handleBinClear() {
        this.#clearBin();
        this.#binButtonComponent.setUnviable();
        this.#renderBoard();
    }
    
}