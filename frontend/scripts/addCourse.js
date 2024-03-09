// ========================================validate course

function validateCourseForm() {
  var courseName = document.getElementById("courseName").value.trim();
  var instructor = document.getElementById("instructor").value.trim();
  var courseCode = document.getElementById("courseCode").value.trim();
  var startDate = document.getElementById("startDate").value.trim();
  var endDate = document.getElementById("endDate").value.trim();
  var ECTS = document.getElementById("ECTS").value.trim();

  resetRegistrationErrorMessages();

  if (!courseName) {
    displayRegistrationErrorMessage("Course Name is required!");
    return false;
  }

  if (!instructor) {
    displayRegistrationErrorMessage("Instructor is required!");

    return false;
  }

  if (!courseCode) {
    displayRegistrationErrorMessage("Course Code is required!");

    return false;
  }

  if (!startDate) {
    displayRegistrationErrorMessage("Start Date is required!");
    return false;
  }

  if (!endDate) {
    displayRegistrationErrorMessage("End Date is required!");
    return false;
  }

  if (!ECTS) {
    displayRegistrationErrorMessage("ECTS is required!");
    return false;
  }
  if (ECTS < 0 || ECTS > 15) {
    displayRegistrationErrorMessage("Invalid ECTS Value!");
    return false;
  }
  if (new Date() > new Date(startDate)) {
    displayRegistrationErrorMessage(
      "Start Date should be greater or equal to than today!"
    );
    return false;
  }

  if (new Date() > new Date(endDate)) {
    displayRegistrationErrorMessage(
      "End Date should be greater or equal to than today!"
    );
    return false;
  }

  //  validate date if end date is greater than start date

  if (new Date(endDate) < new Date(startDate)) {
    displayRegistrationErrorMessage(
      "End Date should be greater than Start Date!"
    );
    return false;
  }

  displayRegistrationSuccessMessage("Course added successfully!");
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

// ================================================== validate form ==================================================

document.addEventListener("submit", (e) => {
  e.preventDefault();

  //   console.log("access token is", sessionStorage.getItem(access_token));
  if (validateCourseForm()) {
    addCourse();
    window.location.href = "../frontend/coursesPage.html";
  }
});
// const currentUser = sessionStorage.getItem("currentUser");
// const access_token = sessionStorage.getItem("access_token");

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
      // if (response.status == 409) {
      //   alert("Course already exists");
      // }
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

// ================================================GET COUSE==========================================================
// console.log("access token is", document.cookie.access_token);
let courses = [];
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
      console.log("data", data);
      console.log("Course sent successfully.");
      let courses = data;
      console.log("courses", courses);
      for (let course of courses) {
        const courseName = course.courseName;
        const instructor = course.instructor;
        const courseCode = course.courseCode;
        const ECTS = course.ECTS;
        console.log("singlecourse", course);
        console.log("courseName", courseName);
        console.log("courseCode", courseCode);
        console.log("instructor", instructor);
        console.log("ECTS", ECTS);
        crateCard(courseName, instructor, courseCode, ECTS);
      }
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
getCourse();

// ================================================DELETE COUSE==========================================================

async function deleteAllCourses() {
  try {
    response = await fetch(
      `http://localhost:5500/user/${currentUser}/course/delete`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("Course deleted successfully.");
      window.location.href = "../frontend/coursesPage.html";
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

// ================================================REFRESH ==========================================================

function crateCard(name, instructor, code, ECTS) {
  var courseCard = document.createElement("div");
  courseCard.className =
    "bg-[#21242C] rounded-2xl p-3 w-2/5 m-2 hover:-translate-y-2 transition-all duration-500 active:bg-slate-900";
  courseCard.onclick = function () {
    window.location.href =
      "task.html?courseName=" +
      encodeURIComponent(name) +
      "&instructor=" +
      encodeURIComponent(instructor) +
      "&courseCode=" +
      encodeURIComponent(code);
  };

  var courseContent = document.createElement("div");
  courseContent.className = "h-full px-3";

  var courseTitle = document.createElement("h4");
  courseTitle.className = "flex justify-between mb-3";

  var courseTitleSpan = document.createElement("span");
  courseTitleSpan.className = "text-xl";
  23;

  var courseCode = document.createElement("span");
  courseCode.className = "text-[#1EFE80] font-semibold";
  courseCode.textContent = `${code} `;

  var courseName = document.createElement("span");
  courseName.textContent = `${name}`;

  courseTitleSpan.appendChild(courseCode);
  courseTitleSpan.appendChild(courseName);

  var ellipsisLink = document.createElement("a");
  ellipsisLink.href = "#";

  var ellipsisIcon = document.createElement("i");
  ellipsisIcon.className = "fa-solid fa-ellipsis-vertical";

  ellipsisLink.appendChild(ellipsisIcon);

  courseTitle.appendChild(courseTitleSpan);
  courseTitle.appendChild(ellipsisLink);

  var instructorLine = document.createElement("h5");
  instructorLine.textContent = "Instructor: ";

  var instructorSpan = document.createElement("span");
  instructorSpan.textContent = `${instructor}`;

  instructorLine.appendChild(instructorSpan);

  var ectsLine = document.createElement("h5");
  ectsLine.textContent = "ECTS: ";

  var ectsValue = document.createElement("span");
  ectsValue.className = "text-[#1EFE80]";
  ectsValue.textContent = `${ECTS}`;

  ectsLine.appendChild(ectsValue);

  courseContent.appendChild(courseTitle);
  courseContent.appendChild(instructorLine);
  courseContent.appendChild(ectsLine);

  courseCard.appendChild(courseContent);

  var listOfCourses = document.getElementById("list-of-courses");

  listOfCourses.parentNode.insertBefore(courseCard, listOfCourses.nextSibling);
}
