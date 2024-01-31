document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    addTask();
  } else {
    console.log("Task is not sent to the server.");
  }
});
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
    alert("Form submitted successfully!");
    return true;
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
      `http://localhost:5500/user/${currentUser}/course/SE101/task/create`,
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

// ================================================GET ALL TASKS==========================================================

// ================================================GET COURSE TASK==========================================================
async function getCourseTask() {
  try {
    response = await fetch(
      `http://localhost:5500/user/${currentUser}/course/SE101/task`,
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
