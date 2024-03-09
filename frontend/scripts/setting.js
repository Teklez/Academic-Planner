// const currentUser = sessionStorage.getItem("currentUser");
// const access_token = sessionStorage.getItem("access_token");

// ==================================delete account==========================================================
async function deleteAccount() {
  try {
    response = await fetch(`http://localhost:5500/auth/${currentUser}/delete`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (response.ok) {
      console.log("Account deleted successfully.");
      sessionStorage.removeItem("currentUser");
      sessionStorage.removeItem("access_token");
      window.location.href = "../frontend/index.html";
    } else {
      console.log("HTTP status: ", response);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

// ======================================Enable Notification=========================================================================
const notificationToggle = document.getElementById("enable-notification");
const notificationStatus = sessionStorage.getItem("notification");
if (notificationStatus === "true") {
  notificationToggle.checked = true;
} else if (notificationStatus === "false") {
  notificationToggle.checked = false;
}
