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
      localStorage.setItem("access_token", access_token);
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
  //   validateRegisterForm();
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
  registerUser(username, email, password);
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
    }
  } catch (error) {
    console.log("Registeration failed:", error);
  }
}
