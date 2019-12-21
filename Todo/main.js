// init
let list = document.querySelector('#my-todo')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}

function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  list.appendChild(newItem)
}

// Create
const addBtn = document.querySelector('#addBtn')

addBtn.addEventListener('click', createTodo(event))

function createTodo(e) {
  let inputValue = document.querySelector('#newTodo').value
  console.log(inputValue)
  if (inputValue) {
    addItem(inputValue)
  }
}

// Delete and check
list.addEventListener('click', function (event) {
  console.log(this)
  console.log(event.target)
  if (event.target.classList.contains('delete')) {
    let li = event.target.parentElement
    li.remove()
  } else if (event.target.tagName === 'LABEL') {
    event.target.classList.toggle('checked')
  }
})
