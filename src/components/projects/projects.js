import Todo from "../../utils/Todo";
import './projects.css';

export default () => {
    const container = document.createElement('div');
    container.classList.add('projectsContainer');
    Todo.getAll().forEach(project => {
        const projectContainer = createElement('div', 'projectContainer', 'main');
        createElement('p', 'projectTitle', projectContainer, project.name);        
        createElement('p', 'projectDate', projectContainer, `Created: ${new Date(project.id).toLocaleString()}`);
        container.appendChild(projectContainer);
    }) 
    document.querySelector('main').appendChild(container);
}

const createElement = (type, css, parent, text = '') => {
    const element = document.createElement(type);
    element.classList.add(css);
    element.innerText = text;
    if (typeof parent === 'string') {
        document.querySelector(parent).appendChild(element);
    } else {
        parent.appendChild(element);
    }
    return element;
}
