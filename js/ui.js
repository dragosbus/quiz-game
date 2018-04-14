const UI = (function () {

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
        let end = `<div class="end-game">
    <p>You have ${countRightAnswers} right answers</p>
    <button class="new-game">New game</button>
    </div>`;
        return end;
    }

    return {
        quiz,
        infos,
        gameEnd
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
    return {
        slideLeftIn,
        slideLeftOut,
        fadeOut
    };
}());