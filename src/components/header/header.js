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

    // For testing...
    openCreateTodo();
    // delete above line when done with stying

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
        'newContainer',
        document.querySelector('body')
    );
    createTextElement(
        'p',
        'newContainerTitle',
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
    createInput('text', parent, 'Description', text => console.log(text));
    createInput('datetime-local', parent, 'Due Date/Time (leave blank if none)', dueDate => console.log(dueDate));
    const radioDiv = createElement('div', 'radioDiv', parent);
    const radioDivTitle = createTextElement(
        'p',
        'radioTitle',
        radioDiv,
        'Priority'
    )
    const radioSelections = createElement('div', 'radioSelections', parent);
    createInput(
        'radio',
        radioSelections,
        'Low',
        text => console.log(text),
        'priority'
    )
    createInput(
        'radio',
        radioSelections,
        'Medium',
        text => console.log(text),
        'priority'
    )
    createInput(
        'radio',
        radioSelections,
        'High',
        text => console.log(text),
        'priority'
    )
    createInput(
        'text',
        parent,
        'Notes',
        text => console.log(text)
    )
    const checklistDiv = createElement('div', 'checklistDiv', parent);
    createTextElement(
        'p',
        'checklistTitle',
        checklistDiv,
        'Checklist',
    );
    createTextElement(
        'p',
        'checklistsubTitle',
        checklistDiv,
        'click/tap to remove items',
    );
    createInput(
        'text',
        parent,
        'Add new checklist item',
        text => console.log(text)
    )
}

const addProjectForm = (parent) => {

}

