import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";
export default class TasksModel{
    #boardtasks=tasks;
    #observers=[];

    get tasks(){
        return this.#boardtasks
    }

    getTasksByStatus(status){
        return this.#boardtasks.filter(task=>task.status === status);
    }

    addTask(title){
        const newTask = {
            title,
            status: 'backlog',
            id:generateID(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObservers();
        return newTask;
    }

    addObserver(observer){
        this.#observers.push(observer);
    }
    removeObserver(observer){
        this.#observers=this.#observers.filter((obs)=>obs!==observer);
    }
    _notifyObservers(){
        this.#observers.forEach((observer)=>observer());
    }

    clearBin(){
        this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'bin');
    }

    updateTaskStatus(taskId, newStatus, dropIndex = null) {
        const oldIndex = this.#boardtasks.findIndex(t => t.id === taskId);
        if (oldIndex === -1) return;
        const [task] = this.#boardtasks.splice(oldIndex, 1);
        
        task.status = newStatus;
        
        const statusIndexes = this.#boardtasks
            .map((t, i) => t.status === newStatus ? i : -1)
            .filter(i => i !== -1);
        
        let insertPos;
        if (statusIndexes.length === 0) {
            insertPos = this.#boardtasks.length;
        } else if (dropIndex === null || dropIndex >= statusIndexes.length) {

            insertPos = statusIndexes[statusIndexes.length - 1] + 1;
        } else {

            insertPos = statusIndexes[dropIndex];
        }
        
        this.#boardtasks.splice(insertPos, 0, task);
        this._notifyObservers();
    }
}