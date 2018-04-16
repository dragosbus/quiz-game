const VIEW = (function () {

    const main = document.querySelector('main');
    const selectCat = document.querySelector('.categories--select');
    const selectDifficulty = document.querySelector(".difficulties");
    const playBtn = document.querySelector(".play");
    const intro = document.getElementById("intro-page");

    let dif, cat, questions, timer;

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
            selectCat.appendChild(selectOption);
        }

    }

    function getCategory() {
        selectCat.addEventListener('change', e => {
            let target = e.target;
            let value = target.value;
            cat = CONTROLLER.setCategoryVal(value);
        });
    }

    function getDifficulty() {
        selectDifficulty.addEventListener('click', e => {
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
        playBtn.addEventListener("click", () => {
            CONTROLLER.getQuiz(dif, cat);
            questions = CONTROLLER.question;
            render(questions, CONTROLLER.indexQuestion);
        });
    }

    function render(questions, i, prevElement = intro) {
        clock.setTimer(questions[i].difficulty);
        let questionTemplate = UI.quiz(
            questions[i].category,
            questions[i].question,
            questions[i].incorrect_answers,
            questions[i].correct_answer,
            clock.timer
        );
        Animations.fadeOut.call(prevElement);
        setTimeout(() => {
            main.innerHTML = questionTemplate;
            //start choose answer event
            document.querySelector('.quiz ul').addEventListener('click', chooseAnswer);
        }, 500);
        setTimeout(decrementTimer, 500);
    }

    function nextQuestion() {
        let quiz = document.querySelector('.quiz');
        let i = CONTROLLER.nextQuestion();
        setTimeout(() => render(questions, i, prevElement = quiz), 1000);
    }

    function decrementTimer() {
        timer = setInterval(() => {
            document.querySelector('.time').textContent = clock.timer--;
            console.log(clock.timer)
            if (clock.timer < 1) {
                clearInterval(timer);
                nextQuestion();
            }
        },1000);
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

    categories();
    playBtnEvent();

}());