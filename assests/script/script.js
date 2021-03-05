// This is the javascript for code quiz it creats new element and keeps track of
// other elements. This still needs more refining since some of the feture still 
// don't work correctly. 
// -------------------- To Do ------------------
// The timer doesn't stop when answer question to fast.
// Localstorage doesn't keep data and can't clear it. 
// Doesn't tell about answer being correct with time.
// Need to rework on orginization again. 
var questions = [
    {
    question : "Commonly used data types.",
    answers : ["strings", "bololeans", "alerts", "numbers"],
    answer : "alerts"
    },
    {
    question : "The condition in an if/else statment is enclosed within ",
    answers : ["Brackets", "quotes", "Parenthaes", "curlly brackets"],
    answer : "Parenthaes"
    },
    {
    question : "Arrays in Javascript can be used to store ____",
    answers : ["numbers and string", "others arrays", "Booleans", "All of the above"],
    answer : "All of the above"
    },
    {
    question : "String values must be enclosed within _____ when asigned with variables",
    answers : ["Brackets", "quotes", "foward slash", "none of the above"],
    answer : "quotes"
    }
];

var area = document.getElementById("answer-area");
var questionArea = document.getElementById("question-area");
var scoreArea = document.getElementById("score-area");
var highscoreArea = document.getElementById("highscores");



var currentIndex = 0;
var quizScore = 0;
var timeLeft = 90;
var working = false;

// question function is where the main question come from and are placed on the page
function question(){
    var currentQuestion = questions[currentIndex];
    var question_text = document.getElementById("question-text");
    question_text.textContent = currentQuestion.question;

    for(var i = 0; i < currentQuestion.answers.length; i++){
        var answerButton = document.createElement("BUTTON");
        answerButton.className = "btn" + currentIndex; 
        answerButton.innerHTML = i + 1 + ". " + currentQuestion.answers[i];
        
        var btnStyle = "margin:1vh 5vw; font-size: 100%; text-align: left; padding: 0 2vw;";

        area.appendChild(answerButton).value = currentQuestion.answers[i];
        area.appendChild(answerButton).style.cssText = btnStyle;
        
        answerButton.addEventListener("click", checkAnswer);
    }
}

// Thi function checks the answer and then goes back to question to ask another question
function checkAnswer(event){
    var checked = document.createElement("P");
    var btn = document.getElementsByTagName("button");

    if(event.target.value == questions[currentIndex].answer){
        checked.innerHTML = "Correct";
        area.append(document.createElement("BR"));
        area.append(checked);
        quizScore++;
    }
    else{
        checked.innerHTML = "Wrong";
        timeLeft = timeLeft - 10;
        area.append(checked)
    }
    currentIndex++;

    if (currentIndex == 4){
        score();
    }
    
    while(area.firstChild){
        area.removeChild(area.firstChild);
    }
    question();
}

// the score function is the main where you enter you initals and it goes to the local storage.
function score(){
    var mainText = document.getElementById("main-text");
    var scoreText = document.getElementById("score-text");
    var userText = document.getElementById("user-text");
    var submit = document.getElementById("enter");
    var scores = [];
    working = false;

    mainText.innerHTML = "You have finished the quiz.\n"
    scoreText.innerHTML = "You got " + quizScore + " correct out of " + questions.length + " questions correct.";

    submit.addEventListener("click", function(){
        var newScores = {"name": userText.value, "score": quizScore}
        scores.push(newScores)
        localStorage.setItem("Scores", JSON.stringify(scores))
        userText.value = ""
        highScores();
    })

    questionArea.style.display = "none";
    scoreArea.style.display = "block";
}

// The highscore function makes the page for all the score from the localstorage
function highScores(){
    var scoreList = document.getElementById("score-list");
    var textArea = document.createElement("li");
    var items = JSON.parse(localStorage.getItem("Scores"));

    scoreArea.style.display = "none";
    highscoreArea.style.display = "block";

    for(var i = 0; i < items.length; i++){
        var item = Object.values(items[i])
        console.log(item[0])
        textArea.innerHTML = "1. " + item[0] + " : " + item[1];
        textArea.className = "highscore-text";
        scoreList.appendChild(textArea);
    }

    var goBack = document.getElementById("go-back");

    goBack.addEventListener("click", function(event){
        highscoreArea.style.display = "none";
        document.getElementById("main").style.display = "block";
        currentIndex = 0;
        quizScore = 0;
    })
}

// this is an event listener to clear the highscore page
var clear = document.getElementById("clear");
clear.addEventListener("click", function(event){
    localStorage.clear();
    highScores();
})

// this fucntion keeps track of the timer
function timing(){
    var time = document.getElementById("time");
    working = true;
    setInterval(function(){
        time.innerHTML = "Time: " + timeLeft;
        if(timeLeft == 0){
            score();
        }
        else{
        timeLeft--;  
        }
    }, 1000);
}

// this is the main function the starts everything when the start button is pressed
function starting(){
    document.getElementById("main").style.display = "none";
    document.getElementById("question-area").style.display = "block";
    question();
    timing();
}

// event listener for the start button
document.getElementById("start").addEventListener("click", starting);