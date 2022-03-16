let container = document.getElementById("container");
let _questionNum = document.getElementById("questionNum");
let quizName = document.getElementById("quizName");
// let quesHead = document.getElementById("quesHead");
let labels = document.getElementsByTagName("label");
let choices = document.querySelectorAll('input[name="ansr"]');
let questionBody = document.getElementById("question");
let warning = document.getElementById("warning");
let nextBtn = document.getElementById("nextBtn");
let questionNum = 0;
var score = 0;
let timer ;
let name = document.getElementById("userName");
name.innerHTML = sessionStorage.name;
if (sessionStorage.gender == "male") {
  container.classList.add("male");
} else {
  container.classList.add("female");
}
if (sessionStorage.logged) {
  let Exam = {
    quizname: "java script",
    quiztime: .5,
    question: [
      {
        head: " Which type of JavaScript language is",
        answers: [
          "Object-Oriented",
          "Object-Based",
          "Assembly-language",
          "High-level",
          "non of the above",
        ],
        correct: "Object-Based",
      },
      {
        head: "Which one of the following also known as Conditional Expression:",
        answers: [
          "Alternative to if-else",
          "Switch statement",
          "If-then-else statement",
          "immediate if",
          "non of the above",
        ],
        correct: "immediate if",
      },
      {
          head: " In JavaScript, what is a block of statement?",
          answers: [
              'Conditional block', 'block that combines a number of statements into a single compound statement', 'both conditional block and a single statement', 'block that contains a single statement', 'non of the above'
          ],
          correct: 'block that combines a number of statements into a single compound statement'
      },
      {
          head: "When interpreter encounters an empty statements, what it will do:",
          answers: [
              'Shows a warning', 'Prompts to complete the statement', 'Throws an error', 'Ignores the statements', 'non of the above'
          ],
          correct: 'Ignores the statements'
      },
      {
          head: "The 'function' and 'var' are known as:",
          answers: [
              'Keywords', 'Data types', 'Declaration statements', 'Prototypes', 'non of the above'
          ],
          correct: 'Declaration statements'
      },
      {
          head: "Which one of the following is the correct way for calling the JavaScript code?",
          answers: [
              'Preprocessor', 'Triggering Event', 'RMI', 'Function/Method', 'non of the above'
          ],
          correct: 'Function/Method'
      },
      {
          head: "Which of the following type of a variable is volatile?",
          answers: [
              'Mutable variable', 'Dynamic variable', 'Volatile variable', 'Immutable variable', 'non of the above'
          ],
          correct: 'Mutable variable'
      },
      {
          head: "Which of the following option is used as hexadecimal literal beginning?",
          answers: [
              '00', '0x', '0X', 'Both 0x and 0X', 'non of the above'
          ],
          correct: 'Both 0x and 0X'
      },
      {
          head: " In the JavaScript, which one of the following is not considered as an error:",
          answers: [
              'Syntax error', 'Missing of semicolons', 'Division by zero', 'Missing of Bracket', 'non of the above'
          ],
          correct: 'Division by zero'
      },
      {
          head: "Which of the following number object function returns the value of the number?",
          answers: [
              'toString()', 'valueOf()', 'toLocaleString()', 'toPrecision()', 'non of the above'
          ],
          correct: 'valueOf()'
      }
    ],
  };

  //show first question
  let { quizname, quiztime, question } = Exam;
  quizName.innerHTML = quizname;
  quesHead.innerHTML = question[0].head;
  for (let i = 0; i < labels.length; i++)
    labels[i].innerHTML = question[0].answers[i];

  //show next question after click on next button
  nextBtn.addEventListener("click", nextQuestion);

  function nextQuestion() {
    //remove warning
    addvalue();
    questionBody.classList.remove("noanswer");
    warning.innerHTML = "";
    //check if any checkbox is checked before next question
    if (anyCheckbox()) {
      if (questionNum < question.length - 2) {
        questionNum++;
        quesHead.innerHTML = question[questionNum].head;
        for (let i = 0; i < labels.length; i++) {
          labels[i].innerHTML = question[questionNum].answers[i];
        }
      }
      // modified part
      else if (questionNum < question.length - 1) {
        questionNum++;
        quesHead.innerHTML = question[questionNum].head;
        for (let i = 0; i < labels.length; i++) {
          labels[i].innerHTML = question[questionNum].answers[i];
          nextBtn.innerHTML = "submit";
        }
      } else {
        clearInterval(timer);
        container.innerHTML = `Exam Finished ... Your Score : ${score}/100`;
        container.style.padding = "20px";
        container.style.backgroundColor = "green";
      }
    }
    //if no answer
    else {
      questionBody.classList.add("noanswer");
      warning.innerHTML = "You Have to Choose answer";
    }
    for (const choice of choices) choice.checked = false; //to make it empty
    _questionNum.innerHTML = `Question ${questionNum + 1}:`;
  }
  //check if any radiobox checked
  function anyCheckbox() {
    // var inputElements = document.getElementsByTagName("input");
    for (var i = 0; i < choices.length; i++)
      if (choices[i].checked) {
        console.log(choices[i].value);
        if (choices[i].value == question[questionNum].correct) {
          score += 10;
          console.log(score);
        }
        return true;
      }
    return false;
  }

  function addvalue() {
    for (var i = 0; i < choices.length; i++) {
      choices[i].value = question[questionNum].answers[i];
    }
  }

  function examtimer() {
    var time = document.getElementById("timer");
    // var { QuizTime } = exam;
    var sec = quiztime * 60; // change min to sec
    console.log();
    timer = setInterval(function () {
      secpass();
    }, 1000);

    function secpass() {
      var min = Math.floor(sec / 60), //min
        remSec = sec % 60; //sec
      if (remSec < 10) {
        remSec = "0" + remSec;
      }
      if (min < 10) {
        min = "0" + min;
      }
      time.innerHTML = min + ":" + remSec; //timer style
      if (sec > 0) {
        sec = sec - 1; //decrease by 1 sec
      } else {
        clearInterval(timer);
        container.innerHTML = `Exam Time Finished ... Your Score : ${score}/100`;
        container.style.padding = "20px";
        container.style.backgroundColor = "red"
      }
    }
  }
  examtimer();
}