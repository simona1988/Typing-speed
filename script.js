const TIMER_INTERVAL = 1000;

const sentences = [
    "Typing fast requires practice and patience",
    "The longest love poem in the world is Luceafarul",
    "Excellence is not an act, it is a habit",
];

let currentSentence = "";
let timeLeft = 60;
let timerInterval;
let correctWords = 0;
let isTestRunning = false;

const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const typingArea = document.getElementById("typing-area");
const textDisplay = document.getElementById("text-display");
const startButton = document.getElementById("start-btn");

function startTest() {
    correctWords = 0;
    timeLeft = 60;
    isTestRunning = true;   
    timerElement.textContent = `Time: ${timeLeft}s`;
    resultElement.textContent = "";   
    typingArea.value = "";
    typingArea.disabled = false;
    typingArea.style.backgroundColor = ""; 
    typingArea.focus();   
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, TIMER_INTERVAL);   
    setNewSentence();
}

function updateTimer() {
    --timeLeft;
    timerElement.textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        isTestRunning = false;
        typingArea.disabled = true;
        resultElement.textContent = `Words typed correctly: ${correctWords}`;
    }
}

function setNewSentence() {
    if (!isTestRunning) {
        return;
    }
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    textDisplay.textContent = currentSentence;
    typingArea.value = "";
    typingArea.style.backgroundColor = ""; 
}

function highlightCorrectText() {
    const inputText = typingArea.value;
    let highlightedSentence = '';
    for (let i = 0; i < currentSentence.length; ++i) {
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
    textDisplay.innerHTML = highlightedSentence;
}

function checkTyping() {
    const inputText = typingArea.value.trim();
    if (inputText === currentSentence) {
        correctWords += inputText.split(" ").length;
        setNewSentence();
    } else {
        highlightCorrectText();
    }
}

typingArea.addEventListener("input", checkTyping);
startButton.addEventListener("click", startTest);