let words = [];
let currentQuestion = 0;

function startQuiz() {
    const wordList = document.getElementById("wordList").value;
    words = wordList.split("\n").map((line) => {
        const [translatedWord, originalWord] = line.split(" - ");
        return { translatedWord, originalWord };
    });

    if (words.length > 1) {
        document.getElementById("quiz").style.display = "block";
        document.getElementById("wordList").style.display = "none";
        nextQuestion();
        const startButton = document.getElementById("start-button");
        startButton.style.display = "none";
    } else {
        alert("Please enter at least two word pairs.");
    }
}

function nextQuestion() {
    currentQuestion = Math.floor(Math.random() * words.length);
    const word = words[currentQuestion];

    document.getElementById(
        "question"
    ).textContent = `What is the word for "${word.originalWord}"?`;

    // Improved answer generation
    let answers = [...words]; // Copy all words
    const correctIndex = answers.indexOf(word);
    answers.splice(correctIndex, 1); // Remove the correct answer
    answers = shuffle(answers).slice(0, 2); // Take 2 random incorrect answers
    answers.push(word); // Add the correct answer back
    answers = shuffle(answers); // Shuffle again to randomize position

    displayAnswers(answers);
}

function displayAnswers(answers) {
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    answers.forEach((answer) => {
        const answerElement = document.createElement("div");
        answerElement.classList.add("answer");
        answerElement.textContent = answer.translatedWord;
        answerElement.onclick = () =>
            checkAnswer(answer.translatedWord, answerElement);
        answersDiv.appendChild(answerElement);
    });
}

function checkAnswer(selectedAnswer, answerElement) {
    const correctAnswer = words[currentQuestion].translatedWord;

    const answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((el) => (el.onclick = null));

    if (selectedAnswer === correctAnswer) {
        answerElement.classList.add("correct");
    } else {
        answerElement.classList.add("incorrect");
        document.querySelectorAll(".answer").forEach((el) => {
            if (el.textContent === correctAnswer) {
                el.classList.add("correct");
            }
        });
    }

    document.querySelector("button[onclick='nextQuestion()']").style.display =
        "block";
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const toggle = document.getElementById("darkModeToggle");
const body = document.body;

toggle.addEventListener("change", (event) => {
    if (event.target.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }
});
