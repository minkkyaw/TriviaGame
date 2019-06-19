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
        question: 'Which team leader is Kuroky?',
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
let countTrue = 0;
var countTime;

let correctGifs = ["https://media.giphy.com/media/q5J2HfnH8mCvS/giphy.gif", "https://media.giphy.com/media/Qxz40buD1w6UE/giphy.gif", "https://media.giphy.com/media/4Yn70mra350is/giphy.gif"];
let wrongGifs = ["https://media.giphy.com/media/zG6MKhlBxIloc/giphy.gif", "https://media.giphy.com/media/etwLaqxWP5z2tSQ5Cw/giphy.gif", "https://media.giphy.com/media/5eG28RENYdnMrrHuwq/giphy.gif"];

let showCorrectGifs = [...correctGifs];
let showWrongGifs = [...wrongGifs];

let startBtn = document.getElementById('start');
let timer = document.getElementById('timer');
let firstNum = document.getElementById('first-num');
let secondNum = document.getElementById('second-num');

let questionsAnswers = document.getElementById('question-answer');
let questions = document.getElementById('questions');
let answers = document.getElementById('answers');
let answerList = document.getElementById('answer-list');

let result = document.getElementById('result');
let incorrectAnswers = document.getElementById('incorrect-answers');
let animatedGif = document.getElementById('animated-gif');

let resetBtn = document.getElementById('reset');

let currentQuestionSet;
let givenTime = 20;
let checkAnswer;
let timeCheck = false;
let delayTime = 3000;
let clearWarning;
let wrongQues = [];


function counter() {
    firstNum.textContent = "2";
    secondNum.textContent = givenTime % 10;
    countTime = setInterval(function(){
        givenTime--;
        if(givenTime === 0) {
            firstNum.textContent = "0";
            secondNum.textContent = givenTime % 10;
            clearInterval(countTime);
            timeCheck = true;
            showResult();
        } else if(givenTime < 10) {
            firstNum.textContent = "0";
            secondNum.textContent = givenTime % 10;
            if(givenTime === 5) {
                timer.classList = 'timer warning';
                setTimeout(function() {
                    timer.classList = 'timer';
                },5000);
            }
        } else if(givenTime < 20) {
            firstNum.textContent = "1";
            secondNum.textContent = givenTime % 10;
        }
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
    currentQuestionSet = questionsSet[count];
    questions.innerHTML = `<p class="question">${currentQuestionSet.question}</p>`;
    questions.appendChild(questionP);

    for(let i = 0; i < questionsSet[count].possibleAnswers.length; i++){
        let li = document.createElement('p');
        li.className= 'answer';
        li.textContent = questionsSet[count].possibleAnswers[i];
        answerList.appendChild(li);
    };
    count++;
};

function checkingAnswer() {
    answerList.addEventListener('click', function(e) {
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
        gifs = [...gifsSource];
    }
        console.log(gifs.length);
    let img = document.createElement('img');
    let random = Math.floor(Math.random() * gifs.length);
    img.className = 'gif';
    img.src = gifs[random];
    animatedGif.append(img);
    gifs.splice(random, 1);
};

function finalResult(interval) {
    if(count === 8) {
        givenTime = 20;
        setTimeout(function() {
            clearInterval(countTime);
            while (animatedGif.firstChild) {
                animatedGif.removeChild(animatedGif.firstChild);
            };
            result.className = 'result';
            result.innerHTML = `<p>Number of correct answers : ${countTrue}</p><p>Number of incorrect answers : ${count-countTrue}<\p>`;  
            if(wrongQues.length === 0) {
                let quesP = document.createElement('div');
                quesP.innerHTML = `<p>"You answered all questions correctly!!!"</p>`;
                incorrectAnswers.appendChild(quesP);
            } else {
                for(let i = 0; i < wrongQues.length; i++) {
                    let newDiv = document.createElement('div');
                    let quesP = document.createElement('div');
                    let ansP = document.createElement('div');
                    if( i === 0) {
                        quesP.innerHTML = `<p style="text-decoration: underline">Question<p><p>${wrongQues[i].question}</p>`;
                    } else {
                        quesP.innerHTML = `<hr><p style="text-decoration: underline">Question<p><p>${wrongQues[i].question}</p>`;
                    };
                    ansP.innerHTML = `<p style="text-decoration: underline">Answer<p><p>${wrongQues[i].correctAnswer}</p>`;
                    newDiv.appendChild(quesP).appendChild(ansP);
                    incorrectAnswers.appendChild(newDiv);
                }
            
            };
            incorrectAnswers.className = "incorrect-answers";
            resetBtn.style.display = "block";
            count = 0;
        }, delayTime);
    } else {
        givenTime = 20;
        result.classList = '';
        counter();
        showQuestionAndPossibleAnswers();
    };
};

function nextQuestion() {
    var showNextQuestion = setTimeout(function() {
        clearInterval(countTime);
        finalResult(showNextQuestion);
    }, delayTime);
}

function showResult() {
    while (answerList.firstChild) {
        answerList.removeChild(answerList.firstChild);
    };
    while (questions.firstChild) {
        questions.removeChild(questions.firstChild);
    };

    if(timeCheck) {
        wrongQues.push(currentQuestionSet);
        console.log(wrongQues);
        timeCheck = false;
        result.className = 'result';
        result.textContent = "Time Out!!The correct answer is " + currentQuestionSet.correctAnswer + ".";
        showGif(showWrongGifs, wrongGifs);
        nextQuestion();
    } else if(!checkAnswer) {
        checkAnswer='';
        wrongQues.push(currentQuestionSet);
        console.log(wrongQues);
        result.className = 'result';
        result.textContent = "The correct answer is " + currentQuestionSet.correctAnswer;
        showGif(showWrongGifs, wrongGifs);
        nextQuestion();
    } else if(checkAnswer){
        console.log(wrongQues);
        checkAnswer='';
        countTrue++;
        result.className = 'result';
        result.textContent = "Correct!!!";
        showGif(showCorrectGifs, correctGifs);
        nextQuestion();
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

function resetData(e) {
    e.preventDefault();
    wrongQues = [];
    countTrue = 0;
    currentQuestionSet;
    checkAnswer;
    timeCheck = false;
    resetBtn.style.display = "none";
    result.classList = '';
    timer.style.display = "inline-block";
    incorrectAnswers.innerHTML = "";
    incorrectAnswers.classList.remove("incorrect-answers");
    counter();
    showQuestionAndPossibleAnswers();
};

startBtn.addEventListener('click', showQuestions);
resetBtn.addEventListener('click', resetData);

