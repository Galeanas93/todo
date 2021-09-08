// here we are referencing all the elements that we are ging to need to make this project work.
const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");
//here we are crating a function that will instantly create a li string template and append it to the list.
const generateTemplate = todo => {
  const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
              <span>${todo}</span>
              <i class="far fa-trash-alt delete"></i>
              </li>`;

  list.innerHTML += html;
};

addForm.addEventListener("submit", e => {
  //adds event listener that detects when the form is submitted
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    //checks to see if the input field is empty if it is it returns a false and doesnt run t\
    generateTemplate(todo);
    addForm.reset(); //resets the value in my input form
  }
});
//delete todos
list.addEventListener("click", e => {
  //if what is clicked on contains the class of delete
  //we take the parent element and remove it in this case we click on the trash icon
  // which is nested inside the ul.
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

const filterToDos = term => {
  //in thi function we are converting the children which are the list items to an array so that we can
  // use methods on the new array. after that is done we are filtering out todos that dont include the term
  // so that we can add a filtered class to them which changes its display property to none and hides it.
  Array.from(list.children)
    .filter(todo => !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add("filtered"));
  //this part of the function takes the todos that  do have the term and removes the filtered class so that
  // we can see them again.
  Array.from(list.children)
    .filter(todo => todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove("filtered"));
};

//keyup event
//we added a keyup even so that it can track the search as we are typing rather than when it is completed.
search.addEventListener("keyup", () => {
  //in the variable term we are taking whatever value is passed to the search input field
  //trimming it converting it to lowercase so that when we search its not case sensitive
  //and at the end the function filtertodos is being called with a parameter of term.
  const term = search.value.trim().toLowerCase();
  filterToDos(term);
});
