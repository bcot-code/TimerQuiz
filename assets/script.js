let questions = [
  {
    num: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Javascript Template Language",
      "Hollywood Television Message Language",
      "None Of The Above",
    ],
    correct: "Hyper Text Markup Language",
  },
  {
    num: 2,
    question: "What does JS stand for?",
    options: [
      "Jupiter Scientist's Laboratory",
      "JavaScript Standards",
      "Java Scripting",
      "None of the above",
    ],
    correct: "Java Scripting",
  },
  {
    num: 3,
    question: "Which one is not a data type?",
    options: ["String", "Number", "Boolean", "All of them are Data Types."],
    correct: "All of them are Data Types.",
  },
  {
    num: 4,
    question: "How do you write an IF statement in JavaScript?",
    options: ["if i ==5 then", "if (i==5)", "if i=5 then", "none of these"],
    correct: "if (i==5)",
  },
  {
    num: 5,
    question:
      "How to write an IF statement for executing some code if “i” is NOT equal to 5",
    options: [
      "if i !=5 then execute this piece of code.",
      "if(i!=5)then{execute}",
      "if i<>5 then execute this piece of code. ",
    ],
    correct: "if(i!=5)then{execute}",
  },
];

// Variables
var qnt = document.querySelector(".para");
var score = document.getElementById("final_grd");
var choose = document.querySelector(".choose-container");
const timer = document.querySelector(".timer");
var startBtn = document.getElementById("btn-init");
var nextQuesBtn = document.querySelector("#nxt-btn");

var listQs = 0;
var timeLeft = 100;
var timeID;

// Event Listener
startBtn.addEventListener("click", () => startQuiz());

// Start Quiz
function startQuiz() {
  console.log("in the start quiz function");
  timeQ();
  questionFill();
  startBtn.classList.add("hide");
}

// Fill Question and Options
function questionFill() {
  qnt.textContent = questions[listQs].question;

  for (let i = 0; i < questions[listQs].options.length; i++) {
    let option = questions[listQs].options[i];
    let radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "question" + questions[listQs].num;
    radioBtn.value = option;

    let label = document.createElement("label");
    label.textContent = option;

    qnt.appendChild(document.createElement("br"));
    qnt.appendChild(label);
    qnt.appendChild(document.createElement("br"));
    qnt.appendChild(radioBtn);
  }

  qnt.appendChild(document.createElement("br"));
  let nextBtn = document.createElement("button");
  nextBtn.id = "next";
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", checkAns);
  qnt.appendChild(nextBtn);
}

// Check Answer
function checkAns() {
  let selectedOption = document.querySelector(
    `input[name="question${questions[listQs].num}"]:checked`
  );

  if (!selectedOption) {
    alert("Please select an option.");
    return;
  }

  let userAnswer = selectedOption.value;
  let correctAnswer = questions[listQs].correct;
  console.log(timeLeft);

  if (userAnswer === correctAnswer) {
    //need to reset time
    score++;
    console.log("You got it right!");
  } else {
    //deduct time by 2 s NEED TO LOOK AT ...
    timeLeft -= 20;
    if (timeLeft < 0) {
      timeLeft - 1;
      alert("Debugging the time 😭");
    }
  }

  listQs++;

  if (listQs < questions.length) {
    qnt.innerHTML = "";
    questionFill();
  } else {
    endQuiz();
  }
}

// End Quiz
function endQuiz() {
  clearInterval(timeID);

  var doneGrd = document.querySelector(".done");
  doneGrd.classList.remove("hide");

  //not displaying the grading or rounding if
  var score = document.getElementById("final_grd");
  score.textContent = listQs + "/" + questions.length;

  var questionsID = document.querySelector(".qtn-container");
  questionsID.classList.add("hide");
  questionsID.textContent = timer;
}

// Timer
function timeQ() {
  timeID = setInterval(function () {
    timeLeft--;
    timer.textContent = timeLeft + " time left 👀";

    if (timeLeft <= 0) {
      clearInterval(timeID);
      endQuiz();
    }
  }, 1000);
}

function enterBtn(e) {
  console.log("im in the enter function");
  const initials = document.getElementById("initials");
  console.log(initials.value);
  var score = document.getElementById("final_grd");
  console.log(score.textContent);

  localStorage.setItem(initials.value, score.textContent);
}
document.getElementById("enter").addEventListener("click", enterBtn);

// Open and Close NAV bar
document.getElementById("openBtn").addEventListener("click", function () {
  document.getElementById("navbar").style.display = "block";
  document.getElementById("openBtn").style.display = "none";
  document.getElementById("closeBtn").style.display = "block";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("navbar").style.display = "none";
  document.getElementById("openBtn").style.display = "block";
  document.getElementById("closeBtn").style.display = "none";
});
