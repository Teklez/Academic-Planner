// import { username } from "./signin.js";
const username = sessionStorage.getItem("currentUser");
const currentUser = sessionStorage.getItem("currentUser");
const access_token = sessionStorage.getItem("access_token");
const user = sessionStorage.getItem("user");
console.log("username", username);
console.log("user", user);

const icon = document.getElementById("icon");
icon.innerHTML = `${username}`;

function greeting() {
  console.log("called!");
  const greeting = document.getElementById("greeting");
  greeting.innerText = `Hello ${username}!`;
}

function welcome() {
  const welcome = document.getElementById("greeting");
  welcome.innerText = `Welcome ${user}!`;
}

if ((username && user) || username) {
  greeting();
} else {
  welcome();
}

// ======================================GET ALL TASKS=========================================================================
async function getAllTasks() {
  try {
    response = await fetch(`http://localhost:5500/user/${currentUser}/task`, {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("Tasks sent successfully.");
      const tasks = data;
      console.log("tasks", tasks);
      for (let task of tasks) {
        const taskName = task.title;
        const taskDescription = task.description;
        const taskDueDate = task.dueDate;
        console.log("taskName", taskName);
        console.log("taskDescription", taskDescription);
        console.log("taskDueDate", taskDueDate);
        addTask(taskName, taskDescription, taskDueDate);
        let taskCount = tasks.length;
        const taskCountElement = document.getElementById("task-count");
        taskCountElement.innerText = `${taskCount}`;
      }
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
getAllTasks();

// ======================================add tasks=========================================================================
function addTask(title, description, duedate) {
  var taskItemContainer = document.createElement("div");
  taskItemContainer.className =
    "task-item bg-[#21242C] rounded-2xl p-3 w-2/5 flex m-2";

  var statusCircle = document.createElement("p");
  statusCircle.className = "h-full w-fit";
  var statusCircleIcon = document.createElement("i");
  statusCircleIcon.className = "fa-solid fa-circle";
  statusCircleIcon.style.color = "#1EFE80";
  statusCircle.appendChild(statusCircleIcon);

  var taskContentContainer = document.createElement("div");
  taskContentContainer.className = "h-full px-3";

  var taskTitle = document.createElement("h4");
  taskTitle.className = "flex justify-between";
  var titleSpan = document.createElement("span");
  titleSpan.className = "text-2xl";
  titleSpan.textContent = `${title}`;
  var ellipsisLink = document.createElement("a");
  ellipsisLink.href = "#";
  var ellipsisIcon = document.createElement("i");
  ellipsisIcon.className = "fa-solid fa-ellipsis-vertical";
  ellipsisLink.appendChild(ellipsisIcon);
  ellipsisLink.style.marginLeft = "10px";
  taskTitle.appendChild(titleSpan);
  taskTitle.appendChild(ellipsisLink);

  var timeElement = document.createElement("h5");
  timeElement.className = "text-[#1EFE80]";
  timeElement.textContent = `${duedate}`;

  var descriptionParagraph = document.createElement("p");
  descriptionParagraph.className = "text-sm";
  descriptionParagraph.textContent = `${description}`;

  taskContentContainer.appendChild(taskTitle);
  taskContentContainer.appendChild(timeElement);
  taskContentContainer.appendChild(descriptionParagraph);

  taskItemContainer.appendChild(statusCircle);
  taskItemContainer.appendChild(taskContentContainer);

  document.body.appendChild(taskItemContainer);

  taskTitle.addEventListener("click", function () {
    taskTitle.style.color = "#FF0000";

    titleSpan.textContent = `${title} Completed!`;
  });
  document.getElementById("list-of-tasks").appendChild(taskItemContainer);
}
