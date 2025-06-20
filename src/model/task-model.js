import Observable from "../framework/observable.js";
// import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";
import {UpdateType,UserAction} from "../const.js"
export default class TasksModel extends Observable{
    #tasksApiService=null;
    #boardtasks=[];
    async init(){
        try{
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks=tasks;
        } catch(err){
            this.#boardtasks=[];
        }
        this._notify(UpdateType.INIT);
    }

    constructor({tasksApiService}){
        super();
        this.#tasksApiService=tasksApiService
        this.#tasksApiService.tasks.then((tasks)=>{
            console.log(tasks);
        })
    }
    get tasks(){
        return this.#boardtasks
    }
    getTasksByStatus(status){
        return this.#boardtasks.filter(task=>task.status === status);
    }

    async addTask(title){
        const newTask = {
            title,
            status: 'backlog',
            id:generateID(),
        };
        try{
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserAction.ADD_TASK, createdTask);
            return createdTask;
        }catch(err){
            console.error('Ошибка при добавлении задачи на сервер:', err);
            throw err;
        }
    }

    deleteTask(taskId){
        this.#boardtasks=this.#boardtasks.filter(task=>task.id!==taskId);
        this._notify(UserAction.DELETE_TASK,{status: 'bin'});
    }

    async clearBin(){
        const binTasks = this.#boardtasks.filter(task=>task.status==='bin');
        try{
            await Promise.all(binTasks.map(task=>this.#tasksApiService.deleteTask(task.id)));

            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'bin');
            this._notify(UserAction.DELETE_TASK,{status: 'bin'});
        }catch(err){
            console.error("Ошибка при удалении задач из корзины на сервере:",err);throw err;
        }
    }


    async updateTaskStatus(taskId, newStatus, dropIndex = null) {
        const oldIndex = this.#boardtasks.findIndex(t => t.id === taskId);
        if (oldIndex === -1) return;
        const [task] = this.#boardtasks.splice(oldIndex, 1);
        const previousStatus = task.status;
        task.status = newStatus;
      
        const filtered = this.#boardtasks.filter(t => t.status === newStatus);
        let insertBeforeId = null;
        if (dropIndex !== null && dropIndex < filtered.length) {
          insertBeforeId = filtered[dropIndex].id;
        }
      
        let insertPos;
        if (insertBeforeId) {
          insertPos = this.#boardtasks.findIndex(t => t.id === insertBeforeId);
        } else {
          insertPos = this.#boardtasks.length;
        }
      
        this.#boardtasks.splice(insertPos, 0, task);
      
        try {
          const updated = await this.#tasksApiService.updateTask(task);
          Object.assign(task, updated);
          this._notify(UserAction.UPDATE_TASK, task);
        } catch (err) {
          console.error("Ошибка при обновлении статуса задачи на сервере:", err);
          task.status = previousStatus;
          throw err;
        }
      }

    hasBinTasks(){
        return this.#boardtasks.some(task=>task.status=== 'bin');
    }
}