(function () {

  let ui = new UI();
  let errors = new ERRORS();

  const main = document.querySelector('main');
  const playBtn = document.querySelector('.play');
  const ulChecks = document.querySelector('.checks');
  const selectCategories = document.querySelector('.categories');

  let categoryVal = '';
  let difficultyVal = '';

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

  //start quiz
  function* startQuiz(quizes) {
    for (let quiz of quizes) {
      yield quiz;
    }
  }

  //quiz game engine
  const engine = quiz => {
    let {
      category,
      question,
      incorrect_answers,
      correct_answer
    } = quiz.value;
    let thisQuestion = ui.quiz(category, question, incorrect_answers, correct_answer);
    
    return thisQuestion;
  };

  //play button event
  const playBtnHandler = () => {
    let quizes = [];
    playBtn.addEventListener('click', e => {
      getData().then(res => quizes = res.results)
        .then(() => {
          let it = startQuiz(quizes);
          let thisQuestion = engine(it.next());
          main.innerHTML = thisQuestion;

          document.querySelector('.quiz ul').addEventListener('click', e => {
            let t = e.target;
            if (t.tagName === 'LI') {
              let now = it.next();
              thisQuestion = engine(now);
              main.innerHTML = '';
              setTimeout(() => {
                main.innerHTML += thisQuestion;
              }, 500);
              console.log(thisQuestion);
            }
          });//select answer event
        });
    });
  };

  playBtnHandler();
}());