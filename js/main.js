(function () {

  let ui = new UI();
  let errors = new ERRORS();

  const main = document.querySelector('main');
  const playBtn = document.querySelector('.play');
  const ulChecks = document.querySelector('.checks');
  const selectCategories = document.querySelector('.categories');

  let categoryVal = '';
  let difficultyVal = '';
  let thisQuestion;

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
  const engine = quiz => {
    let {
      category,
      question,
      incorrect_answers,
      correct_answer
    } = quiz;
    let thisQuestion = ui.quiz(category, question, incorrect_answers, correct_answer);

    return thisQuestion;
  };

  //play button event
  const playBtnHandler = () => {
    let quizes = [];
    playBtn.addEventListener('click', e => {
      getData().then(res => quizes = res.results)
        .then(() => {
          let i = 0;
          let it = quizes[i];
          thisQuestion = engine(it);
          let anims = new Animations(document.getElementById('intro-page'));
          anims.slideLeftOut();
          setTimeout(() => {
            main.innerHTML = thisQuestion;

              document.querySelector('.quiz ul').addEventListener('click', e => {
                let t = e.target;
                thisQuestion = engine(quizes[++i]);
                if (t.tagName === 'LI') {
                  main.innerHTML = '';
                  main.innerHTML = thisQuestion;
                  console.log(thisQuestion);
                }
              }); //select answer event
            
          }, 500);

        });
    });
  };

  playBtnHandler();
}());