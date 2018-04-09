(function () {

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

  

}());