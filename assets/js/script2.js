var pageContent =       document.querySelector("#page-content")
var quiz =              document.querySelector("#quizContainerEl")
var scoreContainer =          document.querySelector("#scoreContainer")
var timesUp =          document.querySelector("#timesUp")
var allHighScores =          document.querySelector("#allHighScores")

var startQuizBtn =          document.querySelector("#startQuizBtn");
var highScoreBtn =          document.querySelector("#highScoreBtn");
var currentTime =           document.querySelector("#currentTime");

var stopCounter = false;

var timeLeft = 59;
// var timeLeft = 1;
var questionCounter = 0;
var score = 0;
var totalScore;
var initial = '';

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

var displayQuestion = function(){
  quiz.innerHTML = ''

  if (questionCounter < questionsArr.length) {

    var currentQ = questionsArr[questionCounter];

    var qText = document.createElement('h2');
    qText.innerText = currentQ.question;
    quiz.appendChild(qText);

    var choicesUl = document.createElement('ul')
    quiz.appendChild(choicesUl)

    // Generate li elements for each answer choice
    for (i = 0; i < currentQ.choices.length; i++) {

      var choiceEl = document.createElement('li');
      choiceEl.textContent = currentQ.choices[i]
      choiceEl.setAttribute('class', 'answerChoice')
      choiceEl.addEventListener('click', answerCheck)

      choicesUl.appendChild(choiceEl);
    }
  } else {
    stopCounter = true;
    inputScore();
  }
}

var inputScore = function() {
  clearHTMLBody();
  totalScore = score + timeLeft

  if (timeLeft < 0) {
		timeLeft = 0;
		scoreText.innerHTML = 'Score: ' + timeLeft;
	}

	var scoreText = document.createElement('h3');
	scoreText.innerHTML = 'Score: ' + totalScore;
  
	var submit = document.createElement('button');
	submit.innerHTML = 'Submit';
	submit.onclick = saveScore;

	initial = document.createElement('input');
  
	scoreContainer.appendChild(scoreText);
	scoreContainer.appendChild(initial);
	scoreContainer.appendChild(submit);
}

function saveScore() {
	var userScore = {
		name: initial.value,
		score: timeLeft + score,
	};
	highScores.push(userScore);
	window.localStorage.setItem('highScores', JSON.stringify(highScores));
	console.log('This is saved!');
	console.log(initial, timeLeft);
  clearHTMLBody();
  generateHighScorePage();
}

function makeEl(elType, elId, elClass, elText) {
  let el = document.createElement(elType)
  el.setAttribute('id', elId)
  el.setAttribute('class', elClass);
  el.textContent = elText
  return el
}

var generateHighScorePage = function() {
  clearHTMLBody();

  cl(highScores);

  // var highScoreText = document.createElement('p')
  // highScoreText.setAttribute('id', 'highScoreText')
  // highScoreText.setAttribute('class', 'box')
  // highScoreText.textContent = 'High Scores:'

  var highScoreText = makeEl('p', 'highScoreText', 'box', 'High Scores:')

  // var newQuizBtn = document.createElement('button')
  // newQuizBtn.setAttribute('id', 'newQuizBtn')
  // newQuizBtn.setAttribute('class', 'btn box')
  // newQuizBtn.textContent = 'Start New Quiz'

  var newQuizBtn = makeEl('button', 'newQuizBtn', 'btn box', 'Start New Quiz')



  allHighScores.appendChild(highScoreText);

  for (i = 0; i < highScores.length; i++) {
    // var scoreContainer = document.createElement('div')
    // scoreContainer.setAttribute('class', 'scoreContainer box')
    var scoreContainer = makeEl('div', '', 'scoreContainer box')

    // var name = document.createElement('p')
    // name.setAttribute('class', 'HSname box')
    // name.textContent = highScores[i].name
    var name = makeEl('p', '', 'HSname box', highScores[i].name)

    // var score = document.createElement('p')
    // score.setAttribute('class', 'HSscore box')
    // score.textContent = highScores[i].score
    var score = makeEl('p', '', 'HSscore box', highScores[i].score)

    scoreContainer.appendChild(name);
    scoreContainer.appendChild(score);

    allHighScores.appendChild(scoreContainer);
  }

  allHighScores.appendChild(newQuizBtn);
  newQuizBtn.addEventListener('click', startQuiz)
}

var answerCheck = function() {

  if (questionCounter >= questionsArr.length + 1) {
    return
  } else if (questionsArr[questionCounter].answer === this.textContent) { 
    score += 10
    console.log('correct'); 
  } else { 
    console.log('incorrect'); 
    timeLeft -= 10; 
  }
  console.log(score); 
  questionCounter++
  displayQuestion();
}

var clearHTMLBody = function() {
  startQuizBtn.setAttribute('class', 'hide')
  quiz.innerHTML = ''
  scoreContainer.innerHTML = ''
  highScores.innerHTML = ''
  allHighScores.innerHTML = ''
  // pageContent.innerHTML = ''
}

// var timeoutID;

// function delayedAlert() {
//   timeoutID = window.setTimeout(showTimeUpMessage, 2000);
// }

// function clearAlert() {
//   window.clearTimeout(timeoutID);
// }

// var showTimeUpMessage = function() {

//   var end = document.createElement('p');

//   end.setAttribute('class', 'timeUpMessage')
//   end.textContent = "Time's up!"
//   pageContent.appendChild(end);
  
// }

// function clearTimeUp() {
//   // pageContent = 
// }

var countDown = function() {

  var timeInterval = setInterval(function() {

    if (questionCounter < questionsArr.length && timeLeft > 0) {
      currentTime.textContent = timeLeft;
      timeLeft--;
    } else if (timeLeft === 0) {
      currentTime.textContent = timeLeft;
      clearInterval(timeInterval);
      alert("Time's up!")
      inputScore();
    } else {
      clearInterval(timeInterval);
      inputScore();
    }
  }, 1000);
}

var works = () => console.log('This works');
var cl = input => console.log(input);

var startQuiz = function() {
  timeLeft = 59;
  questionCounter = 0;
  score = 0;
  // totalScore = 0;
  clearHTMLBody()
  displayQuestion();
  countDown();
}




// Create a new task
// formEl.addEventListener("submit", taskFormHandler);

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

startQuizBtn.addEventListener('click', startQuiz);
highScoreBtn.addEventListener('click', generateHighScorePage);
