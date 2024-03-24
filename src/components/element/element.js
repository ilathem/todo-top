import './element.css';

export const createTextElement = (type, css, parent, text) => {
    const element = createElement(type, css, parent);
    element.innerText = text;
    return element;
}

export const createElement = (type, css, parent) => {
    const element = document.createElement(type);
    element.classList.add(css);
    if (typeof parent === 'string') {
        document.querySelector(parent).appendChild(element);
    } else {
        parent.appendChild(element);
    }
    return element;
}

export const createInput = (
    parent,
    labelText,
    onChange,
) => {
    const input = createElement('input', 'input', parent);
    createTextElement('label', 'label', input, labelText);
    input.addEventListener('keyup', (e) => onChange(e.target.value));
    return input;
}

export const createButton = (parent, text, onClick) => {
    const button = createTextElement('button', 'button', parent, text);
    button.addEventListener('click', () => onClick());
    return button;
}
