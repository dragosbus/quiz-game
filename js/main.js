(function () {

  let ui = new UI();
  let errors = new ERRORS();

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

  //play button event
  const playBtnHandler = () => {
    playBtn.addEventListener('click', e => {
      getData().then(res => console.log(res));
    });
  };

  playBtnHandler();

}());