import './header.css'

export default function generateHeader() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerText = 'Todos';
    const header = document.createElement('div');
    header.classList.add('header');
    header.appendChild(title);
    document.querySelector('body').appendChild(header);
}
