// Original date and time string
var originalDateString = "2024-01-01T21:00:00.000Z";

// Create a new Date object by parsing the original string
var originalDate = new Date(originalDateString);

// Extract individual components of the date and time
var year = originalDate.getFullYear();
var month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Add padding if needed
var day = originalDate.getDate().toString().padStart(2, "0"); // Add padding if needed
var hours = originalDate.getHours().toString().padStart(2, "0"); // Add padding if needed
var minutes = originalDate.getMinutes().toString().padStart(2, "0"); // Add padding if needed
var seconds = originalDate.getSeconds().toString().padStart(2, "0"); // Add padding if needed

// Format the date and time as a string in the desired format
var formattedDate =
  year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
