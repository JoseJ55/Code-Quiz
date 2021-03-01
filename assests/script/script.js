var questions = [
    {
    question : "Commonly used data types.",
    answers : ["strings", "bololeans", "alerts", "numbers"],
    answer : "alerts"
    },
    {
    question : "2",
    answers : ["strings", "bololeans", "alerts", "numbers"],
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

function question(){
    var currentQuestion = questions[currentIndex];
    var question_text = document.getElementById("question-text");

    question_text.textContent = currentQuestion.question;

    for(var i = 0; i < currentQuestion.answers.length; i++){
        var answerButton = document.createElement("BUTTON");
        answerButton.className = "btn" + currentIndex;
        
        answerButton.innerHTML = i + 1 + ". " + currentQuestion.answers[i];

        var area = document.getElementById("answer-area")
        var btnStyle = "margin:1vh 5vw; font-size: 100%; text-align: left; padding: 0 2vw;";

        area.appendChild(answerButton).value = currentQuestion.answers[i];
        area.appendChild(answerButton).style.cssText = btnStyle;
        //appendchild method
        // you need event listner added to these buttons
        answerButton.addEventListener("click", checkAnswer);
    }
}// need to connect the check answers to amke sure the value in the button click is correct.

function checkAnswer(event){
    currentIndex++
    var area = document.getElementById("answer-area");
    var checked = document.createElement("P");

    if(event.target.value == questions[currentIndex].answer){
        area.append(document.createElement("BR"))
        // area.append(checked).innerHTML = "Correct";
    }
    else{
        console.log("wrong")
    }

    question();
}

function starting(){
    document.getElementById("main").style.display = "none";
    document.getElementById("question-area").style.display = "block";
    question();
}

document.getElementById("start").addEventListener("click", starting);