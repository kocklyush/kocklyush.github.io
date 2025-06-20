import HeaderComponent from './view/header-component.js';
import {render, RenderPosition} from './framework/render.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';


const END_POINT='https://68122c053ac96f7119a7242e.mockapi.io'
const bodyContainer = document.querySelector('.board-app-task');
const formContainer = document.querySelector('.add-task');
const tasksBoardContainer=document.querySelector('.taskboard');
const taskModel=new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});
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