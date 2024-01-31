document.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log("access token is", sessionStorage.getItem(access_token));
  addCourse();
});
currentUser = sessionStorage.getItem("currentUser");
access_token = sessionStorage.getItem("access_token");

// console.log("currentUser", currentUser);
// console.log("access_token is", access_token);
async function addCourse() {
  try {
    response = await fetch(
      `http://localhost:5500/user/${currentUser}/course/create`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
          courseName: document.getElementById("courseName").value.trim(),
          instructor: document.getElementById("instructor").value.trim(),
          courseCode: document.getElementById("courseCode").value.trim(),
          startDate: document.getElementById("startDate").value.trim(),
          endDate: document.getElementById("endDate").value.trim(),
          ECTS: document.getElementById("ECTS").value.trim(),
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("Course sent successfully.");
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

// ================================================GET COUSE==========================================================
console.log("access token is", document.cookie.access_token);
async function getCourse() {
  try {
    response = await fetch(`http://localhost:5500/user/${currentUser}/course`, {
      method: "GET",
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("Course sent successfully.");
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
getCourse();
