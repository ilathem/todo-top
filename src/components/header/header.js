import './header.css'
import { 
    createButton, 
    createElement, 
    createTextElement,
    createInput,
} from '../element/element';

export default function generateHeader() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerText = 'Todos';
    const header = document.createElement('div');
    header.classList.add('header');
    header.appendChild(title);
    const buttonDiv = createElement('div', 'buttonDiv', header); 
    const createTodo = createButton(
        buttonDiv,
        'Create New Todo',
        () => openCreateTodo()
    );
    const createProject = createButton(
        buttonDiv,
        'Create New Project',
        () => openCreateProject()
    );
    createInput(
        header,
        'Test label',
        (text) => console.log(text)
    );
    document.querySelector('header').appendChild(header);
}

const openCreateTodo = () => {
    console.log('create new todo')
    openContainer('todo');
}

const openCreateProject = () => {
    console.log('create new project');
    openContainer('project');
}

const openContainer = (type) => {
    const container = createElement(
        'div', 
        'container', 
        document.querySelector('body')
    );
    createTextElement(
        'p',
        'containerTitle',
        container,
        type === 'todo' ?
        'New Todo'
        :
        'New Project'
    );
    if (type === 'todo') addTodoForm(container);
    else addProjectForm(container);
}

const addTodoForm = (parent) => {
    
}

const addProjectForm = (parent) => {

}

