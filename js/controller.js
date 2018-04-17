const CONTROLLER = {
    quiz: [].concat(data['easy']).concat(data['medium']).concat(data['hard']),
    question: [],
    indexQuestion: 0,
    scorePlayer: 0,

    generateQuestions(quiz) {
        //get dinamically 10 random questions, depend of category and difficulty
        while (this.question.length < 10) {
            let random = Math.floor(Math.random() * quiz.length);
            if (!this.question.includes(quiz[random])) {
                this.question.push(quiz[random]);
            }
            //because is posible to be a category with less than 10 questions, add this condition for avoiding an infinite loop
            if (quiz.length < 10 && this.question.length === quiz.length) {
                break;
            }
        }
    },

    getQuiz(diff, cat) {
        let aux = [];
        if (diff && cat) {
            aux = this.quiz.filter(q => q['difficulty'] === diff && q['category'] === cat);
            this.generateQuestions(aux);
        } else if (!diff && cat) {
            aux = this.quiz.filter(q => q['category'] === cat);
            this.generateQuestions(aux);
        } else if (!cat && diff) {
            aux = this.quiz.filter(q => q['difficulty'] === cat);
            this.generateQuestions(aux);
        } else {
            this.generateQuestions(this.quiz);
        }
    },

    setDifficultyVal(val) {
        let difficultyVal = val;
        return difficultyVal;
    },

    setCategoryVal(val) {
        let categoryVal = val;
        return categoryVal;
    },

    nextQuestion() {
        return ++this.indexQuestion;
    },

    endGame() {
        if (this.indexQuestion >= this.question.length) {
            return true;
        }
    },

    checkAnswer(choose, right, fn) {
        if (choose === right) {
            this.scorePlayer += 1;
            fn('right-answer');
        } else {
            fn('wrong-answer');
        }
    }

};

const clock = {
    timer: 0,
    setTimer(difficulty) {
        if (difficulty === 'easy') this.timer = 10;
        else if (difficulty === 'medium') this.timer = 15;
        else this.timer = 20;
    },
    resetTimer() {
        this.timer = 0;
    }
}