import './style.css'

import Header from './components/header/header.js';
import Todo from './utils/Todo';



const generateInitialPage = () => {
    Header();
}

document.addEventListener('DOMContentLoaded', () => generateInitialPage());
