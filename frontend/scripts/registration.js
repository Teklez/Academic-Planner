// ================================== validaate registration form======================
function validateRegistrationForm() {
  var username = document.getElementById("username").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var confirmPassword = document.getElementById("confirmPassword").value.trim();

  resetRegistrationErrorMessages();

  if (!username) {
    displayRegistrationErrorMessage("User Name is required.");
    return false;
  }

  if (/\d/.test(username)) {
    displayRegistrationErrorMessage("User Name should not contain numbers.");
    return false;
  }

  if (username.length < 3) {
    displayRegistrationErrorMessage(
      "User Name must be at least 3 characters long."
    );
    return false;
  }

  if (!email) {
    displayRegistrationErrorMessage("Email is required.");
    return false;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    displayRegistrationErrorMessage("Invalid email format.");
    return false;
  }

  if (!password) {
    displayRegistrationErrorMessage("Password is required.");
    return false;
  }

  if (password.length < 8) {
    displayRegistrationErrorMessage(
      "Password must be at least 8 characters long."
    );
    return false;
  }

  if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    displayRegistrationErrorMessage(
      "Password must contain at least one number and one symbol."
    );
    return false;
  }

  if (password !== confirmPassword) {
    displayRegistrationErrorMessage(
      "Passwords do not match. Please try again."
    );
    return false;
  }
  return true;

  displayRegistrationSuccessMessage("Registration successful!");
}

function resetRegistrationErrorMessages() {
  var errorMessagesElement = document.getElementById("errorMessages");
  errorMessagesElement.textContent = "";
  errorMessagesElement.style.color = "";
}

function displayRegistrationErrorMessage(message) {
  var errorMessagesElement = document.getElementById("errorMessages");
  errorMessagesElement.textContent = message;
  errorMessagesElement.style.color = "red";
}

function displayRegistrationSuccessMessage(message) {
  var errorMessagesElement = document.getElementById("errorMessages");
  errorMessagesElement.textContent = message;
  errorMessagesElement.style.color = "green";
}

// ==========================================

const userName = document.getElementById("username").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
const confirmPassword = document.getElementById("confirmPassword").value.trim();

if (password !== confirmPassword) {
  alert("Passwords don't match");
}

// ==========================================================================================================login

async function loginUser(username, password) {
  try {
    const response = await fetch("http://localhost:5500/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      const access_token = await data.access_token;
      console.log("The access token for this user is:", access_token);
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("user", username);
      sessionStorage.setItem("currentUser", username);
      window.location.href = "../../frontend/dashboard.html";
    } else {
      console.log("Login failed:", response.json());
      alert("Username or password is incorrect");
    }
  } catch (error) {
    console.log("Login failed:", error);
  }
}

// ==========================================================================================================

const form = document.getElementById("form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(
    JSON.stringify({
      username,
      email,
      password,
    })
  );
  console.log("register form submitted");
  //call register function
  sessionStorage.setItem("currentUser", username);
  if (validateRegistrationForm()) {
    registerUser(username, email, password);
  }
});
// Registeration
async function registerUser(username, email, password) {
  try {
    const response = await fetch("http://localhost:5500/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Registeration successful:", data);
      // (<HTMLInputElement>document.getElementById("username")).value =
      //   "";
      // (<HTMLInputElement>document.getElementById("email")).value = "";
      // (<HTMLInputElement>document.getElementById("password")).value =
      //   "";
      // (<HTMLInputElement>document.getElementById("confirmPassword")).value = "";
      // window.location.href = '../src/login_games.html'
      loginUser(username, password);
    } else {
      const error = await response.json();
      console.log("Registeration failed", error);
      alert("Username or email already exists");
    }
  } catch (error) {
    console.log("Registeration failed:", error);
  }
}
