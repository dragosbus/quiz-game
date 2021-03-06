const VIEW = (function () {

    document.addEventListener("DOMContentLoaded", init);

    const DomElements = {
        init() {
            this.main = document.querySelector('main');
            this.selectCat = document.querySelector('.categories--select');
            this.selectDifficulty = document.querySelector(".difficulties");
            this.playBtn = document.querySelector(".play");
            this.intro = document.getElementById("intro-page");
        }
    };

    let dif, cat, questions, timer;

    function init() {
        CONTROLLER.gameEnded = false;
        CONTROLLER.indexQuestion = 0;
        CONTROLLER.playerScore = 0;
        DomElements.init();
        dif = "";
        cat = "";
        questions = [];
        categories();
        playBtnEvent();
    }

    //create option with categorys
    function categories() {
        let categories = ["Sports",
            "Geography",
            "Politics",
            "History"
        ];
        for (let cat of categories) {
            let selectOption = document.createElement('option');
            selectOption.value = cat;
            selectOption.textContent = cat;
            DomElements.selectCat.appendChild(selectOption);
        }
    }

    function getCategory() {
        DomElements.selectCat.addEventListener('change', e => {
            let target = e.target;
            let value = target.value;
            cat = CONTROLLER.setCategoryVal(value);
        });
    }

    function getDifficulty() {
        DomElements.selectDifficulty.addEventListener('click', e => {
            let target = e.target;
            if (target.tagName === 'LABEL') {
                let value = target.textContent;
                dif = CONTROLLER.setDifficultyVal(value.toLowerCase());
            }
        });
    }

    function playBtnEvent() {
        getCategory();
        getDifficulty();
        DomElements.playBtn.addEventListener("click", () => {
            CONTROLLER.getQuiz(dif, cat);
            questions = CONTROLLER.question;
            render(questions, CONTROLLER.indexQuestion);
        });
    }

    function render(questions, i, prevElement = DomElements.intro) {
        CONTROLLER.endGame();
        if (CONTROLLER.gameEnded) {
            renderEndGame();
        } else {
            renderQuiz();
        }

        function renderQuiz() {
            clock.setTimer(questions[i].difficulty);
            let infos = UI.infos(CONTROLLER.indexQuestion, questions);
            let questionTemplate = UI.quiz(
                questions[i].category,
                questions[i].question,
                questions[i].incorrect_answers,
                questions[i].correct_answer,
                clock.timer
            );

            Animations.fadeOut.call(prevElement);
            setTimeout(() => {
                DomElements.main.innerHTML = questionTemplate;
                DomElements.main.innerHTML += infos;
                //start choose answer event
                document.querySelector('.quiz ul').addEventListener('click', chooseAnswer);
            }, 500);
            setTimeout(decrementTimer, 500);
        }

        function renderEndGame() {
            Animations.fadeOut.call(document.querySelector('.quiz'));
            let endGame = UI.gameEnd(CONTROLLER.scorePlayer);
            setTimeout(() => {
                DomElements.main.innerHTML = endGame;
                let stars = document.querySelectorAll(".star");

                let playerScore = CONTROLLER.scorePlayer;
                if (playerScore === 10) Animations.starOn(0, stars);
                else if (playerScore >= 8) Animations.starOn(1, stars);
                else if (playerScore >= 5) Animations.starOn(2, stars);

                document.querySelector(".new-game").addEventListener("click", () => {
                    DomElements.main.innerHTML = UI.introPage();
                    init();
                });
            }, 500);
        }
    }

    function nextQuestion() {
        let quiz = document.querySelector('.quiz');
        let i = CONTROLLER.nextQuestion();
        setTimeout(() => render(questions, i, prevElement = quiz), 1000);
    }

    function decrementTimer() {
        timer = setInterval(() => {
            document.querySelector('.time').textContent = clock.timer--;
            if (clock.timer < 1) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function checkAnswer(choice, rightAnswer) {
        CONTROLLER.checkAnswer(choice.textContent, rightAnswer, classTarget => {
            choice.classList.add(classTarget);
            setTimeout(() => {
                choice.classList.remove(classTarget);
            }, 1200);
        });
    }

    function chooseAnswer(e) {
        let t = e.target;
        let {
            question,
            indexQuestion
        } = CONTROLLER;
        checkAnswer(t, question[indexQuestion].correct_answer);

        if (t.tagName === 'LI') {
            nextQuestion();
            clearInterval(timer);
            //the player should not be able to click and answer, if he clicked once
            document.querySelector('.quiz ul').removeEventListener("click", chooseAnswer);
            //when the next question is shown, allow to player to choose an answer
            setTimeout(() => {
                document.querySelector('.quiz ul').addEventListener('click', chooseAnswer);
            }, 1200);
        }
    }


}());