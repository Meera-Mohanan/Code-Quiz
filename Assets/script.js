let startButtonEl = document.querySelector('.start-game');
let submitButtonEl = document.querySelector('.submitButton');
let timerEl = document.querySelector('.timer');
let mainEl = document.querySelector('#questionContainer');
let contentEl = document.querySelector('.content');
let gameOverEl = document.querySelector('#gameOverContainer');
let scoreListEl = document.querySelector('#scoreList');
let backButtonEl = document.querySelector('.backButton');
let clearButtonEl = document.querySelector('.clearButton');
let secondsLeft = 60;
let qIndex = 0;

let highscoresBtn = document.getElementById('highscoresBtn')

let usersScores = JSON.parse(localStorage.getItem('score')) || []

const myQuestions= [
    {
        question:"Where is the correct place to insert a JavaScript?",
        answers : ['The<head> section','Both the <head> section and the <body> section are correct','The <bosy> section'],
        correctAnswer : 'Both the <head> section and the <body> section are correct  '
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: ['funtion:myFunction()','function myFunction()','function = myFunction()'],
        correctAnswer : 'function myFunction()'
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: ['if i==5 then','if i=5','if (i==5)','if i = 5 then'],
        correctAnswer : 'if (i == 5)'
    },
    {
        question: "How does a WHILE loop start?",
        answers: ['while i = 1 to 10','while (i<=10;i++)','while(i<=10)'],
        correctAnswer : 'while (i <= 10)'
    }
]

var timerInterval;
startButtonEl.addEventListener('click', function () {
    secondsLeft =60;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = ("Time " + secondsLeft);

        if (secondsLeft === 0) {
            gameOver()
        }

    }, 1000);
    document.querySelector('.container').classList.add('hidden')
    mainEl.classList.remove('hidden')
    presentQuestion();
})

function presentQuestion() {
    mainEl.innerHTML = ''
    // create the element to display the question
    var title = document.createElement('h1')
    // add the question to the element
    title.textContent = myQuestions[qIndex].question;
    // create a container for our buttons
    var buttonContainer = document.createElement('div')
    // add the choices to EACH button

    for (let i = 0; i < myQuestions[qIndex].answers.length; i++) {

        // create button El
        // add
        // append
        let buttonAnswer = document.createElement('button')
        buttonAnswer.textContent = myQuestions[qIndex].answers[i]
        buttonAnswer.setAttribute('value', myQuestions[qIndex].answers[i])
        buttonAnswer.addEventListener('click', click)
        buttonContainer.append(buttonAnswer)
    }

    // append all created elements to the question container
    mainEl.append(title, buttonContainer)
}
//
function click() {
    console.log(this.value);
    if (this.value !== myQuestions[qIndex].correctAnswer) {
        secondsLeft -= 10;
        timerEl.textContent = ("Time " + secondsLeft);
    }
    qIndex++
    if (qIndex === myQuestions.length) {
        gameOver()
    } else {

        presentQuestion()
    }

}
let highScore = '';
function gameOver() {
    clearInterval(timerInterval);
    // hide the question container
    mainEl.classList.add("hidden");
    // show the final container
    gameOverEl.classList.remove("hidden");
    //add score
    let finalScore = document.querySelector(".finalScore");
    finalScore.textContent += "Your final score is " + secondsLeft + ". Enter initials below:";
    //store high score data

    submitButtonEl.addEventListener('click', function () {
        let initals = document.querySelector(".highScore").value;

        let finalScoreObj = {
            user: initals,
            score: secondsLeft
        }
        usersScores.push(finalScoreObj)
        localStorage.setItem('score', JSON.stringify(usersScores))
        submitScore()
    })

    //add functionality to submit button - take to high score

}

function submitScore() {
    document.querySelector('.container').classList.add('hidden')
    gameOverEl.classList.add("hidden");
    scoreListEl.classList.remove("hidden");
    // let scoreKey = localStorage.getItem('score');
    // console.log(scoreKey)
    let scoresList = document.querySelector(".scoresList");
    // scoresList.textContent += scoreKey + "-" + secondsLeft;
const orderedList = document.createElement('ol')
    for (let i = 0; i < usersScores.length; i++) {
       const li = document.createElement('li')

       li.textContent = usersScores[i].user + '-' + usersScores[i].score
        orderedList.append(li)
    }
scoresList.append(orderedList)
    backButtonEl.addEventListener('click', function () {
        location.reload();
    })
    clearButtonEl.addEventListener('click', function () {
        scoresList.innerHTML = "";
    })
}

highscoresBtn.addEventListener('click', submitScore)