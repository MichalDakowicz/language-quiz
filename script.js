// JavaScript (script.js)
let words = [];
let currentQuestion = 0;
let currentLanguage = "en";

const languageLabels = {
    en: {
        title: "Language Quiz",
        placeholder: 'Paste word pairs here, one per line, separated by " - "',
        startButton: "Start Quiz",
        nextButton: "Next",
        questionText: "What is the word for ",
        darkModeText: "Dark Mode",
        selectLanguageText: "Language",
        alertMessage:
            "Please enter at least two valid word pairs separated by ' - '. ",
    },
    pl: {
        title: "Quiz Językowy",
        placeholder: 'Wklej pary słów, po parze w linii, oddzielone " - "',
        startButton: "Rozpocznij Quiz",
        nextButton: "Następne",
        questionText: "Jak jest słowo ",
        darkModeText: "Tryb Ciemny",
        selectLanguageText: "Język",
        alertMessage:
            "Proszę wprowadź co najmniej dwie pary słów oddzielone ' - '.",
    },
    es: {
        title: "Cuestionario de Idiomas",
        placeholder:
            'Pega aquí los pares de palabras, uno por línea, separados por " - "',
        startButton: "Iniciar cuestionario",
        nextButton: "Siguiente",
        questionText: "¿Cuál es la palabra para ",
        darkModeText: "Modo Oscuro",
        selectLanguageText: "Idioma",
        alertMessage:
            "Por favor, introduce al menos dos pares de palabras válidos separados por ' - '.",
    },
};

function getTranslation(key) {
    return languageLabels[currentLanguage][key];
}

function updateLanguage() {
    document.title = getTranslation("title");
    document.querySelector("h1").textContent = getTranslation("title");
    document.getElementById("wordList").placeholder =
        getTranslation("placeholder");
    document.getElementById("start-button").textContent =
        getTranslation("startButton");
    document.querySelector('button[onclick="nextQuestion()"]').textContent =
        getTranslation("nextButton");
    document.getElementById("darkModeText").textContent =
        getTranslation("darkModeText");
    document.getElementById("selectLanguageText").textContent =
        getTranslation("selectLanguageText");

    if (document.getElementById("quiz").style.display === "block") {
        document.getElementById("question").textContent = `${getTranslation(
            "questionText"
        )}"${words[currentQuestion].originalWord}"?`;
    }
}

// Event listener for language selection
document.getElementById("language").addEventListener("change", (event) => {
    currentLanguage = event.target.value;
    updateLanguage();
});

function startQuiz() {
    const wordList = document.getElementById("wordList").value;
    words = wordList
        .split("\n")
        .map((line) => {
            const [translatedWord, originalWord] = line.split(" - ");
            return { translatedWord, originalWord };
        })
        .filter((word) => word.originalWord && word.translatedWord);

    if (words.length > 1) {
        document.getElementById("quiz").style.display = "block";
        document.getElementById("wordList").style.display = "none";
        nextQuestion();
        const startButton = document.getElementById("start-button");
        startButton.style.display = "none";
    } else {
        alert(getTranslation("alertMessage"));
    }
}

function nextQuestion() {
    let word;
    do {
        currentQuestion = Math.floor(Math.random() * words.length);
        word = words[currentQuestion];
    } while (
        !word.originalWord ||
        !word.originalWord.trim() ||
        !word.translatedWord ||
        !word.translatedWord.trim()
    );

    document.getElementById("question").textContent = `${getTranslation(
        "questionText"
    )}"${word.originalWord}"?`;

    let answers = [...words];
    const correctIndex = answers.indexOf(word);
    answers.splice(correctIndex, 1);
    answers = shuffle(answers).slice(0, 2);
    answers.push(word);
    answers = shuffle(answers);

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

updateLanguage();
