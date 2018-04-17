const UI = (function () {

  function introPage() {
    let intro = `<section id="intro-page">
      <div class="card">
        <h1>Start Quiz Game</h1>
      </div>
      <div class="categories">
        <select class="categories--select">
          <option value="all">Select a Category</option>
        </select>
      </div>
      <div class="difficulties">
        <ul class="checks">
          <li>
            <input type="radio" id="f-option" name="selector" value="easy">
            <label for="f-option">Easy</label>

            <div class="check"></div>
          </li>

          <li>
            <input type="radio" id="s-option" name="selector" value="medium">
            <label for="s-option">Medium</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>

          <li>
            <input type="radio" id="t-option" name="selector" value="hard">
            <label for="t-option">Hard</label>

            <div class="check">
              <div class="inside"></div>
            </div>
          </li>
        </ul>
      </div>
      <button class="btn play">Play</button>
    </section>`;

    return intro;
  }

  function quiz(category, question, answers, right, time) {
    let quiz = `<div class="quiz slide-left-in">
      <p class="time">${time}</p>
      <h3>${category}</h3>
      <p class="question">${question}</p>
      <ul>
      <li>${answers[0]}</li>
      <li>${answers[1]}</li>
      <li>${right}</li>
      <li>${answers[2]}</li>
      </ul>
      </div>`;
    return quiz;
  }

  function infos(currentQuizIndex, quizes) {
    let info = `<div class="info">
    <p class="index-question">${currentQuizIndex + 1}/${quizes.length}</p>
    </div>`
    return info;
  }

  function gameEnd(countRightAnswers) {
    let end = `<div class="end-game slide-left-in">
   <div class="wrap-stars">
      <div class="star star-1"></div>
      <div class="star star-2"></div>
      <div class="star star-3"></div>
   </div>
    <p>You have ${countRightAnswers} right answers</p>
    <button class="new-game">New game</button>
    </div>`;
    return end;
  }

  return {
    quiz,
    infos,
    gameEnd,
    introPage
  };
}());

const Animations = (function () {

  function slideLeftOut() {
    this.classList.add('slide-left-out');
  }

  function slideLeftIn() {
    this.classList.add('slide-left-in');
  }

  function fadeOut() {
    this.classList.add('fade-out');
  }

  function starOn(exclude, stars) {
    for (let i = 1; i <= stars.length - exclude; i++) {
      stars[i - 1].classList.add("star-on");
    }
  }
  return {
    slideLeftIn,
    slideLeftOut,
    fadeOut,
    starOn
  };
}());