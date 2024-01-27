let taskList = [];


window.onload=function(){
    localTasksStore();
    displayTasks();
}

function addTask(event) {
  event.preventDefault();
  let taskInput = document.getElementById("input").value;

  if (taskInput.trim() !== "") {
    taskList.push({ text: taskInput, checked: false });
    console.log("Task Added : ", taskInput);
    console.log("Task list ", taskList);
    document.getElementById("input").value = "";
    saveTasksLocal();
    displayTasks();
  } else {
    alert("Please enter a valid task");
  }
}

function removeTask(index) {
  taskList.splice(index, 1);
  saveTasksLocal()
  displayTasks();
}

function clearAllTask() {
  taskList = [];
  saveTasksLocal()
  displayTasks();
}

function toggleTask(index) {
  taskList[index].checked = !taskList[index].checked;
  saveTasksLocal();
  displayTasks();
}

function displayTasks() {
  let taskListContainer = document.getElementById("taskListContainer");
  let taskCountElement = document.getElementById("taskCount");
  taskListContainer.innerHTML = "";
  taskList.forEach((task, index) => {
    let taskItem = document.createElement("div");
    taskItem.className = "task-item" + (task.checked ? " checked" : "");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.checked;
    checkbox.addEventListener("change", () => {
      toggleTask(index);
    });

    let taskText = document.createElement("p");
    taskText.textContent = task.text;

    let actions = document.createElement("div");

    let deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.innerHTML =
      '<span class="material-symbols-outlined" onclick= "removeTask(' +
      index +
      ')">delete</span>';

    actions.appendChild(deleteLink);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(actions);

    taskListContainer.appendChild(taskItem);
    if (index < taskList.length - 1) {
        let hrTag = document.createElement("hr");
        taskListContainer.appendChild(hrTag);
      }
  });
  taskCountElement.textContent =  " Total Task " + taskList.length;
}

function saveTasksLocal(){
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function localTasksStore(){
    const storedTasks=localStorage.getItem("taskList");
    taskList=storedTasks ? JSON.parse(storedTasks):[];
}
