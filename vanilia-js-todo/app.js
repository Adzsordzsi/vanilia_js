//selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClick);
document.getElementById('clearAll').addEventListener('click', handleDeleteClick);








//for(let i = 0; i < jso.length; i++) {
//  let obj = jso[i];

//}


function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value !== '') {
        addTodo(input.value);
        sendData(input.value);
    }
    input.value = '';
}

function addTodo(todo) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `
    <span class="todo-item">${todo}</span>
    <button name="checkButton"><i class="fas fa-check-square"></i> </button>
    <button name="deleteButton"><i class="fas fa-trash"></i> </button>    
    `;

    li.classList.add('todo-list-item')
    ul.appendChild(li)

}

const todos = fetch('http://localhost:8000/sajt').then((response) => response.json()).then((data) => {return data;})
addFetchedTodo();

function addFetchedTodo() {
    todos.then((todo) => {
        console.log(todo)
        for(let i = 0; i < todo.length; i++) {
        let obj = todo[i];
        addTodo(obj.todo);
    }})


}




function sendData(data) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let payloadString = JSON.stringify(data);
    xhr.send(payloadString);
}


function handleClick(e) {
    if (e.target.name === 'checkButton') {
        checkTodo(e);
    }

    if (e.target.name === 'deleteButton') {
        deleteTodo(e);
    }
}

function checkTodo(e) {
    let item = e.target.parentNode;

    if (item.style.textDecoration === 'line-through') {
        item.style.textDecoration = 'none';
    } else {
        item.style.textDecoration = 'line-through';
    }
}


function deleteTodo(e) {
    let item = e.target.parentNode;

    item.addEventListener('transitionend', function () {
        item.remove();
    })

    item.classList.add('todo-list-item-fall');


}

function handleDeleteClick() {
    document.querySelector('ul').innerHTML = '';
}
