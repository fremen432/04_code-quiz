var pageContent =     document.querySelector("#page-content")
var quiz =            document.querySelector("#quizContainerEl")
var scoreContainer =  document.querySelector("#scoreContainer")
var timesUp =         document.querySelector("#timesUp")
var allHighScores =   document.querySelector("#allHighScores")
var startQuizBtn =    document.querySelector("#startQuizBtn");
var highScoreBtn =    document.querySelector("#highScoreBtn");
var currentTime =     document.querySelector("#currentTime");

var timeLeft = 59;
var questionCounter = 0;
var score = 0;
var totalScore;
var initial = '';

// gets all previous high scores from local storage
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

var questionsArr = [ 
    {
      question: "What does HTML stand for?",
      choices: ["Hard-To-Manage Language", "Had To Meet Lisa", "Hyper Text Markup Language", "Hot Tomato (and) Meat Lasagna"],
      answer:   "Hyper Text Markup Language"
    },
    {
      question: "What programing language is used for styling webpages?",
      choices: ["CSS", "HTML", "JavaScript", "Python"],
      answer:   "CSS"
    },
    {
      question: "In HTML, what is a <span> tag primarily used for?",
      choices: ["Creating a block element", "Creating a container to hold other elements", "Linking other CSS or JavaScript files", "Inserting text as a basic inline element"],
      answer:   "Inserting text as a basic inline element"
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      choices: ["<p>", "<style>", "<title>", "<html>"],
      answer:   "<style>"
    },
    {
      question: "What is the outer-most layer of the CSS box model?",
      choices: ["Border", "Content", "Padding", "Margin"],
      answer:   "Margin"
    }
];

// helper function for making console logs
function cl(input) { console.log(input); }

// helper function for creating DOM elements
function makeEl(elType, elId, elClass, elText, parentEl, clickListen) {
  let el = document.createElement(elType)
  el.setAttribute('id', elId)
  el.setAttribute('class', elClass);
  el.textContent = elText
  if (parentEl) parentEl.appendChild(el);
  el.addEventListener('click', clickListen)
  return el
}
// helper function for resetting DOM
function clearHTMLBody() {
  startQuizBtn.setAttribute('class', 'hide')
  quiz.innerHTML = ''
  scoreContainer.innerHTML = ''
  highScores.innerHTML = ''
  allHighScores.innerHTML = ''
}

var displayQuestion = function(){
  // clears quiz element of previous question
  quiz.innerHTML = ''
  // creates question element for every question in questions array
  if (questionCounter < questionsArr.length) {

    var currentQ = questionsArr[questionCounter];
    // creates h2 element with the name of the current question, append to quiz element
    qText =         makeEl('h2', '', '', currentQ.question, quiz)
    // creates unordered list to hold answer choices, append to quiz element
    var choicesUl = makeEl('ul', '', '', '', quiz)
    // creates li elements for each answer choice, append to choicesUl, call answerCheck function when clicked
    for (i = 0; i < currentQ.choices.length; i++) {
      choiceEl =    makeEl('li', '', 'answerChoice', currentQ.choices[i], choicesUl, answerCheck)
    }
  } else {
    // ends questions, calls inputInitials function for user to input their initials for their high score
    inputInitials();
  }
}

// form for user to input their initials and save their high score
var inputInitials = function() {
  clearHTMLBody();
  totalScore = score + timeLeft
	explanation =       makeEl('h1', '', 'textCenter', 'Total score = correct-answers(x10) + time-left ', scoreContainer)
	scoreText =         makeEl('h1', '', 'bigText', 'Score: ' + totalScore, scoreContainer)
  var containerEl =   makeEl('div', '', 'scoreContainer', '', scoreContainer)
	initial =           makeEl('input', '', '', '', containerEl)
  initial.setAttribute('placeholder', "Input player initials")
  submit =            makeEl('button', '', 'btn', 'Submit', containerEl, saveScore)
}
// takes users initials and their score then saves to local storage as a new high score
function saveScore() {
	var userScore = {
		name: initial.value,
		score: timeLeft + score,
	};
	highScores.push(userScore);
	window.localStorage.setItem('highScores', JSON.stringify(highScores));
  generateHighScorePage();
}

// generates high score page
var generateHighScorePage = function() {
  clearHTMLBody();

	explanation =       makeEl('h1', '', 'textCenter', 'Total score = correct-answers(x10) + time-left ', scoreContainer)
  highScoreText = makeEl('p', 'highScoreText', 'bigText box', 'High Scores:', allHighScores)

  // Creates an element for each previous high score from local storage
  for (i = 0; i < highScores.length; i++) {
    var container = makeEl('div', '', 'scoreContainer box', '', allHighScores)
    playerName =    makeEl('p', '', 'HSname box', highScores[i].name, container)
    playerScore =   makeEl('p', '', 'HSscore box', highScores[i].score, container)
  }
  newQuizBtn =    makeEl('button', 'newQuizBtn', 'btn box', 'Start New Quiz', allHighScores, startQuiz)
}

// checks if the answer the user chose is correct, adds to score if correct and subtracts time if incorrect
var answerCheck = function() {
  if (questionCounter >= questionsArr.length + 1) {
    return
  } else if (questionsArr[questionCounter].answer === this.textContent) { 
    score += 10
    cl('correct'); 
  } else { 
    cl('incorrect'); 
    timeLeft -= 10; 
  }
  cl(score); 
  questionCounter++
  displayQuestion();
}

// gives user 60 seconds to complete quiz
var countDown = function() {

  var timeInterval = setInterval(function() {
    if (questionCounter < questionsArr.length && timeLeft > 0) {
      currentTime.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft === 0) {
      currentTime.textContent = timeLeft;
      clearInterval(timeInterval);
      alert("Time's up!")
      inputInitials();
    } else {
      clearInterval(timeInterval);
      inputInitials();
    }
  }, 1000);
}

var startQuiz = function() {
  timeLeft = 59;
  questionCounter = 0;
  score = 0;
  clearHTMLBody()
  displayQuestion();
  countDown();
}

startQuizBtn.addEventListener('click', startQuiz);
highScoreBtn.addEventListener('click', generateHighScorePage);
