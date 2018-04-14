const CONTROLLER = {
    quiz: [].concat(data['easy']).concat(data['medium']).concat(data['hard']),
    question: [],
    indexQuestion: 0,

    getQuiz(diff, cat) {
        if (diff && cat) {
            this.question = this.quiz.filter(q => q['difficulty'] === diff && q['category'] === cat);
        } else {
            this.question = this.quiz;
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
    }

};

const clock = {
    timer: 0,
    setTimer(difficulty) {
        if (difficulty === 'easy') this.timer = 10;
        else if (difficulty === 'medium') this.timer = 15;
        else this.timer = 20;
    }
}