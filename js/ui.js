class UI {
  constructor() {
    this.main = document.querySelector('main');
    this.selectCat = document.querySelector('.categories--select');
    this.selectDifficulty = document.querySelector(".difficulties");
    this.playBtn = document.querySelector(".play");
  }

  init() {
    //append all data when document is loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.renderCategories();

      let {
        fetchData,
        introPage,
        timer,
        engine
      } = App;
    });
  }

  renderCategories() {
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

      this.selectCat.appendChild(selectOption);
    }
  }
  
  getQuiz() {
    this.selectDifficulty.addEventListener("click", App.getDifificulty);
    this.selectCat.addEventListener("change", App.getCategory);
    DATA.init(App.categoryVal, App.difficultyVal);
    this.playBtn.addEventListener("click", ()=>{
      console.log(DATA.questions);
      console.log(App.difficultyVal)
    });
  }

  renderQuestion(quiz, timer) {
    let {
      category,
      question,
      incorrect_answers,
      correct_answer
    } = quiz;

    let quizTemplate = `<div class="quiz slide-left-in">
      <p class="time">${timer}</p>
      <h3>${category}</h3>
      <p class="question">${question}</p>
      <ul>
      <li>${incorrect_answers[0]}</li>
      <li>${incorrect_answers[1]}</li>
      <li>${incorrect_answers[2]}</li>
      <li>${correct_answer}</li>
      </ul>
      </div>`;

    this.main.innerHTML = quizTemplate;
  }

  renderInfos(currentQuizIndex, quizes) {
    let info = `<div class="info">
    <p class="index-question">${currentQuizIndex+1}/${quizes.length}</p>
    </div>`

    this.main.innerHTML += this.renderInfos;
  }

  renderEndGame(countRightAnswers) {
    let end = `<div class="end-game">
    <p>You have ${countRightAnswers} right answers</p>
    <button class="new-game">New game</button>
    </div>`;

    this.main.innerHTML = end;
  }

  playBtnHandler() {
    this.playBtn.addEventListener('click', () => {
      this.renderQuestion();
    });
  }
}

class Animations {
  constructor(element) {
    this.element = element;
  }
  slideLeftOut() {
    this.element.classList.add('slide-left-out');
  }
  slideLeftIn() {
    this.element.classList.add('slide-left-in');
  }
  fadeOut() {
    this.element.classList.add('fade-out');
  }

}

let ui = new UI();
ui.init();
