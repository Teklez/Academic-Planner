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
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
getAllTasks();
