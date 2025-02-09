const sentences = [
    "Typing fast requires practice and patience",
    "The longest love poem in the world is Luceafarul",
    "Excellence is not an act, it is a habit",
];

let currentSentence = "";
let timeLeft = 60;
let timerInterval;
let wordsCorrect = 0;
let isTestRunning = false;

function startTest() {
    wordsCorrect = 0;
    timeLeft = 60;
    isTestRunning = true;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
    document.getElementById("result").textContent = "";
    document.getElementById("typing-area").value = "";
    document.getElementById("typing-area").disabled = false;
    document.getElementById("typing-area").style.backgroundColor = ""; 
    document.getElementById("typing-area").focus();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    generateNewSentence();
}

function updateTimer() {
    --timeLeft;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        isTestRunning = false;
        document.getElementById("typing-area").disabled = true;
        document.getElementById("result").textContent = `Words typed correctly: ${wordsCorrect}`;
    }
}

function generateNewSentence() {
    if (!isTestRunning) {
        return;
    }
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("text-display").textContent = currentSentence;
    document.getElementById("typing-area").value = "";
    document.getElementById("typing-area").style.backgroundColor = ""; 
}

function highlightCorrectText() {
    const inputText = document.getElementById("typing-area").value;
    let highlightedSentence = '';
    for (let i = 0; i < currentSentence.length; i++) {
        if (i < inputText.length) {
            if (inputText[i] === currentSentence[i]) {
                highlightedSentence += `<span style="color: green">${currentSentence[i]}</span>`;
            } else {
                highlightedSentence += `<span style="color: red">${currentSentence[i]}</span>`;
            }
        } else {
            highlightedSentence += currentSentence[i];
        }
    }
    document.getElementById("text-display").innerHTML = highlightedSentence;
}

function checkTyping() {
    const inputText = document.getElementById("typing-area").value.trim();
    if (inputText === currentSentence) {
        wordsCorrect += inputText.split(" ").length;
        generateNewSentence();
    } else {
        highlightCorrectText();
    }
}

document.getElementById("typing-area").addEventListener("input", checkTyping);
document.getElementById("start-btn").addEventListener("click", startTest);