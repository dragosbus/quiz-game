const CONTROLLER = {
    quiz:[],

    getQuiz(diff, cat) {
        this.quiz = data;
    },

    setDifficultyVal(val) {
        let difficultyVal = val;
        return difficultyVal;
    },

    setCategoryVal(val) {
        let categoryVal = val;
        return categoryVal;
    }

};

const clock = {
    timer: 0,
    setTimer(difficulty) {
        if (difficulty === 'easy') this.timer = 10;
        else if (difficulty === 'medium') this.timer = 15;
        else this.timer = 20;

        return this.timer;
    },
    resetTimer() {
        this.timer = 0;
        return this.timer;
    }
}