//selectors
document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClick);
document.getElementById('clearAll').addEventListener('click', handleDeleteClick);

const todos = fetch('http://localhost:8000/data').then((response) => response.json()).then((data) => {return data;})
addFetchedTodo();


function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value !== '') {
        addTodo(input.value);
        sendAdd(input.value);
    }
    input.value = '';
}

function addTodo(todo,done) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `
    <span class="todo-item">${todo}</span>
    <button name="checkButton"><i class="fas fa-check-square"></i> </button>
    <button name="deleteButton"><i class="fas fa-trash"></i> </button>    
    `;

    li.classList.add('todo-list-item')

    ul.appendChild(li)
    if(done===true) {
        li.style.textDecoration="line-through"
    }else{
        li.style.textDecoration="none"
    }

}

function addFetchedTodo() {
    todos.then((todo) => {
        for(let i = 0; i < todo.length; i++) {
        let obj = todo[i];
        if(obj.done ===1){
            addTodo(obj.todo,true);
        }else{
            addTodo(obj.todo,false);
        }
    }})

}

function sendAdd(data) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/addTodo');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let payloadString = JSON.stringify(data);
    xhr.send(payloadString);
}

function sendUpdate(data){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/update');
    xhr.setRequestHeader('Content-Type', 'application/json');
    let payloadString = JSON.stringify(data);
    xhr.send(payloadString);
}

function sendDelete(data){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/delete');
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
    let obj ={}
    if (item.style.textDecoration === 'line-through') {

        item.style.textDecoration = 'none';
        obj['todo'] = item.textContent.trim();
        obj['done'] = 0;
        sendUpdate(obj);

    } else {
        item.style.textDecoration = 'line-through';
        obj['todo'] = item.textContent.trim();
        obj['done'] = 1;

        sendUpdate(obj);

    }
}

function deleteTodo(e) {
    let item = e.target.parentNode;
    item.addEventListener('transitionend', function () {
        item.remove();
    })

    item.classList.add('todo-list-item-fall');
    let obj ={}
    obj['todo'] = item.textContent.trim();

    sendDelete(obj)

}

function handleDeleteClick() {

    document.querySelector('ul').innerHTML = '';

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/deleteAll');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}
