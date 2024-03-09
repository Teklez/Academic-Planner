// =========================================validate gradebook
function validateGradeForm() {
  var score1 = document.getElementById("course-1-score").value.trim();
  var score2 = document.getElementById("course-2-score").value.trim();
  var ects1 = document.getElementById("course-1-ects").value.trim();
  var ects2 = document.getElementById("course-2-ects").value.trim();

  resetRegistrationErrorMessages();

  if (!score1) {
    displayRegistrationErrorMessage("Course-1 Score is required!");
    return false;
  }
  if (score1 < 0 || score1 > 100) {
    displayRegistrationErrorMessage("Invalid Course Score!");
    return false;
  }

  if (!ects1) {
    displayRegistrationErrorMessage("Course-1 ECTS is required!");
    return false;
  }
  if (ects1 < 0 || ects1 > 15) {
    displayRegistrationErrorMessage("Invalid ECTS Value!");
    return false;
  }
  if (!score2) {
    displayRegistrationErrorMessage("Course-2 Score is required!");
    return false;
  }
  if (score2 < 0 || score2 > 100) {
    displayRegistrationErrorMessage("Invalid Course Score!");
    return false;
  }
  if (!ects2) {
    displayRegistrationErrorMessage("Course-2 ECTS is required!");
    return false;
  }
  if (ects2 < 0 || ects2 > 15) {
    displayRegistrationErrorMessage("Invalid ECTS Value!");
    return false;
  }

  function displayRegistrationErrorMessage(message) {
    document.getElementById("errormessages").innerHTML = message;
    document.getElementById("errormessages").style.color = "red";
  }

  function resetRegistrationErrorMessages() {
    document.getElementById("errormessages").innerHTML = "";
  }

  return true;
}

// ========================================

let coursesOnScreenCounter = 2;

function addNewCourse() {
  const newComponentNumber = coursesOnScreenCounter + 1;
  const courseComponentHTML = `
    <div class="m-5" id="course-${newComponentNumber}">
        <h3 class="text-[#1EFE80] text-2xl">Course #${newComponentNumber}</h3>
        <input id="course-${newComponentNumber}-score" required type="number" class="input-bar h-8 m-2" placeholder="Score out of 100">
        <input id="course-${newComponentNumber}-ects" required type="number" pattern="[0-9]*" maxlength="1" class="input-bar w-24 h-8 m-2" placeholder="ECTS">
    </div>
    `;
  document
    .getElementById("courses-container")
    .insertAdjacentHTML("beforeend", courseComponentHTML);
  coursesOnScreenCounter++;
}

function getScoreAndEctsObj() {
  const scores = [];
  const ECTS = [];
  for (let i = 1; i <= coursesOnScreenCounter; i++) {
    let score = document.getElementById(`course-${i}-score`).value;
    if (score === "") {
    } else if (score < 0 || score > 100) {
    }
    scores.push(+score);
    let ects = document.getElementById(`course-${i}-ects`).value;
    if (ects === "") {
    } else if (ects < 0 || ects > 10) {
    }
    ECTS.push(+score);
  }
  return { scoresArray: scores, ECTSArray: ECTS };
}

function getLabels() {
  const labels = [];
  for (let i = 1; i <= coursesOnScreenCounter; i++) {
    labels.push(`Course ${i}`);
  }
  return labels;
}

function getGPA() {
  let numerator = 0;
  let totalECTS = 0;
  for (let i = 0; i < coursesOnScreenCounter; i++) {
    let temp =
      getDecimalGrade(getScoreAndEctsObj().scoresArray[i]) *
      getScoreAndEctsObj().ECTSArray[i];
    numerator += temp;
    totalECTS += getScoreAndEctsObj().ECTSArray[i];
  }
  const result = numerator / totalECTS;
  return result.toFixed(2);
}

function getDecimalGrade(scoreOutOfHundred) {
  if (scoreOutOfHundred >= 90 && scoreOutOfHundred <= 100) {
    return 4.0;
  } else if (scoreOutOfHundred >= 83 && scoreOutOfHundred <= 89) {
    return 4.0;
  } else if (scoreOutOfHundred >= 80 && scoreOutOfHundred <= 82) {
    return 3.75;
  } else if (scoreOutOfHundred >= 75 && scoreOutOfHundred <= 79) {
    return 3.5;
  } else if (scoreOutOfHundred >= 68 && scoreOutOfHundred <= 74) {
    return 3.0;
  } else if (scoreOutOfHundred >= 65 && scoreOutOfHundred <= 67) {
    return 2.75;
  } else if (scoreOutOfHundred >= 60 && scoreOutOfHundred <= 64) {
    return 2.5;
  } else if (scoreOutOfHundred >= 50 && scoreOutOfHundred <= 59) {
    return 2.0;
  } else if (scoreOutOfHundred >= 45 && scoreOutOfHundred <= 49) {
    return 1.75;
  } else if (scoreOutOfHundred >= 40 && scoreOutOfHundred <= 44) {
    return 1.0;
  } else if (scoreOutOfHundred >= 0 && scoreOutOfHundred <= 39) {
    return 0.0;
  } else {
    return null;
  }
}

function generateReport() {
  if (!validateGradeForm()) {
    location.href = "#"; // scroll to top
    document.getElementById("result-board").classList.remove("hidden");
    document.getElementById("gpa-result").innerHTML = getGPA();
    let ctx = document.getElementById("myBarChart").getContext("2d");
    let myBarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: getLabels(),
        datasets: [
          {
            label: "Course Score",
            data: getScoreAndEctsObj().scoresArray,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });
  }
}
