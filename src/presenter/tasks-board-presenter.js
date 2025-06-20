import TodoListComponent from '../view/todo-list-component.js'
import BoardTaskComponent from '../view/boardtask-component.js'
import LoadingViewComponent from '../view/loading-view-component.js'
import TodoListItemComponent from '../view/todo-list-item-component.js'
import{Status,StatusI,StatusLabel, UserAction} from '../const.js'
import { render } from '../framework/render.js';
import BinButtonComponent from '../view/bin-button-component.js';
import MockItemComponent from '../view/mock-item-component.js';

export default class TasksBoardPresenter{
    #tasksBoardComponent=new BoardTaskComponent();

    #loadingComponent = new LoadingViewComponent();

    #boardContainer=null;
    #tasksModel=null;
    #binButtonComponent = null;


    constructor({boardContainer,tasksModel}){
        this.#boardContainer=boardContainer;
        this.#tasksModel= tasksModel;

        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    async init() {
    render(this.#loadingComponent, this.#boardContainer);

    await this.#tasksModel.init();

    if (this.#loadingComponent.element) {
        this.#loadingComponent.element.remove();
      }
        this.#clearBoard();
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
        const todoListComponent = new TodoListComponent({
            title: StatusLabel[status],
            status: status,
            onTaskDrop: this.#handleTaskDrop.bind(this)  
          });
        render(todoListComponent, container);
        const todoListElement = todoListComponent.getList();
        const statArray=boardTasks.filter(task => task.status === status);
        if(statArray.length>0){
            statArray.forEach((task)=>{this.#renderTask(task,todoListElement);})
            
            if(status===StatusI[3]){
                this.#renderBinButton(todoListElement);
                
                this.#binButtonComponent.toggleDisabled(false);
            }
        }
        else{
            this.#renderMockTask(todoListElement);
            
            if(status===StatusI[3]){
                this.#renderBinButton(todoListElement);
                this.#binButtonComponent.toggleDisabled(true);
            }
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

    async createTask(){
        const taskTitle = document.querySelector('#new-item-input').value.trim();
        if(!taskTitle){
            return;
        }
        try{
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('#new-item-input').value='';
        }
        catch (err){
            console.error("Ошибка при создании задачи", err);
        }
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
    #handleModelEvent(event,payload){
        switch(event){
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                if(this.#binButtonComponent){
                    this.#binButtonComponent.toggleDisabled(!this.#tasksModel.hasBinTasks());
                }
                break;
        }
    }
    async #clearBin(){
        try{
            this.#tasksModel.clearBin();
            this.#tasksBoardComponent.element.innerHTML = '';
        }
        catch(err){
            console.error('Ошибка при очистке корзины:',err);
        }
    }


    #handleBinClear() {
        this.#clearBin();
        this.#renderBoard();
    }
    
    async #handleTaskDrop(taskId,newStatus, dropIndex){
        try{
            await this.#tasksModel.updateTaskStatus(taskId, newStatus, arguments[2]);
        }catch(err){
            console.error('Ошибка при обновлении статуса задачи:',err)
        }
    }
}