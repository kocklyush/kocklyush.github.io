import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TodoListComponent from './view/todo-list-component.js';
import TodoListItemComponent from './view/todo-list-item-component.js';
import BoardTaskComponent from './view/boardtask-component.js';

const bodyContainer = document.querySelector('.board-app-task');
const formContainer = document.querySelector('.add-task');
render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), formContainer);
const boardTaskElemenet=new BoardTaskComponent();
render(boardTaskElemenet,bodyContainer);

const todoLists = document.querySelector('.todo-lists-space');

for (let i = 0; i < 4; i++) {
    const todoListComponent = new TodoListComponent();
    render(todoListComponent, todoLists, RenderPosition.BEFOREEND);

    const todoListElement = todoListComponent.getList();

    for (let j = 0; j < 4; j++) {
        render(new TodoListItemComponent(), todoListElement, RenderPosition.BEFOREEND);
    }
}