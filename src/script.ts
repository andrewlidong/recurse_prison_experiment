type Role = 'interviewer' | 'interviewee';
type GameState = 'start' | 'game' | 'end' | 'dp-choice';

interface LeetCodeQuestion {
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    description: string;
}

class InterviewSimulation {
    private startScreen: HTMLElement;
    private gameScreen: HTMLElement;
    private endScreen: HTMLElement;
    private startButton: HTMLButtonElement;
    private roleDisplay: HTMLElement;
    private timerDisplay: HTMLElement;
    private resultMessage: HTMLElement;
    private restartButton: HTMLButtonElement;
    private problemDisplay: HTMLElement;
    private problemTitle: HTMLElement;
    private problemDescription: HTMLElement;
    private answerSection: HTMLElement;
    private answerInput: HTMLTextAreaElement;
    private submitAnswer: HTMLButtonElement;
    private systemOverlay: HTMLElement;
    private systemMessage: HTMLElement;
    private systemRestart: HTMLButtonElement;
    private dpChoiceScreen: HTMLElement;
    private dpYesButton: HTMLButtonElement;
    private dpNoButton: HTMLButtonElement;

    private timer: number | null = null;
    private timeLeft: number = 5;
    private role: Role | null = null;
    private currentQuestion: LeetCodeQuestion | null = null;

    private readonly dataStructures = [
        'array', 'linked list', 'binary tree', 'hash map', 'queue', 'stack',
        'graph', 'trie', 'heap', 'circular buffer', 'skip list', 'B-tree'
    ];

    private readonly algorithms = [
        'sorting', 'searching', 'dynamic programming', 'greedy', 'backtracking',
        'divide and conquer', 'recursion', 'iteration', 'memoization', 'caching'
    ];

