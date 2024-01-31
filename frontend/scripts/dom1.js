var taskItemContainer = document.createElement("div");
taskItemContainer.className =
  "task-item bg-[#21242C] rounded-2xl p-3 w-2/5 flex m-2";

var statusCircle = document.createElement("p");
statusCircle.className = "h-full w-fit";
var statusCircleIcon = document.createElement("i");
statusCircleIcon.className = "fa-solid fa-circle";
statusCircleIcon.style.color = "#1EFE80";
statusCircle.appendChild(statusCircleIcon);

var taskContentContainer = document.createElement("div");
taskContentContainer.className = "h-full px-3";

var taskTitle = document.createElement("h4");
taskTitle.className = "flex justify-between";
var titleSpan = document.createElement("span");
titleSpan.className = "text-2xl";
titleSpan.textContent = "Finish SRS documentation";
var ellipsisLink = document.createElement("a");
ellipsisLink.href = "#";
var ellipsisIcon = document.createElement("i");
ellipsisIcon.className = "fa-solid fa-ellipsis-vertical";
ellipsisLink.appendChild(ellipsisIcon);
taskTitle.appendChild(titleSpan);
taskTitle.appendChild(ellipsisLink);

var timeElement = document.createElement("h5");
timeElement.className = "text-[#1EFE80]";
timeElement.textContent = "8:12 AM";

var descriptionParagraph = document.createElement("p");
descriptionParagraph.className = "text-sm";
descriptionParagraph.textContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore explicabo accusamus iusto ab laudantium quod ad iure illo quam ullam.";

taskContentContainer.appendChild(taskTitle);
taskContentContainer.appendChild(timeElement);
taskContentContainer.appendChild(descriptionParagraph);

taskItemContainer.appendChild(statusCircle);
taskItemContainer.appendChild(taskContentContainer);

document.body.appendChild(taskItemContainer);

taskTitle.addEventListener("click", function () {
  taskTitle.style.color = "#FF0000";

  titleSpan.textContent = "SRS documentation Completed!";
});
document.getElementById("list-of-tasks").appendChild(taskItemContainer);

document.addEventListener("DOMContentLoaded", function () {
  var greetingContainer = document.createElement("div");
  greetingContainer.className = "border border-[#1EFE80] rounded p-5";

  var heading = document.createElement("h1");
  heading.className = "text-4xl text-[#1EFE80]";

  var profileNameSpan = document.createElement("span");
  profileNameSpan.className = "text-xl";
  profileNameSpan.textContent = " Fundamentals of Software Engineering";
  profileNameSpan.style.color = "white";

  heading.textContent = "SECT-111  ";
  heading.appendChild(profileNameSpan);
  heading.textContent += ".";

  var paragraph1 = document.createElement("p");
  paragraph1.textContent = "Instructor:Nuniyat K.";

  var paragraph2 = document.createElement("p");
  paragraph2.innerHTML =
    'You have <span class="text-yellow-300 text-4xl mx-2">4</span> pending tasks for the day';

  greetingContainer.appendChild(heading);
  greetingContainer.appendChild(paragraph1);
  greetingContainer.appendChild(paragraph2);

  var taskHeadingElement = document.getElementById("taskHeading");

  taskHeadingElement.insertAdjacentElement("afterend", greetingContainer);
});

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
