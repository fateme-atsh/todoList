//  SELECTED ELEMENTS
let filter = document.querySelector('input.filter');
let tasksList = document.querySelector('ul.list');
let noTask = document.querySelector('p.no-task');
let takForm = document.querySelector('form#task-form');
let newTaskInput = document.getElementById('new-task-input');
let newTaskButton = document.getElementById('new-task-button');

// LOAD ALL EVENT LISTINERS
loadEventListeners();

function loadEventListeners() {

    // DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getAllTasks);

    // FILTER TASKS
    filter.addEventListener('keyup', filterTasks);
};

// GET ALL TASKS STORED IN LOCALSTORAGE
function getAllTasks() {
    let tasksStoredString = localStorage.getItem('tasks');
    let tasksStoredArray = JSON.parse(tasksStoredString);

    if (tasksStoredArray && tasksStoredArray.length !== 0) {
        tasksList.style.display = 'block';
        noTask.style.display = 'none';

        tasksStoredArray.forEach(function (item) {
            let task = document.createElement('li');
            task.className = 'list-item';
            task.appendChild(document.createTextNode(item));

            // CREATE ICON ELEMENT
            let deleteIcon = document.createElement('i');
            deleteIcon.className = 'fa fa-trash-o';
            task.appendChild(deleteIcon);
            tasksList.appendChild(task);
        })

    } else {
        noTask.style.display = 'block';
    }
};

// ADD NEW TASK FUNCTION
function onSubmitNewTask(event) {
    event.preventDefault();

    if (newTaskInput.value === '') {
        alert('Please enter task title');
    } else {
        noTask.style.display = 'none';

        // CREATE LIST ELEMENT
        let task = document.createElement('li');
        task.className = 'list-item';
        task.appendChild(document.createTextNode(newTaskInput.value));
        // CREATE ICON ELEMENT
        let deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa fa-trash-o';
        task.appendChild(deleteIcon);
        console.log(task)
        tasksList.appendChild(task);
        tasksList.style.display = 'block';

        storeTaskInLocalStorage(newTaskInput.value);
        newTaskInput.value = '';
    }
};

// FILTER TASKS FUNCTION
function filterTasks() {
    console.log(filter.value)
}

// STORE NEW TASK
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// localStorage.clear()
