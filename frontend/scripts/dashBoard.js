// import { username } from "./signin.js";
const username = sessionStorage.getItem("currentUser");
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
