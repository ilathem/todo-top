import './style.css'

import Header from './components/header/header.js';
import Todo from './utils/Todo';

// Todo.createProject('newProject');
// Todo.deleteProject(Todo.getProject(1711141859973))

const generateInitialPage = () => {
    Header();
}

document.addEventListener('DOMContentLoaded', () => generateInitialPage());
