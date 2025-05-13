"use strict";
class InterviewSimulation {
    constructor() {
        this.timer = null;
        this.timeLeft = 5;
        this.role = null;
        this.currentQuestion = null;
        this.dataStructures = [
            'array', 'linked list', 'binary tree', 'hash map', 'queue', 'stack',
            'graph', 'trie', 'heap', 'circular buffer', 'skip list', 'B-tree'
        ];
        this.algorithms = [
            'sorting', 'searching', 'dynamic programming', 'greedy', 'backtracking',
            'divide and conquer', 'recursion', 'iteration', 'memoization', 'caching'
        ];
        this.constraints = [
            'O(1) space complexity',
            'O(log n) time complexity',
            'no extra memory',
            'no built-in functions',
            'no loops',
            'no conditionals',
            'no variables',
            'no recursion',
            'no iteration',
            'no data structures'
        ];
        this.absurdRequirements = [
            'while maintaining perfect code coverage',
            'without using any programming language',
            'using only emojis as variables',
            'while keeping the code under 140 characters',
            'without using any numbers',
            'while making it production-ready',
            'without using any comments',
            'while making it maintainable',
            'without using any libraries',
            'while making it scalable'
        ];
        this.problemTypes = [
            'optimize', 'implement', 'design', 'debug', 'refactor', 'reverse engineer',
            'parallelize', 'distribute', 'cache', 'compress', 'decompress', 'encrypt'
        ];
        this.subjects = [
            'string', 'integer', 'floating point', 'boolean', 'object', 'array',
            'database', 'network', 'file system', 'memory', 'CPU', 'GPU'
        ];
        this.answerTimer = null;
        this.answerTimeLeft = 5;
        // Initialize DOM elements
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.endScreen = document.getElementById('end-screen');
        this.startButton = document.getElementById('start-button');
        this.actionButton = document.getElementById('action-button');
        this.roleDisplay = document.getElementById('role-display');
        this.timerDisplay = document.getElementById('timer');
        this.resultMessage = document.getElementById('result-message');
        this.restartButton = document.getElementById('restart-button');
        this.problemDisplay = document.getElementById('problem-display');
        this.problemTitle = document.getElementById('problem-title');
        this.problemDescription = document.getElementById('problem-description');
        this.answerSection = document.getElementById('answer-section');
        this.answerInput = document.getElementById('answer-input');
        this.submitAnswer = document.getElementById('submit-answer');
        this.systemOverlay = document.getElementById('system-overlay');
        this.systemMessage = document.getElementById('system-message');
        this.systemRestart = document.getElementById('system-restart');
        this.dpChoiceScreen = document.getElementById('dp-choice-screen');
        this.dpYesButton = document.getElementById('dp-yes-button');
        this.dpNoButton = document.getElementById('dp-no-button');
        // Bind event listeners
        this.startButton.addEventListener('click', () => this.startGame());
        this.actionButton.addEventListener('click', () => this.handleAction());
        this.restartButton.addEventListener('click', () => this.startGame());
        this.submitAnswer.addEventListener('click', () => this.handleSubmit());
        this.systemRestart.addEventListener('click', () => this.handleSystemRestart());
        this.dpYesButton.addEventListener('click', () => this.handleDPChoice(true));
        this.dpNoButton.addEventListener('click', () => this.handleDPChoice(false));
    }
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    generateQuestion() {
        const dataStructure = this.getRandomElement(this.dataStructures);
        const algorithm = this.getRandomElement(this.algorithms);
        const constraint = this.getRandomElement(this.constraints);
        const requirement = this.getRandomElement(this.absurdRequirements);
        const problemType = this.getRandomElement(this.problemTypes);
        const subject = this.getRandomElement(this.subjects);
        // Randomly determine difficulty based on number of constraints
        const difficulty = Math.random() < 0.3 ? 'Easy' : Math.random() < 0.6 ? 'Medium' : 'Hard';
        const title = `${problemType.charAt(0).toUpperCase() + problemType.slice(1)} a ${dataStructure} using ${algorithm}`;
        const description = `Given a ${subject}, ${problemType} it using a ${dataStructure} and ${algorithm} algorithm, ${constraint}, ${requirement}.`;
        return {
            title,
            difficulty,
            description
        };
    }
    startGame() {
        // Randomly assign role
        this.role = Math.random() < 0.5 ? 'interviewer' : 'interviewee';
        // Update UI based on role
        if (this.role === 'interviewer') {
            this.roleDisplay.textContent = 'You are the Interviewer (prison guard). Test the candidate\'s knowledge.';
            this.actionButton.textContent = 'Ask LeetCode!';
        }
        else {
            this.roleDisplay.textContent = 'You are the Interviewee (prisoner). Show your problem-solving skills.';
            this.actionButton.textContent = 'Solve It!';
            // Show a problem immediately for interviewee
            this.currentQuestion = this.generateQuestion();
            this.problemDisplay.classList.remove('hidden');
            this.problemTitle.textContent = this.currentQuestion.title;
            this.problemDescription.textContent = this.currentQuestion.description;
        }
        // Show game screen
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.endScreen.classList.add('hidden');
        this.dpChoiceScreen.classList.add('hidden');
        this.problemDisplay.classList.add('hidden');
        this.answerSection.classList.add('hidden');
        this.answerInput.value = '';
        // Start timer
        this.timeLeft = 5;
        this.timerDisplay.textContent = this.timeLeft.toString();
        this.timer = window.setInterval(() => this.updateTimer(), 1000);
    }
    updateTimer() {
        this.timeLeft--;
        this.timerDisplay.textContent = this.timeLeft.toString();
        if (this.timeLeft <= 0) {
            this.endGame(this.role === 'interviewer' ? 'MISSED OPPORTUNITY' : 'THOUGHT IT THROUGH');
        }
    }
    startAnswerTimer() {
        this.answerTimeLeft = 5;
        this.updateAnswerTimerDisplay();
        this.answerInput.disabled = false;
        this.submitAnswer.disabled = false;
        this.answerTimer = window.setInterval(() => this.updateAnswerTimer(), 1000);
    }
    updateAnswerTimer() {
        this.answerTimeLeft--;
        this.updateAnswerTimerDisplay();
        if (this.answerTimeLeft <= 0) {
            this.stopAnswerTimer();
            this.answerInput.disabled = true;
            this.submitAnswer.disabled = true;
            this.showSystemOverlay("No one has authority over anyone else");
        }
    }
    stopAnswerTimer() {
        if (this.answerTimer) {
            clearInterval(this.answerTimer);
            this.answerTimer = null;
        }
    }
    updateAnswerTimerDisplay() {
        // Optionally, show the timer in the answer section or result message
        const timerSpanId = 'answer-timer';
        let timerSpan = document.getElementById(timerSpanId);
        if (!timerSpan) {
            timerSpan = document.createElement('span');
            timerSpan.id = timerSpanId;
            this.answerSection.insertBefore(timerSpan, this.answerInput);
        }
        timerSpan.textContent = `Time left: ${this.answerTimeLeft}s`;
        timerSpan.style.display = 'block';
        timerSpan.style.fontWeight = 'bold';
        timerSpan.style.marginBottom = '0.5rem';
    }
    showFunnyResponse() {
        const response = "No one has authority over anyone else";
        this.resultMessage.innerHTML += `<br><br><strong>System:</strong> ${response}`;
        this.showSystemOverlay(response);
    }
    showSystemOverlay(message) {
        this.systemMessage.textContent = message;
        this.systemOverlay.classList.remove('hidden');
        // Hide the regular Try Again button
        this.restartButton.style.display = 'none';
    }
    handleSystemRestart() {
        this.systemOverlay.classList.add('hidden');
        this.restartButton.style.display = '';
        this.startGame();
    }
    endGame(message) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.gameScreen.classList.add('hidden');
        this.endScreen.classList.remove('hidden');
        if (this.role === 'interviewer' && this.currentQuestion) {
            this.resultMessage.innerHTML = `${message}<br><br><strong>${this.currentQuestion.title}</strong><br>Difficulty: ${this.currentQuestion.difficulty}<br><br>${this.currentQuestion.description}`;
            this.answerSection.classList.remove('hidden');
            this.startAnswerTimer();
        }
        else {
            this.resultMessage.textContent = message;
        }
    }
    handleAction() {
        if (this.role === 'interviewer') {
            this.gameScreen.classList.add('hidden');
            this.dpChoiceScreen.classList.remove('hidden');
        }
        else {
            this.endGame('TOOK THE CHALLENGE');
        }
    }
    handleSubmit() {
        const answer = this.answerInput.value.trim();
        if (answer) {
            this.resultMessage.innerHTML += '<br><br><strong>Your Solution:</strong><br><pre>' + answer + '</pre>';
            this.answerSection.classList.add('hidden');
            this.answerInput.disabled = true;
            this.submitAnswer.disabled = true;
            if (this.answerTimer) {
                this.stopAnswerTimer();
            }
            this.showSystemOverlay("No one has authority over anyone else");
        }
    }
    handleDPChoice(wantsDP) {
        this.dpChoiceScreen.classList.add('hidden');
        this.endScreen.classList.remove('hidden');
        this.resultMessage.innerHTML = wantsDP ?
            'You chose to ask a dynamic programming question.<br><br>' :
            'You chose not to ask a dynamic programming question.<br><br>';
        this.showSystemOverlay("No one has authority over anyone else");
    }
    finalResponse() {
        const response = "No one has authority over anyone else";
        this.resultMessage.innerHTML += `<br><br><strong>System:</strong> ${response}`;
        this.showSystemOverlay(response);
    }
}
// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InterviewSimulation();
});
