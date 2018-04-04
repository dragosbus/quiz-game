(function () {

  let ui = new UI();
  let errors = new ERRORS();

  const main = document.querySelector('main');
  const playBtn = document.querySelector('.play');
  const ulChecks = document.querySelector('.checks');
  const selectCategories = document.querySelector('.categories');

  let categoryVal = '',
      difficultyVal = '',
      thisQuestion,
      playerScore = 0,
      indexQuestion = 0,
      quizes = [];

  //append all data when document is loaded
  document.addEventListener('DOMContentLoaded', () => {
    ui.categories();
  });

  //get dificulty clicked
  (function getDifificulty() {
    ulChecks.addEventListener('click', e => {
      let target = e.target;
      if (target.tagName === 'LABEL') {
        let value = target.textContent;

        difficultyVal = value.toLowerCase();
      }
    });
  }());

  //get category selected
  (function getCategory() {
    selectCategories.addEventListener('change', e => {
      let target = e.target;
      let value = target.value;
      categoryVal = value;
    });
  }());

  //fetch data
  const getData = () => {
    //get category and difficulty
    let category = categoryVal;
    let difficulty = difficultyVal;
    let api = new Quiz(category, difficulty);
    return api.fetchData();
  };

  //quiz game engine
  const loadQuiz = quiz => {
    let {
      category,
      question,
      incorrect_answers,
      correct_answer
    } = quiz;
    let thisQuestion = ui.quiz(category, question, incorrect_answers, correct_answer);

    return thisQuestion;
  };

  //change quiz
  const nextQuiz = (quizes, i=indexQuestion) => {
    let animQuizPage = new Animations(document.querySelector('.quiz'));
    if(document.querySelector('.quiz').classList.contains("slide-left-in")) {
      document.querySelector('.quiz').classList.remove("slide-left-in")
    }
    
    setTimeout(()=>{
      
      animQuizPage.slideLeftIn();
      document.querySelector('.quiz').querySelector('h3').innerHTML = quizes[i].category;
      document.querySelector('.quiz').querySelector('p').innerHTML = quizes[i].question;
      document.querySelector('.quiz').querySelectorAll('ul li')[0].innerHTML = quizes[i].incorrect_answers[0];
      document.querySelector('.quiz').querySelectorAll('ul li')[1].innerHTML = quizes[i].incorrect_answers[1];
      document.querySelector('.quiz').querySelectorAll('ul li')[2].innerHTML = quizes[i].incorrect_answers[2];
      document.querySelector('.quiz').querySelectorAll('ul li')[3].innerHTML = quizes[i].correct_answer;
    },3000);
  };

  //check fom right answer
  const checkAnswer = (choice, rightAnswer) => {

    function addClass(classTarget) {
      choice.classList.add(classTarget);
      setTimeout(() => {
        choice.classList.remove(classTarget);
      }, 1200);
    }

    if (choice.textContent === rightAnswer) {
      playerScore += 1;
      addClass('right-answer');
    } else {
      addClass('wrong-answer');
    }
  };
  
const chooseAnswer = e => {
  let t = e.target;
  checkAnswer(t, quizes[indexQuestion].correct_answer);
  if (t.tagName === 'LI') {
    nextQuiz(quizes, ++indexQuestion);
    //the player should not be able to click and answer, if he clicked once
    document.querySelector('.quiz ul').removeEventListener("click", chooseAnswer);
    //when the next question is shown, allow to player to choose an answer
    setTimeout(()=>{
      document.querySelector('.quiz ul').addEventListener('click', chooseAnswer); //select answer event
    },3000);
  }
};

  //play button event
  const playBtnHandler = () => {
    playBtn.addEventListener('click', e => {
      getData().then(res => quizes = res.results)
        .then(()=> {
          let uiIntro = new Animations(document.getElementById("intro-page"));
          uiIntro.fadeOut();
          thisQuestion = loadQuiz(quizes[indexQuestion]);
          
          setTimeout(()=>{
            main.innerHTML = thisQuestion;
            //start choose answer event
            document.querySelector('.quiz ul').addEventListener('click', chooseAnswer); //select answer event
          },550);
          
        });
    });
  };

  playBtnHandler();

}());