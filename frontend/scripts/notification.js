// const currentUser = sessionStorage.getItem("currentUser");

async function getNotification() {
  try {
    const response = await fetch(
      `http://localhost:5500/user/${currentUser}/notification`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("notification data:", data);
      const notifications = data;
      const notificationToggle = sessionStorage.getItem("notification");
      console.log("notificationToggle:", notificationToggle);
      if (notificationToggle === "true") {
        for (let notification of notifications) {
          const message = notification.message;
          const time = notification.time;
          const notificationCount = notifications.length;

          if (notificationCount > 0) {
            const notificationCountElement =
              document.getElementById("notification-count");
            notificationCountElement.innerText = `${notificationCount}`;
          } else {
            const notificationCountElement =
              document.getElementById("notification-count");
            notificationCountElement.innerText = `no`;
            console.log("zero notification found");
          }
          displayNotification(message, time);
        }
      }
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Call the function to initiate the fetch operation
getNotification();

// ================================================Delete all Notification==========================================================

async function deleteAllNotifications() {
  try {
    const response = await fetch(
      `http://localhost:5500/user/${currentUser}/notification/delete`,
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
      console.log("all notification deleted:", data);
      console.log("notification deleted successfully.");
      window.location.reload();
    } else {
      console.log(response);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function displayNotification(message, time) {
  var notificationContainer = document.createElement("div");
  notificationContainer.className =
    "bg-[#21242C] rounded-2xl p-3 w-4/5 flex m-2 hover:-translate-y-1 transition-all duration-300 active:bg-slate-900";

  var statusCircleContainer = document.createElement("p");
  statusCircleContainer.className = "h-full w-fit";

  var statusCircleIcon = document.createElement("i");
  statusCircleIcon.className = "fa-solid fa-circle";
  statusCircleIcon.style.color = "#1EFE80";

  statusCircleContainer.appendChild(statusCircleIcon);

  var contentContainer = document.createElement("div");
  contentContainer.className = "w-full px-3";

  var titleElement = document.createElement("h4");
  titleElement.className = "flex justify-between";

  var titleText = document.createTextNode(`${message}`);
  titleElement.appendChild(titleText);

  var ellipsisLink = document.createElement("a");
  ellipsisLink.href = "#";

  var ellipsisIcon = document.createElement("i");
  ellipsisIcon.className = "fa-solid fa-ellipsis-vertical";
  ellipsisLink.appendChild(ellipsisIcon);

  titleElement.appendChild(ellipsisLink);

  var timestampElement = document.createElement("h5");
  timestampElement.className = "text-slate-400";
  time = dateNotification(time);
  timestampElement.textContent = `${time}`;

  contentContainer.appendChild(titleElement);
  contentContainer.appendChild(timestampElement);

  notificationContainer.appendChild(statusCircleContainer);
  notificationContainer.appendChild(contentContainer);

  var listContainer = document.getElementById("list-of-notifications");
  listContainer.prepend(notificationContainer);
}

// ================================================date ==========================================================
function dateNotification(date) {
  var now = new Date();

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var formattedDate =
    year +
    "/" +
    month +
    "/" +
    day +
    ", " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return formattedDate;
}

const notificationDate = document.querySelector(".now");
notificationDate.textContent = dateNotification(0);
