var timerElement = document.getElementById('timeLeft');
var startButton = document.getElementById('start');
var questionElement = document.getElementById('main');
var scoreElement = document.getElementById('main');
var initial = null;
console.log(startButton);

var timeLeft = 59;

var questions = [
	{
		question: 'What does HTML stand for?',
		a: 'Hyper Tag Markup Language',
		b: 'Hyper Text Markup Language',
		c: 'Hyperlinks Text Mark Language',
		d: 'Hyperlinking Text Marking Language',
		answer: 'Hyper Text Markup Language',
	},
	{
		question:
			'What is the correct way to specify padding for all 4 sides at once?',
		a: 'padding: top bottom left right;',
		b: 'padding: top left bottom right;',
		c: 'padding: top right bottom left;',
		d: 'padding: left right top bottom;',
		answer: 'padding: top right bottom left;',
	},
	{
		question:
			'Which attribute tells the browser where to go when a hyperlink is clicked?',
		a: 'src',
		b: 'url',
		c: 'link',
		d: 'href',
		answer: 'href',
	},
	{
		question: 'What does CSS stand for?',
		a: 'Computer Styled Sections',
		b: 'Cascading Style Sheets',
		c: 'Crazy Solid Shapes',
		d: 'None of the above',
		answer: 'Cascading Style Sheets',
	},
];

questionindex = 0;

function startQuiz() {
	countdown();
	displayquestion();
}

function countdown() {
	var interval = setInterval(function () {
		if (questionindex < 4 && timeLeft > 0) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else if (timeLeft === 1) {
			timerElement.textContent = 'Time: ' + timeLeft;
			timeLeft--;
		} else {
			timerElement.textContent = 'Time: ' + timeLeft;
			clearInterval(interval);
			score();
		}
	}, 1000);
}

function displayquestion() {
	if (questionindex < 4) {
		document.getElementById('main').innerHTML = '';

		var current = questions[questionindex];

		var question = document.createElement('h2');
		question.textContent = current.question;
		questionElement.appendChild(question);

		var a = document.createElement('p');
		a.textContent = current.a;
		questionElement.appendChild(a);

		var b = document.createElement('p');
		b.textContent = current.b;
		questionElement.appendChild(b);

		var c = document.createElement('p');
		c.textContent = current.c;
		questionElement.appendChild(c);

		var d = document.createElement('p');
		d.textContent = current.d;
		questionElement.appendChild(d);

		a.addEventListener('click', anwserCheck);
		b.addEventListener('click', anwserCheck);
		c.addEventListener('click', anwserCheck);
		d.addEventListener('click', anwserCheck);
	} else {
		score();
	}
}

function displayHighScores() {}

function anwserCheck() {
	console.log(this);
	if (questions[questionindex].answer === this.textContent) {
		console.log('correct');
		questionindex++;
		console.log(questionindex);
		displayquestion();
	} else {
		console.log('incorrect');
		questionindex++;
		console.log(questionindex);
		timeLeft -= 10;
		displayquestion();
	}
}

function score() {
	document.getElementById('main').innerHTML = '';

	var scoreText = document.createElement('h3');
	scoreText.innerHTML = 'Score: ' + timeLeft;
	scoreElement.appendChild(scoreText);
	if (timeLeft < 0) {
		scoreText.innerHTML = 'Score: 0';
		timeLeft = 0;
	}

	initial = document.createElement('input');
	scoreElement.appendChild(initial);

	var submit = document.createElement('button');
	submit.innerHTML = 'Submit';
	scoreElement.appendChild(submit);

	submit.onclick = saveScore;
}

function saveScore() {
	var userscore = {
		name: initial.value,
		fs: timeLeft,
	};
	highscores.push(userscore);
	window.localStorage.setItem('highscores', JSON.stringify(highscores));
	console.log('This is saved!');
	console.log(initial, timeLeft);
	document.getElementById('main').innerHTML = '';
	timeLeft = 55;
	questionindex = 0;
}

var viewscore = document.querySelector('.highScore');
viewscore.addEventListener('click', loadScore);
function loadScore() {
	for (var i = 0; i < highscores.length; i++) {
		var n = document.createElement('h4');

		var currentHighscore = highscores[i];

		n.textContent = currentHighscore.name + ' - ' + currentHighscore.fs;

		scoreElement.appendChild(n);
	}
}

var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

startButton.onclick = startQuiz;
