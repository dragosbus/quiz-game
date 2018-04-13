(function game() {
   
   const data = {
       quizes: [],
       init(category, difficulty) {
           let api = new Quiz(category, difficulty);
           api.fetchData().then(res=>this.quizes=res);
       },
       getQuiz() {
           return this.quizes;
       }
   };
   
   const controller = {
       init() {
           data.init();
           view.init();
       },
        timer: {
            time:0,
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
   };
   
   const view = {
        init() {
            this.main = document.querySelector('main');
            this.selectCat = document.querySelector('.categories--select');
            this.selectDifficulty = document.querySelector(".difficulties");
            this.playBtn = document.querySelector(".play");
            this.render();
       },
       render() {
          this.categories();
       },
       categories() {
            let categories = [["Sports", 21], ["Geography", 22], ["Politics", 24],["History", 23]];
            for (let cat of categories) {
            let selectOption = document.createElement('option');
            selectOption.value = cat[1];
            selectOption.textContent = cat[0];
            this.selectCat.appendChild(selectOption);
            }
          
      }
   };
   
   controller.init();
    
}());