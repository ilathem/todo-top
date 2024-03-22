import './style.css'

import Header from './components/header/header.js';
import Projects from './components/projects/projects.js';
import Todo from './utils/Todo';

// Todo.createProject('newProject');
// Todo.deleteProject(Todo.getProject(1711141859973))

const generateInitialPage = () => {
    Header();
    Projects();
}

document.addEventListener('DOMContentLoaded', () => generateInitialPage());
