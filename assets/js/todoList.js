function onClickAddNewTask() {

    // CREATE ELEMENT
    let task = document.createElement('li');
    task.className = 'list-item';
    task.appendChild(document.createTextNode('Task 2'));
    console.log(task)
    let tasksList = document.querySelector('ul.list');
    let noTask= document.querySelector('p.no-task');
    tasksList.style.display = 'block';
    noTask.style.display = 'none';
    tasksList.appendChild(task);
}