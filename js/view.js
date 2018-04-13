const VIEW = (function () {

    const main = document.querySelector('main');
    const selectCat = document.querySelector('.categories--select');
    const selectDifficulty = document.querySelector(".difficulties");
    const playBtn = document.querySelector(".play");

    let dif, cat;

    //create option with categorys
    function categories() {
        let categories = [
            ["Sports", 21],
            ["Geography", 22],
            ["Politics", 24],
            ["History", 23]
        ];
        for (let cat of categories) {
            let selectOption = document.createElement('option');
            selectOption.value = cat[1];
            selectOption.textContent = cat[0];
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
            const quiz = CONTROLLER.getData();
            console.log(quiz);
        });
    }

    categories();
    playBtnEvent();

}());