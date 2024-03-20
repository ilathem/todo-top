import './style.css'

import Header from './components/header/header.js';


const generateInitialPage = () => {
    Header();
}

document.addEventListener('DOMContentLoaded', () => generateInitialPage());
