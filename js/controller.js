const CONTROLLER = (function() {
    
    function init() {
        view.init();
    }
    
    function setData(category, difficulty) {
        DATA.init(category, difficulty);
    }
       
    function getData() {
        let quiz = data.getQuiz();
        return quiz;
    }
    
    const clock = {
            timer:0,
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
    
    const difficulty={
            difficultyVal:"",
            setDifficultyVal(value) {
                this.difficultyVal = value;
            }
    };
        
    const category={
            categoryVal: "",
            setCategoryVal(value) {
                this.categoryVal = value;
            }
    };
    
}());