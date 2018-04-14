const VIEW = (function () {

    const main = document.querySelector('main');
    const selectCat = document.querySelector('.categories--select');
    const selectDifficulty = document.querySelector(".difficulties");
    const playBtn = document.querySelector(".play");

    let dif, cat, questions, indexQuestion=0;

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
            console.log(questions);
            render(questions, indexQuestion);
        });
    }

    function render(questions, i) {
        let timer = clock.setTimer(questions[i].difficulty);
        let questionTemplate = UI.quiz(
            questions[i].category,
            questions[i].question,
            questions[i].incorrect_answers,
            questions[i].correct_answer,
            timer
        );
        Animations.fadeOut.call(document.getElementById("intro-page"));
        setTimeout(() => {
            main.innerHTML = questionTemplate;
        }, 550);
    }

    categories();
    playBtnEvent();

}());