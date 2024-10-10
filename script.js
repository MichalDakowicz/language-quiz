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
        selectModeText: "Select Mode",
        quizOption: "Quiz",
        learningCardsOption: "Learning Cards",
        typingModeText: "Typing Mode",
        answerTypingText: "Check Answer",
        nextButtonText: "Next",
        nextCardButton: "Next Card",
        cardFrontText: "Front",
        cardBackText: "Back",

        correctAnswer: "Correct!",
        incorrectAnswer: "Incorrect. The correct answer is ",
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
        selectModeText: "Wybierz Tryb",
        quizOption: "Quiz",
        learningCardsOption: "Fiszki",
        typingModeText: "Tryb Pisania",
        answerTypingText: "Sprawdź Odpowiedź",
        nextButtonText: "Następne",
        nextCardButton: "Następna Fiszka",
        cardFrontText: "Przód",
        cardBackText: "Tył",

        correctAnswer: "Poprawnie!",
        incorrectAnswer: "Niepoprawnie. Poprawna odpowiedź to ",
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
        selectModeText: "Seleccionar Modo",
        quizOption: "Cuestionario",
        learningCardsOption: "Tarjetas de Aprendizaje",
        typingModeText: "Modo de Escritura",
        answerTypingText: "Comprobar Respuesta",
        nextButtonText: "Siguiente",
        nextCardButton: "Siguiente Tarjeta",
        cardFrontText: "Frente",
        cardBackText: "Reverso",

        correctAnswer: "¡Correcto!",
        incorrectAnswer: "Incorrecto. La respuesta correcta es ",
    },
    fr: {
        title: "Quiz de Langue",
        placeholder:
            'Collez ici les paires de mots, une par ligne, séparées par " - "',
        startButton: "Démarrer le quiz",
        startButtonLearn: "Commencer l'apprentissage",
        nextButton: "Suivant",
        questionText: "Quel est le mot pour ",
        darkModeText: "Mode Sombre",
        selectLanguageText: "Langue",
        alertMessage:
            "Veuillez entrer au moins deux paires de mots valides séparés par ' - '.",
        selectModeText: "Sélectionner le Mode",
        quizOption: "Quiz",
        learningCardsOption: "Cartes d'Apprentissage",
        typingModeText: "Mode d'Écriture",
        answerTypingText: "Vérifier la Réponse",
        nextButtonText: "Suivant",
        nextCardButton: "Carte Suivante",
        cardFrontText: "Face",
        cardBackText: "Dos",

        correctAnswer: "Correct !",
        incorrectAnswer: "Incorrect. La réponse correcte est ",
    },
    de: {
        title: "Sprachquiz",
        placeholder:
            'Füge hier Wortpaare ein, eins pro Zeile, getrennt durch " - "',
        startButton: "Quiz starten",
        startButtonLearn: "Lernen starten",
        nextButton: "Nächste",
        questionText: "Was ist das Wort für ",
        darkModeText: "Dunkelmodus",
        selectLanguageText: "Sprache",
        alertMessage:
            "Bitte gib mindestens zwei gültige Wortpaare ein, getrennt durch ' - '.",
        selectModeText: "Modus auswählen",
        quizOption: "Quiz",
        learningCardsOption: "Lernkarten",
        typingModeText: "Schreibmodus",
        answerTypingText: "Antwort überprüfen",
        nextButtonText: "Nächste",
        nextCardButton: "Nächste Karte",
        cardFrontText: "Vorderseite",
        cardBackText: "Rückseite",

        correctAnswer: "Richtig!",
        incorrectAnswer: "Falsch. Die richtige Antwort ist ",
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
    document.getElementById("select-mode-text").textContent =
        getTranslation("selectModeText");
    document.getElementById("typing-mode-text").textContent =
        getTranslation("typingModeText");
    document.getElementById("next-button-typing").textContent =
        getTranslation("nextButtonText");
    document.getElementById("answer-typing-button").textContent =
        getTranslation("answerTypingText");

    document.getElementById("cardFrontText").innerHTML =
        getTranslation("cardFrontText");
    document.getElementById("cardBackText").innerHTML =
        getTranslation("cardBackText");
    document.getElementById("next-card-button").textContent =
        getTranslation("nextCardButton");

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
        document.getElementById("typing-mode-box").style.display = "block";
    } else {
        document.getElementById("learning-cards").style.display = "none";
        document.getElementById("start-button-learn").style.display = "block";
        document.getElementById("start-button").style.display = "none";
        document.getElementById("typing-mode-box").style.display = "none";
        document.getElementById("typing-mode").checked = false;
    }
});

function startQuiz() {
    document.getElementById("quiz-options-box").style.display = "none";

    const checkTypingMode = document.getElementById("typing-mode").checked;
    const wordList = document.getElementById("wordList").value;
    words = wordList
        .split("\n")
        .map((line) => {
            const [translatedWord, originalWord] = line.split(" - ");
            return { translatedWord, originalWord };
        })
        .filter((word) => word.originalWord && word.translatedWord);

    if (words.length > 1) {
        if (!checkTypingMode) {
            document.getElementById("quiz").style.display = "block";
            document.getElementById("wordList").style.display = "none";
            nextQuestion();
            const startButton = document.getElementById("start-button");
            startButton.style.display = "none";
        } else {
            document.getElementById("typing-quiz").style.display = "block";
            document.getElementById("wordList").style.display = "none";
            const startButton = document.getElementById("start-button");
            startButton.style.display = "none";
            nextQuestionTyping();
        }
    } else {
        alert(getTranslation("alertMessage"));
    }
}

function startLearning() {
    document.getElementById("quiz-options-box").style.display = "none";

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

function nextQuestionTyping() {
    document.getElementById("feedback-typing").textContent = "";
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

    document.getElementById("question-typing").textContent = `${getTranslation(
        "questionText"
    )}"${word.originalWord}"?`;

    document.getElementById("answer-typing").value = "";
    document.getElementById("answer-typing").focus();
    document.getElementById("answer-typing").select();
}

function checkAnswerTyping() {
    const answer = document.getElementById("answer-typing").value;
    const correctAnswer = words[currentQuestion].translatedWord;

    answer.trim();
    answer.toLowerCase();

    correctAnswer.trim();
    correctAnswer.toLowerCase();

    if (answer === correctAnswer) {
        document.getElementById("feedback-typing").textContent =
            getTranslation("correctAnswer");
    } else {
        document.getElementById(
            "feedback-typing"
        ).textContent = `${getTranslation(
            "incorrectAnswer"
        )}"${correctAnswer}".`;
    }
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
    card.classList.remove("flipped"); // Ensure the card is unflipped
    card.querySelector(".card-front").style.display = "block";
    card.querySelector(".card-back").style.display = "none";
    card.querySelector(".card-front p").textContent = word.originalWord;
    card.querySelector(".card-back p").textContent = word.translatedWord;
}

function flipCard() {
    const card = document.querySelector(".card");
    card.classList.toggle("flipped");
    card.querySelector(".card-front").style.display =
        card.querySelector(".card-front").style.display === "none"
            ? "block"
            : "none";
    card.querySelector(".card-back").style.display =
        card.querySelector(".card-back").style.display === "none"
            ? "block"
            : "none";
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
        document.getElementById("feedback").textContent =
            getTranslation("correctAnswer");
    } else {
        answerElement.classList.add("incorrect");
        document.getElementById("feedback").textContent = `${getTranslation(
            "incorrectAnswer"
        )}"${correctAnswer}".`;
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

document.getElementById("answer-typing").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswerTyping();
    }
});

updateLanguage();
