const App = (function() {
    
    const introPage = {
        categoryVal:"",
        difficultyVal:"",
        getDifificulty(e) {
            let target = e.target;
            if (target.tagName === 'LABEL') {
                let value = target.textContent;
                this.difficultyVal = value.toLowerCase();
            }
        },
        getCategory(e){
            let target = e.target;
            let value = target.value;
            this.categoryVal = value;
        }
    };
    
    const timer = {
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
    };
    
    const fetchData = {
        init() {
            let {category, difficulty} = introPage;
            this.api = new Quiz(category, difficulty);
            return this.api.fetchData();
        }
    };
    
    function init() {
        
    }
    
}());