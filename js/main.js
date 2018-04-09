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
    quizes = [],
    countQuestion;

  //set timer, depended of the difficulty of the question
  const setTimer = difficulty => {
    let timer = 0;
    if (difficulty === 'easy') timer = 10;
    else if (difficulty === 'medium') timer = 15;
    else timer = 20;

    return timer;
  };

  //reset timer
  const resetTimer = (quiz, i) => {
    let newTimer = setTimer(quiz[i].difficulty);
    
    return newTimer;
  };

  //get dificulty clicked
  const getDifificulty = () => {
    ulChecks.addEventListener('click', e => {
      let target = e.target;
      if (target.tagName === 'LABEL') {
        let value = target.textContent;
        difficultyVal = value.toLowerCase();
      }
    });
  };

  //get category selected
  const getCategory = () => {
    selectCategories.addEventListener('change', e => {
      let target = e.target;
      let value = target.value;
      categoryVal = value;
    });
  };

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
    let timer = setTimer(quiz.difficulty);
    let thisQuestion = ui.quiz(category, question, incorrect_answers, correct_answer, timer);

    return thisQuestion;
  };

  //ended game handler
  const gameEnd = () => {
    let divEndGame = ui.gameEnd(playerScore);
    main.innerHTML = divEndGame;
    document.querySelector(".new-game").addEventListener("click", () => location.reload());
  };

  //change quiz
  const nextQuiz = (quizes, i = indexQuestion) => {
    let animQuizPage = new Animations(document.querySelector('.quiz'));
    if (document.querySelector('.quiz').classList.contains("slide-left-in")) {
      document.querySelector('.quiz').classList.remove("slide-left-in")
    }
    setTimeout(() => {
      //check first if qustions are finished
      if (indexQuestion === quizes.length) {
        gameEnd(playerScore);
      }
      animQuizPage.slideLeftIn();
      setTimeout(()=>{
        thisQuestion = loadQuiz(quizes[indexQuestion]);
        main.innerHTML+=thisQuestion;
      },1200);

      resetTimer(quizes, indexQuestion, document.querySelector('.quiz').querySelector('p.time'));


    }, 1200);

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
      setTimeout(() => {
        document.querySelector('.quiz ul').addEventListener('click', chooseAnswer);
      }, 1300);
    }
  };

  const handlerQuizNotExistent = () => {
    errors.quizNotAvaible();
    document.getElementById("intro-page").classList.remove("fade-out");
    init();
    //hide error message after 3 seconds
    setTimeout(() => {
      document.getElementById("intro-page").removeChild(document.querySelector(".not-quiz"));
    }, 3000);
  };

  const handlerQuizSuccess = quizes => {
    let uiIntro = new Animations(document.getElementById("intro-page"));
    uiIntro.fadeOut();
    thisQuestion = loadQuiz(quizes[indexQuestion]);
    countQuestion = ui.infos(indexQuestion, quizes);

    setTimeout(() => {
      main.innerHTML = thisQuestion;
      main.innerHTML += countQuestion;

      //decrement timer
      let timer = setTimer(quizes[indexQuestion].difficulty);
      setInterval(function interval() {
        document.querySelector('.quiz').querySelector('p.time').textContent = timer--;
        if (timer === 0) {
          clearInterval(interval);
          nextQuiz(quizes, ++indexQuestion);
          timer = setTimer(quizes[indexQuestion].difficulty);
        }
      }, 1000);

      //start choose answer event
      document.querySelector('.quiz ul').addEventListener('click', chooseAnswer);

    }, 550);
  };

  //play button event
  const playBtnHandler = () => {
    playBtn.addEventListener('click', e => {
      getData().then(res => quizes = res.results)
        .then(() => {
          if (quizes.length > 0) {
            handlerQuizSuccess(quizes);
          } else {
            handlerQuizNotExistent();
          }

        });
    });
  };

  //append all data when document is loaded
  document.addEventListener('DOMContentLoaded', () => {
    ui.categories();
    getDifificulty();
    getCategory();
    playBtnHandler();
  });

}());