// ================================================== validate login form
function validateLoginForm() {
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value.trim();

  resetRegistrationErrorMessages();

  if (!username) {
    displayRegistrationErrorMessage("User Name is required!");

    return false;
  }

  if (/\d/.test(username)) {
    displayRegistrationErrorMessage("Invalid User Name!");
    return false;
  }

  if (username.length < 3) {
    displayRegistrationErrorMessage(
      "User Name must be at least 3 characters long."
    );
    return false;
  }

  if (!password) {
    displayRegistrationErrorMessage("Password is required!");
    return false;
  }

  if (password.length < 8) {
    displayRegistrationErrorMessage(
      "Password must be at least 8 characters long!"
    );
    return false;
  }

  if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    displayRegistrationErrorMessage("Invalid Password!");
    return false;
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
  return true;
}

// =========================

const form = document.querySelector("form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const singin = document.querySelector(".login");
const googleBtn = document.querySelector(".google-btn");
//   console.log("hello");

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("hello");
//     checkInputs();
//   });

//   // Error message

//   function setErrorFor(element, message) {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector(".error");
//     console.log(inputControl);
//     errorDisplay.innerText = message;
//     inputControl.classList.add("error");
//     inputControl.classList.remove("success");
//   }

//   // Success message

//   function setSuccessFor(element) {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector(".error");
//     errorDisplay.innerText = "";
//     inputControl.classList.remove("error");
//     inputControl.classList.add("success");
//   }

//   //Form Validation

//   function checkInputs() {
//     const usernameValue = username.value.trim();
//     const passwordValue = password.value.trim();

//     if (usernameValue === "") {
//       setErrorFor(username, "Username cannot be blank");
//     } else {
//       setSuccessFor(username);
//     }

//     if (passwordValue === "") {
//       setErrorFor(password, "Password cannot be blank");
//     } else {
//       setSuccessFor(password);
//     }
//   }
document
  .getElementById("form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    validateLoginForm();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("http://localhost:5500/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      //   console.log(response);
      console.log("fetch sent.");

      if (response.ok) {
        const data = await response.json();
        const access_token = await data.access_token;
        // Save the token in cookies for future authenticated requests
        console.log(access_token);
        sessionStorage.setItem("currentUser", username);
        sessionStorage.setItem("access_token", access_token);
        console.log("The access token for this user is:", access_token);
        // dashboard.greeting(username);
        window.location.replace("../frontend/dashboard.html");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        if (errorData.message == "incorrectPassword") {
          alert("Incorrect password");
        } else if (errorData.message == "userNotFound") {
          alert("User not found");
        }
      }
    } catch (error) {
      console.log("Error during login:", error);
    }
  });

// Google Login

googleBtn.addEventListener("click", () => {
  console.log("clicked!");
  window.location.href = "http://localhost:5500/auth/google";
  window.location.replace("../frontend/dashboard.html");
});

export { username };
