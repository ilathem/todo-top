import './style.css'

import Header from './components/header/header.js';
import Todo from './utils/Todo';

Todo.createProject('newProject');

const generateInitialPage = () => {
    Header();
}

document.addEventListener('DOMContentLoaded', () => generateInitialPage());
