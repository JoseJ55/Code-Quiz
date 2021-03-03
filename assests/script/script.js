var questions = [
    {
    question : "Commonly used data types.",
    answers : ["strings", "bololeans", "alerts", "numbers"],
    answer : "alerts"
    },
    {
    question : "2",
    answers : ["1", "bololeans", "alerts", "numbers"],
    answer : "alerts"
    },
    {
    question : "3",
    answers : ["strings", "bololeans", "alerts", "numbers"],
    answer : "alerts"
    },
    {
    question : "4",
    answers : ["strings", "bololeans", "alerts", "numbers"],
    answer : "alerts"
    }
];

var currentIndex = 0;
var quizScore = 0;
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
    
    // document.btn.removeChild(btn);
    question();
}

function score(){
    console.log("end")
    var questionArea = document.getElementById("question-area");
    var scoreArea = document.getElementById("score-area");
    var mainText = document.getElementById("main-text");
    var scoreText = document.getElementById("score-text");
    var userText = document.getElementById("user-text");

    mainText.innerHTML = "You have finished the quiz.\n"
    scoreText.innerHTML = "You got " + quizScore + " correct out of " + questions.length + " questions correct.";

    questionArea.style.display = "none";
    scoreArea.style.display = "block";
// need to add input and score to localstorage and still need to figer out how to change questions correctly

}

function starting(){
    document.getElementById("main").style.display = "none";
    document.getElementById("question-area").style.display = "block";
    question();
}

document.getElementById("start").addEventListener("click", starting);