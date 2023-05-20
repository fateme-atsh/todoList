//  SELECTED ELEMENTS
let filter = document.querySelector('input.filter');
let tasksList = document.querySelector('ul.list');
let noTask = document.querySelector('p.no-task');
let takForm = document.querySelector('form#task-form');
let newTaskInput = document.getElementById('new-task-input');

// LOAD ALL EVENT LISTINERS
loadEventListeners();

function loadEventListeners() {

    // DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getAllTasks);

    // FILTER TASKS
    filter.addEventListener('keyup', filterTasks);

    // REMOVE TASK ITEM
    tasksList.addEventListener('click', onClickDeleteItem);

    // EDIT TASK ITEM
    tasksList.addEventListener('click', onClickEditItem);
};

// GET ALL TASKS STORED IN LOCALSTORAGE
function getAllTasks() {
    let tasksStoredString = localStorage.getItem('tasks');
    let tasksStoredArray = JSON.parse(tasksStoredString);

    if (tasksStoredArray && tasksStoredArray.length !== 0) {
        tasksList.style.display = 'block';
        noTask.style.display = 'none';

        tasksStoredArray.forEach(function (item, index) {
            let task = document.createElement('li');
            task.className = 'list-item';
            task.appendChild(document.createTextNode(item));

            // CREATE ICON ELEMENT
            let div = document.createElement('div');
            task.appendChild(div);
            let deleteIcon = document.createElement('i');
            deleteIcon.className = 'fa fa-trash-o delete-item';
            div.appendChild(deleteIcon);
            let editIcon = document.createElement('i');
            editIcon.className = 'fa fa-pen edit-item';
            div.appendChild(editIcon);
            tasksList.appendChild(task);
        });

    } else {
        noTask.style.display = 'block';
    };
};

// FILTER TASKS FUNCTION
function filterTasks(e) {
    e.preventDefault();
    const text = e.target.value.toLowerCase();

    let allTasks = document.querySelectorAll('.list-item');
    allTasks.forEach(function (item) {
        let itemText = item.textContent.toLowerCase();
        itemText.indexOf(text) != -1
            ? item.style.display = 'flex'
            : item.style.display = 'none'

    })
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
        let div = document.createElement('div');
        task.appendChild(div);
        let deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa fa-trash-o delete-item';
        div.appendChild(deleteIcon);
        let editIcon = document.createElement('i');
        editIcon.className = 'fa fa-pen edit-item';
        div.appendChild(editIcon);
        tasksList.appendChild(task);
        tasksList.style.display = 'block';

        storeTaskInLocalStorage(newTaskInput.value);
        newTaskInput.value = '';
    };
};

// STORE NEW TASK IN LOCALSTORAGE
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// DELETE SPESIFIC LIST ITEM
function onClickDeleteItem(e) {
    e.preventDefault();

    if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        if (tasksList.childNodes.length === 0) {
            tasksList.style.display = 'none';
            noTask.style.display = 'block';
        };
        deleteItemFromLocalStorage(e.target.parentElement.parentElement.textContent);
    };
};

// DELETE SPESIFIC ITEM FROM LOCALSTORAGE
function deleteItemFromLocalStorage(taskItem) {
    let localStorageArray = JSON.parse(localStorage.getItem('tasks'));
    localStorageArray.forEach(function (item, index) {
        taskItem === item && localStorageArray.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(localStorageArray));
    });
};

// EDIT SPESIFIC LIST ITEM
function onClickEditItem(e) {
    e.preventDefault();

    if (e.target.classList.contains('edit-item')) {
        let text = e.target.parentElement.parentElement;
        text.id = 'editItem';
        // select
        let selectedItem = document.querySelector('li#editItem');
        // create new element
        let div = document.createElement('div');
        div.className = 'edit-input';
        let editInput = document.createElement('input');
        editInput.value = text.textContent;
        div.appendChild(editInput);

        // create icons
        let iconsDiv = document.createElement('div');
        editInput.appendChild(iconsDiv);
        let confirmIcon = document.createElement('i');
        confirmIcon.className = 'fa fa-close confirm-edited-item';
        iconsDiv.appendChild(confirmIcon);
        let cancelIcon = document.createElement('i');
        cancelIcon.className = 'fa fa-check cancel-edited-item';
        iconsDiv.appendChild(cancelIcon);
        div.appendChild(iconsDiv);

        console.log(div)
        text.parentNode.replaceChild(div, selectedItem);
    };
};

// EDIT ITEM: CONFIRM FUNCTION
function onClickConfirmButton(e) {

}

// EDIT ITEM: CANCEL FUNCTION
function onClickCancelButton(e) {

}

// localStorage.clear()
