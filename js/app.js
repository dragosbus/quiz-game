const App = (function () {

    const introPage = {
        categoryVal: "",
        difficultyVal: "",
        getDifificulty(e) {
            let target = e.target;
            if (target.tagName === 'LABEL') {
                let value = target.textContent;
                this.difficultyVal = value.toLowerCase();
            }
        },
        getCategory(e) {
            let target = e.target;
            let value = target.value;
            this.categoryVal = value;
        }
    };

    const timer = {
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
    };

    const fetchData = {
        init() {
            let {
                category,
                difficulty
            } = introPage;
            this, quizes = [];
            this.api = new Quiz(category, difficulty);
            this.api.fetchData().then(res => this.quizes = quizes = res.results);

            return quizes;
        }
    };

    const engine = {
        init() {
            this.quizes = [];
            this.currentQuestion = '';
            this.indexQuestion = 0;
            this.counterQuestions = 0;
            this.playerScore = 0;
        },
        checkedAnswer() {
            this.playerScore += 1;
            return this.playerScore;
        }
    };

    return {
        fetchData,
        introPage,
        timer,
        engine
    };

}());