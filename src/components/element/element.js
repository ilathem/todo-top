import "./element.css";

export const createTextElement = (
  type,
  css,
  parent,
  text,
  attributes = {},
  onClick = () => {},
) => {
  const element = createElement(type, css, parent, attributes);
  element.addEventListener("click", (e) => onClick(e));
  element.innerText = text;
  return element;
};

export const createDropdown = (
  prompt,
  labelText,
  options,
  parent,
  attributes = {},
  onClick = () => {},
) => {
  const dropdownDiv = createElement("div", "dropdownDiv", parent);
  createTextElement("p", "dropdownLabel", dropdownDiv, labelText);
  createTextElement("p", "dropdownPrompt", dropdownDiv, prompt);
  let isOpen = false;
  let selection = prompt;
  dropdownDiv.addEventListener("click", (e) => {
    if (isOpen) {
      dropdownDiv.innerHTML = "";
      createTextElement("p", "dropdownPrompt", dropdownDiv, selection);
      createTextElement("p", "dropdownLabel", dropdownDiv, labelText);
      isOpen = false;
    } else {
      dropdownDiv.innerHTML = "";
      createTextElement("p", "dropdownLabel", dropdownDiv, labelText);
      options.forEach((option) => {
        createTextElement("p", "option", dropdownDiv, option, {}, (e) => {
          onClick(e.target.innerText);
          selection = e.target.innerText;
        });
      });
      isOpen = true;
    }
  });
};

export const createElement = (type, css, parent, attributes = {}) => {
  const element = document.createElement(type);
  if (css.length && typeof css === "object") {
    // is an array
    for (let i = 0; i < css.length; i++) {
      element.classList.add(css[i]);
    }
  } else {
    element.classList.add(css);
  }
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  if (typeof parent === "string") {
    document.querySelector(parent).appendChild(element);
  } else {
    parent.appendChild(element);
  }
  return element;
};

export const createInput = (
  type,
  parent,
  labelText,
  onChange,
  name = "",
  initialText = "",
  attributes = {},
  additionalClasses = []
) => {
  let css = ["inputDiv"];
  if (additionalClasses && additionalClasses.length)
    css = ["inputDiv", ...additionalClasses];
  const inputDiv = createElement("div", css, parent);
  createTextElement("label", "label", inputDiv, labelText, {
    for: labelText,
  });
  const input = createElement("input", "input", inputDiv);
  for (const attribute in attributes) {
    input.setAttribute(attribute, attributes[attribute]);
  }
  input.value = initialText;
  input.type = type;
  input.id = labelText;
  if (name) input.name = name;
  input.addEventListener("input", (e) => onChange(e.target.value));
  return [input, inputDiv];
};

export const createButton = (parent, text, onClick, additionalClasses = []) => {
  let css = ["button"];
  if (additionalClasses && additionalClasses.length)
    css = ["button", ...additionalClasses];
  const button = createTextElement("button", css, parent, text, {}, onClick);
  return button;
};
