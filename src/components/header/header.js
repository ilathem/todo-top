import './header.css'
import {
    createButton,
    createElement,
} from '../element/element';
import {
    openCreateTodo,
    openCreateProject
} from '../form/form';

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