    private readonly constraints = [
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

    private readonly absurdRequirements = [
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

    private readonly problemTypes = [
        'optimize', 'implement', 'design', 'debug', 'refactor', 'reverse engineer',
        'parallelize', 'distribute', 'cache', 'compress', 'decompress', 'encrypt'
    ];

    private readonly subjects = [
        'string', 'integer', 'floating point', 'boolean', 'object', 'array',
        'database', 'network', 'file system', 'memory', 'CPU', 'GPU'
    ];

    private answerTimer: number | null = null;
    private answerTimeLeft: number = 5;

    constructor() {
        // Initialize DOM elements
        this.startScreen = document.getElementById('start-screen')!;
        this.gameScreen = document.getElementById('game-screen')!;
        this.endScreen = document.getElementById('end-screen')!;
        this.startButton = document.getElementById('start-button') as HTMLButtonElement;
        this.roleDisplay = document.getElementById('role-display')!;
        this.timerDisplay = document.getElementById('timer')!;
        this.resultMessage = document.getElementById('result-message')!;
        this.restartButton = document.getElementById('restart-button') as HTMLButtonElement;
        this.problemDisplay = document.getElementById('problem-display')!;
        this.problemTitle = document.getElementById('problem-title')!;
        this.problemDescription = document.getElementById('problem-description')!;
        this.answerSection = document.getElementById('answer-section')!;
        this.answerInput = document.getElementById('answer-input') as HTMLTextAreaElement;
        this.submitAnswer = document.getElementById('submit-answer') as HTMLButtonElement;
        this.systemOverlay = document.getElementById('system-overlay')!;
        this.systemMessage = document.getElementById('system-message')!;
        this.systemRestart = document.getElementById('system-restart') as HTMLButtonElement;
        this.dpChoiceScreen = document.getElementById('dp-choice-screen')!;
        this.dpYesButton = document.getElementById('dp-yes-button') as HTMLButtonElement;
        this.dpNoButton = document.getElementById('dp-no-button') as HTMLButtonElement;

        console.log('Initializing event listeners');
        // Bind event listeners
        this.startButton.addEventListener('click', () => this.startGame());
        this.restartButton.addEventListener('click', () => this.startGame());
        this.submitAnswer.addEventListener('click', () => this.handleSubmit());
        this.systemRestart.addEventListener('click', () => {
            console.log('System restart button clicked');
            this.handleSystemRestart();
        });
        this.dpYesButton.addEventListener('click', () => this.handleDPChoice(true));
        this.dpNoButton.addEventListener('click', () => this.handleDPChoice(false));
        console.log('Event listeners initialized');
    }

    private getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private generateQuestion(): LeetCodeQuestion {
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

    private startGame(): void {
        // Randomly assign role
        this.role = Math.random() < 0.5 ? 'interviewer' : 'interviewee';

        // Update UI based on role
        if (this.role === 'interviewer') {
            this.roleDisplay.textContent = 'You are the Interviewer (prison guard).';
            // Show both role display and dp choice screen for interviewer
            this.startScreen.classList.add('hidden');
            this.gameScreen.classList.remove('hidden');
            this.dpChoiceScreen.classList.remove('hidden');
            this.problemDisplay.classList.add('hidden');
            this.answerSection.classList.add('hidden');
        } else {
            this.roleDisplay.textContent = 'You are the Interviewee (prisoner).';
            // Show a problem immediately for interviewee
            this.currentQuestion = this.generateQuestion();
            this.problemTitle.textContent = this.currentQuestion.title;
            this.problemDescription.textContent = this.currentQuestion.description;

            // Show game screen and answer section for interviewee
            this.startScreen.classList.add('hidden');
            this.gameScreen.classList.remove('hidden');
            this.problemDisplay.classList.remove('hidden');
            this.answerSection.classList.remove('hidden');
            this.startAnswerTimer();
        }

        this.endScreen.classList.add('hidden');
        this.answerInput.value = '';

        // Start timer
        this.timeLeft = 5;
        this.timerDisplay.textContent = this.timeLeft.toString();
        this.timer = window.setInterval(() => this.updateTimer(), 1000);
    }

    private updateTimer(): void {
        this.timeLeft--;
        this.timerDisplay.textContent = this.timeLeft.toString();

        if (this.timeLeft <= 0) {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
            this.showSystemOverlay("No one here has authority over anyone else");
        }
    }

    private startAnswerTimer(): void {
        this.answerTimeLeft = 5;
        this.updateAnswerTimerDisplay();
        this.answerInput.disabled = false;
        this.submitAnswer.disabled = false;
        this.answerTimer = window.setInterval(() => this.updateAnswerTimer(), 1000);
    }

    private updateAnswerTimer(): void {
        this.answerTimeLeft--;
        this.updateAnswerTimerDisplay();
        if (this.answerTimeLeft <= 0) {
            this.stopAnswerTimer();
            this.answerInput.disabled = true;
            this.submitAnswer.disabled = true;
            this.showSystemOverlay("No one here has authority over anyone else");
        }
    }

    private stopAnswerTimer(): void {
        if (this.answerTimer) {
            clearInterval(this.answerTimer);
            this.answerTimer = null;
        }
    }

    private updateAnswerTimerDisplay(): void {
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

    private showFunnyResponse(): void {
        const response = "No one here has authority over anyone else";
        this.resultMessage.innerHTML += `<br><br><strong>System:</strong> ${response}`;
        this.showSystemOverlay(response);
    }

    private showSystemOverlay(message: string): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.systemMessage.textContent = message;
        this.systemOverlay.classList.remove('hidden');
        // Hide the regular Try Again button
        this.restartButton.style.display = 'none';
    }

    private handleSystemRestart(): void {
        console.log('System restart clicked');
        // Clear any existing timers
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.answerTimer) {
            clearInterval(this.answerTimer);
            this.answerTimer = null;
        }

        // Hide all screens
        this.systemOverlay.classList.add('hidden');
        this.gameScreen.classList.add('hidden');
        this.dpChoiceScreen.classList.add('hidden');
        this.endScreen.classList.add('hidden');
        this.problemDisplay.classList.add('hidden');
        this.answerSection.classList.add('hidden');

        // Show start screen
        this.startScreen.classList.remove('hidden');

        // Reset any input values
        this.answerInput.value = '';
        console.log('Game reset complete');
    }

    private endGame(message: string): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.gameScreen.classList.add('hidden');
        this.endScreen.classList.remove('hidden');

        if (this.role === 'interviewer' && this.currentQuestion) {
            this.resultMessage.innerHTML = `<strong>${this.currentQuestion.title}</strong><br>Difficulty: ${this.currentQuestion.difficulty}<br><br>${this.currentQuestion.description}`;
            this.answerSection.classList.remove('hidden');
            this.startAnswerTimer();
        } else {
            this.showSystemOverlay("No one here has authority over anyone else");
        }
    }

    private handleSubmit(): void {
        const answer = this.answerInput.value.trim();
        if (answer) {
            this.resultMessage.innerHTML += '<br><br><strong>Your Solution:</strong><br><pre>' + answer + '</pre>';
            this.answerSection.classList.add('hidden');
            this.answerInput.disabled = true;
            this.submitAnswer.disabled = true;
            if (this.answerTimer) {
                this.stopAnswerTimer();
            }
            this.showSystemOverlay(" No one here has authority over anyone else");
        }
    }

    private handleDPChoice(wantsDP: boolean): void {
        this.dpChoiceScreen.classList.add('hidden');
        this.endScreen.classList.remove('hidden');
        this.resultMessage.innerHTML = wantsDP ?
            'You chose to ask a dynamic programming question.<br><br>' :
            'You chose not to ask a dynamic programming question.<br><br>';
        this.showSystemOverlay("No one here has authority over anyone else");
    }

    private finalResponse(): void {
        const response = "No one here has authority over anyone else";
        this.resultMessage.innerHTML += `<br><br><strong>System:</strong> ${response}`;
        this.showSystemOverlay(response);
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InterviewSimulation();
});