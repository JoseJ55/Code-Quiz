var questions = [
    {
    question : "Commonly used data types.",
    answers : ["strings", "bololeans", "alerts", "numbers"],
    answer : "alerts"
    },
    {
    question : "2",
    answers : ["2", "2", "2", "2"],
    answer : "alerts"
    },
    {
    question : "3",
    answers : ["3", "3", "3", "3"],
    answer : "alerts"
    },
    {
    question : "4",
    answers : ["4", "4", "4", "4"],
    answer : "alerts"
    }
];

var currentIndex = 0;
var quizScore = 0;
var timeLeft = 90;
// need to add something so it get rid of old answer buttons
function question(){
    var currentQuestion = questions[currentIndex];
    var question_text = document.getElementById("question-text");

    question_text.textContent = currentQuestion.question;

    for(var i = 0; i < currentQuestion.answers.length; i++){
        var answerButton = document.createElement("BUTTON");
        answerButton.className = "btn" + currentIndex; // maybe take out this line
        
        answerButton.innerHTML = i + 1 + ". " + currentQuestion.answers[i];
        

        var area = document.getElementById("answer-area")
        var btnStyle = "margin:1vh 5vw; font-size: 100%; text-align: left; padding: 0 2vw;";

        area.appendChild(answerButton).value = currentQuestion.answers[i];
        area.appendChild(answerButton).style.cssText = btnStyle;
        //appendchild method
        // you need event listner added to these buttons
        answerButton.addEventListener("click", checkAnswer);
    }
}

function remov(){
    // for(var i = 0; i < 4; i++){
    document.getElementById("answer-area").removeChild();
        // document.getElementById("answer-area").removeChild(getElementById("answer-area").firstChild);
    // }
}

function checkAnswer(event){
    var area = document.getElementById("answer-area");
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
        area.append(checked)
    }
    currentIndex++;

    if (currentIndex == 4){
        score();
    }
    
     while(area.firstChild){//for(var i = 0; i+1 < area.childElementCount; i++){
        area.removeChild(area.firstChild);
    }
    question();
}

function score(){
    var questionArea = document.getElementById("question-area");
    var scoreArea = document.getElementById("score-area");
    var mainText = document.getElementById("main-text");
    var scoreText = document.getElementById("score-text");
    var userText = document.getElementById("user-text");
    var submit = document.getElementById("enter");
    var scores = [];

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

function highScores(){
    var scoreArea = document.getElementById("score-area");
    var highscoreArea = document.getElementById("highscores");
    var scoreList = document.getElementById("score-list");
    var textArea = document.createElement("li");
    var items = JSON.parse(localStorage.getItem("Scores"));

    scoreArea.style.display = "none";
    highscoreArea.style.display = "block";

    // console.log(typeof(items.length))
    // if(items.length == null){
    //     console.log(null)
    // }

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

var clear = document.getElementById("clear");
clear.addEventListener("click", function(event){
    localStorage.clear();
    highScores();
})

function timing(){
    var time = document.getElementById("time");
    time.innerHTML = "90" // need to fix the timer keep getting null
    // setInterval(function(){
    //     time.textContent = "Time: " + timeLeft;
    //     timeLeft--;
    // }, 1000);
}

function starting(){
    document.getElementById("main").style.display = "none";
    document.getElementById("question-area").style.display = "block";
    question();
    timing();
}

document.getElementById("start").addEventListener("click", starting);