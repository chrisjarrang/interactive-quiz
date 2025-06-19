const start = document.querySelector('.start');
const restart = document.querySelector('.restart');
const question = document.querySelector('.question');
const cardContainer = document.querySelector('.card-container');
const score = document.querySelector('.score');

let state = 'welcome';
let currentQuestionIndex = 0;
let totalScore = 0;
let CodeSnippet = ""

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
  {
    question: "What makes an email 'interactive'?",
    options: [
      "It contains embedded video",
      "It lets users perform actions within the email itself",
      "It links to an external landing page",
      "It includes JavaScript animations"
    ],
    answer: "It lets users perform actions within the email itself"
  },
  {
    question: "Why is JavaScript not used in most email clients?",
    options: [
      "It increases email size",
      "It causes layout issues",
      "It poses a security risk",
      "It slows down rendering"
    ],
    answer: "It poses a security risk"
  },
  {
    question: "Which three things must be supported for checkbox-based interactivity to work?",
    options: [
      "Media queries, `<form>`, and `:hover`",
      "`<input>`, `:checked`, and sibling selectors (`+` / `~`)",
      "`<script>`, `onclick`, and `<button>`",
      "ARIA roles, tab index, and `<span>` elements"
    ],
    answer: "`<input>`, `:checked`, and sibling selectors (`+` / `~`)"
  },
  {
    question: "Why is fallback content important in interactive emails?",
    options: [
      "It reduces bounce rate",
      "It ensures the email renders in clients that don't support interactivity",
      "It improves loading speed",
      "It makes the email mobile-friendly"
    ],
    answer: "It ensures the email renders in clients that don't support interactivity"
  },
  {
    question: "Which email client has the most limited support for interactive elements?",
    options: ["Gmail", "Outlook", "Apple Mail", "Yahoo Mail"],
    answer: "Outlook"
  },
  {
    question: "Which CSS selector is used to display content when a checkbox is checked?",
    options: [
      ":focus",
      ":hover",
      ":active",
      ":checked"
    ],
    answer: ":checked"
  },
  {
    question: "Which accessibility consideration is most relevant when using hidden checkboxes?",
    options: [
      "Using `aria-hidden=\"true\"` on fallback content",
      "Ensuring the interactive elements are keyboard accessible",
      "Adding scrollable divs to contain checkboxes",
      "Using only decorative labels"
    ],
    answer: "Ensuring the interactive elements are keyboard accessible"
  },
  {
    question: "What is the purpose of `display: none !important;` on checkboxes in interactive email?",
    options: [
      "To reduce CSS specificity issues",
      "To prevent interaction",
      "To hide them visually but still allow functionality",
      "To stop them from being read by screen readers"
    ],
    answer: "To hide them visually but still allow functionality"
  },
  {
    question: "Which of the following would improve accessibility in interactive emails?",
    options: [
      "Relying on hover effects only",
      "Adding ARIA labels and descriptive text",
      "Using inline JavaScript for interactions",
      "Disabling all interactivity"
    ],
    answer: "Adding ARIA labels and descriptive text"
  },
  {
    question: "What should you always include when using interactive elements?",
    options: [
      "Custom fonts",
      "A fallback experience",
      "Embedded JavaScript",
      "High-resolution images"
    ],
    answer: "A fallback experience"
  }
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