import Todo from "../../utils/Todo";
import { priorityLevels } from "../../utils/constants";
import './projects.css';
import { createElement, createTextElement } from "../element/element";

export default () => {
    const container = document.createElement('div');
    container.classList.add('projectsContainer');
    Todo.getAll().forEach(project => {
        const projectContainer = 
            createElement('div', 'projectContainer', 'main');
        createTextElement('p', 'projectTitle', projectContainer, project.name);        
        createTextElement('p', 'projectDate', projectContainer, `Created: ${
            new Date(project.id).toLocaleString()}`);
        project.todos.forEach(todo => {
            projectContainer.appendChild(createTodo(todo));
        });
        container.appendChild(projectContainer);
    }) 
    document.querySelector('main').appendChild(container);
}

const createTodo = (todo) => {
    const container = document.createElement('div');
    container.classList.add('todoContainer');
    createTextElement('p', 'todoDescription', container, todo.description);
    createTextElement('p', 'todoDue', container, `Due: ${todo.dueDate ? 
            new Date(todo.dueDate).toLocaleString() : 'n/a'}`);
    createTextElement('p', 'todoPriority', container, `Priority: ${
        priorityLevels[todo.priority]}`);
    createTextElement('p', 'todoNotes', container, todo.notes);
    const checklist = createElement('ul', 'todoChecklist', container);
    for (const checklistItem of todo.checklist) {
        createTextElement(
            'li',
            [   
                'todoChecklistItem',
                `${checklistItem.done ? 
                    'checklistDone' : 
                    'checklistNotDone'
                }`
            ], 
            checklist,
            checklistItem.description);
    }
    container.appendChild(checklist);
    return container;
}
