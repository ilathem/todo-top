import './element.css';

export const createTextElement = (type, css, parent, text, attributes = {}) => {
    const element = createElement(type, css, parent, attributes);
    element.innerText = text;
    return element;
}

export const createElement = (type, css, parent, attributes = {}) => {
    const element = document.createElement(type);
    element.classList.add(css);
    for (const attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute])
    }
    if (typeof parent === 'string') {
        document.querySelector(parent).appendChild(element);
    } else {
        parent.appendChild(element);
    }
    return element;
}

export const createInput = (
    type,
    parent,
    labelText,
    onChange,
    name = '',
) => {
    const inputDiv = createElement('div', 'inputDiv', parent);
   createTextElement('label', 'label', inputDiv, labelText,
        {
            for: labelText
        }
    );
    const input = createElement('input', 'input', inputDiv);
    input.type = type;
    input.id = labelText;
    if (name) input.name = name;
    input.addEventListener('input', (e) => onChange(e.target.value));
    return inputDiv;
}

export const createButton = (parent, text, onClick) => {
    const button = createTextElement('button', 'button', parent, text);
    button.addEventListener('click', () => onClick());
    return button;
}
