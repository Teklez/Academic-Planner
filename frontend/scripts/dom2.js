document.addEventListener("DOMContentLoaded", function () {
  var courseCard = document.createElement("div");
  courseCard.className =
    "bg-[#21242C] rounded-2xl p-3 w-2/5 m-2 hover:-translate-y-2 transition-all duration-500 active:bg-slate-900";
  courseCard.onclick = function () {
    window.location.href = "task.html";
  };

  var courseContent = document.createElement("div");
  courseContent.className = "h-full px-3";

  var courseTitle = document.createElement("h4");
  courseTitle.className = "flex justify-between mb-3";

  var courseTitleSpan = document.createElement("span");
  courseTitleSpan.className = "text-xl";

  var courseCode = document.createElement("span");
  courseCode.className = "text-[#1EFE80] font-semibold";
  courseCode.textContent = "SECT-111";

  var courseName = document.createElement("span");
  courseName.textContent = " Fundamentals of Software Engineering";

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
  instructorSpan.textContent = "Nuniyat K.";

  instructorLine.appendChild(instructorSpan);

  var ectsLine = document.createElement("h5");
  ectsLine.textContent = "ECTS: ";

  var ectsValue = document.createElement("span");
  ectsValue.className = "text-[#1EFE80]";
  ectsValue.textContent = "5";

  ectsLine.appendChild(ectsValue);

  courseContent.appendChild(courseTitle);
  courseContent.appendChild(instructorLine);
  courseContent.appendChild(ectsLine);

  courseCard.appendChild(courseContent);

  var listOfCourses = document.getElementById("list-of-courses");

  listOfCourses.parentNode.insertBefore(courseCard, listOfCourses.nextSibling);
});
