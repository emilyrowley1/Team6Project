// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// gets the value of a url param
export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const returnParam = urlParams.get(param);
  return returnParam;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);

  if(callback){
    callback(data);
  }
}

async function loadTemplate(path){
  // return fetch(path)
  //   .then(x = x.text());

  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerT = await loadTemplate("../partials/header.html");
  const footerT = await loadTemplate("../partials/footer.html");

  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");

  renderWithTemplate(headerT, header);
  renderWithTemplate(footerT, footer);
}