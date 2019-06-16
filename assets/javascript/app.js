let questionsSet = [
    {
        question: 'Which team was the champion of "The International Dota 2 2011" ?',
        possibleAnswers: ["Team Liquid", "Natus Vincere", "Alliance", "Wings Gaming"],
        correctAnswer: "Natus Vincere"
    },
    {
        question: 'Who was not the one of the team memebers of Natus Vincere?',
        possibleAnswers: ['Dendi', 'Kuroky', 'Puppy', 'Midone'],
        correctAnswer: 'Midone'
    },
    {
        question: 'In which month,is "The International Dota 2" main event held?',
        possibleAnswers: ['May', 'June', 'July', 'August'],
        correctAnswer: 'August'
    },
    {
        question: 'How many times have "Natus Vincere" reached the Final of "The International Dota 2"?',
        possibleAnswers: ['1', '2', '3', '4'],
        correctAnswer: '3'
    },
    {
        question: 'Where was the first "The International Dota 2" held?',
        possibleAnswers: ['US', 'China', 'Russia', 'Germany'],
        correctAnswer: 'Germany'
    },
    {
        question: 'Which team won "The International Dota 2"?',
        possibleAnswers: ['Fnatic', 'Team Secret', 'Team liquid', 'Virtus Pro'],
        correctAnswer: 'Team liquid'
    },
    {
        question: 'Which team leader is Kuroky',
        possibleAnswers: ["Team Liquid", "Natus Vincere", "Alliance", "Wings Gaming"],
        correctAnswer: 'Team Liquid'
    },
    {
        question: 'Which team is sponsored by French football giants Paris Saint-Germain?',
        possibleAnswers: ['Fnatic', 'PSG.LGD', 'Team Secret', 'Natus Vincere'],
        correctAnswer: 'PSG.LGD'
    }
];

let count = 0;
var countTimel;

let correctGifs = ["https://media.giphy.com/media/q5J2HfnH8mCvS/giphy.gif", "https://media.giphy.com/media/Qxz40buD1w6UE/giphy.gif", "https://media.giphy.com/media/4Yn70mra350is/giphy.gif"];
let wrongGifs = ["https://media.giphy.com/media/zG6MKhlBxIloc/giphy.gif", "https://media.giphy.com/media/etwLaqxWP5z2tSQ5Cw/giphy.gif", "https://media.giphy.com/media/5eG28RENYdnMrrHuwq/giphy.gif"];

let showCorrectGifs = [...correctGifs];
let showWrongGifs = [...wrongGifs];

let startBtn = document.getElementById('start');
let timer = document.getElementById('timer');
let timeCounter = document.getElementById('time-counter');

let questionsAnswers = document.getElementById('question-answer');
let questions = document.getElementById('questions');
let answers = document.getElementById('answers');

let result = document.getElementById('result');
let animatedGif = document.getElementById('animated-gif');

let currentQuestionSet;
let givenTime = 30;
let checkAnswer;
let timeCheck = false;
let countTrue = 0;

function counter() {
    timeCounter.textContent = givenTime + " seconds";
    countTime = setInterval(function(){
        givenTime--;
        timeCounter.textContent = givenTime + " seconds";
        if(givenTime === 0) {
            clearInterval(countTime);
            timeCheck = true;
            
            showResult()
        };
    },1000);
};

function showQuestionAndPossibleAnswers() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    };
    while (animatedGif.firstChild) {
        animatedGif.removeChild(animatedGif.firstChild);
    };
    let questionP = document.createElement('p');
    let ul = document.createElement('ul');
    currentQuestionSet = questionsSet[count];
    questions.innerHTML = `<p>${currentQuestionSet.question}</p>`;
    questions.appendChild(questionP);
    ul.classList = 'possible-answers gif';
    for(let i = 0; i < questionsSet[count].possibleAnswers.length; i++){
        let li = document.createElement('p');
        li.className= 'answer';
        li.textContent = questionsSet[count].possibleAnswers[i];
        ul.appendChild(li);
    };
    answers.appendChild(ul);
    count++;
    
};

function checkingAnswer() {
    answers.addEventListener('click', function(e) {
        e.preventDefault();
        if(e.target.textContent === currentQuestionSet.correctAnswer) {
            checkAnswer = true;
        } else {
            checkAnswer = false;
        }
        clearInterval(countTime);
        showResult();
    });
};

function showGif(gifs, gifsSource) {
    if(gifs.length === 0) {
        gifs = Array.from(gifsSource);
        console.log(gifs.length);
    }
    
    let img = document.createElement('img');
    let random = Math.floor(Math.random() * gifs.length);
    img.className = 'gif';
    img.src = gifs[random];
    animatedGif.append(img);
    gifs.splice(random, 1);
};

function showResult() {
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    };
    while (questions.firstChild) {
        questions.removeChild(questions.firstChild);
    };

    if(checkAnswer) {
        countTrue++;
        result.textContent = "Correct!!!";
        showGif(showCorrectGifs, correctGifs);

        var showNextQuestion = setInterval(function() {
                givenTime = 30;
                counter();
                showQuestionAndPossibleAnswers();
                clearInterval(showNextQuestion);
                
            }, 5000);

    } else if(!checkAnswer) {
        result.textContent = "The correct answer is " + currentQuestionSet.correctAnswer;
        showGif(showWrongGifs, wrongGifs);
        var showNextQuestion = setInterval(function() {
                givenTime = 30;
                counter();
                showQuestionAndPossibleAnswers();
                clearInterval(showNextQuestion);
            }, 5000);
    } else if(timeCheck){
        result.innerHTML = `<p>Time Out!!</p>`;
        showGif(showWrongGifs, wrongGifs);
        var showNextQuestion = setInterval(function() {
            givenTime = 30;
            counter();
            showQuestionAndPossibleAnswers();
            clearInterval(showNextQuestion);
        }, 5000);
    };
};







function showQuestions(e) {
    e.preventDefault();
    startBtn.remove();
    timer.style.display = "inline-block";
    counter();
    showQuestionAndPossibleAnswers();
    checkingAnswer();
};

startBtn.addEventListener('click',showQuestions);




