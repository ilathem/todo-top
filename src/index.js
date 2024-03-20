import './style.css'

import Header from './components/header/header.js';
import Todo from './utils/Todo';

const todo = new Todo();
todo.getAll();

const generateInitialPage = () => {
    Header();
}

document.addEventListener('DOMContentLoaded', () => generateInitialPage());



