import { renderContent } from "./render-content";

const renderMain = () => {
  const header = document.createElement("header");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const divFormInput = document.createElement("div");

  divFormInput.className = "form-input";

  button.innerText = "search";
  button.className = "search";
  button.onclick = () => {
    renderContent();
  };

  divFormInput.appendChild(input);
  divFormInput.appendChild(button);

  header.appendChild(divFormInput);

  document.body.appendChild(header);
};

export { renderMain };
