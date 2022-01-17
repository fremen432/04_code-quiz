var taskIdCounter = 0;
var questionCounter = 0;
var scoreCounter = 0;

var formEl =            document.querySelector("#task-form");
var tasksToDoEl =       document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl =  document.querySelector("#tasks-completed");
var pageContentEl =     document.querySelector("#page-content");

var startQuizBtn =          document.querySelector("#startQuizBtn");
var highScoreBtn =          document.querySelector("#highScoreBtn");
var currentTime =           document.querySelector("#currentTime");



// create array to hold Current question for saving
var questions = [ 
    {
      question1: "This is question 1",
      choice1:  "Answer choice 1",
      choice2:  "Answer choice 2",
      choice3:  "Answer choice 3",
      choice4:  "Answer choice 4",
      answer:   "Answer choice 3"
    },
    {
      question2: "This is question 1",
      choice1:  "Answer choice 1",
      choice2:  "Answer choice 2",
      choice3:  "Answer choice 3",
      choice4:  "Answer choice 4",
      answer:   "Answer choice 3"
    },
    {
      question3: "This is question 1",
      choice1:  "Answer choice 1",
      choice2:  "Answer choice 2",
      choice3:  "Answer choice 3",
      choice4:  "Answer choice 4",
      answer:   "Answer choice 3"
    },
    {
      question4: "This is question 1",
      choice1:  "Answer choice 1",
      choice2:  "Answer choice 2",
      choice3:  "Answer choice 3",
      choice4:  "Answer choice 4",
      answer:   "Answer choice 3"
    }
];

var MAX_POINTS = 100 
var MAX_QUESTIONS = 4

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if inputs are empty (validate)
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  // reset form fields for next task to be entered
  document.querySelector("input[name='task-name']").value = "";
  document.querySelector("select[name='task-type']").selectedIndex = 0;

  // check if task is new or one being edited by seeing if it has a data-task-id attribute
  var isEdit = formEl.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };

    createTaskEl(taskDataObj);
  }
};

var createQuestionEl = function() {

  var divContainerEl = document.createElement("div");
  divContainerEl.className = "box";
  divContainerEl.idName = "questionDivEl";
  pageContentEl.appendChild(divContainerEl);
  
  var questionEl = document.createElement('p');
  questionEl.className = "question box";
  questionEl.idName = "questionText";
  questionEl.innerText = "Why is the Sky blue?"
  divContainerEl.appendChild(questionEl);

  var answersUlEl = document.createElement('ul')
  answersUlEl.className = "questionsUl box";
  answersUlEl.idName = "questionsUl";
  divContainerEl.appendChild(answersUlEl);

  for (i=0; i < MAX_QUESTIONS; i++) {
    var answerLiEl = document.createElement('li');
    answerLiEl.className = "answerChoice box";
    // answerLiEl.idName = "questionText";
    // var choiceNum = 'answerChoice' + [i]

    answerLiEl.innerText = 'answerChoice';
    answersUlEl.appendChild(answerLiEl);  
  }

  var btnContainerEl = document.createElement("div");
  btnContainerEl.className = "box";
  btnContainerEl.idName = "btnContainerEl";
  pageContentEl.appendChild(btnContainerEl);

  // var submitBtnEl = document.createElement("div");
  // btnContainerEl.className = "box";
  // btnContainerEl.idName = "btnContainerEl";
  // pageContentEl.appendChild(btnContainerEl);

  // var btnContainerEl = document.createElement("div");
  // btnContainerEl.className = "box";
  // btnContainerEl.idName = "btnContainerEl";
  // pageContentEl.appendChild(btnContainerEl);





};

var createTaskActions = function (taskId) {
  // create container to hold elements
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

var completeEditTask = function (taskName, taskType, taskId) {
  // find task list item with taskId value
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  alert("Task Updated!");

  // remove data attribute from form
  formEl.removeAttribute("data-task-id");
  // update formEl button to go back to saying "Add Task" instead of "Edit Task"
  formEl.querySelector("#save-task").textContent = "Add Task";
  // save tasks to localStorage
  saveTasks();
};

var taskButtonHandler = function (event) {
  // get target element from event
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    console.log("edit", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    console.log("delete", targetEl);
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

var taskStatusChangeHandler = function (event) {
  console.log(event.target.value);

  // find task list item based on event.target's data-task-id attribute
  var taskId = event.target.getAttribute("data-task-id");

  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // convert value to lower case
  var statusValue = event.target.value.toLowerCase();

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }

  // save to localStorage
  saveTasks();
};

var editTask = function (taskId) {
  console.log(taskId);

  // get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskName and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function (taskId) {
  console.log(taskId);
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  saveTasks();
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function() {
  var savedTasks = localStorage.getItem("tasks");
  // if there are no tasks, set tasks to an empty array and return out of the function
  if (!savedTasks) {
    return false;
  }
  console.log("Saved tasks found!");
  // else, load up saved tasks

  // parse into array of objects
  savedTasks = JSON.parse(savedTasks);

  // loop through savedTasks array
  for (var i = 0; i < savedTasks.length; i++) {
    // pass each task object into the `createTaskEl()` function
    createTaskEl(savedTasks[i]);
  }
};

var clearHTMLBody = function() {
  pageContentEl.innerHTML = ''
}

var countDown = function() {
  var timeLeft = 59;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `currentTime` to show the remaining seconds
      currentTime.textContent = timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      currentTime.textContent = timeLeft;
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `currentTime` to an empty string
      currentTime.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

var startQuiz = function() {
  questionCounter = 0
  scoreCounter = 0
  clearHTMLBody()
  createQuestionEl()
  countDown();
}




// Create a new task
// formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();

startQuizBtn.addEventListener('click', startQuiz);
