let words = [];
let currentQuestion = 0;
let currentLanguage = "en";

const languageLabels = {
    en: {
        title: "Language Quiz",
        placeholder: 'Paste word pairs here, one per line, separated by " - "',
        startButton: "Start Quiz",
        startButtonLearn: "Start Learning",
        nextButton: "Next",
        questionText: "What is the word for ",
        darkModeText: "Dark Mode",
        selectLanguageText: "Language",
        alertMessage:
            "Please enter at least two valid word pairs separated by ' - '. ",
        quizOption: "Quiz",
        learningCardsOption: "Learning Cards",
        cardFrontText: "Front",
        cardBackText: "Back",
    },
    pl: {
        title: "Quiz Językowy",
        placeholder: 'Wklej pary słów, po parze w linii, oddzielone " - "',
        startButton: "Rozpocznij Quiz",
        startButtonLearn: "Rozpocznij Naukę",
        nextButton: "Następne",
        questionText: "Jak jest słowo ",
        darkModeText: "Tryb Ciemny",
        selectLanguageText: "Język",
        alertMessage:
            "Proszę wprowadź co najmniej dwie pary słów oddzielone ' - '.",
        quizOption: "Quiz",
        learningCardsOption: "Fiszki",
        cardFrontText: "Przód",
        cardBackText: "Tył",
    },
    es: {
        title: "Cuestionario de Idiomas",
        placeholder:
            'Pega aquí los pares de palabras, uno por línea, separados por " - "',
        startButton: "Iniciar cuestionario",
        startButtonLearn: "Iniciar aprendizaje",
        nextButton: "Siguiente",
        questionText: "¿Cuál es la palabra para ",
        darkModeText: "Modo Oscuro",
        selectLanguageText: "Idioma",
        alertMessage:
            "Por favor, introduce al menos dos pares de palabras válidos separados por ' - '.",
        quizOption: "Cuestionario",
        learningCardsOption: "Tarjetas de Aprendizaje",
        cardFrontText: "Frente",
        cardBackText: "Reverso",
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
    document.getElementById("start-button-learn").textContent =
        getTranslation("startButtonLearn");
    document.querySelector('button[onclick="nextQuestion()"]').textContent =
        getTranslation("nextButton");
    document.getElementById("darkModeText").textContent =
        getTranslation("darkModeText");
    document.getElementById("selectLanguageText").textContent =
        getTranslation("selectLanguageText");

    document.getElementById("quizOption").textContent =
        getTranslation("quizOption");
    document.getElementById("learningCardsOption").textContent = getTranslation(
        "learningCardsOption"
    );

    document.getElementById("cardFrontText").innerHTML =
        getTranslation("cardFrontText");
    document.getElementById("cardBackText").innerHTML =
        getTranslation("cardBackText");

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

// Event listener for quiz type selection
document.getElementById("mode").addEventListener("change", (event) => {
    const mode = event.target.value;
    if (mode === "quiz") {
        document.getElementById("learning-cards").style.display = "none";
        document.getElementById("start-button").style.display = "block";
        document.getElementById("start-button-learn").style.display = "none";
    } else {
        document.getElementById("learning-cards").style.display = "none";
        document.getElementById("start-button-learn").style.display = "block";
        document.getElementById("start-button").style.display = "none";
    }
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

function startLearning() {
    const wordList = document.getElementById("wordList").value;
    words = wordList
        .split("\n")
        .map((line) => {
            const [translatedWord, originalWord] = line.split(" - ");
            return { translatedWord, originalWord };
        })
        .filter((word) => word.originalWord && word.translatedWord);

    if (words.length > 1) {
        document.getElementById("learning-cards").style.display = "block";
        document.getElementById("wordList").style.display = "none";
        nextCard();
        const startButtonLearn = document.getElementById("start-button-learn");
        startButtonLearn.style.display = "none";
    } else {
        alert(getTranslation("alertMessage"));
    }
}

function nextQuestion() {
    document.getElementById("feedback").textContent = "";
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

function nextCard() {
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

    const card = document.querySelector(".card");
    card.querySelector(".card-front p").textContent = word.originalWord;
    card.querySelector(".card-back p").textContent = word.translatedWord;

    card.querySelector(".card-button").onclick = () => {
        card.classList.toggle("flipped");
        card.querySelector(".card-front").style.display =
            card.querySelector(".card-front").style.display === "none"
                ? "block"
                : "none";
        card.querySelector(".card-back").style.display =
            card.querySelector(".card-back").style.display === "none"
                ? "block"
                : "none";
    };
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
        document.getElementById("feedback").textContent = "Correct!";
    } else {
        answerElement.classList.add("incorrect");
        document.getElementById(
            "feedback"
        ).textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
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
