import './style.css'

import Header from './components/header/header';


const generateInitialPage = () => {
    Header();
}

document.addEventListener('DOMContentLoaded', () => generateInitialPage())
