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

  //change quiz
  const nextQuiz = (quizes, i) => {
    document.querySelector('.quiz').querySelector('h3').innerHTML = quizes[i].category;
    document.querySelector('.quiz').querySelector('p').innerHTML = quizes[i].question;
    document.querySelector('.quiz').querySelectorAll('ul li')[0].innerHTML = quizes[i].incorrect_answers[0];
    document.querySelector('.quiz').querySelectorAll('ul li')[1].innerHTML = quizes[i].incorrect_answers[1];
    document.querySelector('.quiz').querySelectorAll('ul li')[2].innerHTML = quizes[i].incorrect_answers[2];
    document.querySelector('.quiz').querySelectorAll('ul li')[3].innerHTML = quizes[i].correct_answer;
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
          main.innerHTML = thisQuestion;
          console.log(quizes[i])
          document.querySelector('.quiz ul').addEventListener('click', e => {
            let t = e.target;
            i++;
            if (t.tagName === 'LI') {
              let animOutQuiz = new Animations(document.querySelector('.quiz'));
              animOutQuiz.slideLeftOut();
              setTimeout(() => { 
                nextQuiz(quizes, i);
              }, 700);
              setTimeout(() => {
                document.querySelector('.quiz').style.display = 'block'
                document.querySelector('.quiz').classList.remove('slide-left-out')
                animOutQuiz.slideLeftInt();
              }, 700);
              
              if (i > quizes.length) {
                alert('end');
              }
            }
          }); //select answer event
        });
    });
  };

  playBtnHandler();

}());