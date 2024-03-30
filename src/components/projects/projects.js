import Todo from '../../utils/Todo';
import { priorityLevels } from '../../utils/constants';
import './projects.css';
import { createElement, createTextElement } from '../element/element';
import { openExistingTodo } from '../form/form';

export default () => {
  const container = document.createElement('div');
  container.classList.add('projectsContainer');
  Todo.getAll().forEach((project) => {
    const projectContainer = createElement('div', 'projectContainer', 'main');
    createTextElement('p', 'projectTitle', projectContainer, project.name);
    createTextElement(
      'p',
      'projectDate',
      projectContainer,
      `Created: ${new Date(project.id).toLocaleString()}`
    );
    project.todos.forEach((todo) => {
      projectContainer.appendChild(createTodo(todo));
    });
    container.appendChild(projectContainer);
  });
  document.querySelector('main').appendChild(container);
};

const openTodo = todo => {
  openExistingTodo(todo);
}

const createTodo = (todo) => {
  const container = document.createElement('div');
  container.classList.add('todoContainer');
  container.addEventListener('click', () => openTodo(todo))
  createTextElement('p', 'todoDescription', container, todo.description);
  if (todo.dueDate) {
      createTextElement(
        'p',
        'todoDue',
        container,
        `Due: ${todo.dueDate ? new Date(todo.dueDate).toLocaleString() : 'n/a'}`
      );
  }
  createTextElement(
    'p',
    `priority${priorityLevels[todo.priority]}`,
    container,
    `${priorityLevels[todo.priority]} Priority`
  );
  if (todo.notes) {
    const notesDiv = createElement('div', 'subsection', container);
    createTextElement('p', 'subsectionHeader', notesDiv, 'Notes:');
    createTextElement('p', 'todoNotes', notesDiv, todo.notes);
  }
  if (todo.checklist.length) {
    const checklistDiv = createElement('div', 'subsection', container);
    createTextElement('p', 'subsectionHeader', checklistDiv, 'Checklist:');
    for (const checklistItem of todo.checklist) {
      createTextElement(
        'p',
        [
          'todoChecklistItem',
          `${checklistItem.done ? 'checklistDone' : 'checklistNotDone'}`,
        ],
        checklistDiv,
        checklistItem.description
      );
    }
    container.appendChild(checklistDiv);
  }
  return container;
};
