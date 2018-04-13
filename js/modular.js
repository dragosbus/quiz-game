(function game() {
   
   const data = {
       quizes: [],
       init(category, difficulty) {
           let api = new Quiz(category, difficulty);
           api.fetchData().then(res=>this.quizes = res);
       },
       getQuiz() {
           return this.quizes;
       }
   };
   
   const controller = {
       init() {
           view.init();
       },
       
       setData(category, difficulty) {
           data.init(category, difficulty);
       },
       
       getData() {
         let quiz = data.getQuiz();
         return quiz;
       },
       
        clock: {
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
        },
        
        difficulty:{
            difficultyVal:"",
            setDifficultyVal(value) {
                this.difficultyVal = value;
            }
        },
        
        category:{
            categoryVal: "",
            setCategoryVal(value) {
                this.categoryVal = value;
            }
        },
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
          this.getCategory();
          this.playBtnEvent();
       },
       
       categories() {
            let categories = [["Sports", 21], ["Geography", 22], ["Politics", 24],["History", 23]];
            for (let cat of categories) {
            let selectOption = document.createElement('option');
            selectOption.value = cat[1];
            selectOption.textContent = cat[0];
            this.selectCat.appendChild(selectOption);
            }
          
      },
      
      getCategory() {
        this.selectCat.addEventListener('change', e => {
            let target = e.target;
            let value = target.value;
            controller.category.setCategoryVal(value);
        });
      },
      
      getDifificulty() {
        this.selectDifficulty.addEventListener('click', e => {
            let target = e.target;
            if (target.tagName === 'LABEL') {
            let value = target.textContent;
            controller.difficulty.setDifficultyVal(value.toLowerCase());
            }
        });  
      },
      
      playBtnEvent() {
        this.playBtn.addEventListener("click",()=>{
           controller.setData(controller.difficulty.difficultyVal, controller.category.categoryVal);
           const quiz = controller.getData();
           console.log(quiz);
        });  
      }
   };
   
   controller.init();
    
}());