const start = document.querySelector('.start');
const restart = document.querySelector('.restart');
const question = document.querySelector('.question');
const cardContainer = document.querySelector('.card-container');
const score = document.querySelector('.score');

let state = 'welcome';
let currentQuestionIndex = 0;
let totalScore = 0;

start.addEventListener('click', () => {
    shuffleArray(questions);
    changeState('start');
});

function changeState(newState) {
    state = newState;
    if (state === 'start') {
        document.querySelector('.welcome-screen').style.display = 'none';
        document.querySelector('.quiz-container').style.display = 'block';
        displayQuestion();
    }
    if (state === 'finished') {
        document.querySelector('.quiz-container').style.display = 'none';
        document.querySelector('.results').style.display = 'block';
        score.innerText = `Your score is ${totalScore} out of ${questions.length}`;
    }
}

restart.addEventListener('click', () => {
    location.reload();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const questions = [
    { question: "Which email client has the most limited support for interactive elements?", options: ["Gmail", "Outlook", "Apple Mail", "Yahoo Mail"], answer: "Outlook" },
    { question: "Which CSS property is commonly used to create hover effects in interactive emails?", options: ["transition", "animation", "hover", "opacity"], answer: "hover" },
    { question: "Which interactive element is most commonly supported across email clients?", options: ["CSS hover effects", "JavaScript", "GIFs", "Embedded videos"], answer: "CSS hover effects" },
    { question: "Why is fallback content important in interactive emails?", options: ["It speeds up loading times", "It ensures emails work in unsupported clients", "It prevents spam filtering", "It reduces email size"], answer: "It ensures emails work in unsupported clients" },
    { question: "Which of these elements is NOT supported in most email clients?", options: ["CSS animations", "Embedded videos", "Interactive carousels", "Media queries"], answer: "Embedded videos" },
    { question: "What should you always include when using interactive elements?", options: ["Custom fonts", "A fallback experience", "Embedded JavaScript", "High-resolution images"], answer: "A fallback experience" }
];


function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    question.innerText = currentQuestion.question;

    // Shuffle the options before displaying
    let shuffledOptions = [...currentQuestion.options];
    shuffleArray(shuffledOptions); 


    shuffledOptions.forEach(option => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = option;
        cardContainer.appendChild(card);
    });
}

cardContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('card')) {
        const selectedAnswer = event.target.textContent;
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.answer) {
            event.target.classList.add('correct');
            cardContainer.style.pointerEvents = 'none';
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('incorrect');
            });
            totalScore++;
            setTimeout(() => {
                event.target.classList.remove('correct');
                currentQuestionIndex++;
                cardContainer.innerHTML = '';
                cardContainer.style.pointerEvents = 'auto';
                if (currentQuestionIndex < questions.length) {
                    displayQuestion();
                } else {
                    changeState('finished');
                }
                
            }, 1000);
        
        } else {
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('incorrect');
            });
            event.target.classList.add('incorrect');
            cardContainer.style.pointerEvents = 'none';
            setTimeout(() => {
                event.target.classList.remove('incorrect');
                currentQuestionIndex++;
                cardContainer.innerHTML = '';
                cardContainer.style.pointerEvents = 'auto';
                if (currentQuestionIndex < questions.length) {
                    displayQuestion();
                } else {
                    changeState('finished');
                }
                
            }, 1000);
        }
    }
});