var urlParams = new URLSearchParams(window.location.search);
var courseName = urlParams.get("courseName");
var instructor = urlParams.get("instructor");
var courseCode = urlParams.get("courseCode");

document.addEventListener("submit", (e) => {
  e.preventDefault();
  // if (validateForm()) {
  addTask();
  changeToTask();
  // } else {
  //   console.log("Task is not sent to the server.");
  // }
});

// ================================================change to task form==========================================================
function changeToTaskForm() {
  window.location.href =
    "addTask.html?courseName=" +
    encodeURIComponent(courseName) +
    "&instructor=" +
    encodeURIComponent(instructor) +
    "&courseCode=" +
    encodeURIComponent(courseCode);
}
function changeToTask() {
  window.location.href =
    "task.html?courseName=" +
    encodeURIComponent(courseName) +
    "&instructor=" +
    encodeURIComponent(instructor) +
    "&courseCode=" +
    encodeURIComponent(courseCode);
}

function validateForm() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  document.getElementById("title").classList.remove("error");
  document.getElementById("description").classList.remove("error");
  document.getElementById("priority").classList.remove("error");
  document.getElementById("dueDate").classList.remove("error");

  var isValid = true;

  if (title === "") {
    isValid = false;
    document.getElementById("title").classList.add("error");
  }

  if (description === "") {
    isValid = false;
    document.getElementById("description").classList.add("error");
  }

  if (!["LOW", "MEDIUM", "HIGH"].includes(priority)) {
    isValid = false;
    document.getElementById("priority").classList.add("error");
  }

  if (dueDate === "") {
    isValid = false;
    document.getElementById("dueDate").classList.add("error");
  }

  if (isValid) {
    console.log("Form submitted successfully!");
    // alert("Form submitted successfully!");
    // return true;
  } else {
    alert("Please fill out all fields correctly.");
    return false;
  }
}

// function addTask() {
//   fetch("http://localhost:5500/task/create", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json; charset=utf-8",
//       Authorization: localStorage.getItem(access_token),
//     },
//     body: JSON.stringify({
//       title: document.getElementById("title").value.trim(),
//       description: document.getElementById("description").value.trim(),
//       priority: document.getElementById("priority").value.trim(),
//       dueDate: document.getElementById("dueDate").value.trim(),
//     }),
//   })
//     .then((res) => {
//       if (res.ok) console.log("Task sent successfully.");
//     })
//     .catch((error) => {
//       console.error("Error: ", error);
//     });
// }

const currentUser = sessionStorage.getItem("currentUser");
const access_token = sessionStorage.getItem("access_token");

async function addTask() {
  try {
    response = await fetch(
      `http://localhost:5500/user/${currentUser}/course/${courseCode}/task/create`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          title: document.getElementById("title").value.trim(),
          description: document.getElementById("description").value.trim(),
          priority: document.getElementById("priority").value.trim(),
          dueDate: document.getElementById("dueDate").value.trim(),
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("Task sent successfully.");
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

// ================================================GET COURSE TASK==========================================================
async function getCourseTask() {
  try {
    response = await fetch(
      `http://localhost:5500/user/${currentUser}/course/${courseCode}/task`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
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
        addCourseTask(
          taskName,
          taskDescription,
          taskDueDate,
          courseName,
          instructor,
          courseCode
        );
        // let taskCount = tasks.length;
        // const taskCountElement = document.getElementById("task-count");
        // taskCountElement.innerText = `${taskCount}`;
      }
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
getCourseTask();

const icon = document.getElementById("icon");
icon.innerHTML = `${currentUser}`;

// ================================================GET COURSE TASK==========================================================

function addCourseTask(taskName, taskDescription, taskDueDate) {
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
  titleSpan.textContent = `${taskName}`;
  var ellipsisLink = document.createElement("a");
  ellipsisLink.href = "#";
  var ellipsisIcon = document.createElement("i");
  ellipsisIcon.className = "fa-solid fa-ellipsis-vertical";
  ellipsisLink.appendChild(ellipsisIcon);
  taskTitle.appendChild(titleSpan);
  taskTitle.appendChild(ellipsisLink);

  var timeElement = document.createElement("h5");
  timeElement.className = "text-[#1EFE80]";
  timeElement.textContent = `${taskDueDate}`;

  var descriptionParagraph = document.createElement("p");
  descriptionParagraph.className = "text-sm";
  descriptionParagraph.textContent = `${taskDescription}`;

  taskContentContainer.appendChild(taskTitle);
  taskContentContainer.appendChild(timeElement);
  taskContentContainer.appendChild(descriptionParagraph);

  taskItemContainer.appendChild(statusCircle);
  taskItemContainer.appendChild(taskContentContainer);

  // document.body.appendChild(taskItemContainer);

  taskTitle.addEventListener("click", function () {
    taskTitle.style.color = "#FF0000";

    titleSpan.textContent = `${taskName} Completed!`;
  });
  document.getElementById("list-of-tasks").appendChild(taskItemContainer);
}

// ================================================TITLE==========================================================
function addCourseTitle(name, instructor, code) {
  var greetingContainer = document.createElement("div");
  greetingContainer.className = "border border-[#1EFE80] rounded p-5";

  var heading = document.createElement("h1");
  heading.className = "text-4xl text-[#1EFE80]";

  var profileNameSpan = document.createElement("span");
  profileNameSpan.className = "text-xl";
  profileNameSpan.textContent = `${name}`;
  profileNameSpan.style.color = "white";

  heading.textContent = `${code} `;
  heading.appendChild(profileNameSpan);
  heading.textContent += ".";

  var paragraph1 = document.createElement("p");
  paragraph1.textContent = `Instructor: ${instructor}`;

  var paragraph2 = document.createElement("p");
  paragraph2.innerHTML =
    'You have <span class="text-yellow-300 text-4xl mx-2" task-count></span> pending tasks for the day';

  greetingContainer.appendChild(heading);
  greetingContainer.appendChild(paragraph1);
  greetingContainer.appendChild(paragraph2);

  var taskHeadingElement = document.getElementById("taskHeading");

  taskHeadingElement.insertAdjacentElement("afterend", greetingContainer);
}
addCourseTitle(courseName, instructor, courseCode);
