const logOut = document.querySelector("#log-out");
logOut.addEventListener("click", function () {
  sessionStorage.clear();
  window.location.href = "index.html";
});
