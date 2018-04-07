class UI {
  constructor() {
    this.main = document.querySelector('main');
    this.selectCat = document.querySelector('.categories--select');
  }
  
  categories() {
    let categories = [["Sports", 21], ["Geography", 22], ["Politics", 24],["History", 23]];
    for (let cat of categories) {
      let selectOption = document.createElement('option');
      selectOption.value = cat[1];
      selectOption.textContent = cat[0];

      this.selectCat.appendChild(selectOption);
    }
  }

  quiz(category, question, answers, right, time) {
    let quiz = `<div class="quiz slide-left-in">
      <p class="time">${time}</p>
      <h3>${category}</h3>
      <p class="question">${question}</p>
      <ul>
      <li>${answers[0]}</li>
      <li>${answers[1]}</li>
      <li>${answers[2]}</li>
      <li>${right}</li>
      </ul>
      </div>`;
    
    return quiz;
  }
  
  infos(currentQuizIndex, quizes) {
    let info = `<div class="info">
    <p class="index-question">${currentQuizIndex+1}/${quizes.length}</p>
    </div>`
    
    return info;
  }
  
  gameEnd(countRightAnswers) {
    let end = `<div class="end-game">
    <p>You have ${countRightAnswers} right answers</p>
    <button class="new-game">New game</button>
    </div>`;
    
    return end;
  }
}

class Animations{
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