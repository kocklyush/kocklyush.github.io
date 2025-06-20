import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';

const bodyContainer = document.querySelector('.board-app-task');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer=document.querySelector('.taskboard');
const taskModel=new TasksModel();
const tasksBoardPresenter=new TasksBoardPresenter({boardContainer:tasksBoardContainer,tasksModel:taskModel,});


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);


tasksBoardPresenter.init();

const formAddTaskComponent=new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick(){
    tasksBoardPresenter.createTask();
}

render(formAddTaskComponent, formContainer);